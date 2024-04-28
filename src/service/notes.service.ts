import { Course, Note, Year } from '../context/NotesContext';
import { FirestoreService } from './firebase.service';

import * as firebase from 'firebase/firestore';

export default new FirestoreService<Note>('notes');
export const CoursesService = new FirestoreService<Course>('course');
export const YearService = new FirestoreService<Year>('year');
