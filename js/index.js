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
//empty array to put <li> in
const nav = [];
//grabbing and naming the nav bar container <ul>
const navBarList = document.getElementById("navbar__list");
//making an array of all items named section
const sections = Array.from(document.querySelectorAll("section"));
//grab containter for sections to add event listener to
const sectionContainter = document.getElementById("container")
//no longer need with new scrollTo function 
    //making a variable out of every written section
    // const section_1 = document.getElementById("section1");
    // const section_2 = document.getElementById("section2");
    // const section_3 = document.getElementById("section3");
    // const section_4 = document.getElementById("section4");

/**
 * End Global Variables
 * Start Helper Functions
 * 
 */
//grabs the ids of the elements which will be just sections
function grabId() {
    //to grab the dataset values to use as text content for <li>
    sections.forEach(element => {
        //to weed out maybe future sections that don't have a dataset and won't go in nav bar
        if (element.dataset){
            //puts data-set value into an empty array
            nav.push(element.dataset.nav);
        };
    });
};

//building nav bar based on section
function navbar() {
    //to create <li> for each value in nav array
    for(let i=0; i < nav.length; i++) {
        //create new <li> element
        const newLi = document.createElement("li");
        //grab text to put into <li>
        newLi.textContent = nav[i];
        //adding class attribute
        newLi.setAttribute("class", "menu__link")
        //add a setion class name for active scroll function
        newLi.classList.add(`section${i+1}`)
        // new.LI.setAttribute()
        //add <li> to <ul>
        navBarList.appendChild(newLi);
    }
    //event listener on <ul> instead of <li> so its 1 instead of 4+
    navBarList.addEventListener("click", scrollTo)
};

// Add class 'active' to section if not there or remove if there
function toggle (sec) {
    //to avoid writing class over and over
    const active = "your-active-class";
    //function to remove active class on currently highlighted section
    for(i=0; i < sections.length; i++){
        //to grab each class values
        const className = sections[i].classList.value;
        //check is value of class is active
        if(className === active){
            //if active toggle value
            sections[i].classList.toggle(active)
        }
    }
    // function to add it on new highlighted area
    sec.classList.toggle(active);
};

// Scroll to anchor ID using scrollTO event
function scrollTo(event){
    //makes sure that empty space around nav in header doesn't get listened to by using event.target to grab the data of the element clicked
    if(event.target.nodeName ==="LI"){
        //for loop to avoid writing for each section by hand when new future sections are added
        // console.log(event.target.innerHTML); **used to varify what the value would be**
        for(i=0; i < sections.length; i++) {
            //checking target inner text against the values of the sections array 
            if(event.target.innerHTML === sections[i].dataset.nav){
                //once it passed then use that index's data to dynamically scroll to that section
                document.getElementById(`${sections[i].id}`).scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                    inline: "nearest"                
                });
            // call function to allow for active class to be moved to old to current
            toggle(document.getElementById(`${sections[i].id}`));
            }
        }
    }

};  

function scrollActive (){
    //function to loop over sections
    for(const section of sections){
        //add method to see location of section
        const view = section.getBoundingClientRect();
        //grad id name and set to constant
        const className = section.id;
        //grab element with the same class name
        const navLink = document.querySelector(`.${className}`);
        //if statement to check if active or not 
        if(view.top <= 175 && view.bottom >= 730){
            // used to help narrow numbers down^
            // console.log(className);
            // console.log(`top:${view.top} & bottom:${view.bottom}`)
            //make active 
            section.classList.add("your-active-class")
            //change class of navLink to active
            navLink.classList.add("active");
        } else {
            //remove active class on section
            section.classList.remove("your-active-class");
            navLink.classList.remove("active");
        }
    }
}

// first attempt at the scrollTo function but wanted to write a smaller function that 
// would work if more than were added and elimate need for a variable to be made
// for each sectoin. Wanted to make more dynamic
// function scrollTo(event){
//     //makes sure that empty space around nav in header doesn't get listened to by 
//     //using event.target to grab the data of the element clicked
//     if(event.target.nodeName ==="LI"){
//         //if statements for each section
//         if(event.target.innerHTML === "Section 1"){
//             section_1.scrollIntoView({
//                 behavior: "smooth",
//                 block: "start",
//                 inline: "nearest"                
//             });
//             //call function to allow for active class to be moved
//             toggle(section_1);
//         }if(event.target.innerHTML === "Section 2"){
//             section_2.scrollIntoView({
//                 behavior: "smooth",
//                 block: "start",
//                 inline: "nearest"                
//             });
//             //call function to allow for active class to be moved
//             toggle(section_2);
//         }
//         if(event.target.innerHTML === "Section 3"){
//             section_3.scrollIntoView({
//                 behavior: "smooth",
//                 block: "start",
//                 inline: "nearest"                
//             });
//             //call function to allow for active class to be moved
//             toggle(section_3);
//         }
//         if(event.target.innerHTML === "Section 4"){
//             section_4.scrollIntoView({
//                 behavior: "smooth",
//                 block: "start",
//                 inline: "nearest"                
//             });
//             //call function to allow for active class to be moved
//             toggle(section_4);
//         }
//     }
// };  

/**
 * End Helper Functions
 * Begin Main Functions
 * 
 */

function init(){
    //start by grabing id names
    grabId();

    //make nav bar list with needed attributes and text content
    navbar();

//make event listener to listen to when scroll method is used to activate actiev state
    document.addEventListener("scroll", scrollActive);

//FUTURE TODO: set time out to hide nav bar while reader is read === not scrolling

//FUTURE TODO: Add a scroll to top button on the page that’s only visible when the user scrolls below the fold of the page.

//


};

init();

/**
 * End Main Functions
 * Begin Events
 * 
*/

// Build menu 

// Scroll to section on link click

// Set sections as active