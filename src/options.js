let unsaved = false;

const setUnsaved = (v = true) => {
    unsaved = v;
    saveBtn.classList.toggle('unsaved', v);
};

const showStatus = (msg) => {
    const status = document.getElementById('status');
    if (!status) return;
    status.textContent = msg;
    setTimeout(() => (status.textContent = ''), 2000);
};

const list = document.getElementById('serverList');

let saveBtn = document.getElementById('saveAllBtn');
if (!saveBtn) {
    saveBtn = document.createElement('button');
    saveBtn.id = 'saveAllBtn';
    saveBtn.textContent = '\ud83d\udcbe Save All';
    list.parentNode.insertBefore(saveBtn, document.getElementById('addServer'));

    saveBtn.addEventListener('click', () => {
        const allServers = [];
        const serverDivs = list.getElementsByClassName('server');
        for (const div of serverDivs) {
            const inputs = div.getElementsByTagName('input');
            allServers.push({ url: inputs[0].value.trim(), key: inputs[1].value.trim() });
        }

        chrome.storage.sync.set({ servers: allServers }, () => {
            showStatus('All servers saved!');
            setUnsaved(false);
            renderServers(allServers);
        });
    });
}

const renderServers = (servers = []) => {
    list.innerHTML = '';

    servers.forEach((server, idx) => {
        const wrapper = document.createElement('div');
        wrapper.className = 'server';

        const urlWrapper = document.createElement('div');
        urlWrapper.className = 'input-group';
        const urlLabel = document.createElement('label');
        urlLabel.textContent = 'Server URL:';
        const urlInput = document.createElement('input');
        urlInput.type = 'text';
        urlInput.value = server.url || '';
        urlInput.placeholder = 'http://example.com:5380';
        urlInput.addEventListener('input', () => setUnsaved(true));
        urlWrapper.appendChild(urlLabel);
        urlWrapper.appendChild(urlInput);

        const keyWrapper = document.createElement('div');
        keyWrapper.className = 'input-group';
        const keyLabel = document.createElement('label');
        keyLabel.textContent = 'API Key:';
        const keyInput = document.createElement('input');
        keyInput.type = 'text';
        keyInput.value = server.key || '';
        keyInput.placeholder = 'API key';
        keyInput.addEventListener('input', () => setUnsaved(true));
        keyWrapper.appendChild(keyLabel);
        keyWrapper.appendChild(keyInput);

        wrapper.appendChild(urlWrapper);
        wrapper.appendChild(keyWrapper);

        if (servers.length > 1) {
            const removeBtn = document.createElement('button');
            removeBtn.textContent = '\ud83d\uddd1 Remove';
            removeBtn.className = 'secondary';
            removeBtn.addEventListener('click', () => {
                servers.splice(idx, 1);
                renderServers(servers);
                setUnsaved(true);
            });
            wrapper.appendChild(removeBtn);
        }

        list.appendChild(wrapper);
    });
};

document.addEventListener('DOMContentLoaded', () => {
    chrome.storage.sync.get({ servers: [] }, (data) => {
        renderServers(data.servers);
    });

    document.getElementById('addServer').addEventListener('click', () => {
        chrome.storage.sync.get({ servers: [] }, (data) => {
            const servers = data.servers || [];
            servers.push({ url: '', key: '' });
            renderServers(servers);
            setUnsaved(true);
        });
    });
});
