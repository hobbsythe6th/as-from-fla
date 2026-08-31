import {ZipReader, BlobReader} from '@zip.js/zip.js';

/**
 * Extracts the LIBRARY XML files and the main timeline (DOMDocument.xml) from the FLA.
 * @param {File} file - The FLA.
 * @returns {ZipEntry[]} - An array of files.
 */
export default async function extractLib(file){
    const reader = new ZipReader(new BlobReader(file));
    const entries = await reader.getEntries();
    const children = entries.filter(entry => !entry.directory &&
        (entry.filename.startsWith('LIBRARY/') || entry.filename === 'DOMDocument.xml'));
    return children;
}