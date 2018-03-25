import {IPaginationModel} from './IPaginationModel';

/**
 * @author Petar Krastev
 */
export class PaginatedResultModel<T> {
  result: T;
  pagination: IPaginationModel;
}
