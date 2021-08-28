/* This JS file is to contact the Portfolio database to get all of
information needed to fill the sidebar with needed content
*/

// Init variable for sidequotes pulled from received JSON
let sidequotes = [];

// Call data to be fetched
let recJSON;

// Fetch data
getData();


// Fill sidebar with content
fillSidebar();



// FUNCTION DEFINITIONS -----------------




// Define function to fetch data
function getData() {

    // Define URL
    let url = '../php/sidebar.php';

    // Get response from PHP for contacting database
    let xhr = new XMLHttpRequest();

    xhr.open("GET", url, false);

    // Check ready stat change to see if failures have occured
    xhr.onreadystatechange = () => {

        // Check AJAX call has been complete
        if (xhr.readyState === 4) {

            // Chwck if status to file is all good
            if (xhr.status === 200) {
                // IMPORTANT===============================

                // Get the JSON from PHP
                let myJSON = xhr.responseText;

                // Assign to global variable and convert from JSON
                recJSON = JSON.parse(myJSON);

		SplitJSON(recJSON);

             // IMPORTANT===============================
            } else {
                console.log('Error Code: ' + xhr.status);

                console.log('Error Message: ' + xhr.statusText);
            }

        }
    }

    xhr.send();
}


// Define Variables to take place within the XHR.status === 200 part of the function
function SplitJSON(JSON) {

    for (i = 0; i < recJSON.length; i++) {
       sidequotes.push(JSON[i].sidequote);
    }

}



// Fill side bar
function fillSidebar() {

    // Get place in DOM for qutoe to be input
    let sidebarUL = document.getElementById('sidebar');

    // Reverse sidequotes array so that newest post is displayed first
    sidequotes.reverse();

    sidequotes.forEach(quote => {

        // Check length iof quote to change text size
        if (quote.length < 10) {

            sidebarUL.innerHTML += `
                    <li class="list-group-item side-item shadow card border-0 p-3 pl-4 m-2">
                        <h2>${quote}</h2>
                    </li>
                `;

        } else if (quote.length < 25) {

            sidebarUL.innerHTML += `
                    <li class="list-group-item side-item shadow card border-0 p-3 pl-4 m-2">
                        <h3>${quote}</h3>
                    </li>
                `;

        } else if (quote.length < 75) {

            sidebarUL.innerHTML += `
                    <li class="list-group-item side-item shadow card border-0 p-3 pl-4 m-2">
                        <h4>${quote}</h4>
                    </li>
                `;

        } else {

            sidebarUL.innerHTML += `
                    <li class="list-group-item side-item shadow card border-0 p-3 pl-4 m-2">
                        <p>${quote}<p>
                    </li>
                `;

        }


    })

}
