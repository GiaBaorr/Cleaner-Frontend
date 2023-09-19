import { HouseholdChore } from './household-chore';

export class Worker {
  public id?: number;
  public name?: string;
  public fee?: number;
  public phone?: string;
  public email?: string;
  public chores?: HouseholdChore[];
}
