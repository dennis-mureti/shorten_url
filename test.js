const chai = require("chai");
const chaiHttp = require("chai-http");
const mongoose = require("mongoose");
const server = require("./server"); // Import the server
const Shorten = require("./models/Shorten");

const { expect } = chai;
chai.use(chaiHttp);

describe("URL Shortener Service", () => {
  before(async () => {
    await mongoose.connect("mongodb://localhost:27017/urlShortener", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    await Shorten.deleteMany({});
  });

  after(async () => {
    await mongoose.connection.close();
  });

  describe("POST /api/shorten", () => {
    it("should shorten a URL", (done) => {
      chai
        .request(server)
        .post("/api/shorten")
        .send({ originalUrl: "https://www.example.com" })
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an("object");
          expect(res.body).to.have.property("shortenedUrl");
          done();
        });
    });
  });

  describe("GET /:shortUrlId", () => {
    it("should redirect to the original URL", async () => {
      const shortUrlId = "testShortId";
      const originalUrl = "https://www.example.com";
      const shortenedUrl = `http://localhost:3000/${shortUrlId}`;

      const shorten = new Shorten({ originalUrl, shortenedUrl });
      await shorten.save();

      const res = await chai.request(server).get(`/${shortUrlId}`);
      expect(res).to.have.status(200);
      expect(res.redirects[0]).to.equal(originalUrl);
    });

    it("should return 404 for a non-existent shortened URL", (done) => {
      chai
        .request(server)
        .get("/nonexistent")
        .end((err, res) => {
          expect(res).to.have.status(404);
          done();
        });
    });
  });

  describe("GET /api/shortened", () => {
    it("should get all shortened URLs", async () => {
      const res = await chai.request(server).get("/api/shortened");
      expect(res).to.have.status(200);
      expect(res.body).to.be.an("object");
      expect(res.body).to.have.property("shortenedUrls");
      expect(res.body.shortenedUrls).to.be.an("array");
    });
  });
});
