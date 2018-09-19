const chai = require('chai');
const chaiHttp = require('chai-http');

const { app, runServer, closeServer } = require("../src/app");

const expect = chai.expect;

chai.use(chaiHttp);

describe("Grab all games", function() {
    before(function() {
        return runServer();
    });

    after(function() {
        return closeServer();
    });

    it("should return all games on GET", function() {
        return chai
        .request(app)
        .get("/api")
        .then(function(res) {
            expect(res).to.have.status(200);
            expect(res).to.be.json;
          expect(res.body.length).to.be.at.least(1);
         });
    });
});