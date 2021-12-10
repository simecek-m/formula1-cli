import { Listr } from 'listr2'
import { writeToCsvFile } from '../data/file.js'
import { scrapeDriversFromRange, scrapeDriversFromYear } from '../web-scraper/driver.js'


export const collectAllDriversTasks = [
{
    title: 'Scraping drivers from formula1.com',
    task: async ctx => ctx.data = await scrapeDriversFromRange()
  },
  {
    title: 'Writing to file',
    task: async ctx => writeToCsvFile("drivers", ctx.data)
  }
]

export const collectDriversFromRangeTasks = (from, to) => [
  {
    title: 'Scraping drivers from formula1.com',
    task: async ctx => ctx.data = await scrapeDriversFromRange(from, to)
  },
  {
    title: 'Writing to file',
    task: async ctx => writeToCsvFile("drivers", ctx.data)
  }
]

export const collectDriversFromYearTasks = year => [
  {
    title: 'Scraping drivers from formula1.com',
    task: async ctx => ctx.data = await scrapeDriversFromYear(year)
  },
  {
    title: 'Writing to file',
    task: async ctx => writeToCsvFile("drivers", ctx.data)
  }
]

export async function collectAllDriversFlow() {
  const list = new Listr(collectAllDriversTasks) 
  await list.run()
}

export async function collectDriversFromRangeFlow(from, to) {
  const list = new Listr(collectDriversFromRangeTasks(from, to)) 
  await list.run()
}

export async function collectDriversFromYearFlow(year) {
  const list = new Listr(collectDriversFromYearTasks(year))
  await list.run()
}