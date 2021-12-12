import { collectCountries } from "../countries/index.js"
import { writeToCsvFile } from "../data/file.js"
import { Listr } from 'listr2'

export const tasks = [
  {
    title: 'Calling API',
    task: async ctx => ctx.data = await collectCountries()
  },
  {
    title: 'Writing to file',
    task: async ctx => await writeToCsvFile("countries", ctx.data)
  }
] 

const list = new Listr(tasks)

export default async function collectCountriesFlow() {
  await list.run()
}
