"use strict";


const url = "https://dahlgren.miun.se/ramschema_ht23.php";

window.onload = init;

async function init() {
    try {
        // Fetch-anrop
        const response = await fetch(url);
        const courses = await response.json();

        // Sortera kurskod
        courses.sort((a, b) => (a.code > b.code) ? 1 : -1);

        // Sortera kursnamn
        courses.sort((a, b) => (a.coursename > b.coursename) ? 1 : -1);

        //Sortera progression
        courses.sort((a, b) => (a.progression > b.progression) ? 1 : -1);


        displayCourses(courses);
    } catch {
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





