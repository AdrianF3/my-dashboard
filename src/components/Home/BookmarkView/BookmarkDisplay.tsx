import React, { useState, useEffect } from "react";
import { UserProfile } from '../../../types/UserProfile.types';
import AddBookmarkForm from "./AddBookmarkForm";

interface Category {
  name: string;
  isPrivate: boolean;
  bookmarks: Bookmark[];
}

interface Bookmark {
  url: string;
  description: string;
}

const BookmarkDisplay: React.FC<{ profile: UserProfile | null; }> = ({ profile }) => {
    // State for the selected category
    const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);

    // Update selectedCategory based on user action or initial load
    useEffect(() => {
      if (profile && profile.categories && profile.categories.length > 0) {
        // Automatically select the first category initially or another logic
        setSelectedCategory(profile.categories[0]);
      }
    }, [profile]);

    // Function to handle category selection
    const handleCategorySelect = (categoryName: string) => {
      const category = profile?.categories.find(cat => cat.name === categoryName);
      setSelectedCategory(category || null);
    };

    return (
        <div className="flex flex-col gap-4 justify-around rounded border-2 border-accent self-center bg-primary text-primary-content p-4">
            <div>
                <h1 className="text-2xl font-bold">Bookmarks</h1>
                {profile && profile.categories && profile.categories.length > 0 ? (
                  <div>
                    {/* Category Selector */}
                    <select onChange={(e) => handleCategorySelect(e.target.value)} value={selectedCategory?.name || ''}>
                      {profile.categories.map(category => (
                        <option key={category.name} value={category.name}>{category.name}</option>
                      ))}
                    </select>
                    {/* Bookmark Display for Selected Category */}
                    {selectedCategory && (
                      <ul>
                        {selectedCategory.bookmarks.map((bookmark, index) => (
                          <li key={index}>{bookmark.url} - {bookmark.description}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                ) : <p>No categories found</p>}                
                {/* Add a Bookmark Form */}
                <AddBookmarkForm profile={profile} selectedCategory={selectedCategory} />

            </div>            
        </div>
    );
};

export default BookmarkDisplay;
