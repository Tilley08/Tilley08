// TODO: Fetch data from the PostgreSQL database (to be implemented later)
function fetchGradebookData() {
    // This function will query the PostgreSQL database and return grade data
    console.log("Fetching grade data...");
}

// TODO: Populate the table with grade data
function populateGradebook(data) {
    // This function will take the fetched data and populate the gradebook table
    console.log("Populating gradebook with data...", data);
}

// TODO: REMOVE THIS
// Call the stubs to demonstrate the workflow
const GradeData = fetchGradeData();
populateGradebook(GradeData);
// END REMOVE

function fetchGradeData() {
    // This function will query the PostgreSQL database and return grade data
    console.log("Fetching grade data...");
    // Create a new request for HTTP data
    let xhr = new XMLHttpRequest();
    // This is the address on the machine we're asking for data
    let apiRoute = "/api/grades";
    // When the request changes status, we run this anonymous function
    xhr.onreadystatechange = function () {
        // Check if we're done
        if (xhr.readyState === XMLHttpRequest.DONE) {
            // Check if we're successful
            if (xhr.status !== 200) {
                console.error(`Could not get grades. Status: ${xhr.status}`);
                return;
            }
            // Call the function to update the HTML with our data
            populateGradebook(JSON.parse(xhr.responseText));
        }
    };
    xhr.open("GET", apiRoute, true);
    xhr.send();
}

function populateGradebook(data) {
    // This function will take the fetched grade data and populate the table
    console.log("Populating gradebook with data:", data);
    let tableElm = document.getElementById("gradebook"); // Get the gradebook table element
    data.forEach(function (assignment) {
        // For each row of data we're passed in
        let row = document.createElement("tr"); // Create a table row element
        let columns = {}; // Handy place to stick the columns of information

        // The first column's table data will be the name
        columns.name = document.createElement("td");
        columns.name.appendChild(
            // Concatenate the full name: "last_name, first_name"
            document.createTextNode(`${assignment.last_name}, ${assignment.first_name}`)
        );

        // The second column will be the grade
        columns.grade = document.createElement("td");
        columns.grade.appendChild(
            // Just put the grade in text
            document.createTextNode(assignment.total_grade)
        );

        // Add the table data columns to the table row
        row.appendChild(columns.name);
        row.appendChild(columns.grade);

        // Add the row to the table itself to make the data visible
        tableElm.appendChild(row);
    });
}