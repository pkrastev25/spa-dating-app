import {Component, OnInit, ViewChild} from '@angular/core';
import {IUserModel} from '../../../_models/IUserModel';
import {ActivatedRoute} from '@angular/router';
import {AlertifyService} from '../../../_services/alertify.service';
import {NgForm} from '@angular/forms';
import {UserService} from '../../../_services/user.service';
import {AuthService} from '../../../_services/auth.service';

/**
 * @author Petar Krastev
 */
@Component({
  selector: 'app-member-edit',
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.css']
})
export class MemberEditComponent implements OnInit {

  user: IUserModel;
  @ViewChild('editForm') editForm: NgForm;
  photoUrl: string;

  constructor(private routeService: ActivatedRoute,
              private alertifyService: AlertifyService,
              private userService: UserService,
              private authService: AuthService) {
  }

  ngOnInit() {
    this.routeService.data.subscribe(data => {
      this.user = data['user'];
    });
    this.authService.currentPhotoUrl.subscribe(photoUrl => this.photoUrl = photoUrl);
  }

  updateUser() {
    this.userService.updateUser(this.authService.decodedToken.nameid, this.user)
      .subscribe(() => {
        this.alertifyService.success('Profile updated successfully!');
        this.editForm.reset(this.user);
      }, error => {
        this.alertifyService.error(error);
      });
  }

  updateMainPhoto(photoUrl) {
    this.user.photoUrl = photoUrl;
  }
}
