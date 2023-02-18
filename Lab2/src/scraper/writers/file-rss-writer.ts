import fs from "fs";
import Parser from "rss-parser";
import { OUTPUT_DIRECTORY } from "./../config.js";
import { IRssWriter } from "./rss-writer.iface.js";

export class FileRssWriter implements IRssWriter {
  export(item : Parser.Item) {
    const pubDate = Date.parse(item.isoDate);
    const filePath = `${OUTPUT_DIRECTORY}/${pubDate}`;
   
    if (fs.existsSync(filePath))
      return;

    if (!fs.existsSync(OUTPUT_DIRECTORY))
      fs.mkdirSync(OUTPUT_DIRECTORY);

    fs.writeFileSync(
      filePath,
      JSON.stringify(item, null, 2),
      {
        encoding: "utf8",
      });
  }
}
