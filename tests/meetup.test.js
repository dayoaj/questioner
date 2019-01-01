import { chai } from "chai";
import { chaiHttp } from "chai-http";
import server from "../server";

const expect = chai.expect();

chai.use(chaiHttp);

describe("Meetup", () => {
  let req = {
    body: {}
  };

  describe("GET /meetup/", () => {
    it("it should GET all the meetups", done => {
      chai
        .request(server)
        .get("/api/v1/meetup")
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an("object");
          expect(res.body).to.have.property("status");
          expect(res.body).to.have.property("data");
          expect(res.body.status).to.be.a("number");
          expect(res.body.data).to.be.an("array");
          done();
        });
    });
  });

  describe("POST /meetup", () => {
    it("it should create a meetup record", done => {
      req = {
        body: {
          location: "CCHub, Yaba, Lagos.",
          topic: "Python Web Developers Meetup",
          happeningOn: "2018-12-23T12:00:00.511Z",
          tags: ["Programming", "Python", "Web"],
          convener: "James Richard"
        }
      };
      chai
        .request(server)
        .post("/api/v1/meetup")
        .send(req.body)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an("object");
          expect(res.body).to.have.property("status");
          expect(res.body).to.have.property("data");
          expect(res.body.status).to.be.a("number");
          expect(res.body.data).to.be.an("array");
          expect(res.body.data.topic).to.be.a("string");
          expect(res.body.data.happeningOn).to.be.a("date");
          expect(res.body.data.tags).to.be.an("array");
          expect(res.body.data.convener).to.be.an("string");
          expect(res.body.status).to.equal(200);
          expect(res.body.data.topic).to.equal("Python Web Developers Meetup");
          expect(res.body.data.happeningOn).to.equal(
            "2018-12-23T12:00:00.511Z"
          );
          expect(res.body.data.tags).to.equal(["Programming", "Python", "Web"]);
          expect(res.body.data.convener).to.equal("James Richard");
          done();
        });
    });
  });
});
