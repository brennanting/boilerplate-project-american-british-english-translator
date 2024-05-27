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
  // Translation with missing text field: POST request to /api/translate
  // Translation with missing locale field: POST request to /api/translate
  // Translation with empty text: POST request to /api/translate
  // Translation with text that needs no translation: POST request to /api/translate
});
