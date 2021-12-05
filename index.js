import dataFolder from "./src/data/folder.js"
import { writeToCsvFile} from "./src/data/file.js"
import { scrapeDriversFromYear } from "./src/page/driver.js"
import { scrapeTeamsFromRange, scrapeTeamsFromYear } from "./src/page/team.js"

async function start() {
  await dataFolder.initialize()

  const drivers = await scrapeDriversFromYear(2020)
  await writeToCsvFile("drivers", drivers)

  const teams = await scrapeTeamsFromYear(2020)
  await writeToCsvFile("teams", teams)
}

start()
