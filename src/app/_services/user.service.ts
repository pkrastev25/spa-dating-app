import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs/Observable';
import {UserModel} from '../_models/UserModel';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import {AuthHttp} from 'angular2-jwt';
import {PhotoModel} from '../_models/PhotoModel';
import {PaginatedResultModel} from '../_models/PaginatedResultModel';
import {Response} from '@angular/http';

/**
 * Service responsible for managing user data.
 */
@Injectable()
export class UserService {

  baseUrl = environment.apiUrl;

  /**
   * Constructor.
   *
   * @param {AuthHttp} authHttp Reference to the authorized http service
   */
  constructor(private authHttp: AuthHttp) {
  }

  /**
   * Performs an API request which retrieves the users.
   *
   * @returns {Observable<UserModel[]>} The user data
   */
  getUsers(page?: number, itemsPerPage?: number, userParams?: any) {
    const paginatedResult: PaginatedResultModel<UserModel[]> = new PaginatedResultModel<UserModel[]>();
    let queryString = '?';

    if (page != null && itemsPerPage != null) {
      queryString += 'pageNumber=' + page + '&pageSize=' + itemsPerPage + '&';
    }

    if (userParams != null) {
      queryString += 'minAge=' + userParams.minAge + '&maxAge=' + userParams.maxAge + '&gender=' + userParams.gender +
        '&orderBy=' + userParams.orderBy;
    }

    return this.authHttp
      .get(this.baseUrl + 'users' + queryString)
      .map((response: Response) => {
        paginatedResult.result = response.json();

        if (response.headers.get('Pagination') != null) {
          paginatedResult.pagination = JSON.parse(response.headers.get('Pagination'));
        }

        return paginatedResult;
      })
      .catch(this.handleError);
  }

  /**
   * Performs an API request which retrieves the information
   * for a specific user.
   *
   * @param {number} userId The id of the user
   * @returns {Observable<UserModel>} The information for the specific user
   */
  getUser(userId: number): Observable<UserModel> {
    return this.authHttp
      .get(this.baseUrl + 'users/' + userId)
      .map(response => <UserModel>response.json())
      .catch(this.handleError);
  }

  /**
   * Performs an API request which updates the user data,
   *
   * @param {number} userId The id of the user
   * @param {UserModel} user The update user information
   * @returns {Observable<any | any>} The result of the request
   */
  updateUser(userId: number, user: UserModel) {
    return this.authHttp
      .put(this.baseUrl + 'users/' + userId, user)
      .catch(this.handleError);
  }

  setMainPhoto(userId: number, photo: PhotoModel) {
    return this.authHttp
      .post(this.baseUrl + 'users/' + userId + '/photos/' + photo.id, photo)
      .catch(this.handleError);
  }

  deletePhoto(userId: number, photoId: number) {
    return this.authHttp
      .delete(this.baseUrl + 'users/' + userId + '/photos/' + photoId)
      .catch(this.handleError);
  }

  /**
   * Handles errors from the API calls by converting them to a more user friendly
   * format.
   *
   * @param error The error associated with the API call
   * @returns {ErrorObservable} A more user friendly format for the error
   */
  private handleError(error: any) {
    const applicationError = error.headers.get('Application-Error');

    if (applicationError) {
      return Observable.throw(applicationError);
    }

    const serverError = error.json();
    let modelStateErrors = '';

    if (serverError) {
      for (const key in serverError) {
        if (serverError[key]) {
          modelStateErrors += serverError[key] + '\n';
        }
      }
    }

    return Observable.throw(modelStateErrors || 'Server error');
  }

}
