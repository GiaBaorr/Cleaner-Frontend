import { HouseholdChore } from './household-chore';

export class WorkerUpdateNoti {
  workerId?: number;
  workerName?: string;
  oldFee?: number;
  newFee?: number;
  oldChores?: HouseholdChore[];
  newChores?: HouseholdChore[];
}
