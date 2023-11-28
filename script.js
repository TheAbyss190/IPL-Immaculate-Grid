// Fetching required DOM elements

const overlay = document.querySelector('.overlay');

const searchContainer = document.querySelector('#searchContainer');
const searchBarContainer = document.querySelector('#searchBarContainer');
const searchBar = document.querySelector('#searchBar')
const grid = document.querySelector('.grid');
const html = document.querySelector('html');
const autocompleteContainer = document.querySelector('.autocompleteContainer');
const autocompleteItems = document.getElementsByClassName('autocompleteItem');
const activeAnswers = document.getElementsByClassName('activeAnswer');

import stats from "./data/JSON Files/all-stats.json" assert { type: "json" }; // Fetching all stats
import players from "./data/JSON Files/all-players.json" assert { type: "json" }; // Fetching all player names

// Defining possible questions

const teamQuestions = [
    {
        'questionType': 'team',
        'name': "Mumbai Indians",
        'display': 'https://bcciplayerimages.s3.ap-south-1.amazonaws.com/ipl/MI/Logos/Logooutline/MIoutline.png',
        'identifiers': ['Mumbai Indians']
    },
    {
        'questionType': 'team',
        'name': "Sunrisers Hyderabad",
        'display': 'https://bcciplayerimages.s3.ap-south-1.amazonaws.com/ipl/SRH/Logos/Logooutline/SRHoutline.png',
        'identifiers': ['Sunrisers Hyderabad', 'Deccan Chargers']
    },
    {
        'questionType': 'team',
        'name': "Royal Challengers Bangalore",
        'display': 'https://bcciplayerimages.s3.ap-south-1.amazonaws.com/ipl/RCB/Logos/Logooutline/RCBoutline.png',
        'identifiers': ['Royal Challengers Bangalore']
    },
    {
        'questionType': 'team',
        'name': "Punjab Kings",
        'display': 'https://bcciplayerimages.s3.ap-south-1.amazonaws.com/ipl/PBKS/Logos/Logooutline/PBKSoutline.png',
        'identifiers': ['Punjab Kings', 'Kings XI Punjab']
    },
    {
        'questionType': 'team',
        'name': "Delhi Capitals",
        'display': 'https://bcciplayerimages.s3.ap-south-1.amazonaws.com/ipl/DC/Logos/LogoOutline/DCoutline.png',
        'identifiers': ['Delhi Capitals', 'Delhi Daredevils']
    },
    {
        'questionType': 'team',
        'name': "Kolkata Knight Riders",
        'display': 'https://bcciplayerimages.s3.ap-south-1.amazonaws.com/ipl/KKR/Logos/Logooutline/KKRoutline.png',
        'identifiers': ['Kolkata Knight Riders']
    },
    {
        'questionType': 'team',
        'name': "Chennai Super Kings",
        'display': 'https://bcciplayerimages.s3.ap-south-1.amazonaws.com/ipl/CSK/logos/Logooutline/CSKoutline.png',
        'identifiers': ['Chennai Super Kings']
    },
    // {
    //     'questionType': 'team',
    //     'name': "Rising Pune Supergiants",
    //     'display': 'data/images/rps.png',
    //     'identifiers': ['Rising Pune Supergiants', 'Rising Pune Supergiant']
    // },
    {
        'questionType': 'team',
        'name': "Rajasthan Royals",
        'display': 'https://bcciplayerimages.s3.ap-south-1.amazonaws.com/ipl/RR/Logos/Logooutline/RRoutline.png',
        'identifiers': ['Rajasthan Royals']
    },
    {
        'questionType': 'team',
        'name': "Gujarat Titans",
        'display': 'https://bcciplayerimages.s3.ap-south-1.amazonaws.com/ipl/GT/Logos/Logooutline/GToutline.png',
        'identifiers': ['Gujarat Titans']
    },
    {
        'questionType': 'team',
        'name': "Lucknow Super Giants",
        'display': 'https://bcciplayerimages.s3.ap-south-1.amazonaws.com/ipl/LSG/Logos/Logooutline/LSGoutline.png',
        'identifiers': ['Lucknow Super Giants']
    },
    // {
    //     'questionType': 'team',
    //     'name': "Pune Warriors India",
    //     'display': 'data/images/pwi.png',
    //     'identifiers': ['Pune Warriors']
    // },
    // {
    //     'questionType': 'team',
    //     'name': "Gujarat Lions",
    //     'display': 'data/images/gl.png',
    //     'identifiers': ['Gujarat Lions']
    // },
    // {
    //     'questionType': 'team',
    //     'name': "Kochi Tuskers Kerala",
    //     'display': 'data/images/ktk.png',
    //     'identifiers': ['Kochi Tuskers Kerala']
    // }
]

