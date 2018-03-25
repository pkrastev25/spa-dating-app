import {IPhotoModel} from './IPhotoModel';

/**
 * @author Petar Krastev
 */
export interface IUserModel {
  id: number;
  username: string;
  knownAs: string;
  age: number;
  gender: string;
  created: Date;
  lastActive: Date;
  photoUrl: string;
  city: string;
  country: string;
  interests?: string;
  introduction?: string;
  lookingFor?: string;
  photos?: IPhotoModel[];
}
