var meta = document.createElement('meta');
meta.name = "viewport";
meta.content = "width=device-width, initial-scale=1.0";
document.getElementsByTagName('head')[0].appendChild(meta);

// Mobile menu header
let mobileMenu = document.createElement("div");
mobileMenu.classList.add("mobile-menu");

// Mobile menu button for open/close
let mobileMenuBtn = document.createElement("button");
mobileMenuBtn.classList.add("mobile-menu-burger");
mobileMenuBtn.addEventListener("click", (e) => {
    mobileMenuContent.classList.toggle("active");
    document.documentElement.classList.toggle("lock");
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


document.body.prepend(mobileMenu);
document.body.append(mobileMenuContent);