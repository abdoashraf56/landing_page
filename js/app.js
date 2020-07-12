/**
     * @description Take sections and create nav links for them
     * @param {NodeListOf<HTMLElement>} sections 
     */
function GenerateNavItems(sections) {
    let VDOM = document.createDocumentFragment();
    for (const section of sections) {
        let li = document.createElement("li");
        let data = section.getAttribute("data-nav");
        li.textContent = data
        li.setAttribute("class",data)
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

/**
 * @description Check if Section is on Viewport
 * @param {HTMLElement} section 
 */
function CheckInViewPort(section) {
    let pos = section.getBoundingClientRect()
    let scroll = window.pageYOffset
    return Math.abs(pos.top) < 30 && pos.top > -pos.height
}

let nav, sections, activeSection, activeNav, setTimeOutScroll

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
        window.clearTimeout(setTimeOutScroll);

        for (let index = 0; index < sections.length; index++) {
            if(CheckInViewPort(sections[index])){
                ActivateSection(sections[index])
                ActivateNavLink(nav.getElementsByTagName('li')[index])
            }
        }

        nav.style.display = "flex";
        setTimeOutScroll = setTimeout(isNotScroll, 1000);
    })


    GenerateNavItems(sections);
})


