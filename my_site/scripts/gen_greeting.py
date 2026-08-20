"""Turn नमस्ते into SVG paths for Greeting.js.

    pip install fonttools uharfbuzz brotli
    python scripts/gen_greeting.py

Safari does not shape Devanagari reliably inside SVG <text>: the स्ते conjunct
falls apart and the matra renders as loose dotted circles. Paths carry no
shaping, so they draw the same everywhere.

Output goes to src/greeting.json and is committed.
"""
import json
import pathlib
import re
import urllib.request

import uharfbuzz as hb
from fontTools.pens.basePen import BasePen
from fontTools.pens.boundsPen import BoundsPen
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.ttLib import TTFont


class LengthPen(BasePen):
    """Outline length, by flattening the curves. Used for the draw animation:
    relying on the SVG pathLength attribute instead is not safe in WebKit."""

    STEPS = 48

    def __init__(self, glyph_set):
        super().__init__(glyph_set)
        self.length = 0.0
        self._cur = None
        self._start = None

    @staticmethod
    def _dist(a, b):
        return ((a[0] - b[0]) ** 2 + (a[1] - b[1]) ** 2) ** 0.5

    def _moveTo(self, p):
        self._cur = self._start = p

    def _lineTo(self, p):
        self.length += self._dist(self._cur, p)
        self._cur = p

    def _curveToOne(self, p1, p2, p3):
        p0 = self._cur
        prev = p0
        for i in range(1, self.STEPS + 1):
            t = i / self.STEPS
            u = 1 - t
            pt = (u**3*p0[0] + 3*u*u*t*p1[0] + 3*u*t*t*p2[0] + t**3*p3[0],
                  u**3*p0[1] + 3*u*u*t*p1[1] + 3*u*t*t*p2[1] + t**3*p3[1])
            self.length += self._dist(prev, pt)
            prev = pt
        self._cur = p3

    def _qCurveToOne(self, p1, p2):
        p0 = self._cur
        prev = p0
        for i in range(1, self.STEPS + 1):
            t = i / self.STEPS
            u = 1 - t
            pt = (u*u*p0[0] + 2*u*t*p1[0] + t*t*p2[0],
                  u*u*p0[1] + 2*u*t*p1[1] + t*t*p2[1])
            self.length += self._dist(prev, pt)
            prev = pt
        self._cur = p2

    def _closePath(self):
        if self._cur and self._start:
            self.length += self._dist(self._cur, self._start)
        self._cur = self._start

TEXT = "नमस्ते"
FAMILY = "Noto+Sans+Devanagari:wght@300"

# matches the old CSS: 0.2rem tracking at a 6rem font size
TRACKING_EM = 0.2 / 6
PAD = 12  # font units of breathing room around the ink

ROOT = pathlib.Path(__file__).resolve().parent.parent
CACHE = ROOT / "scripts" / ".fontcache"
OUT = ROOT / "src" / "greeting.json"
UA = {"User-Agent": "Mozilla/5.0"}


def font_file():
    CACHE.mkdir(parents=True, exist_ok=True)
    dest = CACHE / "noto-sans-devanagari.ttf"
    if dest.exists():
        return dest
    css = urllib.request.urlopen(urllib.request.Request(
        f"https://fonts.googleapis.com/css2?family={FAMILY}&display=swap",
        headers=UA), timeout=30).read().decode()
    url = re.search(r"src:\s*url\((https://[^)]+?\.(?:ttf|otf))\)", css)
    if not url:
        raise SystemExit("no ttf in the Google Fonts css")
    dest.write_bytes(urllib.request.urlopen(
        urllib.request.Request(url.group(1), headers=UA), timeout=60).read())
    return dest


def main():
    path = font_file()
    face = hb.Face(hb.Blob.from_file_path(str(path)))
    hb_font = hb.Font(face)
    upem = face.upem
    tracking = upem * TRACKING_EM

    buf = hb.Buffer()
    buf.add_str(TEXT)
    buf.guess_segment_properties()
    hb.shape(hb_font, buf)

    tt = TTFont(str(path))
    glyphs = tt.getGlyphSet()
    order = tt.getGlyphOrder()

    # न | म | स्ते, so the three groups keep their own animation delay
    def group_of(cluster):
        return cluster if cluster < 2 else 2

    groups = [[], [], []]
    x = 0
    minx = miny = 1e9
    maxx = maxy = -1e9

    for info, pos in zip(buf.glyph_infos, buf.glyph_positions):
        name = order[info.codepoint]
        dx, dy = x + pos.x_offset, pos.y_offset

        pen = SVGPathPen(glyphs)
        glyphs[name].draw(pen)
        d = pen.getCommands()
        if d.strip():
            length = LengthPen(glyphs)
            glyphs[name].draw(length)
            groups[group_of(info.cluster)].append({
                "d": d, "dx": dx, "dy": dy, "len": round(length.length),
            })

            bounds = BoundsPen(glyphs)
            glyphs[name].draw(bounds)
            if bounds.bounds:
                x0, y0, x1, y1 = bounds.bounds
                minx, miny = min(minx, x0 + dx), min(miny, y0 + dy)
                maxx, maxy = max(maxx, x1 + dx), max(maxy, y1 + dy)

        x += pos.x_advance + tracking

    # SVG y grows downward, the paths are drawn inside a scale(1,-1) group
    vb = [
        round(minx - PAD, 1),
        round(-maxy - PAD, 1),
        round(maxx - minx + PAD * 2, 1),
        round(maxy - miny + PAD * 2, 1),
    ]

    OUT.write_text(json.dumps({
        "_generated": "scripts/gen_greeting.py",
        "text": TEXT,
        "viewBox": " ".join(str(v) for v in vb),
        "groups": groups,
    }, indent=1, ensure_ascii=False), encoding="utf-8")

    print(f"upem     {upem}")
    print(f"groups   {[len(g) for g in groups]} paths")
    print(f"ink      {maxx - minx:.0f} x {maxy - miny:.0f} units")
    print(f"viewBox  {' '.join(str(v) for v in vb)}")
    print(f"wrote    {OUT.relative_to(ROOT)}")


if __name__ == "__main__":
    main()
