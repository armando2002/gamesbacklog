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

                            <div id="editModal" class="modal">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <h2>Game Editor</h2>
                                    </div>
                                    <div class="modal-body">
                                        <form class="modal-form">
                                            Title: <input type="text" id="edittitle" value="${game.title}">
                                            Platform: <input type="text" id="editplatform" value="${game.platform}">
                                            Status: <input type="text" id="editstatus" value="${game.status}">
                                            Comments: <input type="text" id="editcomments" value="${game.comments}">
                                            Date Added: <input type="text" id="editdateadded" value="${game.dateAdded}">
                                            Last Played: <input type="text" id="editlastplayed" value="${game.lastPlayed}">
                                            <input type ="hidden" class="js-gameid hiddenid" id="editgameid" value="${game._id}">
                                            <input type="button" value="Cancel" class="btn cancelBtn" id="cancelBtn">
                                            <input type="submit" value="Save" class="btn" id="saveBtn">
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
                // vars for delete function
                const deleteId = $(this).closest('.card-content').find('.js-gameid').text();
                console.log(deleteId);
                let url = `https://limitless-tor-81099.herokuapp.com/gamesapi/${deleteId}`;
                // grab the clicked button id
                let id = $(document.activeElement).attr('id')

                if (id == 'edit')
                {
                    // need to add a popup modal that takes over the screen, is prepopulated with the game info, and allows the user to PUT changes
                    console.log("This is the edit button");
                    // pop up modal
                    modal.style.display = 'block';
                }
                else {
                    // delete game using Fetch
                    // doesn't seem to throw the catch if there's an error
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
                }
              });

            // form event listener for modal (PUT) and update function (I'd like to take this function outside of the event listener, but I'm stumped on how to pass the unique URL with ID that is needed)
            $('.modal-form').on('submit', function(event) {
                event.preventDefault();
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
                console.log(formData);
                console.log("Form submitted");
            });

            // create vars for modal and cancel button
            var modal = document.getElementsByClassName('modal')[0];
            var cancelBtn = document.getElementsByClassName('cancelBtn')[0];

            // listen for clicks to cancel button, and outside of modal
            cancelBtn.addEventListener('click', closeModal);
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
