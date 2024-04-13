import React, { useState, useEffect } from 'react';
import { UserProfile } from '../../../types/UserProfile.types';
import { BookmarkCategory } from '@/types/BookmarkCategory.types';
import { Bookmark } from '@/types/Bookmark.types';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../../../firebaseConfig';


const AddBookmarkForm: React.FC<{ profile: UserProfile | null; selectedCategory: BookmarkCategory; setAddingCategory: (adding: boolean) => void }> = ({ profile, selectedCategory, setAddingCategory }) => {
  const [newBookmark, setNewBookmark] = useState<Bookmark>({ url: 'http://', description: '' });
  const [newCategory, setNewCategory] = useState('');
  const [isPrivate, setIsPrivate] = useState(false);
  

  useEffect(() => {
    if (selectedCategory) {
      setNewCategory(selectedCategory.name);
    }

  }, [selectedCategory]);
  console.log('newCategory', newCategory)
    
  const handleSubmit = async (e: React.FormEvent) => {    
    e.preventDefault();
    console.log('newBookmark', newBookmark)

    if (!profile || !profile.categories) return;

    let categoryToUpdate: BookmarkCategory | undefined;

    const isExistingCategory = profile.categories.some(category => category.name === newCategory);
    console.log('isExistingCategory', isExistingCategory);

    


    if (!isExistingCategory && newCategory) {
      console.log('Adding a new category', newCategory)
      const newPosition = profile.categories.length + 1;

      // Create new category with the bookmark
      categoryToUpdate = { name: newCategory, isPrivate, bookmarks: [newBookmark], position: newPosition};

      // Add new category to userProfile document
      try {
        const userProfileRef = doc(db, 'userProfile', profile.uid);
        await updateDoc(userProfileRef, {
          categories: [...profile.categories, categoryToUpdate]
        });

      } catch (error) {
        console.error('Error adding new category:', error);                
      }

      
    } else if (isExistingCategory) {
      console.log('Adding a bookmark to an existing category', newCategory)
      // Add bookmark to existing category
      // categoryToUpdate = profile.categories.find(category => category.name === selectedCategory.name);
      categoryToUpdate = profile.categories.find(category => category.name === newCategory);
      console.log('categoryToUpdate', categoryToUpdate)
      if (categoryToUpdate) {
        try {
          const userProfileRef = doc(db, 'userProfile', profile.uid);
          const updatedCategories = profile.categories.map(category => {
            // if (category.name === selectedCategory.name) {
            if (category.name === newCategory) {
              return { ...category, bookmarks: [...category.bookmarks, newBookmark] };
            }
            return category;
          });
          await updateDoc(userProfileRef, { categories: updatedCategories }).then(() => {
            console.log('Bookmark added to existing category');
            setNewBookmark({ url: 'http://', description: '' });
            setNewCategory('');
            setIsPrivate(false);    
          });

        } catch (error) {
          console.error('Error adding bookmark to existing category:', error);        
        }
      }
    }

    
    // Reset form
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 bg-primary p-4 rounded text-center justify-center items-center">
      <h2>Add a New Bookmark</h2>
      <label htmlFor="url">Link Address</label>
      <input
        className="input w-full max-w-xs"
        name='url'
        type="text"
        placeholder="Bookmark URL"
        value={newBookmark.url}
        onChange={e => setNewBookmark({ ...newBookmark, url: e.target.value })}
        required
      />
      <label htmlFor="label">Label</label>
      <input
        className="input w-full max-w-xs"
        name='label'
        placeholder="Bookmark Label"
        value={newBookmark.description}
        onChange={e => setNewBookmark({ ...newBookmark, description: e.target.value })}
        required
      />
      <label htmlFor="category">Category</label>
      <input
        className="input w-full max-w-xs"
        name='category'
        type="text"
        placeholder="New Category (or select an existing one above)"
        value={newCategory}
        onChange={e => setNewCategory(e.target.value)}
      />    
      <div className='flex flex-wrap gap-4 justify-between'>
        <button type="submit" className="btn btn-success">Add Bookmark</button>
        <button type="button" onClick={() => setAddingCategory(false)} className="btn btn-danger">Cancel</button>
      </div>    
    </form>
  );
};

export default AddBookmarkForm;
