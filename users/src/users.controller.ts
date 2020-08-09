import { Request, Response } from 'express'
import * as bcrypt from 'bcryptjs'

import User from './user.model'

class UsersController {
  public async addUser(req: Request, res: Response) {
    const salt: string = await bcrypt.genSalt()
    const { email, password, firstname, lastname, nickname, address, city, zipcode, country } = req.body;
    const passwordHashed = await bcrypt.hash(password, salt)
    const newUser = {
      email,
      password: passwordHashed,
      firstname,
      lastname,
      nickname,
      address,
      city,
      zipcode,
      country
    }

    await User.create(newUser, (err: any, user: any) => {
      if (err) {
        return res.send(err);
      } else {
        return res.json(user);
      }
    })
  }

  public async getUsers(req: Request, res: Response) {
    await  User.find((err, users) => {
      if (err) {
        return res.send(err);
      } else {
        return res.json(users);
      }
    });
  }

  public async getUserById(req: Request, res: Response) {
    const { id } = req.params;

    await User.findById(id, (err: any, userFound: any) => {
      if (err) {
        return res.status(404).json({ error: 'User not found' });
      } else {
        return res.json(userFound);
      }
    })
  }

  public async getUserByEmail(req: Request, res: Response) {
    const { email } = req.params;

    await User.findOne({ email }, (err: any, userFound: any) => {
      if (err) {
        return res.status(404).json({ error: 'User not found' });
      } else {
        return res.json(userFound);
      }
    })
  }

  public async deleteUserById(req: Request, res: Response) {
    const { id } = req.params

    await User.deleteOne({ _id : id }, (err: any) => {
      if (err) {
        return res.status(404).json({ error: 'User not found' });
      } else {
        return res.status(204).json({ response: "User deleted" });
      }
    });
  }

  public async updateUserById(req: Request, res: Response) {
    const { id } = req.params

    await User.updateOne( { _id: id}, { $set: req.body }, (err: any, updated: any) => {
      if (err) {
        return res.status(404).json({ error: 'User not found' });
      } else {
        return res.status(203).json(updated);
      }
    })
  }
}

export default new UsersController();