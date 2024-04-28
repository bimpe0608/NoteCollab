import { UserProfile } from '../context/GoogleAuthContext';
import { FirestoreService } from './firebase.service';

export default new FirestoreService<any>('users');
