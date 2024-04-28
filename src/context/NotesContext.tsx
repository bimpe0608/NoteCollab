import React, {
  createContext,
  useEffect,
  useState,
  ReactNode,
  useContext,
} from 'react';
import NoteService, {
  CoursesService,
  YearService,
} from '../service/notes.service';
import firebase from 'firebase/app';
import { Timestamp } from 'firebase/firestore';

export interface Note {
  id?: string;
  courseId?: string;
  yearId?: string;
  title?: string;
  content?: string;
  userId?: string;
  createdAt?: Timestamp;
  updatedAt?: Timestamp;
  collaborators?: any[];
}

export type Collaborator = {
  accessLevel: 'read' | 'write';
};

interface NoteContextProps {
  id?: string;
  notes: Note[];
  note: Note;
  fetchNotes: (userId?: string) => Promise<void>;
  addNote: (newNote: Note) => Promise<void>;
  fetchCourse: () => Promise<any>;
  fetchYear: () => Promise<any>;
  setCourses: React.Dispatch<React.SetStateAction<any[] | Course[]>>;
  courses: Course[];
  setYears: React.Dispatch<React.SetStateAction<any[] | Year[]>>;
  years: Year[];
  setNotes: any;
}

export interface Year {
  id?: string;
  name: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export interface Course {
  id?: string;
  name: string;
  description: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

const NoteContext = createContext<NoteContextProps | undefined>(undefined);

interface NoteContextProviderProps {
  children: ReactNode;
}

export const NoteContextProvider: React.FC<NoteContextProviderProps> = (
  props: NoteContextProviderProps,
) => {
  const [notes, setNotes] = useState<Note[]>([
    // {
    //   id: '1',
    //   courseId: 'course1',
    //   yearId: 'year1',
    //   title: 'First Note',
    //   content: '<p>This is the content of the first note.</p>',
    //   userId: 'user1',
    //   createdAt: Timestamp.now(),
    //   updatedAt: Timestamp.now(),
    //   collaborators: ['user1', 'user2'],
    // },
    // {
    //   id: '2',
    //   courseId: 'course1',
    //   yearId: 'year1',
    //   title: 'Second Note',
    //   content: '<p>This is the content of the second note.</p>',
    //   userId: 'user2',
    //   createdAt: Timestamp.now(),
    //   updatedAt: Timestamp.now(),
    //   collaborators: ['user1'],
    // },
    // {
    //   id: '3',
    //   courseId: 'course2',
    //   yearId: 'year1',
    //   title: 'Third Note',
    //   content: '<p>This is the content of the third note.</p>',
    //   userId: 'user1',
    //   createdAt: Timestamp.now(),
    //   updatedAt: Timestamp.now(),
    //   collaborators: ['user1', 'user2'],
    // },
    // {
    //   id: '4',
    //   courseId: 'course2',
    //   yearId: 'year1',
    //   title: 'Fourth Note',
    //   content: '<p>This is the content of the fourth note.</p>',
    //   userId: 'user2',
    //   createdAt: Timestamp.now(),
    //   updatedAt: Timestamp.now(),
    //   collaborators: ['user1'],
    // },
    // {
    //   id: '5',
    //   courseId: 'course1',
    //   yearId: 'year2',
    //   title: 'Fifth Note',
    //   content: '<p>This is the content of the fifth note.</p>',
    //   userId: 'user1',
    //   createdAt: Timestamp.now(),
    //   updatedAt: Timestamp.now(),
    //   collaborators: ['user1', 'user2'],
    // },
    // {
    //   id: '6',
    //   courseId: 'course2',
    //   yearId: 'year2',
    //   title: 'Sixth Note',
    //   content: '<p>This is the content of the sixth note.</p>',
    //   userId: 'user2',
    //   createdAt: Timestamp.now(),
    //   updatedAt: Timestamp.now(),
    //   collaborators: ['user2'],
    // },
    // {
    //   id: '7',
    //   courseId: 'course1',
    //   yearId: 'year2',
    //   title: 'Seventh Note',
    //   content: '<p>This is the content of the seventh note.</p>',
    //   userId: 'user1',
    //   createdAt: Timestamp.now(),
    //   updatedAt: Timestamp.now(),
    //   collaborators: ['user1', 'user2'],
    // },
    // {
    //   id: '8',
    //   courseId: 'course2',
    //   yearId: 'year2',
    //   title: 'Eighth Note',
    //   content: '<p>This is the content of the eighth note.</p>',
    //   userId: 'user2',
    //   createdAt: Timestamp.now(),
    //   updatedAt: Timestamp.now(),
    //   collaborators: ['user2'],
    // },
    // {
    //   id: '9',
    //   courseId: 'course1',
    //   yearId: 'year2',
    //   title: 'Ninth Note',
    //   content: '<p>This is the content of the ninth note.</p>',
    //   userId: 'user1',
    //   createdAt: Timestamp.now(),
    //   updatedAt: Timestamp.now(),
    //   collaborators: ['user1', 'user2'],
    // },
    // {
    //   id: '10',
    //   courseId: 'course2',
    //   yearId: 'year2',
    //   title: 'Tenth Note',
    //   content: '<p>This is the content of the tenth note.</p>',
    //   userId: 'user2',
    //   createdAt: Timestamp.now(),
    //   updatedAt: Timestamp.now(),
    //   collaborators: ['user2'],
    // },
  ]);
  const [note, setNote] = useState<Note | any>({});
  const [years, setYears] = useState<Year[] | any[]>([]);
  const [courses, setCourses] = useState<Course[] | any[]>([]);

  const fetchNotes = async (userId?: string) => {
    try {
      const notesData = await NoteService.findAll();
      setNotes(notesData);
    } catch (error: any) {
      console.error(error.message);
    }
  };
  const fetchCourse = async () => {
    try {
      const data = await CoursesService.findAll();
      return data;
    } catch (error: any) {
      console.error(error.message);
    }
  };
  const fetchYear = async () => {
    try {
      const data = await YearService.findAll();
      return data;
    } catch (error: any) {
      console.error(error.message);
    }
  };

  const addNote = async (newNote: Note) => {
    if (!newNote) return;
    try {
      const timestamp = Timestamp.now();

      await NoteService.create({
        ...newNote,
      });
      setNote(null);
      await fetchNotes();
    } catch (error: any) {
      console.error(error.message);
    }
  };

  return (
    <NoteContext.Provider
      value={{
        notes,
        note,
        fetchNotes,
        addNote,
        fetchCourse,
        fetchYear,
        setCourses,
        setYears,
        years,
        courses,
        setNotes,
      }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};

export const useNote = () => {
  const context = useContext(NoteContext);
  if (!context) {
    throw new Error('userNote must be used within an NoteContextProvider');
  }
  return context;
};
