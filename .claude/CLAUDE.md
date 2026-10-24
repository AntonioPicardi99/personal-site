# CLAUDE.md — Portfolio Antonio Picardi

## Panoramica progetto
Sito portfolio personale single-page in HTML/CSS/JS puro, build con Vite.
Hosting: Netlify (statico, `npm run build` → `dist/`).
Entry point: `index.html`
Stili: `src/css/style.css`
Script: `src/main.js` (entry, form AJAX, anno footer) + `src/js/animations.js` (fade-in, navbar, link attivi, collapse mobile) + `src/js/mockup.js` (mockup interattivo della hero; su mobile dopo "Conferma" scorre fino alle spunte) + `src/js/carousel.js` (indicatore del carosello progetti su mobile)
Form Netlify: `public/_forms.html` (copia statica per il rilevamento del form, i `name` dei campi devono restare allineati a `index.html`)

## Stack
- HTML5 semantico
- CSS custom + Bootstrap 5 (via npm, importato in `src/main.js`)
- Vanilla JS (ES modules)
- Font: ospitati nel sito in `src/fonts/` (woff2 latin da @fontsource, licenza OFL), `@font-face` in cima a `style.css`, preload in `index.html` di Plus Jakarta 800 e Inter 400 — `Plus Jakarta Sans` (800, solo titoli) + `Inter` (400/500/600). Niente Google Fonts
- Form: Netlify Forms (attributo `netlify` su `<form>`)

