import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Articles {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text' })
  title: string;

  @Column({ type: 'text' })
  article_content: string;
}
