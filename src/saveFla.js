import {ZipReader, ZipWriter, BlobReader, BlobWriter, TextReader, Uint8ArrayReader, Uint8ArrayWriter} from '@zip.js/zip.js';

/**
 * Rebuilds the FLA, replacing any entry whose XML doc was edited with its serialized content.
 * @param {File} flaFile - The original FLA.
 * @param {Map<string, Document>} editedDocs - Map of zip filename -> edited XML Document.
 * @returns {Blob} - The rebuilt FLA as a zip blob.
 */
export default async function saveFla(flaFile, editedDocs){
    const reader = new ZipReader(new BlobReader(flaFile));
    const entries = await reader.getEntries();
    const writer = new ZipWriter(new BlobWriter('application/zip'));
    const serializer = new XMLSerializer();

    for(const entry of entries){
        if(entry.directory){
            await writer.add(entry.filename, null, { directory: true });
            continue;
        }
        if(editedDocs.has(entry.filename)){
            const xml = serializer.serializeToString(editedDocs.get(entry.filename));
            await writer.add(entry.filename, new TextReader(xml));
        } else {
            const bytes = await entry.getData(new Uint8ArrayWriter());
            await writer.add(entry.filename, new Uint8ArrayReader(bytes));
        }
    }

    await reader.close();
    return writer.close();
}
