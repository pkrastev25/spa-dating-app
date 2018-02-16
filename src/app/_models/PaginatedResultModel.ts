import {IPaginationModel} from './PaginationModel';

export class PaginatedResultModel<T> {
  result: T;
  pagination: IPaginationModel;
}
