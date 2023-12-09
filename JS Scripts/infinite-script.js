// 'players' array found at data/JSON Files/all-players.js
// 'stats' object found at data/JSON Files/all-stats.js

// Fetching required DOM elements

const overlay = document.querySelector('.overlay');

const searchContainer = document.querySelector('#searchContainer');
const searchBar = document.querySelector('#searchBar');
const html = document.querySelector('html');
const autocompleteContainer = document.querySelector('.autocompleteContainer');
const autocompleteItems = document.getElementsByClassName('autocompleteItem');
const activeAnswers = document.getElementsByClassName('activeAnswer');
const guessesLeftDisplay = document.querySelector('.guessesLeftDisplay');
const timerDisplay = document.querySelector('.timer');
const endGameScreen = document.querySelector('#endGameScreen');
const emojiGrid = document.querySelector('#emojiGrid');
const closeScreenIcon = document.querySelector('#closeScreenIcon');
const finalTimeText = document.querySelector('#finalTimeText');
const shareResultsButton = document.querySelector('#shareResultsButton');

// Starting a timer

let timer;
function startTimer(startTime, display) {
    let time = startTime, minutes, seconds;

    timer = setInterval(function () {
        minutes = parseInt(time / 60)
        seconds = parseInt(time % 60);
        seconds = seconds < 10 ? "0" + seconds : seconds;
        display.textContent = minutes + ":" + seconds;
        time++;
    }, 1000);
}

window.onload = () => {
    const START_TIME = 0;
    startTimer(START_TIME, timerDisplay);
}

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

const answerIDs = [
    ['answer-1-1', 'answer-2-1', 'answer-3-1'],
    ['answer-1-2', 'answer-2-2', 'answer-3-2'],
    ['answer-1-3', 'answer-2-3', 'answer-3-3']
]

// Functions to generate and display grid questions

