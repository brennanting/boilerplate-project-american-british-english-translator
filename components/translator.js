const americanOnly = require("./american-only.js");
const americanToBritishSpelling = require("./american-to-british-spelling.js");
const americanToBritishTitles = require("./american-to-british-titles.js");
const britishOnly = require("./british-only.js");

// create american array
const americanOnlyKeys = Object.entries(americanOnly);
const americanSpellingKeys = Object.entries(americanToBritishSpelling);
const americanTitlesKeys = Object.entries(americanToBritishTitles);
const modifiedAmericanTitles = americanTitlesKeys.map((elem) => {
  return [elem[0], elem[1].charAt(0).toUpperCase() + elem[1].slice(1)];
});
const americanArr = [
  ...americanOnlyKeys,
  ...americanSpellingKeys,
  ...modifiedAmericanTitles,
];
const amerObj = Object.fromEntries(americanArr);
// create british array
const britOnlyKeys = Object.entries(britishOnly);
const britTitlesKeys = americanTitlesKeys.map((elem) => {
  return [elem[1], elem[0].charAt(0).toUpperCase() + elem[0].slice(1)];
});
const britArr = [
  ...britOnlyKeys,
  ...americanSpellingKeys.map((elem) => elem.reverse()),
  ...britTitlesKeys,
];
const britObj = Object.fromEntries(britArr);

class Translator {
  translate(inputtext, sourcelang) {
    let refObj = {};
    let timeTest = "";
    let timeSign = "";
    let timeModifier = "";
    if (sourcelang == "us") {
      refObj = amerObj;
      timeTest = /\d{1,2}:\d{2}/;
      timeSign = ":";
      timeModifier = ".";
    } else if (sourcelang == "uk") {
      refObj = britObj;
      timeTest = /\d{1,2}.\d{2}/;
      timeSign = ".";
      timeModifier = ":";
    } else {
      return false;
    }

    let modiftext = inputtext.replace(/.?[^\w\s-]+(..)?/g, (match) => {
      if (timeTest.test(match)) {
        return match;
      }
      return match.replace(/[^\w\s]+/g, (match) => {
        return " " + match;
      });
    });

    let textArr = modiftext.split(" ");
    let modifArr = [];
    let anyChanges = false;

    // for each word
    for (let i = 0; i < textArr.length; i++) {
      let word = textArr[i];

      // if this word has alr been included in prev loop
      if (modifArr[i]) {
        continue;
      } else {
        let nextTest = word.toLowerCase()
        // check if it matches time
        if (timeTest.test(nextTest)) {
          // make modification
          let strtopush =
            '<span class="highlight">' +
            nextTest.replace(timeSign, timeModifier) +
            "</span>";
          modifArr.push(strtopush);

          // set something translated to true
          anyChanges = true;

          // if not check if it is in source obj
        } else if (refObj.hasOwnProperty(nextTest)) {
          // make modification
          let strtopush = '<span class="highlight">' + refObj[nextTest] + "</span>";
          modifArr.push(strtopush);
          // set something translated to true
          anyChanges = true;
          // if not check if it plus the next word is in source
        } else {
          nextTest = nextTest + " " + textArr[i + 1];
          nextTest = nextTest.toLowerCase();
          if (refObj.hasOwnProperty(nextTest)) {
            // change
            modifArr.push(
              "<span",
              'class="highlight">' + refObj[nextTest] + "</span>",
            );
            // set true
            anyChanges = true;
          } else {
            // if not check if it plus the next 2 words is in source
            nextTest = nextTest + ' ' + textArr[i + 2];
            nextTest = nextTest.toLowerCase();
            if (refObj.hasOwnProperty(nextTest)) {
              // change
              modifArr.push("<span", 'class="highlight">' + refObj[nextTest] + '<' + '/span>')
              // set true
              anyChanges = true;
            } else {
              modifArr.push(word);
            }
          }
        }

        
      }
    }

    // if nothing translated set text to looks good
    if (!anyChanges) {
      return {text: inputtext, translation: 'Everything looks good to me!'}
    }
    // join back text
    let outputtext = modifArr.join(" ");
    outputtext = outputtext.replace(/\s[^\w\s<]+/g, (match) => {
      return match.trim();
    });
    // return text
    return {text: inputtext, translation: outputtext};
  }
}

module.exports = Translator;
