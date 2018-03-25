import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs/Observable';
import {IUserModel} from '../_models/IUserModel';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import {IPhotoModel} from '../_models/IPhotoModel';
import {PaginatedResultModel} from '../_models/PaginatedResultModel';
import {IMessageModel} from '../_models/IMessageModel';
import {HttpClient, HttpParams} from '@angular/common/http';

/**
 * @author Petar Krastev
 */
@Injectable()
export class UserService {

  baseUrl = environment.apiUrl;

  constructor(private authHttp: HttpClient) {
  }

  getUsers(page?, itemsPerPage?, userParams?: any, likesParam?: string) {
    const paginatedResult: PaginatedResultModel<IUserModel[]> = new PaginatedResultModel<IUserModel[]>();
    let params = new HttpParams();

    if (page != null && itemsPerPage != null) {
      params = params.append('pageNumber', page);
      params = params.append('pageSize', itemsPerPage);
    }

    if (likesParam === 'Likers') {
      params = params.append('Likers', 'true');
    } else if (likesParam === 'Likees') {
      params = params.append('Likees', 'true');
    }

    if (userParams != null) {
      params = params.append('minAge', userParams.minAge);
      params = params.append('maxAge', userParams.maxAge);
      params = params.append('gender', userParams.gender);
      params = params.append('orderBy', userParams.orderBy);
    }

    return this.authHttp
      .get<IUserModel[]>(this.baseUrl + 'users', {observe: 'response', params})
      .map(response => {
        paginatedResult.result = response.body;

        if (response.headers.get('Pagination') != null) {
          paginatedResult.pagination = JSON.parse(response.headers.get('Pagination'));
        }

        return paginatedResult;
      });
  }

  getUser(userId: number): Observable<IUserModel> {
    return this.authHttp
      .get<IUserModel>(this.baseUrl + 'users/' + userId);
  }

  updateUser(userId: number, user: IUserModel) {
    return this.authHttp
      .put(this.baseUrl + 'users/' + userId, user);
  }

  setMainPhoto(userId: number, photo: IPhotoModel) {
    return this.authHttp
      .post(this.baseUrl + 'users/' + userId + '/photos/' + photo.id, photo);
  }

  deletePhoto(userId: number, photoId: number) {
    return this.authHttp
      .delete(this.baseUrl + 'users/' + userId + '/photos/' + photoId);
  }

  sendLike(userId: number, recipientId: number) {
    return this.authHttp
      .post(this.baseUrl + 'users/' + userId + '/like/' + recipientId, {});
  }

  getMessages(userId, page?, itemsPerPage?, messageContainer?: string) {
    const paginatedResult: PaginatedResultModel<IMessageModel[]> = new PaginatedResultModel();
    let params = new HttpParams();
    params = params.append('MessageContainer', messageContainer);

    if (page != null && itemsPerPage != null) {
      params = params.append('pageNumber', page);
      params = params.append('pageSize', itemsPerPage);
    }

    return this.authHttp
      .get<IMessageModel[]>(this.baseUrl + 'users/' + userId + '/messages', {observe: 'response', params})
      .map(response => {
        paginatedResult.result = response.body;

        if (response.headers.get('Pagination') != null) {
          paginatedResult.pagination = JSON.parse(response.headers.get('Pagination'));
        }

        return paginatedResult;
      });
  }

  getMessageThread(userId: number, recipientId: number) {
    return this.authHttp
      .get<IMessageModel[]>(this.baseUrl + 'users/' + userId + '/messages/thread/' + recipientId);
  }

  sendMessage(userId: number, message: IMessageModel) {
    return this.authHttp
      .post<IMessageModel>(this.baseUrl + 'users/' + userId + '/messages', message);
  }

  deleteMessage(messageId: number, userId: number) {
    return this.authHttp
      .post(this.baseUrl + 'users/' + userId + '/messages/' + messageId, {});
  }

  markMessageAsRead(userId: number, messageId: number) {
    this.authHttp
      .post(this.baseUrl + 'users/' + userId + '/messages/' + messageId + '/read', {})
      .subscribe();
  }
}
