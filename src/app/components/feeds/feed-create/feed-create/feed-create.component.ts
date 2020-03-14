import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { map } from 'rxjs/operators';

import { Feed2jsonService } from './../../../../services/feed2json/feed2json.service';
import { FeedsService } from './../../../../services/feeds/feeds.service';
import { CustomErrorStateMatcherService } from 'src/app/services/custom-error-state-matcher/custom-error-state-matcher.service';

@Component({
  selector: 'app-feed-create',
  templateUrl: './feed-create.component.html',
  styleUrls: ['./feed-create.component.scss']
})
export class FeedCreateComponent implements OnInit {

  public feedForm: FormGroup;
  public errorMatcher = new CustomErrorStateMatcherService();

  constructor(
    private formBuilder: FormBuilder,
    private feedsService: FeedsService,
    private feed2jsonService: Feed2jsonService
  ) { }

  ngOnInit(): void {
    this.initForm();
  }

  private initForm(): void {
    const reg = '(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?';
    this.feedForm = this.formBuilder.group({
      name: ["",[Validators.required],[]],
      url: ["",[Validators.required,Validators.pattern(reg)],[this.checkValidUrl]]
    });
  }

  /**
   * Check if url is a valid rss feed url
   * @param control a AbstactControl type containing the input url value 
   */
  checkValidUrl = (control: AbstractControl) => { // arrow function to bind this
    return this.feed2jsonService.testUrl(control.value).pipe(
      map(res => {
        return res ? null : { "urlIsInvalid": true };
      })
    );
  }

  public submit(): void {
    if(this.feedForm.invalid) return;

    console.log(this.feedForm.value);
  }

}
