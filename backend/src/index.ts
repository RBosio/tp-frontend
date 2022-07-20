import "reflect-metadata"
import { conn } from "./config/typeorm";
import { startServer } from "./main";

async function main() {
  await conn.initialize()
  console.log('DB is connected!')
  
  const app = await startServer()
  await app.listen(app.get('port'))
  console.log('Server listen on port', app.get('port'))
}

main()