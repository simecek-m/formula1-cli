import dataFolder from "./src/data/folder.js"
import { writeToCsvFile} from "./src/data/file.js"
import { scrapeDriversFromYear } from "./src/page/driver.js"
import { scrapeTeamsFromRange, scrapeTeamsFromYear } from "./src/page/team.js"

const SEASON = 2015;

async function start() {
  await dataFolder.initialize()

  const drivers = await scrapeDriversFromYear(SEASON)
  await writeToCsvFile("drivers", drivers)

  const teams = await scrapeTeamsFromYear(SEASON)
  await writeToCsvFile("teams", teams)
}

start()
