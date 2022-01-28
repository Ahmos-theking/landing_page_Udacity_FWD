/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/
/**
 * Comments should be present at the beginning of each procedure and class.
 * Great to have comments before crucial code sections within the procedure.
*/
/**
 * Define Global Variables
 * 
*/

/**
 * End Global Variables
 * Start Helper Functions
 * 
*/
/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

// build the nav


// get the the list
const myList = document.getElementById("navbar__list");
const sections = Array.from(document.getElementsByTagName("section"));
// Then you can iterate over this array and generate separate <li> elements.

sections.forEach(section => {

    const listItem = document.createElement('li');
    const aTag = document.createElement("a");
    aTag.setAttribute("href", `#${section.id}`);
    aTag.classList.add("menu__link")
    aTag.innerHTML = section.getAttribute("data-nav")
    listItem.appendChild(aTag);
    myList.appendChild(listItem);
});


// check if element in a viewport
const isInViewport =  (element) =>{
    const rect = element.getBoundingClientRect();
    return (
        rect.bottom >= 0 &&
        rect.right >= 0 &&
        rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.left <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// select all the sections
const AllSections = document.querySelectorAll("section")

// Add class 'active' to section when near top of viewport
window.addEventListener('scroll',  ()=> {
    for (let activeSection of AllSections) {
        if (isInViewport(activeSection) == true) {
            activeSection.classList.add("active");
        } else if (isInViewport(activeSection) == false) {
            activeSection.classList.remove("active");
        }
    }
})

/**
 * End Main Functions
 * Begin Events
 * 
*/

// Build menu 

// Scroll to anchor ID using scrollTO event
// Scroll to section on link click
const links = Array.from(document.querySelectorAll("a"))
for (let link of links) {
    link.addEventListener('click',  (evt)=> {
        evt.preventDefault();

        document.querySelector(link.hash).scrollIntoView({
            behavior: 'smooth'
        });
    });

};

//an active state to navigation items when a section is in the viewport.

for (let j = 0; j < links.length; j++) {
    links[j].id = ("navigation" + (j + 1));
}

let sectionNavMap = {};

for (let i = 0; i < sections.length; i++) {
    sectionNavMap[sections[i].id] = links[i].id
};


window.addEventListener('scroll',  () => {

    for (let sectionIsActive of AllSections) {

        if (sectionIsActive.classList.contains("active")) {

            document.getElementById(sectionNavMap[sectionIsActive.id]).classList.add("highlight")

        } else {

            document.getElementById(sectionNavMap[sectionIsActive.id]).classList.remove("highlight")
        };

    };
});

