import React, { useState, useEffect } from 'react';
import { UserProfile } from '../../../types/UserProfile.types';
import { BookmarkCategory } from '@/types/BookmarkCategory.types';
import { Bookmark } from '@/types/Bookmark.types';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../../../firebaseConfig';


const AddBookmarkForm: React.FC<{ profile: UserProfile | null; selectedCategory: BookmarkCategory; }> = ({ profile, selectedCategory }) => {
  const [newBookmark, setNewBookmark] = useState<Bookmark>({ url: 'http://', description: '' });
  const [newCategory, setNewCategory] = useState('');
  const [isPrivate, setIsPrivate] = useState(false);
  

  useEffect(() => {
    if (selectedCategory) {
      setNewCategory(selectedCategory.name);
    }

  }, [selectedCategory]);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!profile || !profile.categories) return;

    let categoryToUpdate: BookmarkCategory | undefined;

    const isExistingCategory = profile.categories.some(category => category.name === newCategory);
    console.log('isExistingCategory', isExistingCategory);

    


    if (!isExistingCategory && newCategory) {
      console.log('Adding a new category', newCategory)
      // Create new category with the bookmark
      categoryToUpdate = { name: newCategory, isPrivate, bookmarks: [newBookmark] };

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
      categoryToUpdate = profile.categories.find(category => category.name === selectedCategory.name);
      if (categoryToUpdate) {
        try {
          const userProfileRef = doc(db, 'userProfile', profile.uid);
          const updatedCategories = profile.categories.map(category => {
            if (category.name === selectedCategory.name) {
              return { ...category, bookmarks: [...category.bookmarks, newBookmark] };
            }
            return category;
          });
          await updateDoc(userProfileRef, { categories: updatedCategories });

        } catch (error) {
          console.error('Error adding bookmark to existing category:', error);        
        }
      }
    }

    
    // Reset form
    setNewBookmark({ url: 'http://', description: '' });
    setNewCategory('');
    setIsPrivate(false);
    // setSelectedCategory(profile.categories[0].name);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <input
        type="text"
        placeholder="Bookmark URL"
        value={newBookmark.url}
        onChange={e => setNewBookmark({ ...newBookmark, url: e.target.value })}
        required
      />
      <textarea
        placeholder="Bookmark Description"
        value={newBookmark.description}
        onChange={e => setNewBookmark({ ...newBookmark, description: e.target.value })}
        required
      />
      <input
        type="text"
        placeholder="New Category (or select an existing one above)"
        value={newCategory}
        onChange={e => setNewCategory(e.target.value)}
      />
      <label>
        <input
          type="checkbox"
          checked={isPrivate}
          onChange={e => setIsPrivate(e.target.checked)}
        /> Mark Category as Private
      </label>
      {/* {profile.categories && profile.categories.length > 0 && !newCategory && (
        <select value={selectedCategory} onChange={e => setSelectedCategory(e.target.value)}>
          {profile.categories.map(category => (
            <option key={category.name} value={category.name}>{category.name}</option>
          ))}
        </select>
      )} */}
      <button type="submit" className="btn">Add Bookmark</button>
    </form>
  );
};

export default AddBookmarkForm;
