import fetch from 'node-fetch'
import cheerio from "cheerio"
import logger from "../logger/index.js"
import { FORMULA_RESULTS_URL } from '../constant/url.js'
import { CHAMPIONSHIP_FIRST_YEAR, THIS_YEAR } from '../constant/year.js'
import { uniqWith, isEqual } from 'lodash-es'

const getUrlByYear = year => {
  return `${FORMULA_RESULTS_URL}/${year}/team.html`
}

export async function scrapeTeamsFromYear(year = THIS_YEAR) {
  logger.info(`Scraping teams from ${year}`)
  const teams = []
  const url = getUrlByYear(year)
  try {
    const response = await fetch(url)
    const body = await response.text()
    const $ = cheerio.load(body)
    $(".resultsarchive-table tbody tr").each((_, row) => {
      const name = $(row).find("td:nth-child(3) a").text().trim()
      teams.push({ name })
    })
  } catch (error) {
    logger.error(`Error while scraping teams from year: ${year}`)
  } finally {
    return teams
  }
}

export async function scrapeTeamsFromRange(from = CHAMPIONSHIP_FIRST_YEAR, to = THIS_YEAR) {
  let teams = [];
  for(let year = from; year <= to; year++) {
    const yearTeams = await scrapeTeamsFromYear(year)
    teams = [...teams, ...yearTeams]
  }
  return uniqWith(teams, (el1, el2) => isEqual(el1, el2))
}
