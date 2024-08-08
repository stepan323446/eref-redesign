/// E-Tabla ///
let etablaPanels = document.querySelectorAll('#eboardTabs .ui-tabs-panel.ui-widget-content');
if(etablaPanels.length > 0) {
    const config = { childList: true };

    const contentUpdateCallback = function(mutationsList, observer) {
        for (const mutation of mutationsList) {
            // If node with children was changed
            if (mutation.type === 'childList') {
                etablaPanels.forEach(etabla => {
                    // Check where we have children
                    if(etabla.children.length > 0) {
                        // Get content with text
                        let contentElems = etabla.querySelectorAll('.eboard-post-content');

                        contentElems.forEach(content => {
                            // Get all urls in the text
                            const urls = content.textContent.match(/(https?:\/\/[^\s)]+)/g);
                            
                            urls?.forEach(url => {
                                const urlObj = new URL(url);
                                const domain = urlObj.hostname;

                                const urlRegex = new RegExp(url.replace(/&/g, '&amp;').replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g');
                                content.innerHTML = content.innerHTML.replace(urlRegex, `<a href="${url}" target="_blank">${domain}</a>`)
                            });

                            // Set observer for content (for pagination)

                            if(!etabla.classList.contains('observer-completed')) {
                                let newsContainer = etabla.querySelector('.eboard-left');
                                
                                const observerNewsContainer = new MutationObserver(contentUpdateCallback);
                                observerNewsContainer.observe(newsContainer, config);
                            }

                            etabla.classList.add('observer-completed');
                        });                        
                    }
                    else {
                        etabla.classList.remove('observer-completed');
                    }
                });
            }
        }
    };
    const observerUpdateChildren = new MutationObserver(contentUpdateCallback);

    etablaPanels.forEach(panel => {
        observerUpdateChildren.observe(panel, config);
    });
}