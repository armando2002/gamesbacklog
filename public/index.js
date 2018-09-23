

// create an element based off the game
function generateGameElement(game) {
    return `
    <li>
                    <div class="card">
                        <img src="https://images.pexels.com/photos/163114/mario-luigi-figures-funny-163114.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
                            alt="">
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
    function(resp){ return resp.json();}
    ).then(
        function(json) {
            console.log(json);
            generateGamesList(json);
        }
    )
    }

$(getGames);