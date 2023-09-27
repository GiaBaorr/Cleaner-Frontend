import { HouseholdChore } from './household-chore';
import { Review } from './review';

export class Worker {
  public id?: number;
  public name?: string;
  public fee?: number;
  public address?: string;
  public countOrder?: number;
  public averageRate?: number;
  public chores?: HouseholdChore[];
  public reviews?: Review[];
}
