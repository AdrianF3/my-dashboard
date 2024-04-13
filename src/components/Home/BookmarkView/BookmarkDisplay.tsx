import React, { useState, useEffect } from "react";
import { UserProfile } from '../../../types/UserProfile.types';
import AddBookmarkForm from "./AddBookmarkForm";
import { BookmarkCategory } from '@/types/BookmarkCategory.types';
import { Bookmark } from '@/types/Bookmark.types';
import Link from "next/link";
import { AiOutlineDelete } from 'react-icons/ai';
import { MdOutlinePrivacyTip } from 'react-icons/md';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../../../firebaseConfig';
import { GrLinkNext, GrLinkPrevious } from 'react-icons/gr';



const BookmarkDisplay: React.FC<{ profile: UserProfile | null; }> = ({ profile }) => {
    // State for the selected category
    const [selectedCategory, setSelectedCategory] = useState<BookmarkCategory>({} as BookmarkCategory);
    const [confirmCategoryDelete, setConfirmCategoryDelete] = useState(false);
    const [sortedCategories, setSortedCategories] = useState<BookmarkCategory[]>([]);
    const [addingCategory, setAddingCategory] = useState(false);

    // Update selectedCategory based on user action or initial load
    useEffect(() => {
      if (profile && profile.categories && profile.categories.length > 0) {

        const sortedCategories = profile.categories.sort((a, b) => a.position - b.position);
        setSortedCategories(sortedCategories);
        // Automatically select the first category if not already selected
        if (!selectedCategory.name) {
          setSelectedCategory(sortedCategories[0]);                    
        } else {          
          // find the index of the category that matches the selectedCategory.position and set that as the selectedCategory
          const index = sortedCategories.findIndex(cat => cat.position === selectedCategory.position);
          setSelectedCategory(sortedCategories[index]);
        }
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

    // function to handle moving bewtween categories up or down, based on the category.position property
    const handleCategoryPositingChange = (category: BookmarkCategory, direction: 'up' | 'down') => {
      console.log('category', category)
      // find current category position
      const index = sortedCategories.findIndex(cat => cat.position === category.position);

      
      if (direction === 'up') {
        console.log('up called')
        //  if index is the last category in sortedCategories, setSelectedCategory to the first category
        if (index === sortedCategories.length - 1) {
          setSelectedCategory(sortedCategories[0]);
        } else {
          setSelectedCategory(sortedCategories[index + 1]);
        }
      }
      if (direction === 'down') {
        console.log('down called')
        //  if index is the first category in sortedCategories, setSelectedCategory to the last category
        if (index === 0) {
          setSelectedCategory(sortedCategories[sortedCategories.length - 1]);
        } else {
          setSelectedCategory(sortedCategories[index - 1]);
        }
      }

      



    }


   // Refactored function to handle moving a category up or down
  const handleCategoryMove = (category: BookmarkCategory, direction: 'up' | 'down') => {
    if (!profile) return;

    const index = profile.categories.findIndex((cat) => cat.name === category.name);
    if (index === -1) return; // Category not found

    const swapIndex = direction === 'up' ? index - 1 : index + 1;
    // Ensure swapIndex is within bounds
    if (swapIndex < 0 || swapIndex >= profile.categories.length) return;

    // Swap positions
    let tempPosition = profile.categories[index].position;
    profile.categories[index].position = profile.categories[swapIndex].position;
    profile.categories[swapIndex].position = tempPosition;

    // Sort categories based on new positions to maintain order
    const sortedCategories = profile.categories.sort((a, b) => a.position - b.position);

    // Update the profile with the new categories order
    const updatedProfile = { ...profile, categories: sortedCategories };

    // Log and update Firestore
    console.log('updatedProfile', updatedProfile);
    const profileRef = doc(db, 'userProfile', profile.uid);
    updateDoc(profileRef, { categories: updatedProfile.categories })
      .then(() => {
        console.log('Profile updated successfully');
      })
      .catch((error) => {
        console.error('Error updating profile:', error);
      });
  };




    return (
        <div className="flex flex-col gap-4 justify-around rounded border-2 border-accent self-center bg-primary text-primary-content p-4">
            <div className="flex flex-col justify-center">
              <div className="flex flex-col p-4">
                <h1 className="text-2xl font-bold">Bookmarks</h1>
                <p className="text-lg text-accent-content">
                  Welcome to your bookmarks! Here you can view and manage your bookmarks. Create categories to organize your bookmarks and add bookmarks to each category. You can also delete categories and bookmarks.
                </p>
              </div>
              {/* Display Categories  */}
                {profile && profile.categories && profile.categories.length > 0 ? (

                  // START OF CATEOGORYBOOKMARKDISLAY
                  <div className="border-2 border-accent rounded-xl self-center w-8/12 p-4">
                    <h2 className="text-xl font-semi-bold p-1">Categories</h2>
                    {/* Category Selector */}
                    <div className="flex flex-wrap justify-center md:justify-start">
                    {sortedCategories.map(category => (
                      <button 
                        key={category.name} 
                        onClick={() => handleCategorySelect(category.name)}
                        className={`m-2 p-2 rounded btn ${selectedCategory?.name === category.name ? 'btn-info text-primary-content' : 'btn-info-outline text-primary-content'}`}
                      >
                        {category.name }: { category.bookmarks.length}
                      </button>
                    ))}
                    {/* Button to add new category */}
                    <button 
                      className={`m-2 p-2 rounded btn btn-success`}
                      onClick={() => setAddingCategory(true)}
                    >
                      Add Bookmark
                    </button>
                                 
                    </div>
                    <div className="flex flex-row justify-between gap-4 my-2 items-center border-b-2 border-accent pb-4">
                      {/* Previous Category Button */}
                      <div className="flex flex-col justify-center items-center text-center">
                        <button className="btn btn-circle btn-outline" onClick={() => handleCategoryPositingChange(selectedCategory, 'down')}><GrLinkPrevious size={15} /></button>
                        <p className="text-sm">Previous</p>
                      </div>
                      {/* Next Category Button */}
                      <div className="flex flex-col justify-center items-center text-center">
                        <button className="btn btn-circle btn-outline" onClick={() => handleCategoryPositingChange(selectedCategory, 'up')}><GrLinkNext size={15} /></button>
                        <p className="text-sm">Next</p>
                      </div>
                    </div>

                    {/* Bookmark Display for Selected Category */}
                    {selectedCategory && selectedCategory.bookmarks &&  (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full justify-center">
                        {selectedCategory.bookmarks.map((bookmark, index) => (
                          <div className="flex flex-col items-center p-2" key={index}>
                            <Link href={bookmark.url} target="_blank">
                              <div className="flex flex-col text-center btn btn-outline">
                                <p>{bookmark.description}</p>
                                {!selectedCategory.isPrivate && <p className="text-sm italic">{bookmark.url}</p>}
                              </div>
                            </Link>
                            <button className="text-error m-2 p-2 bg-accent/40 hover:bg-error hover:text-primary-content hover:text-semibold rounded-xl" onClick={() => handleBookmarkDelete(bookmark)}>
                              <AiOutlineDelete size={15} />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Category Options */}
                    <div className="mt-10 p-4 border-t-2 border-accent text-center">
                      <h2 className="mb-4">{selectedCategory.name} Category Options</h2>
                      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                        {/* Move Up */}
                        <div className="flex flex-col items-center">
                          <button className="btn btn-circle btn-outline" onClick={() => handleCategoryMove(selectedCategory, 'up')}>
                            <GrLinkPrevious size={15} />
                          </button>
                          <p className="text-sm">Move Up</p>
                        </div>
                        {/* Move Down */}
                        <div className="flex flex-col items-center">
                          <button className="btn btn-circle btn-outline" onClick={() => handleCategoryMove(selectedCategory, 'down')}>
                            <GrLinkNext size={15} />
                          </button>
                          <p className="text-sm">Move Down</p>
                        </div>
                        {/* Toggle Privacy */}
                        <div className="flex flex-col items-center">
                          <button className="btn btn-circle btn-outline" onClick={() => handleCategoryPrivacyToggle(selectedCategory)}>
                            <MdOutlinePrivacyTip size={15} />
                          </button>
                          <p className="text-sm">Toggle Privacy</p>
                        </div>
                        {/* Delete */}
                        <div className="flex flex-col items-center">
                          <button className="btn btn-circle btn-outline" onClick={() => setConfirmCategoryDelete(true)}>
                            <AiOutlineDelete size={15} />
                          </button>
                          <p className="text-sm">Delete</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  // END OF CATEOGORYBOOKMARKDISLAY

                ) : <p>No categories found</p>}                                

            </div>    
            {/* Modal for adding a new category */}
            {addingCategory && (
                <div className="modal modal-open">
                    <div className="modal-box">
                      <div className="flex flex-col">
                        {/* Add a Bookmark Form */}
                        <AddBookmarkForm 
                          profile={profile} 
                          selectedCategory={selectedCategory}    
                          setAddingCategory={setAddingCategory}                     
                        />
                      </div>

                    </div>
                </div>
            )}  
            {/* testing a comment */}
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


