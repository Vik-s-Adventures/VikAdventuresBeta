import { PlayerLinkingPair } from './PlayerLinkingPair';

export interface PlayerLinkingPairRequest {
  playerId: number;
  pairs: PlayerLinkingPair[];
}
