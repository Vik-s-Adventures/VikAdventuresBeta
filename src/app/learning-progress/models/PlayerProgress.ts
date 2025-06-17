export interface PlayerProgress {
  id: number;
  playerId: number;
  levelId: number;
  score: number;
  completed: boolean;
  lastAccessed: string;
}
