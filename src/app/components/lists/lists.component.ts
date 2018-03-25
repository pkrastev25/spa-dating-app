import {Component, OnInit} from '@angular/core';
import {IUserModel} from '../../_models/IUserModel';
import {IPaginationModel} from '../../_models/IPaginationModel';
import {UserService} from '../../_services/user.service';
import {AlertifyService} from '../../_services/alertify.service';
import {AuthService} from '../../_services/auth.service';
import {ActivatedRoute} from '@angular/router';
import {PaginatedResultModel} from '../../_models/PaginatedResultModel';

/**
 * @author Petar Krastev
 */
@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.css']
})
export class ListsComponent implements OnInit {

  users: IUserModel[];
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
      .subscribe((res: PaginatedResultModel<IUserModel[]>) => {
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
