import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Observable, of, scheduled } from 'rxjs';
import { mock, instance, when, deepEqual } from 'ts-mockito';

import { UsersListComponent } from './users-list.component';
import { UserCreateComponent } from './../user-create/user-create.component';

import { UsersService } from 'src/app/services/users/users.service';

import { UserList } from 'src/app/specs/__mocks__/users-list/models/users-list.model';
import { userList } from "src/app/specs/__mocks__/users-list/users-list.mock";

import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';

fdescribe('UsersListComponent', () => {
  let component: UsersListComponent;
  let fixture: ComponentFixture<UsersListComponent>;

  let usersService: UsersService;

  let arrayUserMock: Array<UserList> = userList;
  let observableUserMock = new Observable(sub => sub.next(arrayUserMock));

  beforeEach(async(() => {
    usersService = mock(UsersService);
    when(usersService.getAllUsers()).thenReturn(observableUserMock);

    TestBed.configureTestingModule({
      declarations: [ UsersListComponent, UserCreateComponent ],
      imports: [
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        MatTableModule,
        MatPaginatorModule,
        MatButtonModule,
        MatInputModule,
      ],
      providers: [ 
        {
          provide: UsersService,
          useValue: instance(usersService)
        } 
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      spyOn(component.paginator, 'firstPage').and.returnValue();
      fixture.detectChanges();
    });
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('check source data contains users',() => {
      expect(component.dataSource.data).not.toBeNull();
  });
});
