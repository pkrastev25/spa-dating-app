import {Component, OnInit, ViewChild} from '@angular/core';
import {UserModel} from '../../_models/UserModel';
import {ActivatedRoute} from '@angular/router';
import {AlertifyService} from '../../_services/alertify.service';
import {NgForm} from '@angular/forms';
import {UserService} from '../../_services/user.service';
import {AuthService} from '../../_services/auth.service';

/**
 * Component responsible for user information which can be updated.
 */
@Component({
  selector: 'app-member-edit',
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.css']
})
export class MemberEditComponent implements OnInit {

  user: UserModel;

  /**
   * Provides a reference to the form.
   */
  @ViewChild('editForm') editForm: NgForm;

  /**
   * Constructor.
   *
   * @param {ActivatedRoute} routeService Reference to the service
   * @param {AlertifyService} alertifyService Reference to the service
   * @param {UserService} userService Reference to the service
   * @param {AuthService} authService Reference to the service
   */
  constructor(private routeService: ActivatedRoute, private alertifyService: AlertifyService,
              private userService: UserService, private authService: AuthService) {
  }

  // region LIFECYCLE

  ngOnInit() {
    // Retrieve the data from the resolver
    this.routeService.data.subscribe(data => {
      this.user = data['user'];
    });
  }

  // endregion LIFECYCLE

  /**
   * Attempts to update the user data by performing an API call. The result
   * is shown in the form of an dialog. In addition, the form's state is reset.
   */
  updateUser() {
    this.userService.updateUser(this.authService.decodedToken.nameid, this.user)
      .subscribe(next => {
        this.alertifyService.success('Profile updated successfully!');
        this.editForm.reset(this.user);
      }, error => {
        this.alertifyService.error(error);
      });
  }

}
