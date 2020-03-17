import { AuthService } from './../../../services/auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CustomErrorStateMatcherService } from 'src/app/services/custom-error-state-matcher/custom-error-state-matcher.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  public userForm: FormGroup;
  public errorMatcher = new CustomErrorStateMatcherService();

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.initForm();
  }

  private initForm(): void {
    this.userForm = this.formBuilder.group({
      email: ["",[Validators.required,Validators.email],[]],
      password: ["",[Validators.required],[]]
    });
  }

  public submit(): void {

    if(this.userForm.invalid) return;

    const { email, password } = this.userForm.value;
    this.authService.signin(email,password);

    this.userForm.reset();
  }

}
