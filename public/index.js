
// gather list of games from API
function getGames() {
    let url = 'https://limitless-tor-81099.herokuapp.com/gamesapi';
    const games = fetch(url)
    .then((resp) => resp.json());
    alert(games);
    return games;
}

// test loading of page
$(getGames);

// create an element based off the game

// for each game create an element and add to the page
