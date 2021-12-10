import { collectCountries } from "../countries/index.js";
import { writeToCsvFile } from "../data/file.js";
import { Listr } from 'listr2'

const tasks = new Listr(
  [
    {
      title: 'Calling /countries API',
      task: async ctx => ctx.data = await collectCountries()
    },
    {
      title: 'Writing data to file',
      task: async ctx => writeToCsvFile("countries", ctx.data)
    }
  ]
)

export default async function countriesCommandFlow() {
  await tasks.run()  
}