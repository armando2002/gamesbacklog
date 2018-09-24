

// create an element based off the game
function generateGameElement(game) {
    return `
    <li>
                    <div class="card">
                    <object data="https://images.pexels.com/photos/163114/mario-luigi-figures-funny-163114.jpeg" type="image/jpeg">
                        <img src=${game.imageURL}>
                    </object>
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
        $('.js-gameUl').append(gameElement);
    });
}




// gather list of games from API and then call generateGamesList function
function getGames() {
    let url = 'https://limitless-tor-81099.herokuapp.com/gamesapi';
    fetch(url).then(
        function(json) {
            const gamesList = json.json();
            generateGamesList(gamesList);
        }
    );
    }

// add game from form
function addGame() {
    let url = 'https://limitless-tor-81099.herokuapp.com/gamesapi';
    let testGame = {
        "title": "Kirby Test #2",
        "platform": "NES",
        "status": "Test",
        "imageURL": "https://tinyurl.com/y7gkpqjq"
    };

    fetch(url, {
        method: 'post',
        body: testGame })
        .then(function(res) {
            return res.json();
        })
    }


$(getGames);
$(addGame);