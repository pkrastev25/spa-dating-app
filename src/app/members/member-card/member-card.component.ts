import {Component, Input, OnInit} from '@angular/core';
import {UserModel} from '../../_models/UserModel';
import {AuthService} from '../../_services/auth.service';
import {UserService} from '../../_services/user.service';
import {AlertifyService} from '../../_services/alertify.service';

/**
 * Component responsible for rendering a user card - user photo, nickname
 * and navigational buttons for further options.
 */
@Component({
  selector: 'app-member-card',
  templateUrl: './member-card.component.html',
  styleUrls: ['./member-card.component.css']
})
export class MemberCardComponent implements OnInit {

  @Input() user: UserModel;

  /**
   * Constructor.
   */
  constructor(private authService: AuthService,
              private userService: UserService,
              private alertifyService: AlertifyService) {
  }

  // region LIFECYCLE

  ngOnInit() {
  }

  // endregion LIFECYCLE

  sendLike(recipientId: number) {
    this.userService
      .sendLike(this.authService.decodedToken.nameid, recipientId)
      .subscribe(data => {
        this.alertifyService.success('You have liked: ' + this.user.knownAs);
      }, error => {
        this.alertifyService.error(error);
      });
  }

}
