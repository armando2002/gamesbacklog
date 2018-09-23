const chai = require('chai');
const chaiHttp = require('chai-http');

const { app, runServer, closeServer } = require("../src/app");

const expect = chai.expect;

// declare variable for model.js & use mongoose.find to compare IDs
import Backlog from '../src/api/resources/backlog.model';

chai.use(chaiHttp);




describe("Test CRUD for gamesbacklog API", function() {
    // declare response ID variable for use below
    let testResId = "";

    before(function() {
        return runServer();
    });

    after(function() {
        return closeServer();
    });
    // test the GET api
    it("should return all games on GET", function() {
        return chai
        .request(app)
        .get("/gamesapi")
        .then(function(res) {
            expect(res).to.have.status(200);
            expect(res).to.be.json;
         //commenting out for now, this requires an item in the DB
         // expect(res.body.length).to.be.at.least(1);
         });
    });

    // test the POST api to add a game
    it("should add an item on POST", function() {
        const newItem = { "title" : "Test Game 092218"};
        return chai.request(app)
        .post("/gamesapi")   
        .send(newItem)
        .then(function(res) {
            expect(res).to.have.status(200);
            expect(res).to.be.json;
            expect(res.body).to.be.a("object");
            expect(res.body).to.include.keys("_id", "title", "__v");
            expect(res.body.id).to.not.equal(null);
            // grab the object ID for later use in UPDATE and DELETE tests
            testResId = res.body._id;
            // return the ID from the DB
            return Backlog.findById(testResId);
            })
        // expect response object title and ID to match DB title and ID
        .then(function(dbOutput) {
            // DB title should match RES title
            expect(dbOutput.title).to.be.equal(newItem.title);
            // same for ID
            console.log("dbOutput_id = "+dbOutput._id);
            let dbID = dbOutput._id.toString();
            console.log("dbID = "+dbID);
            expect(dbID).to.be.equal(testResId);
        })
    });

    // test the UPDATE api to update a game
    it('should update a game on PUT', function() {
        // get games and store the first one in an object
      
        // update the object
        const updateGame = {
            _id: testResId,
            title: "My Updated Game",
            platform: "NES" };

        return chai.request(app)
            .put(`/gamesapi/${updateGame._id}`)
            .send(updateGame)
            .then(function(res) {
                expect(res).to.have.status(200);
            });
        // add verification from DB (findbyID)
    });

    // it should delete a game on DELETE
    it('should delete a game on delete', function() {
            return chai.request(app)
            .delete(`/gamesapi/${testResId}`)
            .then(function (res) {
                expect(res).to.have.status(200);
            });
        });

});
