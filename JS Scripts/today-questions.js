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

const todayQuestions = generateQuestions(teamQuestions, statQuestions);