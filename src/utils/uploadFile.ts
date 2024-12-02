import { storage } from "@/firebase/firebase.config";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

export const uploadImageToFirebase = async (
  imageFile: File,
  setIsImageUploading: (isUploading: boolean) => void
): Promise<string | null | undefined> => {
  const storageRef = ref(storage, `images/${imageFile.name}`);

  setIsImageUploading(true);

  try {
    const snapshot = await uploadBytes(storageRef, imageFile);
    const downloadUrl = await getDownloadURL(snapshot.ref);

    return downloadUrl;
  } catch (error) {
    console.log("Error uploading image", error);
    return null;
  } finally {
    setIsImageUploading(false);
  }
};