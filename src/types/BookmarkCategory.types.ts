import { Bookmark } from './Bookmark.types';

export interface BookmarkCategory {
    name: string;
    isPrivate: boolean;
    bookmarks: Bookmark[];
    position: number;
}