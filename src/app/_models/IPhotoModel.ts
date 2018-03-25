/**
 * @author Petar Krastev
 */
export interface IPhotoModel {
  id: number;
  url: string;
  description: string;
  dateAdded: Date;
  isMain: boolean;
}
