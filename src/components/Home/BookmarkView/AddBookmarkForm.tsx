import React, { useState, useEffect } from 'react';
import { UserProfile } from '../../../types/UserProfile.types';
import { BookmarkCategory } from '@/types/BookmarkCategory.types';
import { Bookmark } from '@/types/Bookmark.types';


const AddBookmarkForm: React.FC<{ profile: UserProfile; }> = ({ profile }) => {
  const [newBookmark, setNewBookmark] = useState<Bookmark>({ url: '', description: '' });
  const [newCategory, setNewCategory] = useState('');
  const [isPrivate, setIsPrivate] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');

  useEffect(() => {
    if (profile.categories && profile.categories.length > 0) {
      setSelectedCategory(profile.categories[0].name);
    }
  }, [profile.categories]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    let categoryToUpdate: BookmarkCategory | undefined;

    if (newCategory) {
      // Create new category with the bookmark
      categoryToUpdate = { name: newCategory, isPrivate, bookmarks: [newBookmark] };
      profile.categories.push(categoryToUpdate);
    } else {
      // Add bookmark to existing category
      categoryToUpdate = profile.categories.find(category => category.name === selectedCategory);
      categoryToUpdate?.bookmarks.push(newBookmark);
    }

    
    // Reset form
    setNewBookmark({ url: '', description: '' });
    setNewCategory('');
    setIsPrivate(false);
    setSelectedCategory(profile.categories[0].name);
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
        placeholder="New Category (optional)"
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
      {profile.categories && profile.categories.length > 0 && !newCategory && (
        <select value={selectedCategory} onChange={e => setSelectedCategory(e.target.value)}>
          {profile.categories.map(category => (
            <option key={category.name} value={category.name}>{category.name}</option>
          ))}
        </select>
      )}
      <button type="submit" className="btn">Add Bookmark</button>
    </form>
  );
};

export default AddBookmarkForm;
