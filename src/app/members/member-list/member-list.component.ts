import {Component, OnInit} from '@angular/core';
import {UserModel} from '../../_models/UserModel';
import {ActivatedRoute} from '@angular/router';
import {IPaginationModel} from '../../_models/PaginationModel';
import {UserService} from '../../_services/user.service';
import {PaginatedResultModel} from '../../_models/PaginatedResultModel';
import {AlertifyService} from '../../_services/alertify.service';

/**
 * Component responsible for rendering a list of {@link MemberCardComponent}s
 * which represents the users.
 */
@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css']
})
export class MemberListComponent implements OnInit {

  users: UserModel[];
  pagination: IPaginationModel;
  user: UserModel = JSON.parse(localStorage.getItem('user'));
  genderList = [
    {value: 'male', display: 'Males'},
    {value: 'female', display: 'Females'}
  ];
  userParams: any = {};

  constructor(private routerService: ActivatedRoute, private userService: UserService,
              private alertifyService: AlertifyService) {
  }

  // region LIFECYCLE

  ngOnInit() {
    // Retrieve the data from the resolver
    this.routerService.data.subscribe(data => {
      this.users = data['users'].result;
      this.pagination = data['users'].pagination;
    });

    this.userParams.gender = this.user.gender === 'female' ? 'male' : 'female';
    this.userParams.minAge = 18;
    this.userParams.maxAge = 99;
    this.userParams.orderBy = 'lastActive';
  }

  // endregion LIFECYCLE

  loadUsers() {
    this.userService
      .getUsers(this.pagination.currentPage, this.pagination.itemsPerPage, this.userParams)
      .subscribe((response: PaginatedResultModel<UserModel[]>) => {
        this.users = response.result;
        this.pagination = response.pagination;
      }, error => {
        this.alertifyService.error(error);
      });
  }

  resetFilters() {
    this.userParams.gender = this.user.gender === 'female' ? 'male' : 'female';
    this.userParams.minAge = 18;
    this.userParams.maxAge = 99;
    this.loadUsers();
  }

  pageChanged(event: any): void {
    this.pagination.currentPage = event.page;
    this.loadUsers();
  }

}