// Minimum of 200 balls faced for batting rate stats
// Minimum of 200 balls bowled for bowling rate stats
const statQuestions = [
    {
        'questionType': 'stat',
        'name': 'matches',
        'attributeType': 'count',
        'boundary': 80,
        'display': '80+ matches'
    },
    {
        'questionType': 'stat',
        'name': 'runs',
        'attributeType': 'count',
        'boundary': 800,
        'display': '800+ runs'
    },
    {
        'questionType': 'stat',
        'name': 'batting_avg',
        'attributeType': 'battingRate',
        'boundary': 25,
        'display': '25+ batting average'
    },
    {
        'questionType': 'stat',
        'name': 'batting_strike_rate',
        'attributeType': 'battingRate',
        'boundary': 125,
        'display': '125+ strike rate'
    },
    {
        'questionType': 'stat',
        'name': 'wickets',
        'attributeType': 'count',
        'boundary': 40,
        'display': '40+ wickets'
    },
    {
        'questionType': 'stat',
        'name': 'bowling_economy',
        'attributeType': 'bowlingRate',
        'boundary': 8,
        'display': '<8 economy rate'
    },
    {
        'questionType': 'stat',
        'name': 'bowling_avg',
        'attributeType': 'bowlingRate',
        'boundary': 30,
        'display': '<30 bowling average'
    }
]

// Storing HTML IDs of all question elements 
const questionIDs = [
    ['question-x-1', 'question-x-2', 'question-x-3'],
    ['question-y-1', 'question-y-2', 'question-y-3']
]

// Functions to generate and display grid questions

function generateQuestions(...args) {
    const possibleQuestions = [];
    for (let array of args) {
        possibleQuestions.push(...array);
    }

    const questionsGenerated = [[], []]; // [[Qs on x-axis], [Qs on y-axis]]
    for (let row of questionsGenerated) {
        for (let i = 0; i < 3; i++) {
            let randomNum = Math.floor(Math.random()*possibleQuestions.length);
            row.push(possibleQuestions[randomNum]);
            possibleQuestions.splice(randomNum, 1);
        }
    }

    return questionsGenerated
}

function displayQuestions(questions, questionIDs) {
    for (let row = 0; row < questions.length; row++) {
        for (let question = 0; question < questions[row].length; question++) {
            let questionElement = document.getElementById(questionIDs[row][question]);
            if (questions[row][question]['questionType'] == 'team') {
                questionElement.innerHTML =`<img src=${questions[row][question]['display']}>`;
            } else {
                questionElement.innerHTML =`<span>${questions[row][question]['display']}</span>`
            }
        }
    }
}

// Executing above functions

let questionsGenerated = generateQuestions(teamQuestions, statQuestions);
console.log(questionsGenerated);
displayQuestions(questionsGenerated, questionIDs);


let searching = false; // to detect if user is searching for a player

// Function to show search bar on click of grid box
function toggleSearchBar(e) {

    if (!searching) {
        if (e.target.classList.contains('answer')) {
            overlay.classList.add('overlay-active');
            searchContainer.style.opacity = 1;
            searchContainer.style.pointerEvents = 'auto';
            searchBar.focus();
            e.target.classList.add('activeAnswer');
            searching = true;

            searchBar.value = '';
            autocompleteContainer.innerHTML = '';
        }
    } else {

        if (!(e.target.classList.contains('activeAnswer') || e.target.classList.contains('search')) || e.key == 'Escape') {
            overlay.classList.remove('overlay-active');
            document.getElementsByClassName('activeAnswer')[0].classList.remove('activeAnswer');
            searchContainer.style.opacity = 0;
            searchContainer.style.pointerEvents = 'none';
            searching = false;
        }
    }
}

