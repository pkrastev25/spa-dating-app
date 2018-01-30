import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs/Observable';
import {UserModel} from '../_models/UserModel';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import {AuthHttp} from 'angular2-jwt';

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
  getUsers(): Observable<UserModel[]> {
    return this.authHttp
      .get(this.baseUrl + 'users')
      .map(response => <UserModel[]>response.json())
      .catch(this.handleError);
  }

  /**
   * Performs an API request which retrieves the information
   * for a specific user.
   *
   * @param {number} id The id of the user
   * @returns {Observable<UserModel>} The information for the specific user
   */
  getUser(id: number): Observable<UserModel> {
    return this.authHttp
      .get(this.baseUrl + 'users/' + id)
      .map(response => <UserModel>response.json())
      .catch(this.handleError);
  }

  /**
   * Performs an API request which updates the user data,
   *
   * @param {number} id The id of the user
   * @param {UserModel} user The update user information
   * @returns {Observable<any | any>} The result of the request
   */
  updateUser(id: number, user: UserModel) {
    return this.authHttp
      .put(this.baseUrl + 'users/' + id, user)
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
