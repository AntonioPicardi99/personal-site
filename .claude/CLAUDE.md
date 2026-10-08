# CLAUDE.md — Portfolio Antonio Picardi

## Panoramica progetto
Sito portfolio personale single-page in HTML/CSS/JS puro, build con Vite.
Hosting: Netlify (statico, `npm run build` → `dist/`).
Entry point: `index.html`
Stili: `src/css/style.css`
Script: `src/main.js` (entry, form AJAX, anno footer) + `src/js/animations.js` (fade-in, navbar, link attivi, collapse mobile)
Form Netlify: `public/_forms.html` (copia statica per il rilevamento del form, i `name` dei campi devono restare allineati a `index.html`)

## Stack
- HTML5 semantico
- CSS custom + Bootstrap 5 (via npm, importato in `src/main.js`)
- Vanilla JS (ES modules)
- Font: Google Fonts — `DM Serif Display` (solo peso 400) + `Inter` (400/500/600)
- Form: Netlify Forms (attributo `netlify` su `<form>`)

## Struttura sezioni (in ordine nel DOM)
1. `#mainNav` — navbar fixed-top (voci: Servizi, Progetti, Chi sono, Tecnologie, Contatti; il nome porta a `#hero`)
2. `#hero` — titolo con cursore lampeggiante, sottotitolo, CTA; mockup gestionale (tabella ordini con corriere e stato + magazzino, dati fittizi, `aria-hidden`) solo su desktop (`d-none d-lg-block`). Altezza data dal padding, senza min-height: la sezione successiva si vede già nella prima schermata
3. `#projects` — "Cosa sviluppo": 3 servizi (siti web, CRM/gestionali, e-commerce); su desktop elenco a righe in un unico pannello, su mobile card impilate
4. `#work` — "Alcuni progetti": 3 casi studio anonimi (clienti e magazzino, e-commerce su misura e PrestaShop con moduli custom, gestione personale) in schede Prima / Cosa ho costruito / Risultato. Progetti sviluppati da dipendente: niente nomi di clienti, link o numeri inventati, formula "a cui ho lavorato"
5. `#about` — "Chi sono": titolo a sinistra, testo + link social a destra (nessun riferimento al datore di lavoro)
6. `#skills` — "Tecnologie": gruppi Backend / Frontend / Strumenti; desktop righe con etichetta a sinistra, mobile capability card
7. `#contact` — "Parliamo": intro + email a sinistra, form Netlify a destra (su mobile email prima del form)
8. `footer.site-footer` — copyright + link social

Sfondi alternati: hero bianco, `#projects` `.section-alt`, `#work` bianco, `#about` `.section-alt`, `#skills` bianco, `#contact` `.section-alt`.

## Classi CSS chiave da non rinominare
- `.navbar`, `#mainNav`, `#mainNav.scrolled` — navbar (`.scrolled` aggiunta da `animations.js` dopo 40px di scroll)
- `.hero-section`, `.hero-title`, `.hero-subtitle` — hero (il cursore è `.hero-title::after`)
- `.hero-mockup` e figli (`.mockup-table`, `.mockup-badge.green/.blue/.amber`, `.mockup-row`) — mockup gestionale desktop
- `.project-list` (sulla `.row`), `.project-card`, `.project-title`, `.project-desc`, `.project-tags`, `.project-tag` — servizi
- `.case-card`, `.case-title`, `.case-fields`, `.case-result` — casi studio (i tag riusano `.project-tag`)
- `.about-card`, `.about-text`, `.about-meta`, `.about-social-link` — chi sono
- `.stack-group`, `.tech-card`, `.tech-card-name`, `.tech-card-note`, `.stack-category-label` — tecnologie desktop
- `.capability-card`, `.capability-pill` — tecnologie mobile
- `.contact-card`, `.contact-form`, `.custom-input`, `.contact-alt`, `.contact-success` — contatti
- `.site-footer`, `.footer-copy`, `.footer-link` — footer
- `.section-header`, `.section-header-split`, `.section-title`, `.section-subtitle`, `.section-padding`, `.section-alt` — layout sezioni
- `.fade-in` — classe per animazioni scroll (non rimuovere, gestita da `animations.js`; 20 elementi)
- `.btn-primary-custom` — bottone CTA principale

