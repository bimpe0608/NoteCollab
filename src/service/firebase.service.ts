import { db } from '../firebase';
import {
  setDoc,
  collection,
  getDocs,
  getDoc,
  doc,
  deleteDoc,
  updateDoc,
  where,
  query,
  DocumentData,
  QuerySnapshot,
  Timestamp,
  addDoc,
  CollectionReference,
} from 'firebase/firestore';

interface FirestoreItem {
  id?: string;
}

//TODO: create error handler

export class FirestoreService<T extends FirestoreItem> {
  collectionName: string;

  constructor(collectionName: string) {
    this.collectionName = collectionName;
  }

  private getCollectionRef(): CollectionReference<any> {
    return collection(db, this.collectionName);
  }

  async create(data: T) {
    try {
      // Add createdAt and updatedAt timestamps
      const timestamp = Timestamp.now();
      const dataWithTimestamps = {
        ...data,
        createdAt: timestamp,
        updatedAt: timestamp,
      };

      let newData = await addDoc(this.getCollectionRef(), dataWithTimestamps);

      console.log({ newData });
      return newData;
    } catch (error) {
      throw error;
    }
  }

  async update(id: string, updateData: Partial<T>): Promise<any> {
    try {
      const timestamp = Timestamp.now();
      const dataWithTimestamp = { ...updateData, updatedAt: timestamp };

      const documentRef = doc(db, this.collectionName, id);
      console.log({ dataWithTimestamp, documentRef });
      let result = await updateDoc(documentRef, dataWithTimestamp);
      return result;
    } catch (error) {
      throw error;
    }
  }
  async findAll(): Promise<T[]> {
    try {
      const querySnapshot = await getDocs(this.getCollectionRef());
      const data: T[] = [];
      querySnapshot.forEach((doc) => {
        data.push({ id: doc.id, ...doc.data() } as T);
      });
      return data;
    } catch (error) {
      throw error;
    }
  }

  async findById(id: string) {
    try {
      const q = query(this.getCollectionRef(), where('id', '==', id));
      const documentRef = await getDocs(q);
      if (!documentRef.empty) {
        const document = documentRef.docs[0];
        return { ...document.data() };
      }

      return null;
    } catch (error) {
      throw error;
    }
  }

  async delete(id: string): Promise<void> {
    try {
      const documentRef = doc(this.getCollectionRef(), id);

      await deleteDoc(documentRef);
    } catch (error) {
      throw error;
    }
  }

  async findOrCreate(userId: string, userData: any) {
    const userRef = doc(db, this.collectionName, userId);

    try {
      const docRef = await getDoc(userRef);

      if (!docRef.exists()) {
        await setDoc(userRef, userData, { merge: true });
      } else {
        return { ...docRef };
      }
    } catch (error) {
      throw error;
    }
  }

  async findOne(field: string, value: any) {
    try {
      const q = query(this.getCollectionRef(), where(field, '==', value));
      const documentRef = await getDocs(q);

      if (!documentRef.empty) {
        const document = documentRef.docs[0];
        return { id: document.id, ...document.data() };
      }

      return null;
    } catch (error) {
      throw error;
    }
  }

  async updateProfile(data: Partial<T>, id: string) {
    try {
      const timestamp = Timestamp.now();
      const dataWithTimestamp = { ...data, updatedAt: timestamp };

      const cleanedData = Object.fromEntries(
        Object.entries(dataWithTimestamp).filter(
          ([_, value]) => value !== undefined,
        ),
      );
      const documentRef = doc(db, this.collectionName, id);

      return await updateDoc(documentRef, cleanedData);
    } catch (error) {
      console.error('Error updating user profile:', error);
      throw error;
    }
  }
}