## Struttura sezioni (in ordine nel DOM)
1. `#mainNav` — navbar fixed-top (voci: Cosa sviluppo, Progetti, Chi sono, Tecnologie, Contatti; il nome porta a `#hero`)
2. `#hero` — titolo con cursore lampeggiante, sottotitolo, CTA; mockup gestionale interattivo "Agenda" (tabella "Prenotazioni di domani" con cliente, ora e stato + blocco `.mockup-auto` "Fatto in automatico": calendario, email di conferma, SMS di promemoria; dati fittizi), identico su tutti i breakpoint. Scenario scelto perché lo capisce chiunque (gli ordini di magazzino erano troppo specifici). Sull'ultima prenotazione il pulsante `#mockupConfirm` "Conferma": al clic `.hero-mockup.is-done` mostra il badge "Confermata" e `mockup.js` aggiunge `.is-checked` alle righe una alla volta (tutte insieme con `prefers-reduced-motion`); `#mockupReset` "Riprova" torna all'inizio. Esposizione: chi guarda non si aspetta che il mockup sia cliccabile, quindi (1) sopra la finestra c'è `.mockup-caption` (#mockupCaption, in nero con icona puntatore, collegato al pulsante con `aria-describedby`): "Prova: conferma la prenotazione di Laura Conti." che dopo il clic diventa "Un clic, tre operazioni fatte dal software." (`.is-done` aggiunta anche alla caption da `mockup.js`); (2) la riga in attesa `.mockup-pending` ha fondo `--accent-tint`, allungato oltre il testo con box-shadow; (3) un solo anello `mockup-ring` sul pulsante 1s dopo la comparsa (una volta, mai in loop); (4) accanto a "Fatto in automatico" `.mockup-section-meta` "Partono alla conferma" spiega i cerchi vuoti. Accessibile: `role="group"` con `aria-label`, focus spostato tra i due pulsanti, esito annunciato in `#mockupStatus` (`aria-live`). Senza JS (`@media (scripting: none)`) si vede direttamente la prenotazione confermata. Il pulsante ha margine negativo per occupare quanto il badge: la riga non deve cambiare altezza al clic. Linguaggio comprensibile a chi non conosce il settore: niente numeri d'ordine, corrieri o termini come "evadere"/"giacenze" (feedback utente: la gente non capiva il mockup). Altezza data dal padding, senza min-height: la sezione successiva si vede già nella prima schermata
3. `#projects` — "Cosa sviluppo": 4 tipi di software (siti web, CRM/gestionali, e-commerce, automazioni e strumenti — esempio: SMS automatici ai clienti per avvisi e promemoria; il progetto reale era per palestre ma l'utente non vuole citare il settore), nello stesso ordine dell'elenco nel sottotitolo della hero; su desktop elenco a righe in un unico pannello, su mobile card impilate con icona e titolo sulla stessa riga
4. `#work` — "Alcuni progetti": 3 casi studio anonimi (clienti e magazzino, e-commerce su misura e PrestaShop con moduli custom, gestione personale) in schede Prima / Cosa ho sviluppato / Risultato, rese come sequenza con pallini grigio → blu → verde. Su mobile la `.row.case-list` diventa un carosello orizzontale con scroll-snap (scheda successiva visibile al bordo, schede di altezza uguale, padding ridotto). Sotto c'è l'indicatore `#caseDots` (`.case-dot`, pulsanti da 24px con `aria-current`, gestiti da `carousel.js`); `#caseList` ha `role="region"`, `aria-label` e `tabindex="0"` per lo scroll da tastiera. Progetti sviluppati da dipendente: niente nomi di clienti, link o numeri inventati, formula "a cui ho lavorato, da solo o in team"
5. `#about` — "Chi sono": titolo a sinistra, testo + link social a destra (nessun riferimento al datore di lavoro)
6. `#skills` — "Tecnologie": gruppi Backend / Frontend / Strumenti; desktop righe con etichetta a sinistra (Backend a 3 colonne perché ha 6 voci, gli altri a 4), mobile capability card
7. `#contact` — "Parliamo": intro + email a sinistra, form Netlify a destra (su mobile email prima del form)
8. `footer.site-footer` — copyright + link social (su mobile allineati a sinistra, link alti 44px)

Le sezioni da `#hero` a `#contact` sono dentro `<main>`.

Sfondi alternati: hero bianco, `#projects` `.section-alt`, `#work` bianco, `#about` `.section-alt`, `#skills` bianco, `#contact` `.section-contact` (azzurro chiaro `--accent-tint`, form bianco).

## Classi CSS chiave da non rinominare
- `.navbar`, `#mainNav`, `#mainNav.scrolled` — navbar (`.scrolled` aggiunta da `animations.js` dopo 40px di scroll)
- `.hero-section`, `.hero-title`, `.hero-subtitle` — hero (il cursore è `.hero-title::after`)
- `.hero-mockup` e figli (`.mockup-table`, `.mockup-auto`, `.mockup-badge.green/.blue/.amber`, `.mockup-row`, `.mockup-check`, `.mockup-action`, `.mockup-confirmed`, `.mockup-reset`) e stati `.is-done` / `.is-checked` — mockup gestionale (ID `#heroMockup`, `#mockupConfirm`, `#mockupReset`, `#mockupStatus` usati in `mockup.js`)
- `.project-list` (sulla `.row`), `.project-card`, `.project-title`, `.project-desc`, `.project-tags`, `.project-tag` — servizi
- `.case-list` (sulla `.row`), `.case-card`, `.case-title`, `.case-fields`, `.case-result` — casi studio (i tag riusano `.project-tag`)
- `.about-card`, `.about-text`, `.about-meta`, `.about-social-link` — chi sono
- `.stack-group`, `.tech-card`, `.tech-card-name`, `.tech-card-note`, `.stack-category-label` — tecnologie desktop
- `.capability-card`, `.capability-pill` — tecnologie mobile
- `.section-contact`, `.contact-card`, `.contact-form`, `.custom-input`, `.contact-alt`, `.contact-success` — contatti
- `.site-footer`, `.footer-copy`, `.footer-link` — footer
- `.section-header`, `.section-header-split`, `.section-title`, `.section-subtitle`, `.section-padding`, `.section-alt` — layout sezioni
- `.fade-in` — classe per animazioni scroll (non rimuovere, gestita da `animations.js`; 22 elementi. In `.project-list` anima l'intero pannello: le righe interne hanno l'animazione neutralizzata, altrimenti il pannello appare spezzato durante lo scroll)
- `.btn-primary-custom` — bottone CTA principale

## Regole invarianti (NON modificare mai)
- I testi sono stati rivisti (ottobre 2026): non cambiarli senza una richiesta esplicita
- Tono di voce: concreto (cose fatte, non promesse), semplice (comprensibile a chi non è tecnico, tranne in Tecnologie), da portfolio (racconta, non vende). Ti presenti sempre come "sviluppatore full stack" (title, meta, og-image, hero). "Su misura" e "semplifica il lavoro delle persone" stanno nella hero e nei meta: non ripeterli in "Cosa sviluppo" e "Chi sono" (nel caso studio e-commerce "su misura" resta, descrive il progetto). Niente parole da listino ("professionali", "farsi trovare su Google")
- Tono da portfolio, non da freelance (Antonio è dipendente, senza partita IVA): niente "la tua azienda", "se hai un progetto", "clienti" riferiti a sé, offerte di servizi o "opportunità di lavoro"
- Il form deve mantenere: `name="contact"`, `method="POST"`, `netlify`, `data-netlify="true"`, `netlify-honeypot="bot-field"`, campo hidden `form-name`
- L'ID `#contactForm`, `#contactSubmit` e `#contactSuccess` devono restare invariati (usati in `main.js`: durante l'invio il pulsante è disattivato con "Invio in corso…", dopo il successo il focus va su `.contact-success-title`)
- L'ID `#footer-year` deve restare invariato (popolato da `main.js`)
- La classe `.fade-in` deve restare su tutti gli elementi che ce l'hanno
- I link href alle ancore (`#hero`, `#projects`, ecc.) non vanno cambiati
- I link esterni (LinkedIn, GitHub, mailto) non vanno cambiati

