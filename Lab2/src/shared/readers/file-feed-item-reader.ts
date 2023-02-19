import fs, { Dirent } from "fs";
import { Item } from "rss-parser";
import { OUTPUT_DIRECTORY } from "../../scraper/config.js";
import { IFeedItemReader } from "./feed-item-reader.iface.js";

export class FileFeedItemReader implements IFeedItemReader {
  private readonly directoryPath : string;

  constructor(directoryPath : string = null) {
    this.directoryPath = directoryPath ?? OUTPUT_DIRECTORY;
  }
  
  enumerateItems() : Iterable<Item> {
    const dir = fs.opendirSync(this.directoryPath);
    return enumerateInternal();

    function * enumerateInternal() {
      let nextEntry : Dirent = null;

      while ((nextEntry = dir.readSync()) != null) {
        if (!nextEntry.isFile())
          continue;

        const feedItemJson = fs.readFileSync(`${dir.path}/${nextEntry.name}`).toString("utf-8");
        yield JSON.parse(feedItemJson);
      }

      dir.close();
    }
  }
}
