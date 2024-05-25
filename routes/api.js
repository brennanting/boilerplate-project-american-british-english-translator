'use strict';

const Translator = require('../components/translator.js');

module.exports = function (app) {
  
  const translator = new Translator();

  app.route('/api/translate')
    .post((req, res) => {
      
    });

  app.route('/api/test')
    .get((req, res) => {
      console.log(translator.translate('Bicky had a bicky then went to the chippy at 7.30.', 'uk'));
      console.log(translator.translate('I made some self-rising flour and a rube goldberg device during spring break', 'us'))
    })
  
};
