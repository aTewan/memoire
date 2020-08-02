import { Column, Entity, ObjectIdColumn, Index, CreateDateColumn } from 'typeorm'
import { ObjectID } from 'mongodb'

@Entity()
export class PrivateMessage {
  @ObjectIdColumn()
  id: ObjectID;

  @Column()
  sender: string;

  @Column()
  receiver: string;

  @CreateDateColumn({ type: 'timestamp' })
  date: Date;

  @Column()
  saleId: string;

  @Column()
  content: string;

  constructor(sender: string, receiver: string, saleId: string, content: string, id?: ObjectID) {
      this.id = id || null;
      this.sender = sender;
      this.receiver = receiver;
      this.saleId = saleId;
      this.content = content;
      this.date = new Date(Date.now());
    }
}