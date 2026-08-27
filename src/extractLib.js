import {ZipReader, BlobReader, ZipDirectoryEntry} from '@zip.js/zip.js';

/**
 * Extracts the contents of the LIBRARY folder from the FLA as XML.
 * @param {File} file - The FLA.
 * @returns {ZipEntry[]} - An array of files.
 */
export default async function extractLib(file){
    console.log(file);
    const reader = new ZipReader(new BlobReader(file));
    //    The folder        Get dir contents              Is it a folder?                        Is it named LIBRARY?     Get dir
    const entries = await reader.getEntries();
    const libFolder = entries.filter(entry => (entry instanceof ZipDirectoryEntry && entry.name == 'LIBRARY'))[0];
    const children = await libFolder.getChildren({recursive: true});
    console.log(children);
    return children;
}