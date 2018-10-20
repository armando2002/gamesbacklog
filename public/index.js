// create an element based off the game
function generateGameElement(game) {
    // debug for game ID
    /* var idType = typeof $(game._id);
    console.log("ID is a " + idType);
    console.log(`${game._id}`);
    console.log($(game._id)); */
    return `
    <li>
                    <div class="card">
                    <img src="https://images.pexels.com/photos/163114/mario-luigi-figures-funny-163114.jpeg" alt="">
                        <div class="card-content">
                            <h3 id="card-title">${game.title}</h3>
                            <p>Platform: ${game.platform}</p>
                            <p>Status: ${game.status}</p>
                            <p>Comments: ${game.comments}</p>
                            <p>Date Added: ${game.dateAdded}</p>
                            <p>Last Played: ${game.lastPlayed}</p>
                            <p class="js-gameid hiddenid">${game._id}</p>

                            <form id="modify">
                                <input type="hidden" name="id" value="${game._id}">
                                <input type="hidden" name="title" value="${game.title}">
                                <input type="submit" class="editgamebutton btn">Edit Game</input>
                                <input type="submit" class="deletegamebutton btn">Delete Game</input>
                            </form>
                        </div>
                    </div>
                </li>
    `
}

// for each game create an element and add to the page
function generateGamesList(game) {
    $('.js-gameUl').html('');
    $.each(game, function(index, value) { 
        let gameElement = generateGameElement(value);
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

            // form event listener (for delete and edit)
            $("#modify").submit(function(event) {
                console.log(event.currentTarget);
            });

            // event listener for delete game button, commenting out to try using form instead for edit/delete
           /*  $(".deletegamebutton").on("click", function() {

                // delete game using Fetch
                const deleteId = $(this).closest('.card-content').find('.js-gameid').text();
                let url = `https://limitless-tor-81099.herokuapp.com/gamesapi/${deleteId}`;
                fetch(url, {
                    method: 'delete'
                    })
                    .then(function(res) {
                        toastr.success('Game has been deleted', 'Success');
                        getGames();
                        return res.json();
                    })
                    .catch(function(err) { 
                        console.log('Error deleting game', err); 
                    })
                
            }); */
            
        })
    }

// add game from form
function addGame(game) {
    let url = 'https://limitless-tor-81099.herokuapp.com/gamesapi';

    fetch(url, {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        // adding JSON.stringify to add "" to JS object keys
        body: JSON.stringify(game)})
        .then(function(res) {
            // adding toastr alert
            toastr.success('Game has been added', 'Success');
            // alert("Game added!");
            // get new games list
            getGames();
            return res.json();
        })
        .catch(function(err) { console.log('Error adding game', err); });
    }

// add game on form completion and button click
function addGameButton() {
    $("#addgameform").submit(function(event) {
        event.preventDefault();
        const formData = {
            "title": $('#gametitle').val(),
            "platform": $('#platform').val(),
            "status": $('#status').val(),
            "comments": $('#comments').val(),
            "dateAdded": $('#dateadded').val(),
            "lastPlayed": $('#lastplayed').val()
        }
        addGame(formData);
    });
}

/* add init function for listeners */
$(getGames);
$(addGameButton);
