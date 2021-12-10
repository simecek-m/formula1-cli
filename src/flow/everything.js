import { tasks as countriesTasks } from "./countries.js"
import { Listr } from 'listr2'
import { collectAllDriversTasks } from "./drivers.js"

const innerTasks = new Listr(
  [
    {
      title: 'Collecting countries',
      task: (_, task) =>
        task.newListr(countriesTasks, { rendererOptions: { collapse: false }})
    },
    {
      title: 'Scraping drivers',
      task: (_, task) =>
        task.newListr(collectAllDriversTasks, { rendererOptions: { collapse: false }})
    }
  ]
)

export default async function collectEverythingFlow() {
  await innerTasks.run()  
}