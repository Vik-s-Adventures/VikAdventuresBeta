
export interface Result {
  id: number;        // ← opcional
  score: number;     // ← opcional
  profileId: number;
  quizId: number;

}

export interface RankedStudent {
  firstName: string;
  lastName: string;
  score: number;
}
