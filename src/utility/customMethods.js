export const titleCase = (string) => {
    return string.toLowerCase().split(' ').map((word) => {
        return word.replace(word[0], word[0].toUpperCase());
    }).join(' ');
}

const changeFilter = (elementToMove, fromSetter, toSetter) => () => {
    // remove from source
    fromSetter(prevState => prevState.filter(sourceElement => sourceElement !== elementToMove))
    // add to destination
    toSetter(prevState => [...prevState, elementToMove]);
};