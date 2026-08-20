import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css';
import './ProjectList.css';
import { EMAIL, useDebounced } from './utils';
import Footer from './Footer';

// Fill these in and the page picks them up. Empty renders as a blank line.
const DETAILS = {
  name: 'Abhinav Utkarsh',
  street: '',
  city: '',
  country: 'Deutschland',
  phone: '',
  email: EMAIL,
};

const BLANK = '-';

const TEXT = {
  de: {
    title: 'Impressum',
    provider: 'Angaben gemäß § 5 DDG',
    contact: 'Kontakt',
    phone: 'Telefon',
    email: 'E-Mail',
    responsible: 'Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV',
    liability: 'Haftung für Inhalte',
    liabilityText:
      'Als Diensteanbieter bin ich für eigene Inhalte auf diesen Seiten nach den allgemeinen '
      + 'Gesetzen verantwortlich. Ich bin jedoch nicht verpflichtet, übermittelte oder gespeicherte '
      + 'fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine '
      + 'rechtswidrige Tätigkeit hinweisen.',
    links: 'Haftung für Links',
    linksText:
      'Dieses Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte ich keinen '
      + 'Einfluss habe. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder '
      + 'Betreiber der Seiten verantwortlich. Bei Bekanntwerden von Rechtsverletzungen werden '
      + 'derartige Links umgehend entfernt.',
    copyright: 'Urheberrecht',
    copyrightText:
      'Die durch den Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen '
      + 'dem deutschen Urheberrecht. Beiträge Dritter sind als solche gekennzeichnet.',
    back: '↩ Zurück',
  },
  en: {
    title: 'Impressum',
    provider: 'Information pursuant to § 5 DDG',
    contact: 'Contact',
    phone: 'Phone',
    email: 'Email',
    responsible: 'Responsible for content pursuant to § 18 (2) MStV',
    liability: 'Liability for content',
    liabilityText:
      'As a service provider I am responsible for my own content on these pages under general law. '
      + 'I am not obliged to monitor transmitted or stored third-party information, or to investigate '
      + 'circumstances that indicate unlawful activity.',
    links: 'Liability for links',
    linksText:
      'This site contains links to external websites over whose content I have no influence. '
      + 'Responsibility for the content of linked pages always lies with their respective provider or '
      + 'operator. Such links will be removed promptly if any legal violation becomes known.',
    copyright: 'Copyright',
    copyrightText:
      'Content and works created by the site operator on these pages are subject to German '
      + 'copyright law. Contributions by third parties are marked as such.',
    back: '↩ Back',
  },
};

function Blank() {
  return <span className="legal-pending">{BLANK}</span>;
}

function Address() {
  return (
    <>
      {DETAILS.name}
      <br />
      {DETAILS.street || <Blank />}
      <br />
      {DETAILS.city || <Blank />}
      <br />
      {DETAILS.country}
    </>
  );
}

function Impressum({ lang = 'en' }) {
  const t = TEXT[lang] || TEXT.en;
  const navigate = useNavigate();

  useEffect(() => {
    document.title = 'Impressum | Abhinav Utkarsh';
    document.documentElement.lang = lang;
  }, [lang]);

  const goBack = useDebounced(() => {
    navigate(lang === 'de' ? '/de' : '/');
    window.scrollTo(0, 0);
  });

  return (
    <div className="App">
      <button onClick={goBack} className="back-button">{t.back}</button>

      <section className="legal">
        <h1 className="legal-title">{t.title}</h1>

        <h2 className="legal-heading">{t.provider}</h2>
        <p><Address /></p>

        <h2 className="legal-heading">{t.contact}</h2>
        <p>
          {t.phone}: {DETAILS.phone || <Blank />}
          <br />
          {t.email}: <a className="legal-link" href={`mailto:${DETAILS.email}`}>{DETAILS.email}</a>
        </p>

        <h2 className="legal-heading">{t.responsible}</h2>
        <p><Address /></p>

        <h2 className="legal-heading">{t.liability}</h2>
        <p>{t.liabilityText}</p>

        <h2 className="legal-heading">{t.links}</h2>
        <p>{t.linksText}</p>

        <h2 className="legal-heading">{t.copyright}</h2>
        <p>{t.copyrightText}</p>
      </section>

      <Footer lang={lang} />
    </div>
  );
}

export default Impressum;
