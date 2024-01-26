// Av Julie Andersson, Moment 2 DT211G

"use strict";


const url = "https://dahlgren.miun.se/ramschema_ht23.php";


window.onload = init;

async function init() {
    try {
        // Fetch-anrop
        const response = await fetch(url);
        const coursesData = await response.json();

        // Visa kuser i tabellen och lägg till händelsehanterare för sortering
        displayCourses(coursesData);
        addEventHandlers(coursesData);

    } catch {
        // felmeddelande om hämtning misslyckas
        document.getElementById("error").innerHTML = "<p>Något gick fel, prova igen senare!</p>";
    }
}

function displayCourses(courses) {
    const codeEl = document.getElementById("code");

    courses.forEach((course) => {
        // Loopa igenom och skriva ut till DOM 
        let newRow = document.createElement("tr");
        
        // Kurskod
        let newCodeId = document.createElement("td");
        let newCodeName = document.createTextNode(course.code);
        newCodeId.appendChild(newCodeName);
        newRow.appendChild(newCodeId);

        // Kursnamn
        let newCourseName = document.createElement("td");
        let newCourseNameText = document.createTextNode(course.coursename);
        newCourseName.appendChild(newCourseNameText);
        newRow.appendChild(newCourseName);

        // Progression
        let newProgression = document.createElement("td");
        let newProgressionText = document.createTextNode(course.progression);
        newProgression.appendChild(newProgressionText);
        newRow.appendChild(newProgression);

        codeEl.appendChild(newRow); 

    });
}

function addEventHandlers(coursesData) {
    // Hitta alla <td> i <thead>
    const headers = document.querySelectorAll("thead td");

    //Lägg till händelsehanterare för klick på varje <td>
    headers.forEach((header, index) => {
        header.addEventListener("click", () => sortColumn(index, coursesData));

    });

    // Lägg till händelsehanterare för sökfunktionen
    const searchInput = document.getElementById("searchInput");
    searchInput.addEventListener("input", () => filterCourses(searchInput.value, coursesData));
}

/*------------FUNKTION FÖR SORTERING AV KURSER-----------------*/

function sortColumn(index, coursesData) {
    //Sortera kurserna baserat på vilken kolumn som klickades på
    switch (index) {
        case 0:
            coursesData.sort((a, b) => (a.code > b.code) ? 1 : -1);
            break;
        case 1:
            coursesData.sort((a, b) => (a.coursename > b.coursename) ? 1 : -1);
            break;
        case 2:
            coursesData.sort((a, b) => (a.progression > b.progression) ? 1 : -1);
            break;
    }

        //Hämta elementet där kurserna ska visas och töm
        const codeEl = document.getElementById("code");
        codeEl.innerHTML = "";
    
        //Visa de sorterade kurserna i tabellen
        displayCourses(coursesData);
}

/*------------FUNKTION FÖR FILTRERING/SÖK AV KURSER-----------------*/

 function filterCourses(searchTerm, coursesData) {
    const filteredCourses = coursesData.filter(course => {
        const codeMatch = course.code.toLowerCase().includes(searchTerm.toLowerCase());
        const nameMatch = course.coursename.toLowerCase().includes(searchTerm.toLowerCase());
        return codeMatch || nameMatch;
    });

    const codeEl = document.getElementById("code");
    codeEl.innerHTML = "";

    // Visa de filtrerade kurserna i tabellen
    displayCourses(filteredCourses);

}







