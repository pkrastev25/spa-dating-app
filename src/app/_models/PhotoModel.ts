/**
 * Represents a model of a photo.
 */
export interface PhotoModel {
  /**
   * Represents the unique identifier of the photo.
   */
  id: number;

  /**
   * Represents the url of the photo.
   */
  url: string;

  /**
   * Represents the description of the photo.
   */
  description: string;

  /**
   * Represents the date in which the photo was added.
   */
  dateAdded: Date;

  /**
   * Specifies whether this is the main photo of the user.
   */
  isMain: boolean;
}
