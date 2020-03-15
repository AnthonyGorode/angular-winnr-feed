import { CustomErrorStateMatcherService } from 'src/app/services/custom-error-state-matcher/custom-error-state-matcher.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UsersService } from 'src/app/services/users/users.service';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.scss']
})
export class UserCreateComponent implements OnInit {

  public userForm: FormGroup;
  public errorMatcher = new CustomErrorStateMatcherService();

  constructor(
    private formBuilder: FormBuilder,
    private usersService: UsersService
  ) { }

  ngOnInit(): void {
    this.initForm();
  }

  private initForm(): void {
    this.userForm = this.formBuilder.group({
      firstname: ["",[Validators.required],[]],
      lastname: ["",[Validators.required],[]],
      email: ["",[Validators.required,Validators.email],[]]
    });
  }

  public submit(): void {

    if(this.userForm.invalid) return;

    const { email } = this.userForm.value;
    this.usersService.addUser(this.userForm.value).subscribe(
      res => {
        this.usersService.sendResetPassword(email);
        console.log(res)
      },
      err => console.error(err)
    );

    this.userForm.reset();
  }

}
