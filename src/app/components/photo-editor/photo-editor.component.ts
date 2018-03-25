import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {IPhotoModel} from '../../_models/IPhotoModel';
import {FileUploader} from 'ng2-file-upload';
import {environment} from '../../../environments/environment';
import {AuthService} from '../../_services/auth.service';
import {UserService} from '../../_services/user.service';
import {AlertifyService} from '../../_services/alertify.service';
import * as _ from 'underscore';

/**
 * @author Petar Krastev
 */
@Component({
  selector: 'app-photo-editor',
  templateUrl: './photo-editor.component.html',
  styleUrls: ['./photo-editor.component.css']
})
export class PhotoEditorComponent implements OnInit {

  @Input() photos: IPhotoModel[];
  uploader: FileUploader;
  hasBaseDropZoneOver = false;
  baseUrl = environment.apiUrl;
  currentMainPhoto: IPhotoModel;
  @Output() getMemberPhotoChange = new EventEmitter<string>();

  constructor(private authService: AuthService,
              private userService: UserService,
              private alertifyService: AlertifyService) {
  }

  ngOnInit() {
    this.initializeUploader();
  }

  public fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }

  initializeUploader() {
    this.uploader = new FileUploader({
      url: this.baseUrl + 'users/' + this.authService.decodedToken.nameid + '/photos',
      authToken: 'Bearer ' + localStorage.getItem('token'),
      isHTML5: true,
      allowedFileType: ['image'],
      removeAfterUpload: true,
      autoUpload: false,
      maxFileSize: 10 * 1024 * 1024
    });

    this.uploader.onSuccessItem = (item, response, status, headers) => {
      if (response) {
        const result: IPhotoModel = JSON.parse(response);
        const photo: IPhotoModel = {
          id: result.id,
          url: result.url,
          dateAdded: result.dateAdded,
          description: result.description,
          isMain: result.isMain
        };
        this.photos.push(photo);

        if (photo.isMain) {
          this.authService.changeMemberPhoto(photo.url);
          this.authService.currentUser.photoUrl = photo.url;
          localStorage.setItem('user', JSON.stringify(this.authService.currentUser));
        }
      }
    };
  }

  setMainPhoto(photo: IPhotoModel) {
    this.userService.setMainPhoto(
      this.authService.decodedToken.nameid,
      photo
    ).subscribe(() => {
      this.currentMainPhoto = _.findWhere(this.photos, {isMain: true});
      this.currentMainPhoto.isMain = false;
      photo.isMain = true;
      this.authService.changeMemberPhoto(photo.url);
      this.authService.currentUser.photoUrl = photo.url;
      localStorage.setItem('user', JSON.stringify(this.authService.currentUser));
    }, error => {
      this.alertifyService.error(error);
    });
  }

  deletePhoto(photoId: number) {
    this.alertifyService.confirm(
      'Are you sure you want to delete this photo?',
      () => {
        this.userService.deletePhoto(
          this.authService.decodedToken.nameid,
          photoId
        ).subscribe(() => {
          this.photos.splice(_.findIndex(this.photos, {id: photoId}), 1);
          this.alertifyService.success('Photo has been deleted!');
        }, error => {
          this.alertifyService.error('Failed to delete photo!');
        });
      });
  }
}
