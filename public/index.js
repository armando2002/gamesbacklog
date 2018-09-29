// create an element based off the game
function generateGameElement(game) {
    return `
    <li>
                    <div class="card">
                    <img src="https://images.pexels.com/photos/163114/mario-luigi-figures-funny-163114.jpeg" alt="">
                        <div class="card-content">
                            <h3 id="card-title">${game.title}</h3>
                            <p>${game.platform}</p>
                            <p>${game.status}</p>
                        </div>
                    </div>
                </li>
    `
}

// for each game create an element and add to the page
function generateGamesList(game) {
    $.each(game, function(index, value) { 
        let gameElement = generateGameElement(value);
        // debug
        // console.log("game element = "+ gameElement);
        $('.js-gameUl').append(gameElement);
    });
}




// gather list of games from API and then call generateGamesList function
function getGames() {
    let url = 'https://limitless-tor-81099.herokuapp.com/gamesapi';
    fetch(url)
    .then((resp) => resp.json())
    .then(function(data) {
          // debug
          //  console.log("list of games from fetch = "+ data);
            generateGamesList(data);
        }
    );
    }

// add game from form
// This isn't working, I'm getting a 400 and then a success alert
function addGame(game) {
    let url = 'https://limitless-tor-81099.herokuapp.com/gamesapi';
    let testGame = {
        "title": "Kirby Test #2",
        "platform": "NES",
        "status": "Test"
    };
    console.log(game);

    fetch(url, {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        // adding JSON.stringify to add "" to JS object keys
        body: JSON.stringify(game)})
        .then(function(res) {
            alert("Game added!");
            
            return res.json();
        })
        .catch(function(err) { console.log('Error adding game', err); });
    }
// this isn't working properly yet, trying form instead of button
// I want to prevent this button from going anywhere on the page or to a different page, can I use event.preventDefault()?
function addGameButton() {
    $("#form").submit(function(event) {
        // added event argument and function below
        event.preventDefault();
        const formData = {
            "title": $('#gametitle').val(),
            "platform": $('#platform').val(),
            "status": $('#status').val()
        }
        addGame(formData);
    });
}

$(getGames);
$(addGameButton);

/* // on document ready, when a button (only one for now) is clicked, add a game
$(document).ready(function() {
    $(".btn").click(function() {
        addGame();
    })
}); */