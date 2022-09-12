import { AuthService } from './../../../services/auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CustomErrorStateMatcherService } from 'src/app/services/custom-error-state-matcher/custom-error-state-matcher.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BreadCrumbService } from 'src/app/services/bread-crumb/bread-crumb.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  public isLoading = false;

  public userForm: FormGroup;
  public errorMatcher = new CustomErrorStateMatcherService();

  private errorCodeAuth: Array<string> = ['auth/user-not-found', 'auth/wrong-password'];

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private snackbar: MatSnackBar,
    private breadCrumbService: BreadCrumbService
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.breadCrumbService.returnActiveRoute();
  }

  private initForm(): void {
    this.userForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email], []],
      password: ['', [Validators.required], []]
    });
  }

  public async submit() {

    if (this.userForm.invalid) { return; }

    this.isLoading = true;

    const { email, password } = this.userForm.value;

    try {
      await this.authService.signin(email, password);
      this.userForm.reset();
    } catch (error) {
      let message = 'Une erreur est survenu réessayez plus tard !';

      if (error?.code && this.errorCodeAuth.includes(error?.code)) {
        message = 'Les identifiants sont incorrectes, réessayez !';
      }

      this.snackbar.open(message, 'X', {
        duration: 3000
      });
    }
    this.isLoading = false;

  }

}
