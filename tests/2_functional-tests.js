const chai = require("chai");
const chaiHttp = require("chai-http");
const assert = chai.assert;
const server = require("../server.js");

chai.use(chaiHttp);

let Translator = require("../components/translator.js");

suite("Functional Tests", () => {
  // Translation with text and locale fields: POST request to /api/translate
  test("Test POST to /api/translate with text and locale fields", (done) => {
    chai
      .request(server)
      .keepOpen()
      .post("/api/translate")
      .send({
        text: "Our town councilor is Mr. Candor",
        locale: "american-to-british",
      })
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.deepEqual(res.body, {
          text: "Our town councilor is Mr. Candor",
          translation:
            'Our town <span class="highlight">councillor</span> is <span class="highlight">Mr</span> <span class="highlight">candour</span>',
        });
        done();
      });
  });

  // Translation with text and invalid locale field: POST request to /api/translate
  test("Test POST to /api/translate with text and invalid locale field", (done) => {
    chai
      .request(server)
      .keepOpen()
      .post("/api/translate")
      .send({
        text: "Our town councilor is Mr. Candor",
        locale: "singlish-to-british",
      })
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.deepEqual(res.body, { error: "Invalid value for locale field" });
        done();
      });
  });

  // Translation with missing text field: POST request to /api/translate
  test("Test POST to /api/translate with missing text field", (done) => {
    chai
      .request(server)
      .keepOpen()
      .post("/api/translate")
      .send({
        locale: "american-to-british",
      })
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.deepEqual(res.body, { error: "Required field(s) missing" });
        done();
      });
  });

  // Translation with missing locale field: POST request to /api/translate
  test("Test POST to /api/translate with missing locale field", (done) => {
    chai
      .request(server)
      .keepOpen()
      .post("/api/translate")
      .send({
        text: "Our town councilor is Mr. Candor",
      })
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.deepEqual(res.body, { error: "Required field(s) missing" });
        done();
      });
  });

  // Translation with empty text: POST request to /api/translate
  test("Test POST to /api/translate with empty text field", (done) => {
    chai
      .request(server)
      .keepOpen()
      .post("/api/translate")
      .send({
        text: "",
        locale: "american-to-british",
      })
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.deepEqual(res.body, { error: "No text to translate" });
        done();
      });
  });

  // Translation with text that needs no translation: POST request to /api/translate
  test("Test POST to /api/translate with text that needs no translation", (done) => {
    chai
      .request(server)
      .keepOpen()
      .post("/api/translate")
      .send({
        text: "This text is perfectly alright",
        locale: "american-to-british",
      })
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.deepEqual(res.body, {
          text: "This text is perfectly alright",
          translation: "Everything looks good to me!",
        });
        done();
      });
  });
});
