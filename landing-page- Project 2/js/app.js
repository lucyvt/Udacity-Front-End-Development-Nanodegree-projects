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
 
 * Begin Main Functions
 * 
*/

function navbarFilling() {
	
	
	for(let i = 0; i < sections.length; i++) {
		
		
		let navItem = document.createElement('LI');
	
		navList.append(navItem);
	
		newLink = document.createElement('A')
	
		navItem.append(newLink);
		
		// use data-nav attribute to fill li node
		newLink.innerHTML = sections[i].getAttribute('data-nav');
		
		newLink.classList.add('menu__link');
		newLink.style.cursor = 'pointer';
		
		newLink.setAttribute('href', '#section' + (i+1));
		
		//set a data-link attribute equals the section data-nav attr
		newLink.setAttribute('data-link', sections[i].getAttribute('data-nav'));
		
	}
		
}


/*
 * End Main Functions
*/

// build the nav

navbarFilling();


// Add class 'active' to section when near top of viewport

document.addEventListener('scroll', isSectionInViewport());


function isSectionInViewport() {
	
	sections.forEach( (section) => {
	
	
		if(window.scrollY >= section.offsetHeight) {
		
			
			section.classList.add("your-active-class");
			
			
		} else {
		
			
			section.classList.remove("your-active-class");
				
		}	
		
	});
	
}
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
		
// Scroll to section on link click
		
		window.scroll({
			
			behavior: 'smooth',
			left: 0,
			
			top: document.querySelector(ref).offsetTop
		});
	});
});

