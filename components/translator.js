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
  translate(inputtext, direction) {
    let refObj = {};
    let timeTest = "";
    let timeSign = "";
    let timeModifier = "";
    if (direction == "american-to-british") {
      refObj = amerObj;
      timeTest = /\d{1,2}:\d{2}/;
      timeSign = ":";
      timeModifier = ".";
    } else if (direction == "british-to-american") {
      refObj = britObj;
      timeTest = /\d{1,2}.\d{2}/;
      timeSign = ".";
      timeModifier = ":";
    } else {
      return false;
    }

    // Need to change this system
    // Ideal behaviour:
    // Time (e.g. 12.30) => keep as one cell
    // Titles (e.g. Dr.) => keep as one cell
    // Normal punctuation => don't keep
    let modiftext = inputtext.replace(/.?[^\w\s-]+(..)?/g, (match) => {
      if (timeTest.test(match)) {
        return match;
      }
      return match.replace(/[^\w\s]+/g, (match) => {
        return " " + match;
      });
    });

    let modiftext2 = modiftext.replace(
      /(mr|mrs|ms|mx|dr|prof)\s\./gi,
      (match) => {
        return match.split(" ").join("");
      },
    );

    let textArr = modiftext2.split(" ");
    let modifArr = [];
    let anyChanges = false;

    // for each word
    for (let i = 0; i < textArr.length; i++) {
      let word = textArr[i];

      // if this word has alr been included in prev loop
      if (modifArr[i]) {
        continue;
      } else {
        // check if it matches time
        if (timeTest.test(word)) {
          // make modification
          let strtopush =
            '<span class="highlight">' +
            word.replace(timeSign, timeModifier) +
            "</span>";
          modifArr.push(strtopush);

          // set something translated to true
          anyChanges = true;

          // if not check if it is in source obj
        } else {
          let nextTest = textArr
            .slice(i, i + 3)
            .join(" ")
            .toLowerCase();
          if (refObj.hasOwnProperty(nextTest)) {
            // change
            modifArr.push(
              "<span",
              'class="highlight">' + refObj[nextTest] + "<",
              "/span>",
            );
            // set true
            anyChanges = true;
          } else {
            nextTest = textArr
              .slice(i, i + 2)
              .join(" ")
              .toLowerCase();
            if (refObj.hasOwnProperty(nextTest)) {
              // change
              modifArr.push(
                "<span",
                'class="highlight">' + refObj[nextTest] + "</span>",
              );
              // set true
              anyChanges = true;
            } else if (refObj.hasOwnProperty(word.toLowerCase())) {
              // make modification
              let strtopush =
                '<span class="highlight">' +
                refObj[word.toLowerCase()] +
                "</span>";
              modifArr.push(strtopush);
              // set something translated to true
              anyChanges = true;
              // if not check if it plus the next word is in source
            } else {
              modifArr.push(word);
            }
          }
        }
      }
    }

    // if nothing translated set text to looks good
    if (!anyChanges) {
      return "Everything looks good to me!";
    }
    // join back text
    let outputtext = modifArr.join(" ");
    outputtext = outputtext.replace(/\s[^\w\s<]+/g, (match) => {
      return match.trim();
    });
    // return text
    return outputtext;
  }
}

module.exports = Translator;
