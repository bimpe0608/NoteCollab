import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/GoogleAuthContext';
// import Layout from '../components/Layout';
import AppLayout from '../../components/app-layout';
import NoteList from './notes-list';
import { Course, Year, useNote } from '../../context/NotesContext';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '../../components/ui/select';
import AddNoteDialog from './add-notes';
import { Loader2 } from 'lucide-react';
import { collection, query, where, getDocs } from '@firebase/firestore';

import { db } from '../../firebase';

const NotePage = () => {
  const { logOut, user } = useAuth();
  const [activeYear, setActiveYear] = useState<Year | null>(null);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const [activeCourse, setActiveCourse] = useState<Course | null>(null);
  const {
    notes,
    fetchCourse,
    fetchYear,
    fetchNotes,
    setYears,
    setCourses,
    courses,
    years,
    setNotes,
  } = useNote();

  useEffect(() => {
    setLoading(true);
    (async () => {
      let [a, b] = await Promise.all([fetchCourse(), fetchYear()]);
      setYears(b);
      setCourses(a);
      setActiveCourse(a[0]);
      setActiveYear(b[0]);
      setLoading(false);
    })();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      // Define the collection reference
      const notesCollection = collection(db, 'notes');

      // Define the query
      const q = query(
        notesCollection,
        where('yearId', '==', activeYear?.id!),
        where('courseId', '==', activeCourse?.id!),
      );

      try {
        // Fetch data asynchronously
        const querySnapshot = await getDocs(q);

        const fetchedNotes = querySnapshot.docs.map((doc) => ({
          id: doc?.id,
          ...doc.data(),
        }));

        // Set the fetched notes in state
        setNotes(fetchedNotes);
      } catch (error) {
        console.error('Error fetching documents:', error);
      }
    };

    if (activeYear && activeCourse) {
      fetchData(); // Call the fetchData function
    }
  }, [activeYear, activeCourse, open]); // Empty dependency array means this effect runs only once after the component mounts

  console.log({ notes });

  return (
    <AppLayout>
      {loading ? (
        <div className="w-full h-[80vh] flex items-center justify-center">
          <Loader2 className="animate-spin" />
        </div>
      ) : (
        <>
          <div className="flex px-3 my-6">
            <div className="mr-4">
              <Select
                onValueChange={(data: string) => {
                  console.log(data);
                  setActiveCourse(
                    courses.find((item) =>
                      item.id === data ? item : null,
                    ) as Course | null,
                  );
                }}
                defaultValue={activeCourse?.name!}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue defaultValue={activeCourse?.name!} />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {courses.length > 0 ? (
                      courses.map((i, index) => {
                        return (
                          <SelectItem key={index} value={i?.id!}>
                            {i?.name!}
                          </SelectItem>
                        );
                      })
                    ) : (
                      <SelectItem value="no record available">
                        No Course available
                      </SelectItem>
                    )}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className="mr-4">
              <Select
                onValueChange={(data: string) => {
                  setActiveYear(
                    years.find((item) =>
                      item.id === data ? item : null,
                    ) as Year | null,
                  );
                }}
                defaultValue={activeYear?.name!}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue defaultValue={activeYear?.name!} />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {years.length > 0 ? (
                      years.map((i, index) => {
                        return (
                          <SelectItem key={index} value={i?.id!}>
                            {i?.name!}
                          </SelectItem>
                        );
                      })
                    ) : (
                      <SelectItem value="no record available">
                        No Course available
                      </SelectItem>
                    )}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="flex px-3 my-6">
            {activeYear && activeCourse && (
              <AddNoteDialog
                open={open}
                setOpen={setOpen}
                activeYear={activeYear}
                activeCourse={activeCourse}
              />
            )}
          </div>

          <NoteList notes={notes} />
        </>
      )}
    </AppLayout>
  );
};

export default NotePage;
