import fetch from 'node-fetch'
import cheerio from "cheerio"
import logger from "../logger/index.js"
import { FORMULA_BASE_URL, FORMULA_RESULTS_URL } from '../constant/url.js'
import { CHAMPIONSHIP_FIRST_YEAR, THIS_YEAR } from '../constant/year.js'

const getUrlByYear = year => {
  return `${FORMULA_RESULTS_URL}/${year}/races.html`
}

async function getUrlsOfAllRacesOfYear(year = THIS_YEAR) {
  const url = getUrlByYear(year)
  const urls = []
  try {
    const response = await fetch(url)
    const body = await response.text()
    const $ = cheerio.load(body)
    $(".resultsarchive-filter-container .resultsarchive-filter-wrap:nth-child(3) ul li:not(:first-of-type) a").each((_, el) => {
      const raceName = $(el).find("span").text().trim()
      const link = $(el).attr("href")
      urls.push({ raceName, link })
    })
  } catch(err) {
    logger.error(`Error while scraping race urls from year: ${year} `, error)
  } finally {
    return urls
  }
}

export async function scrapeRacesFromYear(year = THIS_YEAR) {
  logger.info(`Scraping races from ${year}`)
  const racesResults = []
  const races = await getUrlsOfAllRacesOfYear(year)
  try {
    await Promise.all(races.map(async race => {
      const { raceName } = race
      const response = await fetch(`${FORMULA_BASE_URL}${race.link}`)
      const body = await response.text()
      const $ = cheerio.load(body)
      $(".resultsarchive-table tbody tr").each((_, row) => {
        const position = $(row).find("td:nth-child(2)").text().trim()
        const driverNumber = $(row).find("td:nth-child(3)").text().trim()
        const driverName = $(row).find("td:nth-child(4)")
        const firstname = $(driverName).find("span:first").text().trim()
        const lastname = $(driverName).find("span:nth-child(2)").text().trim()
        const team = $(row).find("td:nth-child(5)").text().trim()
        const laps = $(row).find("td:nth-child(6)").text().trim()
        const time = $(row).find("td:nth-child(7)").text().trim()
        const points = $(row).find("td:nth-child(8)").text().trim()
        racesResults.push({ year, raceName, position, lastname, firstname, driverNumber, team, laps, time, points })
      })
    }))
  } catch (error) {
    logger.error(`Error while scraping races from year: ${year} `, error)
  } finally {
    return racesResults
  }
}

export async function scrapeRacesFromRange(from = CHAMPIONSHIP_FIRST_YEAR, to = THIS_YEAR) {
  let races = [];
  for(let year = from; year <= to; year++) {
    const yearRaces = await scrapeRacesFromYear(year)
    races = [...races, ...yearRaces]
  }
  return races
}
