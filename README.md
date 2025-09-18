# Technitium-Allow

**Adds domains to Technitium DNS Allowed Zones when NXDOMAIN is encountered.**

Technitium-Allow is a Chrome extension that detects domains that fail to resolve (NXDOMAIN) and lets you quickly add them to your Technitium DNS Allowed Zones. It keeps a small history of NXDOMAINs and lets you add the current site manually.

---

## Features

- Detects NXDOMAIN errors while browsing
- Maintains a short history of recently failed domains
- Manually allow the current domain with one click
- Try multiple configured Technitium servers when adding a domain
- ***Dark mode***

---

## Screenshots

![Popup Light](assets/popup-light.png)![Popup Dark](assets/popup-dark.png)

![Options Light](assets/options-light.png)![Options Dark](assets/options-dark.png)

---

## Installation

1. Download the extension:
   - *Via `git`:* `git clone https://github.com/drewstopherlee/technitium-allow.git`
   - *Via GitHub Releases:* Go to the [Releases](https://github.com/drewstopherlee/technitium-allow/releases) page, download the latest `.zip` release and extract it.
2. Open Chrome and go to `chrome://extensions/`.
3. Enable *Developer mode*.
4. Click *Load unpacked* and select the repository folder.
5. Create Technitium API token:
   1. Log in to your Technitium DNS server, click the username in the top right, and select `Create API Token`.
   2. Complete the fields to create the API token and save it.
6. Visit the extension's Options page (via `chrome://extensions/` or using the link in the extension's popup) and enter the Technitium DNS server's URL and API token. URL must include the protocol and port, e.g. `http://192.168.1.134:5380`.

---

## Usage

1. Browse to a site. If a domain fails to resolve (NXDOMAIN), it will appear in the popup history.
2. Click *Allow* next to a history entry to add it to your Technitium Allowed Zones.
3. Use *Allow Current Domain* in the popup to add the active tab's domain.

### Options page

- Add one or more Technitium servers and their API keys.
- Each server will be tried when allowing a domain.
- Server credentials are synced via Chrome storage.

---

## Folder structure

```text
technitium-allow/
├─ src/
│  ├─ popup.html
│  ├─ popup.js
│  ├─ background.js
│  ├─ options.html
│  └─ options.js
├─ icons/
├─ assets/
├─ manifest.json
├─ README.md
└─ LICENSE
```

---

## Contributing & Development

1. Fork the repository and create a branch: `git checkout -b feature-name`.
2. Make changes and commit: `git commit -m "Add feature"`.
3. Push and open a pull request.

### Linting & formatting

Install dev dependencies (PowerShell):

```powershell
npm install
```

Run the linter:

```powershell
npm run lint
```

Auto-fix with ESLint:

```powershell
npm run fix
```

Format all files with Prettier:

```powershell
npm run format
```

---

## License

MIT — see the LICENSE file for details.
# Technitium-Allow

**Adds domains to Technitium DNS Allowed Zones when NXDOMAIN is encountered.**  

Technitium-Allow is a Chrome extension that detects domains that were blocked by Technitium and fail to resolve (NXDOMAIN) and allows you to quickly add them to your Technitium DNS Allowed Zones. It also maintains a history of NXDOMAINs and lets you manually add the current site.

---

## Features

- Automatically detects NXDOMAIN errors while browsing.
- Maintains a history of recently failed domains.
- Manually allow the current domain with a single click.
- Check/X indicators for success/failure of adding domains.
- Previously allowed domains are shown in green.
- Easy access to extension options from the popup.

---

## Screenshots

**Popup with NXDOMAIN history**  
![Popup Example (Light Mode)](assets/popup-light.png)![Popup Example (Dark Mode)](assets/popup-dark.png)

**Options page**  
![Options Example (Light Mode)](assets/options-light.png)![Options Example (Dark Mode)](assets/options-dark.png)

---

## Installation

### From Source (Developer Mode)

