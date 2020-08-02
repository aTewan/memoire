import { Entity, ObjectIdColumn, ObjectID, Column, CreateDateColumn, UpdateDateColumn } from "typeorm";

export enum RPM {
  RPM_33 = 33,
  RPM_45 = 45,
  RPM_78 = 78
}

export enum State {
  NEUF = "NEUF",
  BON_ETAT = "BON ÉTAT",
  BOF = "BOF",
  VINTAGE = "VINTAGE"
}

@Entity()
export class Sale {
  @ObjectIdColumn()
  id: ObjectID;

  @Column()
  title: string;

  @Column("enum", { enum: RPM })
  rpm: RPM;
  
  @Column()
  price: number;

  @Column("enum", { enum: State })
  state: State;

  @Column()
  description: string;

  @Column()
  userId: string;

  @CreateDateColumn({ type: 'timestamp' })
  date: Date;

  @Column({ type: 'timestamp', nullable: true })
  concluded?: Date;

  @Column({ type: 'bytes', nullable: true })
  pictures?: Buffer[];

  @Column({ nullable: true })
  idApi?: number;

  @Column({ nullable: true })
  artist?: string;

  @Column({ nullable: true })
  cover?: string;

  constructor(title: string, rpm: RPM, price: number, state: State, description: string, userId: string,
    idApi?: number, artist?: string, cover?: string, concluded?: Date, pictures?: Buffer[], id?: ObjectID) {
      this.id = id || null;
      this.title = title;
      this.rpm = rpm;
      this.price = price;
      this.state = state;
      this.description = description;
      this.userId = userId;
      this.date = new Date(Date.now());
      this.concluded = concluded || null;
      this.pictures = pictures || null;
      this.idApi = idApi || null;
      this.artist = artist || null;
      this.cover = cover || null;
  }
}