import { Application } from './infrastructure'

async function main () {
  await new Application().initialize()
}

main()
