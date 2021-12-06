import dataFolder from "./src/data/folder.js"
import { writeToCsvFile} from "./src/data/file.js"
import { scrapeDriversFromYear } from "./src/page/driver.js"
import { scrapeTeamsFromYear } from "./src/page/team.js"
import { scrapeRacesFromYear } from "./src/page/race.js"

const SEASON = 2015

async function start() {
  await dataFolder.initialize()

  const drivers = await scrapeDriversFromYear(SEASON)
  await writeToCsvFile("drivers", drivers)

  const teams = await scrapeTeamsFromYear(SEASON)
  await writeToCsvFile("teams", teams)

  const races = await scrapeRacesFromYear(SEASON)
  await writeToCsvFile("races", races)

}

start()
