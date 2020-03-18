import { AuthService } from './../../../services/auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CustomErrorStateMatcherService } from 'src/app/services/custom-error-state-matcher/custom-error-state-matcher.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  public isLoading: boolean = false;

  public userForm: FormGroup;
  public errorMatcher = new CustomErrorStateMatcherService();

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private snackbar: MatSnackBar
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

  public async submit() {
    
    if(this.userForm.invalid) return;

    this.isLoading = true;

    const { email, password } = this.userForm.value;

    try {
      await this.authService.signin(email,password);
      this.userForm.reset();
    } catch (error) {
      this.snackbar.open("Une erreur est survenu réessayer plus tard !","X",{
        duration: 3000
      }); 
    }    
    this.isLoading = false;
     
  }

}
