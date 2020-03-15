import { Feed } from './../feed-model/feed.model';

export interface User {
    uid?: string;
    firstName: string;
    lastName: string;
    email: string;
    role?: string;
    createdAt?: string;
    feeds?: Array<Feed>;
}