import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatListModule } from '@angular/material/list';
import { MatInputModule } from '@angular/material/input';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { FeedsRoutingModule } from './feeds.routing';

import { FeedsListComponent } from './feeds-list/feeds-list.component';
import { FeedsComponent } from './feeds.component';
import { FeedArticlesComponent } from './feed-articles/feed-articles.component';
import { FeedCreateComponent } from './feed-create/feed-create.component';
import { FeedsUserComponent } from './feeds-user/feeds-user.component';

@NgModule({
    declarations: [
        FeedsComponent,
        FeedsListComponent,
        FeedArticlesComponent,
        FeedCreateComponent,
        FeedsUserComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MatListModule,
        MatInputModule,
        MatExpansionModule,
        MatButtonModule,
        FeedsRoutingModule,
        MatProgressSpinnerModule,
        MatSnackBarModule,
        FlexLayoutModule
    ],
})
export class FeedsModule { }
