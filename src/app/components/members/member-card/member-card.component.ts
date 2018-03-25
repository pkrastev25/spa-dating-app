import {Component, Input, OnInit} from '@angular/core';
import {IUserModel} from '../../../_models/IUserModel';
import {AuthService} from '../../../_services/auth.service';
import {UserService} from '../../../_services/user.service';
import {AlertifyService} from '../../../_services/alertify.service';

/**
 * @author Petar Krastev
 */
@Component({
  selector: 'app-member-card',
  templateUrl: './member-card.component.html',
  styleUrls: ['./member-card.component.css']
})
export class MemberCardComponent implements OnInit {

  @Input() user: IUserModel;

  constructor(private authService: AuthService,
              private userService: UserService,
              private alertifyService: AlertifyService) {
  }

  ngOnInit() {
  }

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
