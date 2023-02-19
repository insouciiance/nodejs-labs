import fs from "fs";
import { Item } from "rss-parser";
import { OUTPUT_DIRECTORY } from "../../scraper/config.js";
import { IFeedItemWriter } from "./feed-item-writer.iface.js";

export class FileFeedItemWriter implements IFeedItemWriter {
  private readonly directoryPath : string;

  constructor(directoryPath : string = null) {
    this.directoryPath = directoryPath ?? OUTPUT_DIRECTORY;
  }

  export(item : Item) {
    const pubDate = Date.parse(item.isoDate);
    const filePath = `${this.directoryPath}/${pubDate}`;
   
    if (fs.existsSync(filePath))
      return;

    if (!fs.existsSync(this.directoryPath))
      fs.mkdirSync(this.directoryPath);

    fs.writeFileSync(
      filePath,
      JSON.stringify(item, null, 2),
      {
        encoding: "utf-8",
      });
  }
}
