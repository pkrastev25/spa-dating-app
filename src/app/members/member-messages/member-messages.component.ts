import {Component, Input, OnInit} from '@angular/core';
import {IMessageModel} from '../../_models/IMessageModel';
import {UserService} from '../../_services/user.service';
import {AuthService} from '../../_services/auth.service';
import {AlertifyService} from '../../_services/alertify.service';
import 'rxjs/add/operator/do';
import * as _ from 'underscore';

@Component({
  selector: 'app-member-messages',
  templateUrl: './member-messages.component.html',
  styleUrls: ['./member-messages.component.css']
})
export class MemberMessagesComponent implements OnInit {

  @Input() userId: number;
  messages: IMessageModel[];
  newMessage: any = {};

  constructor(private userService: UserService,
              private authService: AuthService,
              private alertifyService: AlertifyService) {
  }

  ngOnInit() {
    this.loadMessages();
  }

  loadMessages() {
    const currentUserId = +this.authService.decodedToken.nameid;

    this.userService
      .getMessageThread(currentUserId, this.userId)
      .do(messages => {
        _.each(messages, (message: IMessageModel) => {
          if (message.isRead === false && message.recipientId === currentUserId) {
            this.userService.markMessageAsRead(currentUserId, message.id);
          }
        });
      })
      .subscribe(messages => {
        this.messages = messages;
      }, error => {
        this.alertifyService.error(error);
      });
  }

  sendMessage() {
    this.newMessage.recipientId = this.userId;
    this.userService
      .sendMessage(
        this.authService.decodedToken.nameid,
        this.newMessage
      ).subscribe(message => {
      this.messages.unshift(message);
      this.newMessage.content = '';
    }, error => {
      this.alertifyService.error(error);
    });
  }

}
