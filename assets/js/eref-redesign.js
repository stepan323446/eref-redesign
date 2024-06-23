// Meta for adaptive viewport
let meta = document.createElement('meta');
meta.name = "viewport";
meta.content = "width=device-width, initial-scale=1.0";
document.getElementsByTagName('head')[0].appendChild(meta);

// Link for favicon
let faviconLink = document.createElement("link");
faviconLink.rel = "icon";
faviconLink.type = "image/png";
faviconLink.href = chrome.runtime.getURL("assets/images/favicon.png");
document.getElementsByTagName('head')[0].appendChild(faviconLink);

// Mobile menu header
let mobileMenu = document.createElement("div");
mobileMenu.classList.add("mobile-menu");


// Username/Login in mobile header
let profileOriginal = document.querySelector("#header-top .nav-profile");
let index_number;
let logout_url = document.querySelector("#header-top .nav-profile a")?.getAttribute("href");

const isAuthorized = (profileOriginal) ? true :  false;
/// If user is logged
if(isAuthorized) {
    let match = profileOriginal.textContent.match(/\d+/);
    if(match)
        index_number = match[0];
}
else {
    index_number = false;
}
let profileBtn = document.createElement("button");
profileBtn.setAttribute("type", "button");
profileBtn.textContent = (index_number) ? index_number : "Login";
profileBtn.addEventListener("click", (e) => {
    modalProfile.classList.add("active");
});
mobileMenu.append(profileBtn);


// Username/Login for mobile as modal
let modalProfile = document.createElement("div");
modalProfile.classList.add("modal-profile");

/// Mobile modal header
let modalProfileHeader = document.createElement("div");
modalProfileHeader.classList.add("modal-profile__header");

let modalProfileClose = document.createElement("button");
modalProfileClose.classList.add("modal-profile__close");
modalProfileClose.innerHTML = '<i class="fa-solid fa-times"></i>';
modalProfileClose.addEventListener("click", (e) => {
    modalProfile.classList.remove("active");
});

let modalProfileText = document.createElement("div");
modalProfileText.classList.add("modal-profile__title");
modalProfileText.textContent = (isAuthorized) ? index_number : "Login form"

modalProfileHeader.append(modalProfileText)
modalProfileHeader.append(modalProfileClose);

/// Mobile modal content
let modalProfileContent = document.createElement("div");
modalProfileContent.classList.add("modal-profile__content");
if(isAuthorized) {
    modalProfileContent.innerHTML = `<a class="btn btn-logout" href="${logout_url}">Logout</a>`
}
else {
    let originalLoginForm = document.getElementById("loginform");
    modalProfileContent.innerHTML = originalLoginForm.outerHTML;
}

modalProfile.append(modalProfileHeader);
modalProfile.append(modalProfileContent);

document.body.append(modalProfile);


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