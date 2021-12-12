import logger from "../logger/index.js"
import { FOLDER_PATH  } from "../constant/data.js"
import { writeToPath } from "fast-csv"
import { resolve } from "path"

export async function writeToCsvFile(fileName, data) {
  logger.info(`Writing data to ${fileName}.csv`)
  const filePath = resolve(FOLDER_PATH, `${fileName}.csv`)
  return new Promise((resolve, reject) => {
    writeToPath(filePath, data, { headers: true })
      .on("finish", () => {
        logger.info(`${fileName}.csv was written successfully`)
        resolve()
      })
      .on("error", error => {
        logger.error(`Writing ${fileName}.csv file caused error: `, error)
        reject()
      })
  })
}
