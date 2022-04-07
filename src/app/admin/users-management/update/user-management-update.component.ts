import { HttpResponse } from '@angular/common/http';
import {Component, ElementRef, Input, OnInit} from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { TransferItem } from 'ng-zorro-antd/transfer';
import { EMPTY, finalize, map, mergeMap, Observable, of } from 'rxjs';
import { RestaurantUser, IRestaurantUser } from '../../restaurant-user/models/restaurant-user.model';
import { RestaurantUserService } from '../../restaurant-user/service/restaurant-user.service';
import { IUser } from '../models/user-management.model';
import { DataUtils, FileLoadError } from 'src/app/core/util/data-util.service';
import {EventManager, EventWithContent} from "../../../core/util/event-manager.service";

@Component({
  selector: 'app-user-management-update',
  templateUrl: './user-management-update.component.html',
  styleUrls: ['./user-management-update.component.scss']
})
export class UserManagementUpdateComponent implements OnInit {
  
  @Input() user!: IUser | null;
  restaurantUser!: IRestaurantUser | null;

  list: TransferItem[] = [];
  disabled = false;

  isSaving = false;
  isLoading = false;

  editForm = this.fb.group({
    id: [null, [Validators.required, Validators.minLength(5)]],
    name: [null, [Validators.required, Validators.minLength(3)]],
    description: [],
    image: [],
    imageContentType: [],
    email: [null, [Validators.email]],
    internalUser: [],
  });

  constructor(
    protected dataUtils: DataUtils,
    protected eventManager: EventManager,
    private restaurantUserService: RestaurantUserService,
    protected fb: FormBuilder,
    protected router: Router,
    private message: NzMessageService,
    private notification: NzNotificationService,
    protected elementRef: ElementRef,
  ) { }

  ngOnInit(): void {
    this.loadRelationshipsOptions();
    if( this.user ){
      this.restaurantUserService.findByUserId(this.user.id!)
      .pipe(
        mergeMap((restaurantUser: HttpResponse<RestaurantUser>) => {
          if (restaurantUser.body) {
            return of(restaurantUser.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      )
      .subscribe((data)=>{
        this.restaurantUser = data;
        console.log("au: ",this.restaurantUser);
        this.updateForm();
      });
    }
    for (let i = 0; i < 20; i++) {
      this.list.push({
        key: i.toString(),
        title: `content${i + 1}`,
        description: `description of content${i + 1}`,
        direction: Math.random() * 2 > 1 ? 'right' : undefined
      });
    }
    console.log("list: ",this.list)
  }

  protected updateForm(): void {
    if( this.restaurantUser !== null ){
      this.editForm = this.fb.group({
        id: new FormControl({value: this.restaurantUser.id, disabled: true}),
        name: new FormControl({value: this.restaurantUser.name, disabled: false}, Validators.minLength(3)),
        description: new FormControl({value: this.restaurantUser.description, disabled: false}, Validators.minLength(10)),
        image: new FormControl({value: this.restaurantUser.image, disabled: false}),
        imageContentType: new FormControl({value: this.restaurantUser.imageContentType, disabled: true}),
        email: new FormControl({value: this.restaurantUser.email, disabled: false}),
        internalUser: new FormControl({value: this.restaurantUser.internalUser, disabled: true})
      });
    }
  }

  protected setupProfiles(): void{
    //if(this.)
  }

  protected loadRelationshipsOptions(): void {
    this.isLoading = true;
  }

  byteSize(base64String: string): string {
    return this.dataUtils.byteSize(base64String);
  }

  openFile(base64String: string, contentType: string | null | undefined): void {
    this.dataUtils.openFile(base64String, contentType);
  }

  setFileData(event: Event, field: string, isImage: boolean): void {
    console.log("change event=> ",event);
    this.dataUtils.loadFileToForm(event, this.editForm, field, isImage).subscribe({
      error: (err: FileLoadError) =>
        this.createMessage('error', err.message),
    });
  }

  clearInputImage(field: string, fieldContentType: string, idInput: string): void {
    this.editForm.patchValue({
      [field]: null,
      [fieldContentType]: null,
    });
    if (idInput && this.elementRef.nativeElement.querySelector('#' + idInput)) {
      this.elementRef.nativeElement.querySelector('#' + idInput).value = null;
    }
  }

  previousState(): void {
    window.history.back();
  }

  save(): void{
    if (this.editForm.valid && this.editForm.touched) {
      this.isSaving = true;
      this.restaurantUser = this.createFromForm();
      console.log("Restaurant User = ",this.restaurantUser);

      if (this.restaurantUser.id !== undefined) {
        this.subscribeToSaveResponse(this.restaurantUserService.update(this.restaurantUser));
      }
    } else {
      Object.values(this.editForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IRestaurantUser>>): void {
    result.pipe(finalize(() => this.onSaveFinalize())).subscribe({
      next: () => this.onSaveSuccess(),
      error: () => this.onSaveError(),
    });
  }

  protected onSaveSuccess(): void {
    this.notification.create(
      'success',
      'Update user ['+this.user?.firstName+' '+this.user?.lastName+']',
      'e-Restaurant User Account is updated with success.'
    );
  }

  protected onSaveError(): void {
    this.notification.create(
      'error',
      "Can't update user ["+this.user?.firstName+' '+this.user?.lastName+']',
      'Something went werrong, try later...'
    );
  }

  protected onSaveFinalize(): void {
    this.isSaving = false;
  }

  protected createFromForm(): IRestaurantUser {
    return {
      ...new RestaurantUser(),
      id: this.editForm.get(['id'])!.value,
      name: this.editForm.get(['name'])!.value,
      description: this.editForm.get(['description'])!.value,
      imageContentType: this.editForm.get(['imageContentType'])!.value,
      image: this.editForm.get(['image'])!.value,
      email: this.editForm.get(['email'])!.value,
      internalUser: this.editForm.get(['internalUser'])!.value,
    };
  }

  createMessage(type: string, msg: string): void {
    this.message.create(type, msg);
  }
}
