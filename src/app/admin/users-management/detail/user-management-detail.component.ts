import { HttpClient, HttpResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { IRestaurantUser } from '../../restaurant-user/models/restaurant-user.model';
import { RestaurantUserService } from '../../restaurant-user/service/restaurant-user.service';
import { User } from '../models/user-management.model';


@Component({
  selector: 'app-user-management-detail',
  templateUrl: './user-management-detail.component.html',
  styleUrls: ['./user-management-detail.component.scss']
})
export class UserManagementDetailComponent implements OnInit {


  @Input() user!: User;
  restaurantUser!: IRestaurantUser | null;

  loading: boolean = true;

  constructor(
      private restaurantUserService: RestaurantUserService,
      private msg: NzMessageService
    ) { }

  ngOnInit(): void {
    if( this.user ){
      this.restaurantUserService.findByUserId(this.user.id!).subscribe({
        next: (res: HttpResponse<IRestaurantUser>)=>{
          this.restaurantUser = res.body;
          this.loading = false;
          console.log(this.restaurantUser);
        },
        error: ()=>{
          console.log("NOT FOUND");
        }
      });
    }
    
  }
}
