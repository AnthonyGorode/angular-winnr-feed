import { Feed } from './feed.model';
import { Article } from './article.model';
export interface MainFeed {
    status: string;
    feed: Feed;
    items: Array<Article>;
}