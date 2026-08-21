import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './App.css';
import { EMAIL } from './utils';
import Footer from './Footer';
import LegalBack from './LegalBack';

/*
  Claims here were checked against the site as built, not assumed:
  every request goes to this origin only, there are no cookies, and neither
  local nor session storage is written. Re-check with the audit in the session
  notes if anything is added that loads or stores something.
*/
const TEXT = {
  en: {
    title: 'Privacy',
    back: 'Back',
    controller: 'Information pursuant to Art. 13 GDPR',
    controllerText: 'Controller for the processing described below. Contact details are given in the',
    impressum: 'Impressum',
    collected: 'What is collected',
    collectedText:
      'This site sets no cookies, runs no analytics and contains no tracking. It writes nothing '
      + 'to your browser’s local or session storage. There are no forms.',
    collectedText2:
      'Requesting a page causes your browser to contact the server that hosts it, which receives '
      + 'your IP address, the page requested, the time, and the browser identification your device '
      + 'sends, as happens with any website. Typefaces and images are served from this site itself, '
      + 'so no third party is contacted while a page loads.',
    purpose: 'Purpose and legal basis',
    purposeText:
      'That data is used to deliver the pages and to keep the service running and secure. '
      + 'Legal basis: Art. 6 (1) (f) GDPR, the legitimate interest in operating a website.',
    purposeText2:
      'If you write to the address shown in the Impressum, your message and address are used to '
      + 'read and answer it, on the basis of Art. 6 (1) (b) and (f) GDPR. Mail stays in my mailbox '
      + 'until I delete it; on request I will delete it.',
    recipients: 'Recipients',
    recipientsText:
      'GitHub serves these pages through GitHub Pages and logs requests for them as any web server '
      + 'does. Those logs are held by GitHub and are not available to me. GitHub, Inc. is a United '
      + 'States company; the transfer is covered by its data protection terms, which include the '
      + 'EU standard contractual clauses.',
    recipientsText2:
      'No other recipient is involved in serving these pages. Links to GitHub, LinkedIn and '
      + 'project pages are only followed if you click them, and those sites apply their own terms.',
    cookies: 'Cookies',
    cookiesText:
      'None are set. Nothing is stored on your device, so there is nothing to clear and no consent '
      + 'banner to dismiss.',
    rights: 'Your rights',
    rightsText:
      'You may request access, correction, erasure, restriction of use, a portable copy, and you '
      + 'may object to the use of your data. Since the only data I hold is what you have sent me by '
      + 'email, deletion is straightforward and will be carried out promptly.',
    rightsText2:
      'You also have the right to lodge a complaint with a data protection supervisory authority.',
    decisions: 'Automated decisions',
    decisionsText: 'There is no automated decision making and no profiling.',
  },
  de: {
    title: 'Datenschutz',
    back: 'Zurück',
    controller: 'Informationen gemäß Art. 13 DSGVO',
    controllerText:
      'Verantwortlicher für die nachfolgend beschriebene Verarbeitung. Die Kontaktdaten stehen im',
    impressum: 'Impressum',
    collected: 'Welche Daten anfallen',
    collectedText:
      'Diese Seite setzt keine Cookies, verwendet keine Analysedienste und enthält kein Tracking. '
      + 'Es wird nichts im lokalen Speicher oder im Sitzungsspeicher Ihres Browsers abgelegt. '
      + 'Es gibt keine Formulare.',
    collectedText2:
      'Beim Aufruf einer Seite kontaktiert Ihr Browser den Server, der sie ausliefert. Dabei fallen '
      + 'Ihre IP-Adresse, die aufgerufene Seite, der Zeitpunkt und die Browserkennung an, wie bei '
      + 'jeder Website. Schriften und Bilder werden von dieser Seite selbst ausgeliefert, es wird '
      + 'also beim Laden kein Dritter kontaktiert.',
    purpose: 'Zweck und Rechtsgrundlage',
    purposeText:
      'Diese Daten dienen der Auslieferung der Seiten sowie dem sicheren Betrieb. Rechtsgrundlage '
      + 'ist Art. 6 Abs. 1 lit. f DSGVO, das berechtigte Interesse am Betrieb einer Website.',
    purposeText2:
      'Wenn Sie an die im Impressum genannte Adresse schreiben, werden Ihre Nachricht und Ihre '
      + 'Adresse zur Bearbeitung und Beantwortung verwendet, auf Grundlage von Art. 6 Abs. 1 lit. b '
      + 'und f DSGVO. E-Mails verbleiben in meinem Postfach, bis ich sie lösche; auf Wunsch lösche '
      + 'ich sie.',
    recipients: 'Empfänger',
    recipientsText:
      'GitHub liefert diese Seiten über GitHub Pages aus und protokolliert die Aufrufe, wie es jeder '
      + 'Webserver tut. Diese Protokolle liegen bei GitHub und sind für mich nicht einsehbar. Die '
      + 'GitHub, Inc. ist ein US-amerikanisches Unternehmen; die Übermittlung ist durch deren '
      + 'Datenschutzbestimmungen einschließlich der EU-Standardvertragsklauseln abgedeckt.',
    recipientsText2:
      'Weitere Empfänger sind an der Auslieferung nicht beteiligt. Links zu GitHub, LinkedIn und '
      + 'Projektseiten werden nur aufgerufen, wenn Sie sie anklicken; dort gelten die jeweils '
      + 'eigenen Bestimmungen.',
    cookies: 'Cookies',
    cookiesText:
      'Es werden keine gesetzt. Auf Ihrem Gerät wird nichts gespeichert, es gibt daher nichts zu '
      + 'löschen und kein Einwilligungsbanner.',
    rights: 'Ihre Rechte',
    rightsText:
      'Sie können Auskunft, Berichtigung, Löschung, Einschränkung der Verarbeitung und eine '
      + 'übertragbare Kopie verlangen sowie der Verarbeitung widersprechen. Da ich ausschließlich '
      + 'das speichere, was Sie mir per E-Mail geschickt haben, ist eine Löschung unkompliziert und '
      + 'erfolgt zeitnah.',
    rightsText2:
      'Ihnen steht außerdem ein Beschwerderecht bei einer Datenschutzaufsichtsbehörde zu.',
    decisions: 'Automatisierte Entscheidungen',
    decisionsText: 'Es findet keine automatisierte Entscheidungsfindung und kein Profiling statt.',
  },
};

