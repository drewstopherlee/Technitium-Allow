// ----------------------
// Helper Functions
// ----------------------

// Open extension options page
function openOptions() {
    if (chrome.runtime.openOptionsPage) {
        chrome.runtime.openOptionsPage();
    } else {
        window.open(chrome.runtime.getURL("options.html"));
    }
}

// Append status messages for current domain
function appendStatus(msg, ok = true, linkToOptions = false) {
    const statusEl = document.getElementById("status");
    if (!statusEl) return;

    const div = document.createElement("div");
    div.style.color = ok ? "#059669" : "#dc2626";

    if (linkToOptions) {
        const link = document.createElement("a");
        link.textContent = msg;
        link.style.color = "#dc2626";
        link.style.textDecoration = "underline";
        link.href = "#";
        link.addEventListener("click", (e) => {
            e.preventDefault();
            openOptions();
        });
        div.appendChild(link);
    } else {
        div.textContent = msg;
    }

    statusEl.appendChild(div);
    statusEl.scrollTop = statusEl.scrollHeight;
}

// Show check/X next to NXDOMAIN entry
function showHistoryStatus(historyItemEl, success) {
    if (!historyItemEl) return;

    let icon = historyItemEl.querySelector(".status-icon");
    if (!icon) {
        icon = document.createElement("span");
        icon.className = "status-icon";
        historyItemEl.prepend(icon);
    }

    // Use HTML entities to avoid garbled Unicode
    icon.innerHTML = success ? "&#10003;" : "&#10007;";
    icon.className = `status-icon ${success ? 'status-success' : 'status-error'}`;
}

// Add domain to all configured servers
function addDomain(domain, historyItemEl = null) {
    chrome.storage.sync.get({ servers: [] }, (data) => {
        if (!data.servers.length) {
            if (historyItemEl) showHistoryStatus(historyItemEl, false);
            else appendStatus("No servers configured! Please set them in options.", false, true);
            return;
        }

        data.servers.forEach(server => {
            const endpoint = `${server.url}/api/allowed/add?token=${encodeURIComponent(server.key)}&domain=${encodeURIComponent(domain)}`;
            fetch(endpoint, { method: "POST" })
                .then(async res => {
                    if (res.ok) {
                        // Save to allowedDomains
                        chrome.storage.local.get({ allowedDomains: [] }, (s) => {
                            const allowed = new Set(s.allowedDomains);
                            allowed.add(domain);
                            chrome.storage.local.set({ allowedDomains: Array.from(allowed) });
                        });

                        if (historyItemEl) showHistoryStatus(historyItemEl, true);
                        else appendStatus(`Zone "${domain}" added on ${server.url}`, true);
                    } else {
                        if (historyItemEl) showHistoryStatus(historyItemEl, false);
                        else appendStatus(`Failed on ${server.url}`, false);
                    }
                })
                .catch(err => {
                    if (historyItemEl) showHistoryStatus(historyItemEl, false);
                    else appendStatus(`Error contacting ${server.url}: ${err}`, false);
                });
        });
    });
}

// ----------------------
// Main Initialization
// ----------------------
document.addEventListener("DOMContentLoaded", async () => {
    // Get references to DOM elements
    const currentDomainEl = document.getElementById("currentDomain");
    const allowCurrentBtn = document.getElementById("allowCurrent");
    const historyListEl = document.getElementById("historyList");
    const statusEl = document.getElementById("status");
    const optionsLink = document.getElementById("optionsLink");

    if (!currentDomainEl || !allowCurrentBtn || !historyListEl || !statusEl) return;

    // Top-right options link
    if (optionsLink) {
        optionsLink.addEventListener("click", (e) => {
            e.preventDefault();
            openOptions();
        });
    }

    // Get current tab's domain
    let currentDomain = "";
    try {
        let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
        currentDomain = new URL(tab.url).hostname;
    } catch (e) {
        currentDomainEl.textContent = "Invalid URL";
    }
    currentDomainEl.textContent = currentDomain;

    // Allow Current Domain button
    allowCurrentBtn.addEventListener("click", () => {
        if (currentDomain) addDomain(currentDomain);
    });

    // Load NXDOMAIN history and allowed domains
    chrome.storage.local.get({ nxdomainHistory: [], allowedDomains: [] }, (data) => {
        const { nxdomainHistory, allowedDomains } = data;
        historyListEl.innerHTML = "";

        if (!nxdomainHistory.length) {
            const li = document.createElement("li");
            li.innerHTML = "<em>No NXDOMAINs yet</em>";
            historyListEl.appendChild(li);
            return;
        }

        nxdomainHistory.forEach(domain => {
            const li = document.createElement("li");

            // Status icon for allowed domains
            if (allowedDomains.includes(domain)) {
                const icon = document.createElement("span");
                icon.className = "status-icon status-success";
                icon.innerHTML = "&#10003;";
                li.appendChild(icon);
            }

            // Domain label
            const label = document.createElement("span");
            label.className = "domain-label";
            label.textContent = domain;
            li.appendChild(label);

            // Allow button (right-aligned)
            const btn = document.createElement("button");
            btn.textContent = "Allow";
            btn.addEventListener("click", () => addDomain(domain, li));
            li.appendChild(btn);

            historyListEl.appendChild(li);
        });
    });
});
