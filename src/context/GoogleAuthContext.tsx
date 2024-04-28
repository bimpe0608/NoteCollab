import {
  createContext,
  useEffect,
  useState,
  ReactNode,
  useContext,
} from 'react';
import {
  GoogleAuthProvider,
  signInWithPopup,
  signInWithRedirect,
  signOut,
  onAuthStateChanged,
  UserCredential,
} from 'firebase/auth';
import { auth } from '../firebase';
import UserService from '../service/user.service';
import { Timestamp } from 'firebase/firestore';
import { Course, Year } from './NotesContext';

export interface UserProfile {
  id?: string;
  name: string | null;
  email: string;
  school: string | null;
  displayName: string | null;
  avatar: string | null;
  lastSignIn: Timestamp;
  gender: string | null;
  country: string | null;
  courseId?: Course;
  yearId?: Year;
  uid?: string;
}

interface AuthContextProps {
  googleSignIn: () => Promise<UserCredential>;
  logOut: () => void;
  user: any; // Replace 'any' with your actual user type
  appLoading: boolean;
  setAppLoading: any;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  isLoggedIn: boolean;
  userProfile: UserProfile | null;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

interface AuthContextProviderProps {
  children: ReactNode;
}

export const AuthContextProvider: React.FC<AuthContextProviderProps> = ({
  children,
}) => {
  const [user, setUser] = useState<any>({}); // Replace 'any' with your actual user type
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [userData, setUserData] = useState<any>(null);

  const [appLoading, setAppLoading] = useState<boolean>(false);
  const googleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(auth, provider);
    // signInWithRedirect(auth, provider);
  };

  const logOut = () => {
    setIsLoggedIn(false);
    signOut(auth);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setAppLoading(true);
        const existingUser = await UserService.findOne(
          'email',
          currentUser?.email,
        );

        if (!existingUser) {
          const userData: UserProfile = {
            email: currentUser?.email!,
            id: currentUser?.uid!,
            displayName: currentUser?.displayName!,
            avatar: currentUser?.photoURL!,
            lastSignIn: Timestamp.now(),
            country: null,
            gender: null,
            name: null,
            school: null,
            uid: currentUser.uid,
          };
          const user = await UserService.create(userData);
          setUser(user);
          setAppLoading(false);
          return user;
        }
        setAppLoading(false);
        console.log(currentUser);
        setUser({ ...existingUser, uid: currentUser.uid });
        // setUserProfile({ ...existingUser, uid: currentUser.uid,  });
        return existingUser;
      } else {
        setAppLoading(false);
        setUser(null);
        return null;
      }
    });
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider
      value={{
        googleSignIn,
        logOut,
        user,
        appLoading,
        setAppLoading,
        isLoggedIn,
        setIsLoggedIn,
        userProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthContextProvider');
  }
  return context;
};