function Privacy({ lang = 'en' }) {
  const t = TEXT[lang] || TEXT.en;

  useEffect(() => {
    document.title = `${t.title} | Abhinav Utkarsh`;
    document.documentElement.lang = lang;
  }, [lang, t.title]);

  return (
    <div className="App">
      <LegalBack lang={lang} label={t.back} />

      <section className="legal" lang={lang}>
        <h1 className="legal-title">{t.title}</h1>

        <h2 className="legal-heading">{t.controller}</h2>
        <p>
          Abhinav Utkarsh
          <br />
          {t.controllerText}{' '}
          <Link className="legal-link" to={lang === 'de' ? '/de/impressum' : '/impressum'}>
            {t.impressum}
          </Link>
          .
        </p>

        <h2 className="legal-heading">{t.collected}</h2>
        <p>{t.collectedText}</p>
        <p>{t.collectedText2}</p>

        <h2 className="legal-heading">{t.purpose}</h2>
        <p>{t.purposeText}</p>
        <p>{t.purposeText2}</p>

        <h2 className="legal-heading">{t.recipients}</h2>
        <p>{t.recipientsText}</p>
        <p>{t.recipientsText2}</p>

        <h2 className="legal-heading">{t.cookies}</h2>
        <p>{t.cookiesText}</p>

        <h2 className="legal-heading">{t.rights}</h2>
        <p>{t.rightsText}</p>
        <p>{t.rightsText2}</p>

        <h2 className="legal-heading">{t.decisions}</h2>
        <p>{t.decisionsText}</p>

        <p className="legal-contact">
          <a className="legal-link" href={`mailto:${EMAIL}`}>{EMAIL}</a>
        </p>
      </section>

      <Footer lang={lang} />
    </div>
  );
}

export default Privacy;
