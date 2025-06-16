import {PlayerMatchingPair} from './PlayerMatchingPair';

export interface PlayerMatchingPairRequest {
  playerId: number;
  pairs: PlayerMatchingPair[];
}
