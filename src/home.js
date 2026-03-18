//Local Storage
const prefix = "slt1494-";
const cardsKey = prefix + "projects"
//We'll use this retreive favorite data
//for now though, there will be no favorite system
let projArr = JSON.parse(localStorage.getItem(cardsKey));


let cardSelected = "";
let searResults = [];
let selectNum = 0;

//placed at the top for emphasis that it wrks with elements stored in the page
//will only run if the projArray item exist in local storage
//generates the cards that rest at the top of the page
function readAndLoadProjects() {

    //const Deck = JSON.parse(localStorage.getItem(cardsKey));

    if (projArr && (projArr[0] != null)) {

        let boxamount = projArr.length;
        //console.log(boxamount);
        //this will keep track of our data for projects
        let bigString = ""
        for (let i = 0; i < boxamount; i++) {

            let card = projArr[i];
            let thumbNail; //will be assigned a image value after swtich

            // Use the image from the project data
            thumbNail = card.image || "images/no-image-found.png";

            //grabs name property
            let name = card.title;
            //grabs type property
            let type = card.type;

            //changes background color based on type of project
        let bgc = ""
        switch (type) {
            case "Creative":
                bgc = "linear-gradient(to left, rgba(0, 80, 20, 0.57) 0%, rgba(255, 255, 153, 0.474) 100%)";
                break;
            case "Code":
                bgc = "linear-gradient(to left, rgba(204, 0, 126, 0.57) 0%, rgba(250, 204, 255, 0.37) 100%)";
                break;
            case "Physical":
                bgc = "linear-gradient(to left, rgba(208, 119, 29, 0.57) 0%, rgba(255, 245, 102, 0.43) 100%)";
                break;
            default:
                //stays its typical gray
                bgc = "rgba(249, 240, 188, 0.174)";
                break;
        }
            // get the URL to the project link
            let url = card.link;

            // ES6 String Templating
            let line = `
            <div class='result' id='project${i}'>
                <a target='_blank' href='${url}'>
                    <img src='${thumbNail}' alt='${name}' />
                </a>
                <div class='project-info'>
                    <h3>${name}</h3>
                    <p>${type} ${card.date ? `• ${card.date}` : ""}</p>
                </div>
            </div>`;

            // 15 - add the <div> to the 'bigString' and loop
            bigString += line;

        }
        document.querySelector("#favorites").innerHTML = bigString;
        //cardSelected = document.querySelector("Arr0");

    }
}

//will need an onload function
//API Functionality
// 1
window.onload = (e) => {
    if (projArr == null) projArr = [];//sets deck to an array value if it doesn't pull any data
    // checkAndLoadDeck();
    // document.querySelector("#search").onclick = searchButtonClicked;

    fetch('/api/projects')
        .then(response => response.json())
        .then(data => {
            projArr = data;
            dataLoaded(data);
            // readAndLoadProjects();
        })
        .catch(error => console.error('Error loading projects:', error));

}

function dataLoaded(jD) {
    // 8 - if there are no results/json found, print a message and return
    if (!jD || jD.length == 0) {
        document.querySelector("#status").innerHTML = "<b>'No results found for JSON'</b>";
        return; // Bail out
    }
    //console.log(jD);

    // 9 - Start building and HTML string we will display to the user
    let results = jD;
    //something to globally hold the data incase we need to search through it
    searResults = results;
    //console.log("results.length = " + results.length);
    let bigString = "";

    let limit = document.querySelector("#limit").value;

    if (results.length < limit) {
        limit = results.length;
    }
    //console.log(limit);

    // loop through the array of results
    for (let i = 0; i < limit; i++) {


        let result = results[i];
        let thumbNail; //will be assigned a image/color value after swtich

        if (i < 6 && projArr.length <= 5) {
            projArr[i] = result;
            let store = JSON.stringify(projArr);
            localStorage.setItem(cardsKey, store);
            if (i == 5) {
                //readAndLoadProjects();
            }
        }

        // get the URL to the GIF/Image
        thumbNail = result.image;

        if (!thumbNail) thumbNail = "images/no-image-found.png";
        

        //grabs respecgtive properties
        let name = result.title;
        let type = result.type;
        let link = result.link;
        let date = result.date;

        //changes background color based on rarity
        let bgc = ""
        switch (type) {
            case "Creative":
                bgc = "linear-gradient(to left, rgba(0, 80, 20, 0.32) 0%, rgba(255, 255, 153, 0.12) 100%)";
                break;
            case "Code":
                bgc = "linear-gradient(to left, rgba(204, 0, 126, 0.1) 0%, rgba(250, 204, 255, 0.37) 100%)";
                break;
            case "Physical":
                bgc = "linear-gradient(to left, rgba(208, 119, 29, 0.23) 0%, rgba(255, 245, 102, 0.11) 100%)";
                break;
            default:
                //stays its typical gray
                bgc = "rgba(249, 240, 188, 0.06)";
                break;
        }

        bigString += `
            <div class='result' id='project${i}' style="background: ${bgc}">
                <a target='_blank' href='${link}'>
                    <img src='${thumbNail}' alt='${name}' />
                </a>
                <div class='project-info'>
                    <h3>${name}</h3>
                    <p>${type} ${date ? `• ${date}` : ""}</p>
                </div>
            </div>`;
    }
    // 16 - all done building the HTML - show it to the user!
    document.querySelector("#content").innerHTML = bigString;
    document.querySelector("#status").innerHTML = `<p><i><b>There are ${results.length} results</b></i></p>`;
    document.querySelector("#content").style.overflowY = "scroll";
    document.querySelector("#content").style.height = "25rem";
}

function dataError(e) {
    console.log("An error occurred");
}
