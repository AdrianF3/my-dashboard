import React from "react";
import Link from "next/link";
import { AiOutlineDelete } from "react-icons/ai";
import { Bookmark } from "@/types/Bookmark.types";

// LinkCard Component
const LinkCard: React.FC<{
  bookmark: Bookmark;
  onDelete: (bookmark: Bookmark) => void;
  isPrivate: boolean;
}> = ({ bookmark, onDelete, isPrivate }) => {
  return (
    <div className="flex flex-row border-2 border-accent/40 rounded-sm items-center p-2">
      <Link href={bookmark.url} target="_blank" className="w-full">
        <div className="flex flex-col text-center btn btn-outline w-full">
          <p>{bookmark.description}</p>
          {!isPrivate && <p className="text-sm italic">{bookmark.url}</p>}
        </div>
      </Link>
      <button
        className="text-error m-2 p-2 bg-accent/40 hover:bg-error hover:text-primary-content hover:font-semibold rounded-xl"
        onClick={() => onDelete(bookmark)}
      >
        <AiOutlineDelete size={15} />
      </button>
    </div>
  );
};

// BookmarkList Component
const BookmarkList: React.FC<{
  bookmarks: Bookmark[];
  onDelete: (bookmark: Bookmark) => void;
  isPrivate: boolean;
}> = ({ bookmarks, onDelete, isPrivate }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full justify-center">
      {bookmarks.map((bookmark, index) => (
        <LinkCard
          key={index}
          bookmark={bookmark}
          onDelete={onDelete}
          isPrivate={isPrivate}
        />
      ))}
    </div>
  );
};

export default BookmarkList;