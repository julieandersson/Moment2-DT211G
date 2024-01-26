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
}

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







