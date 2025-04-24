import {Quiz} from './Quiz';
import {Profile} from '../../profile/model/Profile';

export interface Result {
  id: number;
  profile: Profile;
  quiz: Quiz;
  score: number;
}
