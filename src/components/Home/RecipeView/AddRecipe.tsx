import React, { useState, useRef } from 'react';
import { db, storage, auth } from '../../../firebaseConfig';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { doc, updateDoc, arrayUnion } from 'firebase/firestore';
import { Recipe } from '../../../types/Recipe.types';
import { v4 as uuidv4 } from 'uuid';

interface AddRecipeProps {
  category: string;  
  closeModal: () => void;  
}

const AddRecipe: React.FC<AddRecipeProps> = ({ category, closeModal }) => {
  const [name, setName] = useState<string>('');
  const [note, setNote] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [recipeURL, setRecipeURL] = useState<string>('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUploadClick = () => fileInputRef.current?.click();

  const uploadFile = async (file: File, path: string) => {
    const storageRef = ref(storage, path);
    const snapshot = await uploadBytes(storageRef, file);
    return getDownloadURL(snapshot.ref);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null; // Fallback to null if file is undefined
    setSelectedFile(file);
};


  const saveRecipe = async () => {
    setIsLoading(true);
    const file = fileInputRef.current?.files?.[0];
    if (!file) {
      setIsLoading(false);
      return; // Ensure a file is selected
    }

    const uid = auth.currentUser?.uid;
    if (!uid) {
      setIsLoading(false);
      return; // Ensure user is logged in
    }

    try {
      const pdfDownloadUrl = await uploadFile(file, `Recipes/${uid}/${file.name}`);
      
      const newRecipe: Recipe = {
        id: uuidv4(),
        name,
        description: note,
        category,
        pdfRecipeURL: pdfDownloadUrl,
        recipeURL,
        ownerUID: uid,
      };
      console.log('newRecipe', newRecipe)
      const userDocRef = doc(db, 'userProfile', uid);
      await updateDoc(userDocRef, {
        recipes: arrayUnion(newRecipe),
      });

      // Reset form fields
      setName('');
      setNote('');
      setRecipeURL('');
      if (fileInputRef.current) fileInputRef.current.value = '';
    } catch (error) {
      console.error('Error uploading file and updating Firestore:', error);
    } finally {
      setIsLoading(false);
      closeModal();
    }
  };

  return (
    <div className="flex flex-col bg-primary items-center justify-center p-4 gap-4 rounded-xl">
      <h1 className="text-4xl text-primary-content">New Recipe</h1>
      <p className="w-full p-2 text-xl text-primary-content">Category: {category}</p>
      <input
        className="w-full p-4 text-xl text-primary-content"
        placeholder="Recipe Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        className="w-full p-4 text-xl text-primary-content"
        placeholder="Recipe URL"
        value={recipeURL}
        onChange={(e) => setRecipeURL(e.target.value)}
      />
      <textarea
        className="w-full p-4 text-xl text-primary-content"
        placeholder="Notes"
        value={note}
        onChange={(e) => setNote(e.target.value)}
      />
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        onChange={handleFileChange}
      />
      <div className='flex flex-wrap justify-center text-center gap-2'>
        {!selectedFile ? (
          <button
            className="px-4 py-2 text-xl text-white bg-blue-500 rounded hover:bg-blue-600"
            onClick={handleFileUploadClick}
          >
            Select PDF
          </button>
        ) : (
          <div className='flex flex-col justify-center text-center'>
            <p>Selected PDF: {selectedFile.name}</p>
            <p>File Size: {selectedFile.size} bytes</p>
            {isLoading ? (
              <p>Uploading Recipe...</p>
            ) : (
              <button
                className="px-4 py-2 text-xl text-white bg-green-500 rounded hover:bg-green-600"
                onClick={saveRecipe}
              >
                Upload Recipe
              </button>
            )}
          </div>
        )}
        <button
          className="px-4 py-2 text-xl text-white bg-red-500 rounded hover:bg-red-600"
          onClick={closeModal}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default AddRecipe;
