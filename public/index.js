// create an element based off the game, including the modal for editing game
function generateGameElement(game) {
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

                            <form class="modify">
                                <input type="hidden" name="id" value="${game._id}">
                                <input type="hidden" name="title" value="${game.title}">
                                <input type="submit" class="editgamebutton btn" id="edit" value="Edit Game">
                                <input type="submit" class="deletegamebutton btn" id="delete" value="Delete Game">
                            </form>

                            <div id="editmodal-${game._id}" class="modal">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <h2>Game Editor</h2>
                                    </div>
                                    <div class="modal-body">
                                        <form class="modal-form-${game._id}">
                                            Title: <input type="text" id="edittitle" value="${game.title}">
                                            Platform: <input type="text" id="editplatform" value="${game.platform}">
                                            Status: <input type="text" id="editstatus" value="${game.status}">
                                            Comments: <input type="text" id="editcomments" value="${game.comments}">
                                            Date Added: <input type="text" id="editdateadded" value="${game.dateAdded}">
                                            Last Played: <input type="text" id="editlastplayed" value="${game.lastPlayed}">
                                            <input type ="hidden" class="js-gameid hiddenid" id="editgameid" value="${game._id}">
                                            <input type="button" value="Cancel" class="btn cancelBtn">
                                            <input type="submit" value="Save" class="btn saveBtn">
                                        </form>
                                    </div>
                                </div>
                            </div>

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

            generateGamesList(data);

            // form event listener (for delete and edit), needs to be here as games are added to DOM
            $('.modify').on('submit', function (event) {
                event.preventDefault();
                // var to grab ID for delete function
                let deleteId = $(this).closest('.card-content').find('.js-gameid').text();
                // var to find closest cancel button (only one) within clicked game
                let cancelBtn = $(this).closest('.card-content').find('.cancelBtn');
                // var to find closest modal (only one) within clicked game
                let modal = document.getElementById('editmodal-'+deleteId);
                // var for URL of specific game
                let url = `https://limitless-tor-81099.herokuapp.com/gamesapi/${deleteId}`;
                // grab the clicked button type (either edit or delete)
                let id = $(document.activeElement).attr('id')

                if (id == 'edit')
                {
                    console.log("ID of game is "+deleteId);
                    // listen for clicks to cancel button, and outside of modal
                    cancelBtn[0].addEventListener('click', closeModal);
                    window.addEventListener('click', clickOutside);

                    // close modal
                    function closeModal(){
                        modal.style.display = 'none';
                    }

                    // close modal if outside clicked
                    function clickOutside(e){
                        if(e.target == modal){
                            modal.style.display = 'none';
                        }
                    }
                    // pop up modal specific
                    modal.style.display = 'block';
                }
                else {
                    // delete game using Fetch
                    // doesn't seem to throw the catch if there's an error
                    fetch(url, {
                        method: 'delete'
                        })
                        .then(function(res) {
                           // if res.status != 200 or deleted
                            toastr.success('Game has been deleted', 'Success');
                            getGames();
                            return res.json();
                        })
                        .catch(function(err) { 
                            console.log('Error deleting game', err); 
                    })
                }
              });

            // form event listener for modal (PUT) and update function
            // need to set up a unique id for the event listerer and hope it works, otherwise need to set unique IDs for each item in the form object
            $(`.modal-form`).on('submit', function(event) {
                event.preventDefault();
                // debugger;
                // grab the form data
                const formData = {
                    "_id": $('#editgameid').val(),
                    "title": $('#edittitle').val(),
                    "platform": $('#editplatform').val(),
                    "status": $('#editstatus').val(),
                    "comments": $('#editcomments').val(),
                    "dateAdded": $('#editdateadded').val(),
                    "lastPlayed": $('#editlastalayed').val()
                }
                
                // debug for JSON object
                console.log("stringified "+JSON.stringify(formData));
                
                // grab the ID of the game and set up the request URL
                const updateId = $('#editgameid').val();
                console.log(updateId);
                let url = `https://limitless-tor-81099.herokuapp.com/gamesapi/${updateId}`;
                
                // update game using Fetch API PUT
                
                fetch(url, {
                    method: 'put',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    // adding JSON.stringify to add "" to JS object keys
                    body: JSON.stringify(formData)})
                    .then(function(res) {
                        // adding toastr alert
                        toastr.success('Game has been updated', 'Success');
                        // get new games list
                        getGames();
                        return res.json();
                    })
                    .catch(function(err) { console.log('Error updating game', err); 
                });                 
            });         
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

// after getGames() is loaded then load the rest of the functions in document.ready
// look up iife for understanding how page loading/binding elements and document.ready work
