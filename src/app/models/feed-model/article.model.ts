export interface Article {
    title: string;
    pubDate: string;
    link: string;
    guid: string;
    author: string;
    thumbnail: string;
    description: string;
    content: string;
    enclosure: {
        link: string,
        type: string,
        length: number
    };
    categories: Array<any>;
}