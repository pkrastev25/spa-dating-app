/**
 * @author Petar Krastev
 */
export interface IPaginationModel {
  currentPage: number;
  itemsPerPage: number;
  totalItems: number;
  totalPages: number;
}
