const MAX_HISTORY = 10;

chrome.webRequest.onErrorOccurred.addListener(
    (details) => {
        if (details.error === "net::ERR_NAME_NOT_RESOLVED") {
            try {
                const url = new URL(details.url);
                const domain = url.hostname;

                chrome.storage.local.get({ nxdomainHistory: [] }, (data) => {
                    let history = data.nxdomainHistory;
                    // avoid dupes at front
                    history = history.filter(d => d !== domain);
                    history.unshift(domain);
                    if (history.length > MAX_HISTORY) history.pop();

                    chrome.storage.local.set({ nxdomainHistory: history });
                });
            } catch (e) {
                console.error("Invalid URL:", details.url, e);
            }
        }
    },
    { urls: ["<all_urls>"] }
);

chrome.notifications.onButtonClicked.addListener((notifId, buttonIndex) => {
    if (buttonIndex === 0) {
        chrome.storage.local.get(`notif_${notifId}`, (data) => {
            const domain = data[`notif_${notifId}`];
            if (domain) {
                chrome.storage.sync.get({ servers: [] }, (config) => {
                    config.servers.forEach(server => {
                        const endpoint = `${server.url}/api/allowed/add?token=${encodeURIComponent(server.key)}&domain=${encodeURIComponent(domain)}`;
                        fetch(endpoint, { method: "POST", headers: { "Content-Type": "application/x-www-form-urlencoded" } })
                            .then(res => res.text())
                            .then(resp => {
                                chrome.notifications.create({
                                    type: "basic",
                                    iconUrl: "icons/icon128.png",
                                    title: "Technitium DNS",
                                    message: `✅ Zone "${domain}" added on ${server.url}`
                                });
                            })
                            .catch(err => {
                                chrome.notifications.create({
                                    type: "basic",
                                    iconUrl: "icons/icon128.png",
                                    title: "Technitium DNS Error",
                                    message: `⚠️ Error on ${server.url}: ${err}`
                                });
                            });
                    });
                });
            }
        });
    }
});
