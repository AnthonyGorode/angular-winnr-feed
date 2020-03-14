import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MatListModule } from '@angular/material/list';
import { MatInputModule } from '@angular/material/input';
import { MatExpansionModule } from '@angular/material/expansion';

import { FeedsRoutingModule } from './feeds.routing';
import { FeedsListComponent } from './feeds-list/feeds-list.component';
import { FeedsComponent } from './feeds.component';
import { FeedArticlesComponent } from './feed-articles/feed-articles.component';
import { FeedCreateComponent } from './feed-create/feed-create/feed-create.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
    declarations: [      
        FeedsComponent,
        FeedsListComponent,
        FeedArticlesComponent,
        FeedCreateComponent,
    ],
    imports: [
        CommonModule,     
        FormsModule,
        ReactiveFormsModule,
        MatListModule,
        MatInputModule,
        MatExpansionModule,
        FeedsRoutingModule
    ],
})
export class FeedsModule { }