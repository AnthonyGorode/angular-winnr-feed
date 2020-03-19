import { Feed } from './../../../../models/feed-model/feed.model';

export interface UserMock {
    created_at: string;
    email: string;
    feeds: Array<Feed>;
    feeds_last_modification: string;
    firstname: string;
    lastname: string;
    role: string;
}