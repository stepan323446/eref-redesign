const pluginVersion = "1.3.0"

const pluginRootUrl = document.getElementById('pluginRootUrlContainer').textContent;
const url = window.location.href;
const language = ((url + '/').includes('/hu/')) ? 'hu' : 'sr';

let profileOriginal = document.querySelector("#header-top .nav-profile");
const isAuthorized = (profileOriginal) ? true : false;
const isAuthPage = (document.getElementById('login-wrap')) ? true : false;

// Progressive web application
const manifest = {
    name: "VTS Eref",
    start_url: (language == 'sr') ? 'https://eref.vts.su.ac.rs/sr' : 'https://eref.vts.su.ac.rs/hu',
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#ffffff",
    icons: [
      {
        src: pluginRootUrl + "assets/images/favicon-app.png",
        type: "image/png",
        sizes: "144x144"
      }
    ]
};
console.log(manifest)
const manifestLink = document.createElement('link');
manifestLink.rel = 'manifest';
manifestLink.href = 'data:application/manifest+json,' + encodeURIComponent(JSON.stringify(manifest));

document.head.appendChild(manifestLink);

// Style refs for every browsers
let style = document.createElement('style');

// Get language function
function getLangText(sr, hu) {
    return (language == 'sr') ? sr : hu;
}

// Add your CSS rules as text and font family
style.innerHTML = `
:root {
    --eref-background-url: url(${pluginRootUrl}assets/images/eref-background.png);
    --eref-header-logo-url: url(${pluginRootUrl}assets/images/eref-header.png);
}

:root, :host {
  --fa-style-family-classic: 'Font Awesome 6 Free';
  --fa-font-solid: normal 900 1em/1 'Font Awesome 6 Free'; 
}

@font-face {
  font-family: 'Font Awesome 6 Free';
  font-style: normal;
  font-weight: 900;
  font-display: block;
  src: url("${pluginRootUrl}assets/webfonts/fa-solid-900.woff2") format("woff2"), url("${pluginRootUrl}assets/webfonts/fa-solid-900.ttf") format("truetype"); 
}
@font-face {
  font-family: 'Font Awesome 6 Brands';
  font-style: normal;
  font-weight: 400;
  font-display: block;
  src: url("${pluginRootUrl}assets/webfonts/fa-brands-400.woff2") format("woff2"), url("${pluginRootUrl}assets/webfonts/fa-brands-400.ttf") format("truetype"); 
}

.fas,
.fa-solid {
  font-weight: 900; 
}

input[type="button"], input[type="reset"], input[type="submit"], .form input.button, button, .btn, #loginform input.button {
    padding: 6px 19px !important;
    font-size: 13px;
}
.mobile-menu button:first-child {
    font-size: 14px;
    padding: 5px !important;
}
.mobile-menu-burger {
    width: 30px;
    height: 35px !important;
    font-size: 14px;
    padding: 0 !important;
}
`;

// Append the <style> element to the <head> or <body>
document.head.appendChild(style);


// Create redesign modal
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


// Is auth page, set some styles
if(isAuthPage) {
    document.getElementById('content').classList.add('auth-page');
}

if(!isAuthPage)
    {
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
}

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

// Footer
let footer = document.createElement('footer');
let originalFooter = document.getElementById('footer');

footer.classList.add('footer-redesign');
footer.innerHTML = `
    <div class="footer-left">
        <div class="footer-plugin-info">
            <h3>EREF REDESIGN</h3>

            <p>The "Eref Redesign" plugin is designed to create a modern look with additional functionality and adaptability of the site eref.vts.su.ac.rs.</p>

            <p>Version: ${pluginVersion}</p>
        </div>
    </div>
    <div class="footer-right">
        <div class="footer-links">
            <h4>Official links</h4>

            <ul>
                <li>
                    <a href="https://www.vts.su.ac.rs/" target="_blank">Official website</a>
                </li>
                <li>
                    <a href="https://www.instagram.com/parlament_vts/" target="_blank">Instagram</a>
                </li>
                <li>
                    <a href="https://moodle2.vts.su.ac.rs/" target="_blank">Moodle</a>
                </li>
                <li>
                    <a href="https://bbb.vts.su.ac.rs/" target="_blank">BBB</a>
                </li>
                <li>
                    <a href="https://webmail.vts.su.ac.rs/" target="_blank">VTS Mail (Webmail)</a>
                </li>
                <li>
                    <a href="https://biblioteka.vts.su.ac.rs/" target="_blank">VTS Library</a>
                </li>
            </ul>
        </div>
        <div class="footer-links">
            <h4>Community</h4>

            <ul>
                <li>
                    <a href="https://discord.gg/9G6bUvvRzT" target="_blank">Discord (SRB)</a>
                </li>
                <li>
                    <a href="https://www.instagram.com/wutsh_insider/" target="_blank">Instagram</a>
                </li>
                <li>
                    <a href="https://github.com/stepan323446/eref-redesign" target="_blank">Github plugin</a>
                </li>
            </ul>
        </div>
    </div>
    
`;

document.body.append(footer);
document.body.append(originalFooter);