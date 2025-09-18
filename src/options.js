let unsaved = false;

function markUnsaved() {
    unsaved = true;
    saveBtn.classList.add("unsaved");
}

function markSaved() {
    unsaved = false;
    saveBtn.classList.remove("unsaved");
}

function showStatus(msg) {
    const status = document.getElementById("status");
    status.textContent = msg;
    setTimeout(() => (status.textContent = ""), 2000);
}

const list = document.getElementById("serverList");

// --- Create Save All button once ---
let saveBtn = document.getElementById("saveAllBtn");
if (!saveBtn) {
    saveBtn = document.createElement("button");
    saveBtn.id = "saveAllBtn";
    saveBtn.textContent = "💾 Save All";
    saveBtn.style.marginBottom = "1rem";
    list.parentNode.insertBefore(saveBtn, document.getElementById("addServer"));

    saveBtn.addEventListener("click", () => {
        const allServers = [];
        const serverDivs = list.getElementsByClassName("server");
        for (const div of serverDivs) {
            const inputs = div.getElementsByTagName("input");
            allServers.push({
                url: inputs[0].value.trim(),
                key: inputs[1].value.trim(),
            });
        }
        chrome.storage.sync.set({ servers: allServers }, () => {
            showStatus("All servers saved!");
            markSaved();
            renderServers(allServers); // re-render to refresh remove buttons if needed
        });
    });
}

function renderServers(servers = []) {
    list.innerHTML = "";

    servers.forEach((server, idx) => {
        const wrapper = document.createElement("div");
        wrapper.className = "server";

        // URL input group
        const urlWrapper = document.createElement("div");
        urlWrapper.className = "input-group";

        const urlLabel = document.createElement("label");
        urlLabel.textContent = "Server URL:";

        const urlInput = document.createElement("input");
        urlInput.type = "text";
        urlInput.value = server.url || "";
        urlInput.placeholder = "http://example.com:5380";
        urlInput.addEventListener("input", markUnsaved);

        urlWrapper.appendChild(urlLabel);
        urlWrapper.appendChild(urlInput);

        // Key input group
        const keyWrapper = document.createElement("div");
        keyWrapper.className = "input-group";

        const keyLabel = document.createElement("label");
        keyLabel.textContent = "API Key:";

        const keyInput = document.createElement("input");
        keyInput.type = "text";
        keyInput.value = server.key || "";
        keyInput.placeholder = "API key";
        keyInput.addEventListener("input", markUnsaved);

        keyWrapper.appendChild(keyLabel);
        keyWrapper.appendChild(keyInput);

        wrapper.appendChild(urlWrapper);
        wrapper.appendChild(keyWrapper);

        // Remove button only if more than 1 server
        if (servers.length > 1) {
            const removeBtn = document.createElement("button");
            removeBtn.textContent = "🗑 Remove";
            removeBtn.className = "secondary";
            removeBtn.style.marginTop = "0.5rem";
            removeBtn.addEventListener("click", () => {
                servers.splice(idx, 1);
                renderServers(servers);
                markUnsaved();
            });
            wrapper.appendChild(removeBtn);
        }

        list.appendChild(wrapper);
    });
}

document.addEventListener("DOMContentLoaded", () => {
    chrome.storage.sync.get({ servers: [] }, (data) => {
        renderServers(data.servers);
    });

    document.getElementById("addServer").addEventListener("click", () => {
        chrome.storage.sync.get({ servers: [] }, (data) => {
            const servers = data.servers;
            servers.push({ url: "", key: "" });
            renderServers(servers);
            markUnsaved();
        });
    });
});
