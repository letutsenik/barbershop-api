#### Migration
- `npx sequelize-cli db:migrate:undo:all`
- `npx sequelize-cli db:migrate`
- `npx sequelize-cli model:generate --name User --attributes firstName:string,lastName:string`
- `npx sequelize-cli migration:generate --name migration-skeleton`

#### Seeds
- `npx sequelize-cli seed:generate --name demo-user`
- `npx sequelize-cli db:seed:all`
- `npx sequelize-cli db:seed:undo`
- `npx sequelize-cli db:seed:undo --seed name-of-seed-as-in-data`
- `npx sequelize-cli db:seed:undo:all`


