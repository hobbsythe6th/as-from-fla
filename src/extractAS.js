/**
 * Extract the ActionScript from an XML file.
 * @param {File} file - The XML
 * @param {boolean} binary - Is this a binary FLA?
 * @returns {object} - Object holding every script in the FLA.
 */
export default function extractAS(file, binary = false){
    if(binary) console.log('Binary FLAs unsupported right now');
    let scripts = {};
    let parser = new DOMParser();
    parser.parseFromString(file);
    return scripts;
}