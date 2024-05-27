"use strict";

const Translator = require("../components/translator.js");

module.exports = function (app) {
  const translator = new Translator();

  app.route("/api/translate").post((req, res) => {
    let text = req.body.text;
    let locale = req.body.locale;
    if (text == undefined || !locale) {
      return res.send({ error: "Required field(s) missing" });
    }
    if (!text) {
      return res.send({ error: "No text to translate" });
    }
    if (locale != "american-to-british" && locale != "british-to-american") {
      return res.send({ error: "Invalid value for locale field" });
    }
    let translatedtext = translator.translate(text, locale);
    return res.send({ text, translation: translatedtext });
  });

  // app.route('/api/test')
  //   .get((req, res) => {
  //     let testtext = translator.translate('Like a high tech Rube Goldberg machine.', 'american-to-british');
  //     return res.send({testtext})
  //   })
};
