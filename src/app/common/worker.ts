import { HouseholdChore } from './household-chore';

export class Worker {
  public id?: number;
  public name?: string;
  public fee?: number;
  public address?: string;
  public averageRate?: number;
  public chores?: HouseholdChore[];
}
