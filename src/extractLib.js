import {ZipReader, BlobReader} from '@zip.js/zip.js';

/**
 * Extracts the contents of the LIBRARY folder from the FLA as XML.
 * @param {File} file - The FLA.
 * @returns {ZipEntry[]} - An array of files.
 */
export default async function extractLib(file){
    const reader = new ZipReader(new BlobReader(file));
    const entries = await reader.getEntries();
    const children = entries.filter(entry => !entry.directory && entry.filename.startsWith('LIBRARY/'));
    return children;
}