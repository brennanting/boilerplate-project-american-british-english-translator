const chai = require("chai");
const assert = chai.assert;

const Translator = require("../components/translator.js");

function removeSpans(string) {
  return string
    .replaceAll('<span class="highlight">', "")
    .replaceAll("</span>", "");
}

suite("Unit Tests", () => {
  let translator = new Translator();
  // Test removing spans
  // test('Test removing spans', () => {
  //   let teststr = removeSpans('Test <span class="highlight">Lorem Ipsum</span> Dolor Sit <span class="highlight">Amet</span>')
  //   console.log (teststr);
  //   assert.equal( teststr , 'Test Lorem Ipsum Dolor Sit Amet')
  // })

  // Translate Mangoes are my favorite fruit. to British English
  test("Translate Mangoes are my favorite fruit. to British English", () => {
    let result = removeSpans(
      translator.translate(
        "Mangoes are my favorite fruit.",
        "american-to-british",
      ),
    );
    assert.isOk(result);
    assert.isString(result);
    assert.equal(result, "Mangoes are my favourite fruit.");
  });

  // Translate I ate yogurt for breakfast. to British English
  test("Translate I ate yogurt for breakfast. to British English", () => {
    let result = removeSpans(
      translator.translate(
        "I ate yogurt for breakfast.",
        "american-to-british",
      ),
    );
    assert.isOk(result);
    assert.isString(result);
    assert.equal(result, "I ate yoghurt for breakfast.");
  });

  // Translate We had a party at my friend's condo. to British English
  test("Translate We had a party at my friend's condo. to British English", () => {
    let result = removeSpans(
      translator.translate(
        "We had a party at my friend's condo.",
        "american-to-british",
      ),
    );
    assert.isOk(result);
    assert.isString(result);
    assert.equal(result, "We had a party at my friend's flat.");
  });

  // Translate Can you toss this in the trashcan for me? to British English
  test("Translate Can you toss this in the trashcan for me? to British English", () => {
    let result = removeSpans(
      translator.translate(
        "Can you toss this in the trashcan for me?",
        "american-to-british",
      ),
    );
    assert.isOk(result);
    assert.isString(result);
    assert.equal(result, "Can you toss this in the bin for me?");
  });

  // Translate The parking lot was full. to British English
  test("Translate The parking lot was full. to British English", () => {
    let result = removeSpans(
      translator.translate("The parking lot was full.", "american-to-british"),
    );
    assert.isOk(result);
    assert.isString(result);
    assert.equal(result, "The car park was full.");
  });

  // Translate Like a high tech Rube Goldberg machine. to British English
  test("Translate Like a high tech Rube Goldberg machine. to British English", () => {
    let result = removeSpans(
      translator.translate(
        "Like a high tech Rube Goldberg machine.",
        "american-to-british",
      ),
    );
    assert.isOk(result);
    assert.isString(result);
    assert.equal(result, "Like a high tech Heath Robinson device.");
  });

  // Translate To play hooky means to skip class or work. to British English
  test("Translate To play hooky means to skip class or work. to British English", () => {
    let result = removeSpans(
      translator.translate(
        "To play hooky means to skip class or work.",
        "american-to-british",
      ),
    );
    assert.isOk(result);
    assert.isString(result);
    assert.equal(result, "To bunk off means to skip class or work.");
  });

  // Translate No Mr. Bond, I expect you to die. to British English
  test("No Mr. Bond, I expect you to die.", () => {
    let result = removeSpans(
      translator.translate(
        "No Mr. Bond, I expect you to die.",
        "american-to-british",
      ),
    );
    assert.isOk(result);
    assert.isString(result);
    assert.equal(result, "No Mr Bond, I expect you to die.");
  });

  // Translate Dr. Grosh will see you now. to British English
  test("Translate Dr. Grosh will see you now. to British English", () => {
    let result = removeSpans(
      translator.translate(
        "Dr. Grosh will see you now.",
        "american-to-british",
      ),
    );
    assert.isOk(result);
    assert.isString(result);
    assert.equal(result, "Dr Grosh will see you now.");
  });

  // Translate Lunch is at 12:15 today. to British English
  test("Translate Lunch is at 12:15 today. to British English", () => {
    let result = removeSpans(
      translator.translate("Lunch is at 12:15 today.", "american-to-british"),
    );
    assert.isOk(result);
    assert.isString(result);
    assert.equal(result, "Lunch is at 12.15 today.");
  });

  // Translate We watched the footie match for a while. to American English
  test("Translate We watched the footie match for a while. to American English", () => {
    let result = removeSpans(
      translator.translate(
        "We watched the footie match for a while.",
        "british-to-american",
      ),
    );
    assert.isOk(result);
    assert.isString(result);
    assert.equal(result, "We watched the soccer match for a while.");
  });

  // Translate Paracetamol takes up to an hour to work. to American English
  test("Translate Paracetamol takes up to an hour to work. to American English", () => {
    let result = removeSpans(
      translator.translate(
        "Paracetamol takes up to an hour to work.",
        "british-to-american",
      ),
    );
    assert.isOk(result);
    assert.isString(result);
    assert.equal(result, "Tylenol takes up to an hour to work.");
  });

  // Translate First, caramelise the onions. to American English
  test("Translate First, caramelise the onions. to American English", () => {
    let result = removeSpans(
      translator.translate(
        "First, caramelise the onions.",
        "british-to-american",
      ),
    );
    assert.isOk(result);
    assert.isString(result);
    assert.equal(result, "First, caramelize the onions.");
  });

  // Translate I spent the bank holiday at the funfair. to American English
  test("Translate I spent the bank holiday at the funfair. to American English", () => {
    let result = removeSpans(
      translator.translate(
        "I spent the bank holiday at the funfair.",
        "british-to-american",
      ),
    );
    assert.isOk(result);
    assert.isString(result);
    assert.equal(result, "I spent the public holiday at the carnival.");
  });

  // Translate I had a bicky then went to the chippy. to American English
  test("Translate I had a bicky then went to the chippy. to American English", () => {
    let result = removeSpans(
      translator.translate(
        "I had a bicky then went to the chippy.",
        "british-to-american",
      ),
    );
    assert.isOk(result);
    assert.isString(result);
    assert.equal(result, "I had a cookie then went to the fish-and-chip shop.");
  });

  // Translate I've just got bits and bobs in my bum bag. to American English
  test("Translate I've just got bits and bobs in my bum bag. to American English", () => {
    let result = removeSpans(
      translator.translate(
        "I've just got bits and bobs in my bum bag.",
        "british-to-american",
      ),
    );
    assert.isOk(result);
    assert.isString(result);
    assert.equal(result, "I've just got odds and ends in my fanny pack.");
  });

  // Translate The car boot sale at Boxted Airfield was called off. to American English
  test("Translate The car boot sale at Boxted Airfield was called off. to American English", () => {
    let result = removeSpans(
      translator.translate(
        "The car boot sale at Boxted Airfield was called off.",
        "british-to-american",
      ),
    );
    assert.isOk(result);
    assert.isString(result);
    assert.equal(result, "The swap meet at Boxted Airfield was called off.");
  });

  // Translate Have you met Mrs Kalyani? to American English
  test("Translate Have you met Mrs Kalyani? to American English", () => {
    let result = removeSpans(
      translator.translate("Have you met Mrs Kalyani?", "british-to-american"),
    );
    assert.isOk(result);
    assert.isString(result);
    assert.equal(result, "Have you met Mrs. Kalyani?");
  });

  // Translate Prof Joyner of King's College, London. to American English
  test("Translate Prof Joyner of King's College, London. to American English", () => {
    let result = removeSpans(
      translator.translate(
        "Prof Joyner of King's College, London.",
        "british-to-american",
      ),
    );
    assert.isOk(result);
    assert.isString(result);
    assert.equal(result, "Prof. Joyner of King's College, London.");
  });

  // Translate Tea time is usually around 4 or 4.30. to American English
  test("Translate Tea time is usually around 4 or 4.30. to American English", () => {
    let result = removeSpans(
      translator.translate(
        "Tea time is usually around 4 or 4.30.",
        "british-to-american",
      ),
    );
    assert.isOk(result);
    assert.isString(result);
    assert.equal(result, "Tea time is usually around 4 or 4:30.");
  });

  // Highlight translation in Mangoes are my favorite fruit.
  test("Translate Mangoes are my favorite fruit. to British English with highlights", () => {
    let result = translator.translate(
      "Mangoes are my favorite fruit.",
      "american-to-british",
    );
    assert.isOk(result);
    assert.isString(result);
    assert.equal(
      result,
      'Mangoes are my <span class="highlight">favourite</span> fruit.',
    );
  });

  // Highlight translation in I ate yogurt for breakfast.
  test("Translate I ate yogurt for breakfast. to British English with highlights", () => {
    let result = translator.translate(
      "I ate yogurt for breakfast.",
      "american-to-british",
    );
    assert.isOk(result);
    assert.isString(result);
    assert.equal(
      result,
      'I ate <span class="highlight">yoghurt</span> for breakfast.',
    );
  });

  // Highlight translation in We watched the footie match for a while.
  test("Translate We watched the footie match for a while. to American English with highlights", () => {
    let result = translator.translate(
      "We watched the footie match for a while.",
      "british-to-american",
    );
    assert.isOk(result);
    assert.isString(result);
    assert.equal(
      result,
      'We watched the <span class="highlight">soccer</span> match for a while.',
    );
  });

  // Highlight translation in Paracetamol takes up to an hour to work.
  test("Translate Paracetamol takes up to an hour to work. to American English with highlights", () => {
    let result = translator.translate(
      "Paracetamol takes up to an hour to work.",
      "british-to-american",
    );
    assert.isOk(result);
    assert.isString(result);
    assert.equal(
      result,
      '<span class="highlight">Tylenol</span> takes up to an hour to work.',
    );
  });
});
