import {Routes} from '@angular/router';
import {HomeComponent} from './components/home/home.component';
import {MemberListComponent} from './components/members/member-list/member-list.component';
import {MessagesComponent} from './components/messages/messages.component';
import {ListsComponent} from './components/lists/lists.component';
import {AuthGuard} from './_guards/auth.guard';
import {MemberDetailComponent} from './components/members/member-detail/member-detail.component';
import {MemberDetailResolver} from './_resolvers/member-detail.resolver';
import {MemberListResolver} from './_resolvers/member-list.resolver';
import {MemberEditComponent} from './components/members/member-edit/member-edit.component';
import {MemberEditResolver} from './_resolvers/member-edit.resolver';
import {PreventUnsavedChangesGuard} from './_guards/prevent-unsaved-changes.guard';
import {ListResolver} from './_resolvers/list.resolver';
import {MessageResolver} from './_resolvers/message.resolver';

/**
 * @author Petar Krastev
 */
export const appRoutes: Routes = [
  {path: 'home', component: HomeComponent},
  {
    path: '',
    runGuardsAndResolvers: 'always',
    canActivate: [AuthGuard],
    children: [
      {path: 'members', component: MemberListComponent, resolve: {users: MemberListResolver}},
      {path: 'members/:id', component: MemberDetailComponent, resolve: {user: MemberDetailResolver}},
      {
        path: 'member/edit',
        component: MemberEditComponent,
        resolve: {user: MemberEditResolver},
        canDeactivate: [PreventUnsavedChangesGuard]
      },
      {path: 'messages', component: MessagesComponent, resolve: {messages: MessageResolver}},
      {path: 'lists', component: ListsComponent, resolve: {users: ListResolver}},
    ]
  },
  {path: '**', redirectTo: 'home', pathMatch: 'full'}
];
