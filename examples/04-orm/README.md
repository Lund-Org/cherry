# Demo of the ORM

The orm demo is split in two folders because each ORM has its own specificities.
Like the example 02, you can switch the orm used in the requirement of the `main.js` and the `routes.js`.

The both example try to do the same actions.

You have the setup of database available with docker in the `etc/` folder
If you want to setup an external database without using docker, here are the parameters to match with the demo :
- type : mysql
- port : 4006
- user : root
- password : demo04
- database name : db_example

The typeorm demo will create the table `users_typeorm` and the sequelize demo will create the table `users_sequelize`

:warning: I'm not a Typeorm or Sequelize expert, what I did in the example is maybe not the best way to code or build an app using these orm.
