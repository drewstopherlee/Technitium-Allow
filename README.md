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
