import { Application, Request, Response } from 'express'
import UsersController from './users.controller'

export class Routes {
  routes(app: Application) {
    app.route("/users")
      .get(UsersController.getUsers)
      .post(UsersController.addUser)

    app.route("/users/:email")
      .get(UsersController.getUserByEmail)

    app.route("/user/:id")
      .get(UsersController.getUserById)

    app.route("/users/:id")
      .delete(UsersController.deleteUserById)
      .patch(UsersController.updateUserById)
  }
}