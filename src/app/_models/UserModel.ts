import {PhotoModel} from './PhotoModel';

/**
 * Represents a model of an user.
 */
export interface UserModel {

  /**
   * Represents the unique identifier for this user.
   */
  id: number;

  /**
   * Represents the name of the user.
   */
  username: string;

  /**
   * Represents the nickname of the user.
   */
  knownAs: string;

  /**
   * Represents the age of the user.
   */
  age: number;

  /**
   * Represents the gender of the user.
   */
  gender: string;

  /**
   * Represents the date in which the user was created.
   */
  created: Date;

  /**
   * Represents the date in which the user was last active.
   */
  lastActive: Date;

  /**
   * Represents the url of the main photo of the user.
   */
  photoUrl: string;

  /**
   * Represents the city of the user.
   */
  city: string;

  /**
   * Represents the country of the user.
   */
  country: string;

  // region NOT REQUIRED FIELDS

  /**
   * Represents the interests of the user.
   */
  interests?: string;

  /**
   * Represents the introduction of the user.
   */
  introduction?: string;

  /**
   * Represents what is the user looking for.
   */
  lookingFor?: string;

  /**
   * Represents all photos of the user.
   */
  photos?: PhotoModel[];

  // endregion NOT REQUIRED FIELDS
}
