import { AuthService } from './../../../services/auth/auth.service';
import { UsersService } from './../../../services/users/users.service';
import { Feed } from '../../../models/feed-model/feed.model';
import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { map, catchError } from 'rxjs/operators';

import { Feed2jsonService } from '../../../services/feed2json/feed2json.service';
import { FeedsService } from '../../../services/feeds/feeds.service';
import { CustomErrorStateMatcherService } from 'src/app/services/custom-error-state-matcher/custom-error-state-matcher.service';
import { Observable, throwError } from 'rxjs';

@Component({
  selector: 'app-feed-create',
  templateUrl: './feed-create.component.html',
  styleUrls: ['./feed-create.component.scss']
})
export class FeedCreateComponent implements OnInit {

  public feedForm: FormGroup;
  public errorMatcher = new CustomErrorStateMatcherService();

  public uidUser: string;

  @Input() public status: string;
  @Input() public feedsUser: Array<Feed> = [];

  constructor(
    private formBuilder: FormBuilder,
    private feedsService: FeedsService,
    private feed2jsonService: Feed2jsonService,
    private usersService: UsersService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.getAuthUid();
  }

  private initForm(): void {
    const reg = '(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?';
    this.feedForm = this.formBuilder.group({
      name: ["",[Validators.required],[]],
      url: ["",[Validators.required,Validators.pattern(reg)],[]]
    });
  }

  private getAuthUid(): void {
    this.authService.getAuthUid().subscribe(
      uid => this.uidUser = uid,
      err => console.error(err)
    );
  }

  /**
   * Check if url is a valid rss feed url
   * @param control a AbstactControl type containing the input url value
   */
  checkValidUrl = (control: AbstractControl) => { // arrow function to bind this
    // console.log(control.value);
    return this.feed2jsonService.testUrl(control.value).pipe(
      map(res => {
        // console.log("RES => ",res)
        return res ? null : { "urlIsInvalid": true };
      }),
      catchError(this.handleError)
    );
  }

  private handleError (error: any) {
    return throwError({"urlIsInvalid": true});
  }

  isLoginToken(): boolean {
    return this.feedForm.get('url').hasError('urlIsInvalid');
  }

  public submit(): void {
    if(this.feedForm.invalid) return;

    const { name, url } = this.feedForm.value;
    const created_at = new Date().toISOString();
    this.feed2jsonService.testUrl(url).subscribe( // je teste l'async validator manuellement
      res => {
        const feed: Feed = {
          name,
          url,
          created_at
        };

        if(this.status === "create") this.feedsService.addFeed(feed);
        else {
          this.feedsUser.push(feed);
          this.usersService.updateFeedUser(this.feedsUser,this.uidUser);
        }
        this.feedForm.reset();
      },
      err => this.feedForm.get('url').setErrors( { "urlIsInvalid": true })
    );
  }

}
