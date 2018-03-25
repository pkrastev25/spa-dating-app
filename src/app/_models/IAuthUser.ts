import {IUserModel} from './IUserModel';

/**
 * @author Petar Krastev
 */
export interface IAuthUser {
  tokenString: string;
  user: IUserModel;
}
