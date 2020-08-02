import { Column, Entity, ObjectIdColumn, Index } from 'typeorm'
import { ObjectID } from 'mongodb'
import { Favorite } from './user.model';

@Entity()
export class User {
  @ObjectIdColumn()
  id: ObjectID;

  @Column()
  @Index({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  firstname: string;

  @Column()
  lastname: string;

  @Column()
  nickname: string;

  @Column()
  address: string;

  @Column()
  city: string;

  @Column()
  zipcode: string;

  @Column()
  country: string;

  @Column({ nullable: true })
  favorites?: Favorite[];

  constructor(email: string, password: string, firstname: string, lastname: string,nickname: string, 
    address: string, city: string, zipcode: string, country: string, favorites ?: any [], id?: ObjectID) {
      this.id = id || null;
      this.email = email;
      this.password = password;
      this.firstname = firstname;
      this.lastname = lastname;
      this.nickname = nickname;
      this.address = address;
      this.city = city;
      this.zipcode = zipcode;
      this.country = country;
      this.favorites = favorites || null
    }
}