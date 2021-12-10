import { tasks as countriesTasks } from "./countries.js"
import { Listr } from 'listr2'

const innerTasks = new Listr(
  [
    {
      title: 'Collecting countries',
      task: (ctx, task) =>
        task.newListr(countriesTasks, { rendererOptions: { collapse: false }})
    }
  ]
)

export default async function collectEverythingFlow() {
  await innerTasks.run()  
}