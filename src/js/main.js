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





