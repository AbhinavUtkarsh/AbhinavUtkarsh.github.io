"""Download the webfonts so they can be served from this origin.

    python scripts/fetch_fonts.py

Loading them from fonts.googleapis.com would send every visitor's IP to Google.
"""
import pathlib
import re
import urllib.request

ROOT = pathlib.Path(__file__).resolve().parent.parent
DEST = ROOT / "src" / "fonts"

# modern UA, otherwise Google serves ttf instead of woff2
UA = {"User-Agent": ("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 "
                     "(KHTML, like Gecko) Chrome/120.0 Safari/537.36")}

# family, weight, output slug, a unicode-range fragment identifying the subset
WANTED = [
    ("Roboto", "100", "roboto-100", "U+0000-00FF"),
    ("Nunito", "300", "nunito-300", "U+0000-00FF"),
]


def blocks(css):
    for chunk in css.split("@font-face")[1:]:
        fam = re.search(r"font-family:\s*'([^']+)'", chunk)
        wght = re.search(r"font-weight:\s*(\d+)", chunk)
        url = re.search(r"src:\s*url\((https://[^)]+?\.woff2)\)", chunk)
        rng = re.search(r"unicode-range:\s*([^;]+);", chunk)
        if fam and url:
            yield {
                "family": fam.group(1),
                "weight": wght.group(1) if wght else "",
                "url": url.group(1),
                "range": rng.group(1).strip() if rng else "",
            }


def main():
    DEST.mkdir(parents=True, exist_ok=True)
    family_q = "&".join(
        f"family={f.replace(' ', '+')}:wght@{w}" for f, w, _, _ in WANTED)
    css = urllib.request.urlopen(
        urllib.request.Request(
            f"https://fonts.googleapis.com/css2?{family_q}&display=swap", headers=UA),
        timeout=30).read().decode()

    found = list(blocks(css))
    for family, weight, slug, subset in WANTED:
        match = next((b for b in found
                      if b["family"] == family and b["weight"] == weight
                      and subset in b["range"]), None)
        if not match:
            print(f"!! no {subset} block for {family} {weight}")
            continue
        data = urllib.request.urlopen(
            urllib.request.Request(match["url"], headers=UA), timeout=60).read()
        out = DEST / f"{slug}.woff2"
        out.write_bytes(data)
        print(f"{family} {weight}: {len(data):>6} bytes -> src/fonts/{out.name}")


if __name__ == "__main__":
    main()
