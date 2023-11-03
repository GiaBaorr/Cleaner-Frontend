import { Review } from './review';

export class Order {
  public id?: number;
  public guestEmail?: string;
  public date?: Date;
  public dateString?: string;
  public rate?: number;
  public guestName?: string;
  public guestPhone?: string;
  public guestAddress?: string;
  public workerId?: number;
  public workerName?: string;
  public review?: Review;
  public status?: string;
  public reviewContent?: string;
}
