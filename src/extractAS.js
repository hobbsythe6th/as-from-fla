import {TextWriter} from '@zip.js/zip.js'

/**
 * Extract the ActionScript from an XML file.
 * @param {ZipFileEntry} file - The XML
 * @param {string} filename - The filename
 * @param {boolean} binary - Is this a binary FLA?
 * @returns {object} - Object holding every script in the FLA.
 */
export default async function extractAS(file, filename = 'unnamed_file', binary = false){
    if(binary) console.log('Binary FLAs unsupported right now');
    let scripts = {};
    let text = await file.getData(new TextWriter());
    let parser = new DOMParser();
    let doc = parser.parseFromString(text, 'application/xml');
    let nm = filename;
    nm.replace('.xml', '')
    if (filename == 'unnamed_file') {
        const timeline = doc.getElementsByTagName('DOMTimeline')[0];
        if (timeline) nm = timeline.name;
    }
    const nodes = [...doc.getElementsByTagName('script')].map(node => {
        const frame = node.closest('DOMFrame');
        const layer = node.closest('DOMLayer');
        return {
            frame: frame ? frame.getAttribute('index') : null,
            layer: layer ? layer.getAttribute('name') : null,
            code: node.textContent
        };
    });
    if (nodes.length) scripts[nm] = nodes;
    return scripts;
}