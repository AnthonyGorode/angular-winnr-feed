import { UsersService } from './../../../services/users/users.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { User } from 'firebase';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {

  constructor(
    private usersService: UsersService
  ) { }

  displayedColumns: Array<string> = ['fullname', 'email', 'role', 'action'];
  dataSource = new MatTableDataSource<User>();

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    
    this.getListUsers();
  }

  public getListUsers(): void {
    this.usersService.getAllUsers().subscribe(
      res => {
        // console.log(res);
        let arrayUsers = [];
        res.map(doc => {
          let user = {
            uid: doc.payload.doc.id,
            ...doc.payload.doc.data()
          };
          arrayUsers.push(user);
        });
        // console.log(arrayUsers);
        this.dataSource.data = arrayUsers;
      },
      err => console.error(err)
    );
  }

  public deleteUser(uid: string): void {
    this.usersService.removeUser(uid).subscribe(
      res => console.log(res),
      err => console.error(err)
    );
  }

}
