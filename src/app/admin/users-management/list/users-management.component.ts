import { HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { combineLatest, Observable } from 'rxjs';
import { AuthService } from 'src/app/auth/service/auth.service';
import { IUser, User } from '../models/user-management.model';
import { UsersManagementService } from '../service/users-management.service';

@Component({
  selector: 'app-users-management',
  templateUrl: './users-management.component.html',
  styleUrls: ['./users-management.component.scss']
})
export class UsersManagementComponent implements OnInit {
  
  //Variables
  users: User[] = [];
  total = 1;
  loading = true;
  pageSize = 10;
  pageIndex = 1;
  predicate: string = 'id';
  ascending: boolean = true;

  //Edit user vars
  visible = false;
  selectedUser!: User;
  userDrawer: string = 'User Details';
  action: string = ''; /** Possible value {'EDIT', 'VIEW'} */

  constructor(
    private usersService: UsersManagementService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private message: NzMessageService,
    private auth: AuthService,
    private translateService: TranslateService
  ) { }

  ngOnInit(): void {
    this.loadDataFromServer(this.pageIndex, this.pageSize, []);
  }

  createMessage(type: string, msg: string): void {
    this.message.create(type, msg);
  }

  setActive(user: User): void {
    //this.userService.update({ ...user, activated: isActivated }).subscribe(() => this.loadAll());
    const translationKey = 'userManagement.' + (user.activated ? 'locked' : 'unlocked');
    const translatedMessage = this.translateService.instant( translationKey, { login: user.login });
    this.message.info(translatedMessage);
    user.activated = !user.activated;
  }

  loadDataFromServer(
    pageIndex: number,
    pageSize: number,
    filter: Array<{ key: string; value: string[] }>
  ): void {
    this.loading = true;
    /*
    this.randomUserService.getUsers(pageIndex, pageSize, sortField, sortOrder, filter).subscribe(data => {
      this.loading = false;
      this.total = 200; // mock the total data here
      this.listOfRandomUser = data.results;
    });
    */
    this.usersService
      .query({
        page: pageIndex-1,
        size: pageSize,
        sort: this.sort(),
      })
      .subscribe({
        next: (res: HttpResponse<User[]>) => {
          this.loading = false;
          this.onSuccess(res.body, res.headers);
          console.log("respond: ",res)
        },
        error: () => (this.loading = false),
      });

  }

  editAccount(user: IUser): void{
    if(user.id !== undefined){
      this.updateDrawer('EDIT', 'userManagement.update.title');
      this.selectedUser = user;
      // this.auth.findUser(user.id).subscribe((data)=>{
      //   console.log(data);
      // });
    }
  }

  userDetail( user: User ): void {
    this.updateDrawer('VIEW', 'userManagement.detail.title');
    this.selectedUser = user;
  }

  updateDrawer(action: string, translationKey: string){
    this.action = action;
    this.userDrawer = this.translateService.instant( translationKey);
    this.visible = true;
  }

  private sort(): string[] {
    console.log(this.predicate," # ",this.ascending)
    const result = [`${this.predicate},${this.ascending ? "asc" : "desc"}`];
    if (this.predicate !== 'id') {
      result.push('id');
    }
    return result;
  }

  private onSuccess(users: User[] | null, headers: HttpHeaders): void {
    this.total = Number(headers.get('X-Total-Count'));
    if(users){
      this.users = users;
    }
  }

  onQueryParamsChange(params: NzTableQueryParams): void {
    const { pageSize, pageIndex, sort, filter } = params;
    const currentSort = sort.find(item => item.value !== null);
    this.predicate = (currentSort && currentSort.key) || 'id';
    this.ascending = ((currentSort && currentSort.value) ?? 'ascend') === 'ascend';
    console.log("current sort: ", (currentSort && currentSort.value) )
    console.log(this.predicate," - ", this.ascending)
    this.loadDataFromServer(pageIndex, pageSize, filter);
  }

  

  close(): void {
    this.visible = false;
  }
  
}

/**
 * 
 * 
  loadAll(): void {
    this.isLoading = true;
    this.usersService
      .query({
        page: this.page - 1,
        size: this.itemsPerPage,
        sort: this.sort(),
      })
      .subscribe({
        next: (res: HttpResponse<User[]>) => {
          this.isLoading = false;
          this.onSuccess(res.body, res.headers);
        },
        error: () => (this.isLoading = false),
      });
  }

  private handleNavigation(): void {
    combineLatest([this.activatedRoute.data, this.activatedRoute.queryParamMap]).subscribe(([data, params]) => {
      const page = params.get('page');
      this.page = +(page ?? 1);
      const sort = (params.get('sort') ?? data['defaultSort']).split(',');
      this.predicate = sort[0];
      this.ascending = sort[1] === "asc";
      this.loadAll();
    });
  }
  

  transition(): void {
    this.router.navigate(['./'], {
      relativeTo: this.activatedRoute.parent,
      queryParams: {
        page: this.page,
        sort: `${this.predicate},${this.ascending ? "asc" : "desc"}`,
      },
    });
  }

  private sort(): string[] {
    const result = [`${this.predicate},${this.ascending ? "asc" : "desc"}`];
    if (this.predicate !== 'id') {
      result.push('id');
    }
    return result;
  }

  private onSuccess(users: User[] | null, headers: HttpHeaders): void {
    this.totalItems = Number(headers.get('X-Total-Count'));
    this.users = users;
  }
 */