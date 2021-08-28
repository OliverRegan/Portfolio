// Global variables and DOM elements
let typeWriterWrapper = document.getElementById('typewriter-wrapper');
let typeWriterIntro = document.getElementById('typewriter-intro');
let menuOpenButton = document.getElementById('menu-open-container');
let menuOpenContainer = document.getElementById('menu-open');
let menuCloseContainer = document.getElementById('menu-close');
let menuCloseButton = document.getElementById('menu-close-container');
let mainMenu = document.getElementById('menu-main');




// Text variables are temporary and will be intergrated with MySQL to be dynamic
let text1 = "Developer";
let text2 = "Technical Support Officer";
let text3 = "Rock Climber";
let text4 = "Vegan";


// Text variable array 
let text = [text1, text2, text3, text4];

// Create typewriter class
class TypeWriter {
    // Constructor
    constructor(typeElement, words, wait = 3000) {
        this.typeElement = typeElement;
        this.wordArray = words;
        this.txt = '';
        this.wordArrayIndex = 0;
        this.wait = parseInt(wait, 10);
        this.type();
        this.isDeleting = false;
    }

    // Type Method
    type() {
        // Get wordArray index
        const current = this.wordArrayIndex % this.wordArray.length;

        // Get full sentence
        const fullTxt = this.wordArray[current];

        // Check if it's removing a previous sentence
        if (this.isDeleting) {
            // Remove a charater
            this.txt = fullTxt.substring(0, this.txt.length - 1);
        } else {
            // Add character
            this.txt = fullTxt.substring(0, this.txt.length + 1);
        }

        // Insert text into element
        this.typeElement.innerHTML = `${this.txt}`;

        // Set type speed
        let typeSpeed = this.wait / 5;

        // If is deleting
        if (this.isDeleting) {
            typeSpeed /= 2;
        }

        // If word is complete
        if (!this.isDeleting && this.txt === fullTxt) {
            // Add a lil pause at the end
            typeSpeed = this.wait;
            // Set delete to true
            this.isDeleting = true;
        } else if (this.isDeleting && this.txt === '') {
            this.isDeleting = false;
            // next word
            this.wordArrayIndex++;
            // Pause before typing
            typeSpeed = this.wait / 5;
        }

        // Set recursion with wait time
        setTimeout(() => this.type(), typeSpeed);
    }
}

// Menu stuff

// Menu open button
// Animation
function openMenu() {
    mainMenu.classList.add('mm-move');
    menuOpenContainer.classList.add('mm-move');
    // timeout before sliding
    setTimeout(() => {
        menuOpenButton.classList.add('mmb-hide');
        menuCloseButton.classList.remove('mmb-hide');
    }, 400)
}

function closeMenu() {
    menuOpenContainer.classList.remove('mm-move');
    // Want to see close button hide straight away
    menuCloseButton.classList.add('mmb-hide');
    setTimeout(() => {
        // Delay the showing of open button to make it look nicer
        setTimeout(() => {
            menuOpenButton.classList.remove('mmb-hide');
        }, 300)
        mainMenu.classList.remove('mm-move');
    }, 300)
}


// Event listeners
window.addEventListener('load', windowLoadEvents);
menuOpenButton.addEventListener('click', openMenu);
menuCloseButton.addEventListener('click', closeMenu);

// Window load functions
function windowLoadEvents() {

    // Start typewriter + variables
    const typeElement = typeWriterIntro;
    const words = text;
    const wait = 1000;
    new TypeWriter(typeElement, words, wait);

}