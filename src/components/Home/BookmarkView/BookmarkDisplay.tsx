import React, { useState, useEffect } from "react";
import { UserProfile } from '../../../types/UserProfile.types';
import AddBookmarkForm from "./AddBookmarkForm";
import { BookmarkCategory } from '@/types/BookmarkCategory.types';
import { Bookmark } from '@/types/Bookmark.types';
import Link from "next/link";



const BookmarkDisplay: React.FC<{ profile: UserProfile | null; }> = ({ profile }) => {
    // State for the selected category
    const [selectedCategory, setSelectedCategory] = useState<BookmarkCategory>({} as BookmarkCategory);

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
      setSelectedCategory(category || {} as BookmarkCategory);
    };

    return (
        <div className="flex flex-col gap-4 justify-around rounded border-2 border-accent self-center bg-primary text-primary-content p-4">
            <div className="flex flex-col justify-center">
                <h1 className="text-2xl font-bold">Bookmarks</h1>
                <p>paragraph about how it works</p>
                {profile && profile.categories && profile.categories.length > 0 ? (
                  <div className="border-2 border-accent rounded-xl self-center w-8/12">
                    {/* Category Selector */}
                    {profile.categories.map(category => (
                      <button 
                        key={category.name} 
                        onClick={() => handleCategorySelect(category.name)}
                        className={`m-2 p-2 rounded ${selectedCategory?.name === category.name ? 'bg-accent text-primary' : 'bg-primary text-accent'}`}
                      >
                        {category.name}
                      </button>
                    ))}                    
                    {/* Bookmark Display for Selected Category */}
                    {selectedCategory && selectedCategory.bookmarks &&  (
                      <div className="flex flex-col md:flex-row justify-center">
                        {selectedCategory.bookmarks.map((bookmark, index) => (                          
                          <><div className="border-2 border-accent rounded-xl m-2 justify-center text-center p-2 w-8/12 md:w-3/12 overflow-auto">
                            <Link 
                              href={bookmark.url} 
                              target="_blank" 
                              key={index}>
                            <p>{bookmark.description}</p>
                            { selectedCategory.isPrivate ?  <p className="text-sm italic"> link </p> : <p className="text-sm italic">{bookmark.url}</p> }
                            </Link>
                            </div></>
                        ))}
                      </div>
                    )}
                  </div>
                ) : <p>No categories found</p>}                
                <div className="flex flex-col m-4">
                  {/* Add a Bookmark Form */}
                  <AddBookmarkForm 
                    profile={profile} 
                    selectedCategory={selectedCategory} 
                    
                  />

                </div>

            </div>            
        </div>
    );
};

export default BookmarkDisplay;
