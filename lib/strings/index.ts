
/**
 * String to Title Case
 * 
 * This function converts a string to title case, i.e., the first letter of each word is capitalized.
 * 
 * @param str The string to convert to title case.
 * @returns The string in title case.
 */
const toTitleCase = (str: string) => {
    return str.replace(/\w\S*/g, (txt) => {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
};

export { toTitleCase };