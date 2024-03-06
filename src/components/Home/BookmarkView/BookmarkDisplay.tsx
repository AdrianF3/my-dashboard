import React, { useState, useEffect } from "react";
import { UserProfile } from '../../../types/UserProfile.types';
import AddBookmarkForm from "./AddBookmarkForm";
import { BookmarkCategory } from '@/types/BookmarkCategory.types';
import { Bookmark } from '@/types/Bookmark.types';
import Link from "next/link";
import { AiOutlineDelete } from 'react-icons/ai';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../../../firebaseConfig';



const BookmarkDisplay: React.FC<{ profile: UserProfile | null; }> = ({ profile }) => {
    // State for the selected category
    const [selectedCategory, setSelectedCategory] = useState<BookmarkCategory>({} as BookmarkCategory);
    const [confirmCategoryDelete, setConfirmCategoryDelete] = useState(false);

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


    // function to handle bookmark deletion
    const handleBookmarkDelete = (bookmark: Bookmark) => {
      // find the category that contains the bookmark, then remove the bookmark from the category and save changes to firestore
      const category = profile?.categories.find(cat => cat.bookmarks.includes(bookmark));

      if (category && profile) {
        const updatedBookmarks = category.bookmarks.filter(bm => bm !== bookmark);
        const updatedCategory = { ...category, bookmarks: updatedBookmarks };
        // update the category in the profile
        const updatedCategories = profile?.categories.map(cat => cat.name === category.name? updatedCategory : cat);

        // update the profile with the new categories
        const updatedProfile = { ...profile, categories: updatedCategories };
        // save the updated profile to firestore
        console.log('updatedProfile', updatedProfile)
        // update gcp firestore
        const profileRef = doc(db, 'userProfile', profile.uid);
        updateDoc(profileRef, updatedProfile).then(() => {
          console.log('Profile updated successfully');
        }).catch(error => {
          console.error('Error updating profile:', error);
        });


      } else {
        console.error('Category not found');
      }
    };

    // function to update to toggle the privacy of a category
    const handleCategoryPrivacyToggle = (category: BookmarkCategory) => {

      // return if profile is null
      if (!profile) return;

      // find the category in the profile and toggle the isPrivate property
      const updatedCategories = profile?.categories.map(cat => cat.name === category.name ? { ...cat, isPrivate: !cat.isPrivate } : cat);
      
      // update the profile with the new categories
      const updatedProfile = { ...profile, categories: updatedCategories };
      // save the updated profile to firestore
      console.log('updatedProfile', updatedProfile)
      // update gcp firestore
      const profileRef = doc(db, 'userProfile', profile.uid);
      updateDoc(profileRef, updatedProfile).then(() => {
        console.log('Profile updated successfully');
      }).catch(error => {
        console.error('Error updating profile:', error);
      });
    };

    // function to handle deleting the category,confirm with user before deleting using a modal
    const handleCategoryDelete = (category: BookmarkCategory) => {
      // return if profile is null
      if (!profile) return;

      // find the category in the profile and remove it
      const updatedCategories = profile?.categories.filter(cat => cat.name !== category.name);
      
      // update the profile with the new categories
      const updatedProfile = { ...profile, categories: updatedCategories };
      // save the updated profile to firestore
      console.log('updatedProfile', updatedProfile)
      // update gcp firestore
      const profileRef = doc(db, 'userProfile', profile.uid);
      updateDoc(profileRef, updatedProfile).then(() => {
        console.log('Profile updated successfully');
      }).catch(error => {
        console.error('Error updating profile:', error);
      });
      setConfirmCategoryDelete(false);
    };



    return (
        <div className="flex flex-col gap-4 justify-around rounded border-2 border-accent self-center bg-primary text-primary-content p-4">
            <div className="flex flex-col justify-center">
                <h1 className="text-2xl font-bold">Bookmarks</h1>
                <p>paragraph about how it works</p>
                {profile && profile.categories && profile.categories.length > 0 ? (
                  <div className="border-2 border-accent rounded-xl self-center w-8/12">
                    {/* Category Selector */}
                    <div>
                      <h2>Categories</h2>
                    {profile.categories.map(category => (
                      <button 
                        key={category.name} 
                        onClick={() => handleCategorySelect(category.name)}
                        className={`m-2 p-2 rounded btn ${selectedCategory?.name === category.name ? 'btn-success text-primary' : 'btn-success-outline text-accent'}`}
                      >
                        {category.name}
                      </button>
                    ))}                         
                    </div>
                    {/* Bookmark Display for Selected Category */}
                    {selectedCategory && selectedCategory.bookmarks &&  (
                      <div className="flex flex-col md:flex-row justify-center">
                        {selectedCategory.bookmarks.map((bookmark, index) => (                          
                          <><div className="border-2 border-accent rounded-xl m-2 justify-center text-center p-2 w-8/12 md:w-3/12 overflow-auto">
                            <button className="btn btn-circle btn-outline" onClick={() => handleBookmarkDelete(bookmark)}>
                              <AiOutlineDelete />
                            </button>
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
                    <h2>{selectedCategory.name} Category Options</h2>
                    <div className="flex flex-row w-full justify-around">
                      <button 
                        className="btn btn-circle btn-outline" 
                        onClick={() => handleCategoryPrivacyToggle(selectedCategory)}
                      >Toggle Privacy</button>
                      <button className="btn btn-circle btn-outline" onClick={() => setConfirmCategoryDelete(true)}>Delete Category</button>
                    </div>               
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
            {/* Modal for Confirming Category Deletion */}
            {confirmCategoryDelete && (
                <div className="modal modal-open">
                    <div className="modal-box">
                        <h3 className="font-bold text-lg">Are you sure you want to delete this category?</h3>
                        <p className="py-4">This action cannot be undone.</p>
                        <div className="modal-action">
                            <button className="btn btn-error" onClick={() => handleCategoryDelete(selectedCategory)}>Delete</button>
                            <button className="btn btn-ghost" onClick={() => setConfirmCategoryDelete(false)}>Cancel</button>
                        </div>
                    </div>
                </div>
            )}        
        </div>
        
    );
};

export default BookmarkDisplay;
