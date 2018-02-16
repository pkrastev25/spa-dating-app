import {Component, OnInit} from '@angular/core';
import {UserModel} from '../_models/UserModel';
import {IPaginationModel} from '../_models/PaginationModel';
import {UserService} from '../_services/user.service';
import {AlertifyService} from '../_services/alertify.service';
import {AuthService} from '../_services/auth.service';
import {ActivatedRoute} from '@angular/router';
import {PaginatedResultModel} from '../_models/PaginatedResultModel';

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.css']
})
export class ListsComponent implements OnInit {

  users: UserModel[];
  pagination: IPaginationModel;
  likesParam: string;

  constructor(private userService: UserService,
              private alertifyService: AlertifyService,
              private routeService: ActivatedRoute) {
  }

  ngOnInit() {
    this.routeService.data.subscribe(data => {
      this.users = data['users'].result;
      this.pagination = data['users'].pagination;
    });

    this.likesParam = 'Likers';
  }

  loadUsers() {
    this.userService
      .getUsers(this.pagination.currentPage, this.pagination.itemsPerPage, null, this.likesParam)
      .subscribe((res: PaginatedResultModel<UserModel[]>) => {
        this.users = res.result;
        this.pagination = res.pagination;
      }, error => {
        this.alertifyService.error(error);
      });
  }

  pageChanged(event: any): void {
    this.pagination.currentPage = event.page;
    this.loadUsers();
  }

}
