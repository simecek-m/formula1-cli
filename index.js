import dataFolder from "./src/data/folder.js"
import { writeToCsvFile} from "./src/data/file.js"
import { scrapeDriversFromYear } from "./src/page/driver.js"

async function start() {
  await dataFolder.initialize()
  const drivers = await scrapeDriversFromYear(2020)
  await writeToCsvFile("drivers", drivers)
}

start()
