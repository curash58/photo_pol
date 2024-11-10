// src/pages/uploadPhotoHelper.js
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

export const uploadPhotoHelper = async (file, storage) => {
  if (!file) return null;
  const storageRef = ref(storage, `photos/${file.name}`);
  await uploadBytes(storageRef, file);
  const downloadURL = await getDownloadURL(storageRef);
  return downloadURL;
};