## Design attuale
Direzione: **clean & minimal**, chiaro. Il sito deve sembrare fatto da chi costruisce gestionali (tabelle, record, moduli), non un template da sviluppatore.

Token in `:root` di `style.css`:
- Colori: `--paper #ffffff`, `--surface #f6f7f9` (sezioni alternate), `--ink #111827`, `--ink-soft #4b5563` (testo secondario), `--ink-muted #6b7280` (solo su bianco/surface), `--rule #e5e7eb` (bordi), `--rule-strong #8c93a0` (bordi dei campi, contrasto 3:1), `--accent #2563eb`, `--accent-hover #1d4ed8`, `--accent-tint #eff4ff`, `--accent-line #dbe5fd` (tag e pillole: fondo azzurro, testo `--accent-hover`)
- Stati (solo nel mockup e nel messaggio di successo): `--ok` / `--ok-tint`, `--warn` / `--warn-tint`
- Raggi: `--radius-sm 6px`, `--radius-md 8px`, `--radius-lg 12px`
- Spaziature: `--section-py` (128 / 96 / 72px), `--header-gap`

Principi:
- `Plus Jakarta Sans` 800 per h1, h2 e nome in navbar (letter-spacing negativo); `Inter` per tutto il resto, h3 a 600. Il serif DM Serif Display è stato scartato dall'utente (poco "carico")
- Scala tipografica 16 / 20 / 25 / 32 / 44 / 64; testo lungo max ~62ch
- Contenuti allineati a sinistra su tutti i breakpoint
- Un solo elemento in risalto: il mockup della hero (unica ombra del sito, a parte quella del menu mobile aperto che lo stacca dalla pagina), visibile anche su mobile. Il resto con bordi 1px, niente ombre
- Il colore deve arrivare anche su mobile (feedback utente: il bianco/grigio puro sembrava "un giornale in bianco e nero"): tag azzurri, stati colorati nel mockup e nei casi studio, contatti su azzurro chiaro. Niente fondi blu saturi: il blu notte sui contatti è stato giudicato "troppo aggressivo"
- Nessun gradiente, glassmorphism, dark mode, etichette in maiuscolo sopra i titoli, singola parola evidenziata nel titolo
- Animazioni: solo fade-in allo scroll + cursore lampeggiante + un anello singolo sul pulsante del mockup + spunte del mockup dopo il clic; tutte disattivate con `prefers-reduced-motion`. Il mockup è l'unico elemento interattivo "dimostrativo" (scelto dall'utente a ottobre 2026)
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
- Nessuno spazio bianco prima di `</h1>` nella hero, altrimenti il cursore si stacca dal punto finale. Il punto è in `<span class="hero-dot">` con margine negativo perché in Plus Jakarta Sans ha molto spazio a sinistra

## SEO e anteprima social
- Dominio: `https://antonio-picardi.netlify.app/` (usato in `og:url`, `og:image` e `link rel="canonical"`)
- Immagine anteprima: `public/og-image.png` (1200×630, stesso stile e font del sito). Se cambiano titolo della hero o font va rigenerata
