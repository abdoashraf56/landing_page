/**
     * @description Take sections and create nav links for them
     * @param {NodeListOf<HTMLElement>} sections 
     */
function GenerateNavItems(sections) {
    let VDOM = document.createDocumentFragment();
    for (const section of sections) {
        let li = document.createElement("li");
        li.textContent = section.getAttribute("data-nav");
        li.className = "menu__link";
        li.addEventListener("click", (event) => {
            ScrollToSection(event, section);
            ActivateNavLink(li);
        })
        VDOM.appendChild(li);
    }
    nav.appendChild(VDOM);
}

/**
 * @description Deactive the current nav-link and active the target section
 * @param {HTMLElement} li 
 */
function ActivateNavLink(section) {
    if (activeNav != null) {
        activeNav.classList.remove("menu__link_active");
    }
    activeNav = section;
    activeNav.classList.add("menu__link_active");
}

/**
 * @description Deactive the current section and active the target section
 * @param {HTMLElement} section
 */
function ActivateSection(section) {
    if (activeSection != null) {
        activeSection.classList.remove("your-active-class");
    }
    activeSection = section;
    activeSection.classList.add("your-active-class");
}

/**
 * @description Change section to active
 * @param {HTMLElement} section 
 * @param {MouseEvent} event 
 */
function ScrollToSection(event, section) {
    event.preventDefault();
    ActivateSection(section);
    section.scrollIntoView({
        behavior: "smooth"
    });
}

let nav, sections, activeSection, activeNav

document.addEventListener("DOMContentLoaded", () => {
    //Initalize The Dom Element
    nav = document.querySelector("ul#navbar__list");
    sections = document.querySelectorAll("section");
    activeSection = document.querySelector("section.your-active-class");
    activeNav = document.querySelector("li.menu__link_active");

    let isNotScroll = () => {
        nav.style.display = "none";
    }

    window.addEventListener("scroll", (event) => {
        window.clearTimeout(isNotScroll);
        nav.style.display = "flex";
        setTimeout(isNotScroll, 2000);
    })


    GenerateNavItems(sections);
})


