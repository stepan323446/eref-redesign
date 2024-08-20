

function initScript() {
    let pluginRootUrl = '';
    const url = window.location.href;
    

    if (typeof chrome !== 'undefined' && typeof browser === 'undefined') {
        // Chrome
        pluginRootUrl = chrome.runtime.getURL('');
    } else if (typeof browser !== 'undefined') {
        // Firefox
        pluginRootUrl = browser.runtime.getURL('');
    }
    // Append element with plugin root url
    let pluginRootContainer = document.createElement('div');
    pluginRootContainer.id = 'pluginRootUrlContainer';
    pluginRootContainer.textContent = pluginRootUrl;
    pluginRootContainer.hidden = true;
    document.body.append(pluginRootContainer);

    // Load scripts
    function loadScript(scriptName, callback = () => { }) {

        let scriptElem = document.createElement('script');
        scriptElem.src = pluginRootUrl + 'assets/js/' + scriptName;
        scriptElem.onload = callback;
        scriptElem.async = false;

        document.body.append(scriptElem);
    }

    

    loadScript('eref-redesign.js', function () {
        if (url.includes('default/studentsdata'))
            loadScript('eref-profil.js');

        if (url.includes('default/eboard'))
            loadScript('eref-etable.js');

        if (url.includes('default/professors'))
            loadScript('eref-professor.js');

        if (url.includes('default/subjects'))
            loadScript('eref-subjects.js');

        if (url.includes('default/subjects') || url.includes('default/literature'))
            loadScript('eref-legends.js')
    });
}

initScript();