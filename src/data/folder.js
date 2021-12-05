import { FOLDER_PATH } from "../constant/data.js"
import logger from "../logger/index.js"
import { access, mkdir, readdir, unlink } from "fs/promises"
import { join } from "path"

export async function initialize() {
  await create()
  await clear()
}

export async function create() {
  try {
    await access(FOLDER_PATH)
    logger.info("Data folder already exists")
  } catch {
    await mkdir(FOLDER_PATH)
    logger.info("Data folder was created")
  }
}

export async function clear() {
  try {
    const files = await readdir(FOLDER_PATH)
    if(files.length > 0) {
      for (const file of files) {
        try {
          const filePath = join(FOLDER_PATH, file)
          await unlink(filePath)
        } catch(err) {
            logger.error(`Removing ${filePath} file caused error: `, err)
        }
      }
      logger.info("Successfully deleted all files from data folder")
    } else {
      logger.info("Data folder is already empty")
    }
  } catch(err) {
    logger.error(`Reading ${FOLDER_PATH} folder cased error: `, err)
  }
}

export default { initialize, create, clear };
