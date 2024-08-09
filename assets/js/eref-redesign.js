// Create redesign modal

let pluginRootUrl = '';
if (typeof chrome !== 'undefined' && typeof browser === 'undefined') {
    // Chrome
    pluginRootUrl = chrome.runtime.getURL('');
} else if (typeof browser !== 'undefined') {
    // Firefox
    pluginRootUrl = browser.runtime.getURL('');
}
const language = ((window.location.href + '/').includes('/sr/')) ? 'sr' : 'hu';

let profileOriginal = document.querySelector("#header-top .nav-profile");
const isAuthorized = (profileOriginal) ? true : false;

class ModalWindow {
    constructor() {
        let modalRedesign = document.createElement("div");
        modalRedesign.classList.add("modal-redesign");

        this.__element = modalRedesign;

        let modalRedesignHeader = document.createElement("div");
        modalRedesignHeader.classList.add("modal-redesign__header");

        let modalRedesignClose = document.createElement("button");
        modalRedesignClose.classList.add("modal-redesign__close");
        modalRedesignClose.innerHTML = '<i class="fa-solid fa-times"></i>';
        modalRedesignClose.addEventListener("click", (e) => {
            this.hideModalRedesign();
        });

        let modalRedesignText = document.createElement("div");
        modalRedesignText.classList.add("modal-redesign__title");

        modalRedesignHeader.append(modalRedesignText)
        modalRedesignHeader.append(modalRedesignClose);

        let modalRedesignContent = document.createElement('div');
        modalRedesignContent.classList.add('modal-redesign__content');

        modalRedesign.append(modalRedesignHeader);
        modalRedesign.append(modalRedesignContent);

        document.body.append(modalRedesign);

        
        this.__modalRedesignText = modalRedesignText;
        this.__modalRedesignContent = modalRedesignContent;
    }
    hideModalRedesign() {
        this.__element.classList.remove('active');
        this.__modalBackgroundElem?.remove();
    }
    removeModalRedesign() {
        this.__element.remove();
        this.__modalBackgroundElem?.remove();
    }
    showModalRedesign(title, content) {
        this.__element.classList.add('active');
        this.__modalRedesignText.textContent = title;

        this.__modalRedesignContent.innerHTML = '';
        if (typeof content == 'string')
            this.__modalRedesignContent.innerHTML = content;
        else
            this.__modalRedesignContent.append(content);

        this.__modalBackgroundElem = document.createElement('div');
        this.__modalBackgroundElem.classList.add('modal-redesign__background');
        document.body.append(this.__modalBackgroundElem);
    }
}
const modalRedesign = new ModalWindow();


// Meta for adaptive viewport
let meta = document.createElement('meta');
meta.name = "viewport";
meta.content = "width=device-width, initial-scale=1.0";
document.getElementsByTagName('head')[0].appendChild(meta);

// Link for favicon
let faviconLink = document.createElement("link");
faviconLink.rel = "icon";
faviconLink.type = "image/png";
faviconLink.href = `${pluginRootUrl}assets/images/favicon.png`;
document.getElementsByTagName('head')[0].appendChild(faviconLink);

// Mobile menu header
let mobileMenu = document.createElement("div");
mobileMenu.classList.add("mobile-menu");


// Username/Login in mobile header
let index_number;
let logout_url = document.querySelector("#header-top .nav-profile a")?.getAttribute("href");

/// If user is logged
if (isAuthorized) {
    let match = profileOriginal.textContent.match(/\d+/);
    if (match)
        index_number = match[0];
}
else {
    index_number = false;
}
let profileBtn = document.createElement("button");
profileBtn.setAttribute("type", "button");
profileBtn.textContent = (index_number) ? index_number : "Login";
// Create modal with login/logout
profileBtn.addEventListener("click", (e) => {
    let title = (isAuthorized) ? index_number : "Login form";

    let modalProfileContent = document.createElement("div");
    modalProfileContent.classList.add("modal-profile__content");
    if (isAuthorized) {
        modalProfileContent.innerHTML = `<a class="btn btn-logout" href="${logout_url}">Logout</a>`
    }
    else {
        let originalLoginForm = document.getElementById("loginform");
        modalProfileContent.innerHTML = originalLoginForm.outerHTML;
    }
    modalRedesign.showModalRedesign(title, modalProfileContent);
});
mobileMenu.append(profileBtn);




// Mobile menu button for open/close
let mobileMenuBtn = document.createElement("button");
mobileMenuBtn.classList.add("mobile-menu-burger");

let mobileMenuBtnIcon = document.createElement("i");
mobileMenuBtnIcon.classList.add("fa-solid", "fa-bars");
mobileMenuBtn.append(mobileMenuBtnIcon);

mobileMenuBtn.addEventListener("click", (e) => {
    mobileMenuContent.classList.toggle("active");
    document.documentElement.classList.toggle("lock");
    mobileMenuBtnIcon.classList.toggle("fa-bars");
    mobileMenuBtnIcon.classList.toggle("fa-times");
});
mobileMenu.append(mobileMenuBtn);


// Mobile menu content
let mobileMenuContent = document.createElement("div");
mobileMenuContent.classList.add("mobile-menu-content");

/// Mobile menu content - nav
let mobileMenuNav = document.createElement("ul");
mobileMenuNav.classList.add("mobile-menu-nav")

let headerOriginalMenu = document.querySelector("#header-menu .nav");
mobileMenuNav.innerHTML = headerOriginalMenu.innerHTML;

let mobileMenuInside = mobileMenuNav.querySelectorAll("a.sf-with-ul");
mobileMenuInside.forEach(a_elem => {
    let sub_menu = a_elem.parentElement.querySelector("ul");
    sub_menu.style.display = "block";
    sub_menu.style.visibility = "visible";
    sub_menu.classList.add("mobile-menu-li-children");

    a_elem.addEventListener("click", (e) => {
        e.preventDefault();

        sub_menu.classList.toggle("active");
    });
});
mobileMenuContent.append(mobileMenuNav);

/// Mobile menu content - languages
let mobileMenuLangs = document.createElement("div");
mobileMenuLangs.classList.add("mobile-langs");

mobileMenuLangs.innerHTML = '<a href="/sr"><img src="/images/flag-rs.png"></a> <a href="/hu"><img src="/images/flag-hu.png"></a>'

mobileMenuContent.append(mobileMenuLangs);


document.body.prepend(mobileMenu);
document.body.append(mobileMenuContent);

// Change h2img for h2 titles on pages
let h2img = document.querySelector('.h2img');
if (h2img != null) {
    let pageh2 = document.querySelector('#main h2');
    let newIcon = document.createElement('i');

    newIcon.classList.add('fa-solid', 'fa-book');
    h2img.remove();
    pageh2.prepend(newIcon);
}
// Replace excel icons

let excelIcons = document.querySelectorAll('img[src="/images/excel.gif"]');
excelIcons?.forEach(excelIcon => {
    excelIcon.setAttribute('src', `${pluginRootUrl}assets/images/excel.png`);
    excelIcon.classList.add('doc-redesign-icon');
});

// Replace word icons
let wordIcons = document.querySelectorAll('img[src="/images/word.gif"]');
wordIcons?.forEach(wordIcon => {
    wordIcon.setAttribute('src', `${pluginRootUrl}assets/images/word.png`);
    wordIcon.classList.add('doc-redesign-icon');
});