import { ApiProperty } from '@nestjs/swagger';
import { User } from './user.entity'

export class UserView {
    @ApiProperty({ example: "5e7b6a3805f61e0058449d37", description: "Identifiant en BDD de l'utilisateur" })
    public id: string;

    @ApiProperty({ example: "john.doe@test.com", description: "E-mail de l'utilisateur"})
    public email: string;

    @ApiProperty({ example: "John", description: "Prénom de l'utilisateur"})
    public firstname: string;

    @ApiProperty({ example: "Doe", description: "Nom de famille de l'utilisateur"})
    public lastname: string;

    @ApiProperty({ example: "xXx_Sakuke_kun_xXx", description: "Pseudo de l'utilisateur" })
    public nickname: string;

    @ApiProperty({ example: "10 rue de la Merci", description: "Adresse de l'utilisateur"})
    public address: string;

    @ApiProperty({ example: "Bordeaux", description: "Ville de l'utilisateur"})
    public city: string;

    @ApiProperty({ example: "33000", description: "Code postal de l'utilisateur"})
    public zipcode: string;

    @ApiProperty({ example: "France", description: "Pays de l'utilisateur"})
    public country: string;

    @ApiProperty({ example: [1, 2, 3], description: "Liste de favoris de l'utilisateur" })
    public favorites: Favorite[];

    constructor(u: User) {
      if (u.id !== null) {
        this.id = u.id.toString();
      } 
      this.email = u.email;
      this.firstname = u.firstname;
      this.lastname = u.lastname;
      this.nickname = u.nickname;
      this.address = u.address;
      this.city = u.city;
      this.zipcode = u.zipcode;
      this.country = u.country;
      if (u.favorites !== null) {
        this.favorites = u.favorites;
      }
    }
}

export class Favorite {
  id: number;
  title: string;
  artist: string;
  cover: string;
  idGenre: string;
}