function generateQuestions(...questionArrays) {
    const possibleQuestions = [];
    for (let array of questionArrays) {
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

    return questionsGenerated;
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
displayQuestions(questionsGenerated, questionIDs);

let isPlaying = true;
let completedPlayers = []; // empty array to store names of players correctly guessed
let searching = false; // to detect if user is searching for a player

function checkIfCompleted(guess) {
    if (completedPlayers.includes(guess.getElementsByClassName('autocompleteText')[0].textContent)) {
        return true;
    } else {
        return false;
    }
}

function openSearchBar(e) {
    overlay.classList.add('overlay-active');
    searchContainer.style.opacity = 1;
    searchContainer.style.pointerEvents = 'auto';
    searchBar.focus();
    e.target.classList.add('activeAnswer');
    searching = true;

    searchBar.value = '';
    autocompleteContainer.innerHTML = '';
}

function closeSearchBar() {
    overlay.classList.remove('overlay-active');
    document.getElementsByClassName('activeAnswer')[0].classList.remove('activeAnswer');
    searchContainer.style.opacity = 0;
    searchContainer.style.pointerEvents = 'none';
    searching = false;
    
}

// Function to show search bar on click of grid box
function toggleSearchBar(e) {
    if (!isPlaying) return;

    if (!searching) {
        if (e.target.classList.contains('incomplete')) {
            openSearchBar(e);
        }
    } else {

        if (!(e.target.classList.contains('answer') || e.target.classList.contains('activeAnswer') || e.target.classList.contains('search')) || e.key == 'Escape') {
            closeSearchBar()
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
        
        let itemsCreated = 0;
        const MAX_ITEMS = 10;
        // create div for each match, adding to container
        for (let element of filteredArray) {
            if (itemsCreated > MAX_ITEMS) break;

            let elementDiv = document.createElement('div');
            elementDiv.classList.add('search', 'autocompleteItem');

            let elementText = document.createElement('div');
            elementText.classList.add('search', 'autocompleteText');
            elementText.textContent = element;
            elementDiv.appendChild(elementText);

            if (!(completedPlayers.includes(element))) {
                let selectButton = document.createElement('button');
                selectButton.classList.add('search', 'selectButton');
                selectButton.textContent = 'Select';
                elementDiv.appendChild(selectButton);

                // autocomplete input on clicking a match
                selectButton.onclick = () => {
                    updateAnswer(elementDiv);
                }
            }
            
            autocompleteContainer.appendChild(elementDiv);
            itemsCreated++;
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
                if (!checkIfCompleted(autocompleteItems[currentFocus])) {
                    autocompleteItems[currentFocus].getElementsByClassName('selectButton')[0].click();
                } else {
                    alert('Already guessed!');
                }
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
        return newElement - 1;
    });

    for (let index = 0; index < 2; index++) {
        let isCurrentQuestionCorrect = false;
        let question = questionsGenerated[index][questionIndexes[index]];

        if (question['questionType'] == 'team') {
            if (guessStats['teams'].some(element => {
                return question['identifiers'].includes(element);
            })) {
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
guessesLeftDisplay.textContent = guessesLeft;

function updateAnswer(guess) {
    let activeAnswer = activeAnswers[0];

    if (verifyAttempt(guess)) {
        guess.getElementsByClassName('autocompleteText')[0].style.color = 'green';
        activeAnswer.textContent = guess.getElementsByClassName('autocompleteText')[0].textContent;
        activeAnswer.classList.add('complete');
        activeAnswer.classList.remove('incomplete');

        completedPlayers.push(guess.getElementsByClassName('autocompleteText')[0].textContent);
        guess.removeChild(guess.getElementsByClassName('selectButton')[0]);

        closeSearchBar();
    } else {
        guess.getElementsByClassName('autocompleteText')[0].style.color = 'red';
    }

    guessesLeft--;
    guessesLeftDisplay.textContent = guessesLeft;

    if (guessesLeft == 0) {
       endGame();
    }
}

function endGame() {
    isPlaying = false;
    if (searching) closeSearchBar();
    clearInterval(timer);

    let finalTime = timerDisplay.textContent;
    finalTimeText.innerHTML = `You finished this grid in <span id="finalTimeDisplay">${finalTime}</span>`;

    let answers = [
        [false, false, false],
        [false, false, false],
        [false, false, false]
    ]

    for (let rowIndex in answerIDs) {
        for (let idIndex in answerIDs[rowIndex]) {
            if (document.getElementById(answerIDs[rowIndex][idIndex]).classList.contains('complete')) {
                answers[rowIndex][idIndex] = true;
            }
        }
    }

    let shareGrid = '';

    for (let row of answers) {
        for (let answer of row) {
            emojiGrid.innerHTML += answer ? '🟩' : '⬛️';
            shareGrid += answer ? '🟩' : '⬛️';
        }
        emojiGrid.innerHTML += '<br>';
        shareGrid += '\n';
    }

    const shareData = {
        title: `I completed today's IPL Immaculate Grid in ${finalTime}!`,
        text: `I completed today's IPL Immaculate Grid in ${finalTime}!\n${shareGrid}\nhttps://theabyss190.github.io/IPL-Immaculate-Grid/`,
    }

    shareResultsButton.onclick = async() => {
        try {
            await navigator.share(shareData);
            shareResultsButton.textContent = 'Success!';
        } catch (err) {
            console.log(err);
            shareResultsButton.style.backgroundColor = 'red';
            shareResultsButton.textContent = 'Oops... there was an error.';
            shareResultsButton.style.cursor = 'default';
        }
    }

    overlay.classList.add('overlay-active');
    endGameScreen.style.display = 'flex';
    setTimeout(() => endGameScreen.style.opacity = 1, 10);

    function closeScreen() {
        endGameScreen.style.opacity = 0;
        setTimeout(() => endGameScreen.style.display = 'none', 500);
        overlay.classList.remove('overlay-active');
    }

    endGameScreen.focus();

    html.onclick = e => {
        if (!(e.target.classList.contains('search') || e.target.classList.contains('endGame'))) closeScreen();
    }

    html.onkeydown = e => {
        if (e.key == 'Escape') closeScreen();
    }

    closeScreenIcon.onclick = () => closeScreen();
}

html.onclick = e => {
    toggleSearchBar(e)
}

html.onkeydown = e => {
    toggleSearchBar(e)
}

autocomplete(searchBar, players)