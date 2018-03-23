import {Component, OnInit} from '@angular/core';
import {IMessageModel} from '../_models/IMessageModel';
import {IPaginationModel} from '../_models/PaginationModel';
import {UserService} from '../_services/user.service';
import {AlertifyService} from '../_services/alertify.service';
import {ActivatedRoute} from '@angular/router';
import {AuthService} from '../_services/auth.service';
import {PaginatedResultModel} from '../_models/PaginatedResultModel';
import _ = require('underscore');

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {

  messages: IMessageModel[];
  pagination: IPaginationModel;
  messageContainer: 'Unread';

  constructor(private userService: UserService,
              private alertifyService: AlertifyService,
              private routeService: ActivatedRoute,
              private authService: AuthService) {
  }

  ngOnInit() {
    this.routeService.data.subscribe(data => {
      this.messages = data['messages'].result;
      this.pagination = data['messages'].pagination;
    });
  }

  loadMessages() {
    this.userService
      .getMessages(
        this.authService.decodedToken.nameid,
        this.pagination.currentPage,
        this.pagination.itemsPerPage,
        this.messageContainer
      ).subscribe((res: PaginatedResultModel<IMessageModel[]>) => {
      this.messages = res.result;
      this.pagination = res.pagination;
    }, error => {
      this.alertifyService.error(error);
    });
  }

  deleteMessage(messageId: number) {
    this.alertifyService.confirm('Are you sure you want to delete this message', () => {
      this.userService
        .deleteMessage(messageId, this.authService.decodedToken.nameid)
        .subscribe(() => {
          this.messages.splice(_.findIndex(this.messages, {id: messageId}), 1);
          this.alertifyService.success('Message has been deleted!');
        }, error => {
          this.alertifyService.error('Failed to delete the message!');
        });
    });
  }

  pageChanged(event: any): void {
    this.pagination.currentPage = event.page;
    this.loadMessages();
  }

}