## Regole invarianti (NON modificare mai)
- I testi sono stati rivisti (ottobre 2026): non cambiarli senza una richiesta esplicita
- Il form deve mantenere: `name="contact"`, `method="POST"`, `netlify`, `data-netlify="true"`, `netlify-honeypot="bot-field"`, campo hidden `form-name`
- L'ID `#contactForm` e `#contactSuccess` devono restare invariati (usati in `main.js`)
- L'ID `#footer-year` deve restare invariato (popolato da `main.js`)
- La classe `.fade-in` deve restare su tutti gli elementi che ce l'hanno
- I link href alle ancore (`#hero`, `#projects`, ecc.) non vanno cambiati
- I link esterni (LinkedIn, GitHub, mailto) non vanno cambiati

## Design attuale
Direzione: **clean & minimal**, chiaro. Il sito deve sembrare fatto da chi costruisce gestionali (tabelle, record, moduli), non un template da sviluppatore.

Token in `:root` di `style.css`:
- Colori: `--paper #ffffff`, `--surface #f6f7f9` (sezioni alternate), `--ink #111827`, `--ink-soft #4b5563` (testo secondario), `--ink-muted #6b7280` (solo su bianco/surface), `--rule #e5e7eb` (bordi), `--rule-strong #8c93a0` (bordi dei campi, contrasto 3:1), `--accent #2563eb`, `--accent-hover #1d4ed8`, `--accent-tint #eff4ff`
- Stati (solo nel mockup e nel messaggio di successo): `--ok` / `--ok-tint`, `--warn` / `--warn-tint`
- Raggi: `--radius-sm 6px`, `--radius-md 8px`, `--radius-lg 12px`
- Spaziature: `--section-py` (128 / 96 / 72px), `--header-gap`

Principi:
- `DM Serif Display` per h1, h2 e nome in navbar (peso 400, gerarchia con la dimensione, mai bold); `Inter` per tutto il resto, h3 a 600
- Scala tipografica 16 / 20 / 25 / 32 / 44 / 64; testo lungo max ~62ch
- Contenuti allineati a sinistra su tutti i breakpoint
- Un solo elemento in risalto: il mockup della hero (unica ombra del sito). Il resto con bordi 1px, niente ombre
- Nessun gradiente, glassmorphism, dark mode, etichette in maiuscolo sopra i titoli, singola parola evidenziata nel titolo
- Animazioni: solo fade-in allo scroll + cursore lampeggiante; entrambe disattivate con `prefers-reduced-motion`
- Nessun effetto hover "sollevamento" su elementi non cliccabili
- Focus da tastiera sempre visibile (outline 2px accent)
- Contrasto testo AA (≥ 4.5:1)
- Responsive: mantenere la logica `d-lg-none` / `d-none d-lg-block`

## Note tecniche
- Non usare `!important`; lo sfondo della navbar si gestisce con la classe `.scrolled`, non con stili inline dal JS
- Preferire le CSS custom properties per colori e spacing
- Lavorare su `src/css/style.css` senza toccare Bootstrap
- Non rimuovere le classi Bootstrap strutturali (`.container`, `.row`, `.col-*`, `.d-none`, `.d-lg-block`, ecc.)
- Le utility Bootstrap (`mt-*`, `mb-*`, `text-center`) usano `!important`: per controllare margini o allineamento da CSS, toglierle dall'HTML
- Gutter `g-5` / `gx-5` su mobile sfora il container (scroll orizzontale): usare `gx-4` sotto `lg`
- Nessuno spazio bianco prima di `</h1>` nella hero, altrimenti il cursore si stacca dal punto finale

## SEO e anteprima social
- Dominio: `https://antonio-picardi.netlify.app/` (usato in `og:url`, `og:image` e `link rel="canonical"`)
- Immagine anteprima: `public/og-image.png` (1200×630, stesso stile del sito). Se cambia il titolo della hero va rigenerata
