import { dir } from "console";
import fs, { Dirent } from "fs";
import { Item } from "rss-parser";
import { OUTPUT_DIRECTORY } from "../../scraper/config.js";
import { IFeedItemReader } from "./feed-item-reader.iface.js";

export class FileFeedItemReader implements IFeedItemReader {
  private readonly directoryPath : string;

  constructor(directoryPath : string = null) {
    this.directoryPath = directoryPath ?? OUTPUT_DIRECTORY;
  }
  
  enumerateIds() : Iterable<string> {
    const dir = fs.opendirSync(this.directoryPath);
    return enumerateInternal();

    function * enumerateInternal() {
      let nextEntry : Dirent = null;

      while ((nextEntry = dir.readSync()) != null) {
        if (!nextEntry.isFile())
          continue;

        yield nextEntry.name;
      }

      dir.close();
    }
  }

  read(id : string): Item {
    try{
      const dir = fs.opendirSync(this.directoryPath);
      const filename = `${dir.path}/${id}`;
      const content = JSON.parse(fs.readFileSync(filename).toString("utf-8"));
      dir.close();
      return content;
    }catch(err){
      throw err;
    }
  }
}
