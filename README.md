# GeoMaster EN – publicare pe GitHub Pages

Acesta este pachetul aplicației GeoMaster EN. Aplicația este gândită pentru telefon, tabletă și PC și poate fi instalată pe ecranul principal după publicare.

## Fișiere obligatorii

Încarcă toate aceste fișiere în același folder, direct în rădăcina repository-ului:

- `index.html`
- `manifest.webmanifest`
- `service-worker.js`
- `icon.svg`

Nu le pune într-un subfolder.

## 1. Creează un repository GitHub

1. Intră pe https://github.com și autentifică-te.
2. Apasă pe semnul `+` din dreapta sus.
3. Alege **New repository**.
4. La **Repository name**, scrie: `geomaster-en`.
5. Alege **Public**.
6. Bifează **Add a README file**.
7. Apasă **Create repository**.

## 2. Încarcă aplicația

1. Deschide repository-ul `geomaster-en`.
2. Apasă **Add file**.
3. Alege **Upload files**.
4. Încarcă simultan: `index.html`, `manifest.webmanifest`, `service-worker.js` și `icon.svg`.
5. Derulează jos și apasă **Commit changes**.

După încărcare trebuie să vezi fișierele în repository.

## 3. Activează GitHub Pages

1. În repository, apasă **Settings**.
2. În meniul din stânga, apasă **Pages**.
3. La **Build and deployment**, la **Source**, alege **Deploy from a branch**.
4. La **Branch**, alege `main`.
5. La folder, alege `/(root)`.
6. Apasă **Save**.
7. Așteaptă 1-3 minute, apoi reîncarcă pagina Settings > Pages.

GitHub va afișa adresa site-ului. Ea arată astfel:

`https://USERNAME-UL-TAU.github.io/geomaster-en/`

Exemplu: pentru username-ul `ana-pop`, linkul este:

`https://ana-pop.github.io/geomaster-en/`

## 4. Instalează pe telefon

### Android (Chrome)

1. Deschide linkul GitHub Pages în Chrome.
2. Apasă meniul cu trei puncte `⋮`.
3. Alege **Install app** sau **Adaugă pe ecranul principal**.
4. Confirmă.

### iPhone/iPad (Safari)

1. Deschide linkul în Safari.
2. Apasă **Share**.
3. Alege **Add to Home Screen**.
4. Apasă **Add**.

## Important despre progres

Progresul se salvează local, în browserul și pe dispozitivul folosit. Nu se sincronizează automat între telefon și PC. Pentru sincronizare ar fi necesar un backend și conturi de utilizator.

## Actualizare aplicație

Când ai o versiune nouă de `index.html`:

1. Intră în repository.
2. Deschide fișierul vechi `index.html`.
3. Șterge-l sau înlocuiește-l cu versiunea nouă.
4. Apasă **Commit changes**.
5. Așteaptă câteva minute; GitHub Pages actualizează site-ul.

Dacă telefonul afișează încă varianta veche, închide aplicația complet și reîncarcă pagina din browser o dată. Service worker-ul poate păstra temporar versiunea anterioară pentru utilizare offline.
