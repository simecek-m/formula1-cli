import dataFolder from "./src/data/folder.js"
import { writeToCsvFile} from "./src/data/file.js"
import { scrapeDriversFromOneYear } from "./src/page/driver.js"

async function start() {
  await dataFolder.initialize()
  const drivers = await scrapeDriversFromOneYear(2020)
  await writeToCsvFile("drivers", drivers)
}

start()