1. Clone the repository:
```bash
git clone https://github.com/<your-username>/technitium-allow.git
```
2. Open Chrome and navigate to chrome://extensions/.
3. Enable Developer mode (top-right toggle).
4. Click Load unpacked and select the repository folder (or src/ if you moved files there).
5. The extension should now appear in your toolbar.

### From GitHub Release (ZIP)

1. Go to the [Releases](https://github.com/drewstopherlee/technitium-allow/releases) page.
2. Download the latest .zip release.
3. Open Chrome chrome://extensions/.
4. Enable Developer mode.
5. Click Load unpacked and select the extracted .zip folder.

---

## Usage

1. Navigate to a website.
2. If the domain fails to resolve (NXDOMAIN), it will appear in the popup history.
3. Click Allow next to a domain to add it to Technitium DNS Allowed Zones.
4. To allow the current website, click Allow Current Domain in the popup.
5. Open Options from the top-right gear icon to configure your Technitium servers.

### Options Page

- Add one or more Technitium servers and their API keys.
- Each server will be tried when adding a domain.
# Technitium-Allow

**Adds domains to Technitium DNS Allowed Zones when NXDOMAIN is encountered.**

Technitium-Allow is a Chrome extension that detects domains that were blocked by Technitium and fail to resolve (NXDOMAIN) and allows you to quickly add them to your Technitium DNS Allowed Zones. It also maintains a history of NXDOMAINs and lets you manually add the current site.

---

## Features

- Automatically detects NXDOMAIN errors while browsing.
- Maintains a history of recently failed domains.
- Manually allow the current domain with a single click.
- Check/X indicators for success/failure of adding domains.
- Previously allowed domains are shown in green.
- Easy access to extension options from the popup.

---

## Screenshots

**Popup with NXDOMAIN history**

![Popup Example (Light Mode)](assets/popup-light.png)

![Popup Example (Dark Mode)](assets/popup-dark.png)

**Options page**

![Options Example (Light Mode)](assets/options-light.png)

![Options Example (Dark Mode)](assets/options-dark.png)

---

## Installation

### From Source (Developer Mode)

1. Clone the repository:

```bash
git clone https://github.com/<your-username>/technitium-allow.git
```

2. Open Chrome and navigate to `chrome://extensions/`.
3. Enable Developer mode (top-right toggle).
4. Click *Load unpacked* and select the repository folder (or `src/` if you moved files there).
5. The extension should now appear in your toolbar.

### From GitHub Release (ZIP)

1. Go to the [Releases](https://github.com/drewstopherlee/technitium-allow/releases) page.
2. Download the latest `.zip` release.
3. Open Chrome `chrome://extensions/`.
4. Enable Developer mode.
5. Click *Load unpacked* and select the extracted folder.

---

## Usage

1. Navigate to a website.
2. If the domain fails to resolve (NXDOMAIN), it will appear in the popup history.
3. Click *Allow* next to a domain to add it to Technitium DNS Allowed Zones.
4. To allow the current website, click *Allow Current Domain* in the popup.
5. Open *Options* from the top-right gear icon to configure your Technitium servers.

### Options Page

- Add one or more Technitium servers and their API keys.
- Each server will be tried when adding a domain.
- Stored servers are synced via Chrome storage.

---

## Folder Structure

```text
technitium-allow/
├─ src/                  # HTML/JS source files
│   ├─ popup.html
│   ├─ popup.js
│   ├─ background.js
│   ├─ options.html
│   └─ options.js
├─ icons/                # Extension icons
├─ assets/               # Screenshots for README
├─ manifest.json
├─ README.md
├─ LICENSE
└─ .gitignore
```

---

## Contributing & Development

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-name`).
3. Make your changes and commit (`git commit -m "Add new feature"`).
4. Push to your branch (`git push origin feature-name`).
5. Open a pull request.

### Linting & Formatting

Install dev dependencies (PowerShell):

```powershell
npm install
```

Run the linter:

```powershell
npm run lint
```

Auto-fix issues with ESLint:

```powershell
npm run fix
```

Format files with Prettier:

```powershell
npm run format
```

---

## License

This project is licensed under the MIT License. See the LICENSE file for details.
