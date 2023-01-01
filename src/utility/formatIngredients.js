export default function formatIngredients(string) {

    // removing '...'
    let instructionsString = string.replace(/\.\.\./g, '');

    // replacing 'oz.' with 'oz'
    instructionsString = instructionsString.replace(/oz\./gi, 'oz');

    // removing '1. ', '2. ', '3. ', etc.
    instructionsString = instructionsString.replace(/\d\.\s/, '');

    // if digit followed by a dot and then a character, then delete the digit and dot
    instructionsString = instructionsString.replace(/\s\d\.([A-Za-z])/g, '. $1');

    // adding spaces after commas if they don't exist.
    instructionsString = instructionsString.replace(/,([A-Za-z])/g, ', $1');

    // splits instructions by '. ' (sentences) then add back a period to the sentences that were stripped of one.
    let instructionsArray = instructionsString.split(/\.\s/).map(str => str.endsWith('!') ? str : !str.endsWith('.') ? str.concat('.') : str);

    // remove 'and' at the start of sentences.
    instructionsArray = instructionsArray.map(str => str.slice(0, 3).toLowerCase() === 'and' ? str.slice(3) : str)

    // removes white space from start and end.
    instructionsArray = instructionsArray.map(str => str.trim());

    // capitalise first letter of each instruction sentence
    instructionsArray = instructionsArray.map(str => str.charAt(0).toUpperCase() + str.slice(1));

    return instructionsArray;

}