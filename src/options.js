function renderServers(servers = []) {
    const list = document.getElementById("serverList");
    list.innerHTML = "";

    servers.forEach((server, idx) => {
        const wrapper = document.createElement("div");
        wrapper.className = "server";

        // URL input
        const urlLabel = document.createElement("label");
        urlLabel.textContent = "Server URL:";
        const urlInput = document.createElement("input");
        urlInput.type = "text";
        urlInput.value = server.url || "";
        urlInput.placeholder = "http://example.com:5380";

        // Key input
        const keyLabel = document.createElement("label");
        keyLabel.textContent = "API Key:";
        const keyInput = document.createElement("input");
        keyInput.type = "text";
        keyInput.value = server.key || "";
        keyInput.placeholder = "API key";

        // Buttons
        const buttons = document.createElement("div");
        buttons.className = "buttons";

        const saveBtn = document.createElement("button");
        saveBtn.textContent = "💾 Save";
        saveBtn.addEventListener("click", () => {
            servers[idx] = { url: urlInput.value.trim(), key: keyInput.value.trim() };
            chrome.storage.sync.set({ servers }, () => {
                showStatus("Saved!");
            });
        });

        const removeBtn = document.createElement("button");
        removeBtn.textContent = "🗑 Remove";
        removeBtn.className = "secondary";
        removeBtn.addEventListener("click", () => {
            servers.splice(idx, 1);
            chrome.storage.sync.set({ servers }, () => {
                renderServers(servers);
                showStatus("Removed.");
            });
        });

        buttons.appendChild(saveBtn);
        buttons.appendChild(removeBtn);

        wrapper.appendChild(urlLabel);
        wrapper.appendChild(urlInput);
        wrapper.appendChild(keyLabel);
        wrapper.appendChild(keyInput);
        wrapper.appendChild(buttons);

        list.appendChild(wrapper);
    });
}

function showStatus(msg) {
    const status = document.getElementById("status");
    status.textContent = msg;
    setTimeout(() => status.textContent = "", 2000);
}

document.addEventListener("DOMContentLoaded", () => {
    chrome.storage.sync.get({ servers: [] }, (data) => {
        renderServers(data.servers);
    });

    document.getElementById("addServer").addEventListener("click", () => {
        chrome.storage.sync.get({ servers: [] }, (data) => {
            const servers = data.servers;
            servers.push({ url: "", key: "" });
            chrome.storage.sync.set({ servers }, () => {
                renderServers(servers);
            });
        });
    });
});
