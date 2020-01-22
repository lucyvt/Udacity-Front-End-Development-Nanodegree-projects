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
 * Define Global Variables
 * 
*/

const sections = document.querySelectorAll('[data-nav]');
const navList = document.querySelector('#navbar__list');

let newLink;
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

function navbarFilling() {
	
	
	for(let i = 0; i < sections.length; i++) {
		
		
		let navItem = document.createElement('LI');
	
		navList.append(navItem);
	
		newLink = document.createElement('A')
	
		navItem.append(newLink);
		
		newLink.innerHTML = 'section ' + (i+1);
		
		newLink.classList.add('menu__link');
		newLink.style.cursor = 'pointer';
		
		newLink.setAttribute('href', '#section' + (i+1));
		
		
	}
		
}



// build the nav

navbarFilling();


// Add class 'active' to section when near top of viewport

/**
 * End Main Functions
 * Begin Events
 * 
*/

// Build menu 

// Scroll to section on link click
// Scroll to anchor ID using scrollTO event

const linksList = document.querySelectorAll("a[href^='#section']");

linksList.forEach(function(link) {
	
	link.addEventListener('click', () => {
		
		linksList.forEach( (link) => {
			
			if(link.classList.contains('active-link'))  {
				
				link.classList.remove('active-link');
				
			}
		});
		
		link.classList.add('active-link');
		
		
		
		let ref = link.href.split('#section');
		ref = '#section' + ref[1];
		
		window.scroll({
			
			behavior: 'smooth',
			left: 0,
			
			top: document.querySelector(ref).offsetTop
		});
	});
});

// Set sections as active