function autocomplete(input, array) {

    let currentFocus;

    // event listener for any key pressed 
    
    input.oninput = e => {
        autocompleteContainer.innerHTML = '';
        currentFocus = -1;

        // filters all search matches
        let filteredArray = array.filter((element) => {
            if (input.value) {
                return element.toUpperCase().includes(input.value.toUpperCase());
            }
        }); 
        
        // create div for each match, adding to container
        for (let element of filteredArray) {
            let elementDiv = document.createElement('div');
            elementDiv.classList.add('search', 'autocompleteItem');

            let elementText = document.createElement('div');
            elementText.classList.add('search', 'autocompleteText');
            elementText.textContent = element;
            elementDiv.appendChild(elementText);

            let selectButton = document.createElement('button');
            selectButton.classList.add('search', 'selectButton');
            selectButton.textContent = 'Select';
            elementDiv.appendChild(selectButton);


            // autocomplete input on clicking a match
            selectButton.onclick = e => {
                updateAnswer(elementDiv);
            }

            autocompleteContainer.appendChild(elementDiv);
        }
    }

    input.onkeydown = e => {
        if (e.key == 'ArrowDown') {
            currentFocus++;
            addActive();
        }

        if (e.key == 'ArrowUp') {
            currentFocus--;
            addActive();
        }

        if (e.key == 'Enter') {
            if (currentFocus > -1) {
                autocompleteItems[currentFocus].getElementsByClassName('selectButton')[0].click();
            }
        }
    }


    function addActive() {
        if (!autocompleteItems) return false;

        removeActive();
        if (currentFocus >= autocompleteItems.length) currentFocus = 0;
        if (currentFocus < 0) currentFocus = (autocompleteItems.length - 1);

        autocompleteItems[currentFocus].classList.add('autocompleteActive');

    }

    function removeActive() {
        for (let i = 0; i < autocompleteItems.length; i++) {
            autocompleteItems[i].classList.remove('autocompleteActive');
        }
    }
}

function verifyAttempt(guess) {
    let guessStats = stats[guess.getElementsByClassName('autocompleteText')[0].textContent];
    let activeAnswer = activeAnswers[0];

    let questionIndexes = activeAnswer.id.split('-').slice(1);
    questionIndexes = questionIndexes.map(element => {
        let newElement = parseInt(element);
        return newElement - 1
    })

    for (let index = 0; index < 2; index++) {
        let isCurrentQuestionCorrect = false;
        let question = questionsGenerated[index][questionIndexes[index]];

        if (question['questionType'] == 'team') {
            if (guessStats['teams'].includes(question['name'])) {
                isCurrentQuestionCorrect = true;
            }
        } else {
            switch (question['attributeType']) {
                case 'count':
                    if (guessStats[question['name']] >= question['boundary']) isCurrentQuestionCorrect = true;
                    break;
                case 'battingRate':
                    if (guessStats[question['name']] >= question['boundary']) isCurrentQuestionCorrect = true;
                    break;
                case 'bowlingRate':
                    if (guessStats[question['name']] <= question['boundary']) isCurrentQuestionCorrect = true;
                    break;
            }
        }

        if (isCurrentQuestionCorrect == false) return false;
    }

    return true;
    
}

let guessesLeft = 9;

function updateAnswer(guess) {
    let activeAnswer = activeAnswers[0];

    if (verifyAttempt(guess)) {
        guess.getElementsByClassName('autocompleteText')[0].style.color = 'green';
        activeAnswer.textContent = guess.getElementsByClassName('autocompleteText')[0].textContent;

        overlay.classList.remove('overlay-active');
        document.getElementsByClassName('activeAnswer')[0].classList.remove('activeAnswer');
        searchContainer.style.opacity = 0;
        searchContainer.style.pointerEvents = 'none';
        searching = false;
    } else {
        guess.getElementsByClassName('autocompleteText')[0].style.color = 'red';
    }

    guessesLeft--;

}

html.onclick = e => {
    toggleSearchBar(e)
}

html.onkeydown = e => {
    toggleSearchBar(e)
}


autocomplete(searchBar, players)