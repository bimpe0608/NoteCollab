// import { useState } from 'react';
// import { Note } from '../../context/NotesContext';
// import NoteDialog from './note-dailog';

// const NoteList = ({ notes }: { notes: Note[] }) => {
//   const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

//   return (
//     <div className="max-w-screen-lg mx-auto dark:text-white">
//       <h1 className="text-3xl font-semibold text-center mb-8">
//         Hello there 👋
//       </h1>
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
//         {notes.map((note) => (
//           <div
//             key={note.id}
//             className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4"
//             onClick={() => setIsDialogOpen(true)}
//           >
//             <h2 className="text-lg font-semibold mb-2">{note.title!}</h2>
//             <div
//               dangerouslySetInnerHTML={{ __html: note.content! }}
//               className="text-gray-600 dark:text-white mb-4"
//             ></div>
//             <div className="flex items-center space-x-2">
//               {note.collaborators &&
//                 note.collaborators.map((collaborator, index) => (
//                   <div key={index} className="flex-shrink-0">
//                     <img
//                       src={`https://via.placeholder.com/40`}
//                       alt="User Avatar"
//                       className="w-8 h-8 rounded-full"
//                     />
//                   </div>
//                 ))}
//               {/* Add NoteDialog component here */}
//               <NoteDialog
//                 note={note}
//                 isDialogOpen={isDialogOpen}
//                 setIsDialogOpen={setIsDialogOpen}
//               />
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default NoteList;

import { useState } from 'react';
import { Note } from '../../context/NotesContext';
import NoteDialog from './note-dailog';

const NoteList = ({ notes }: { notes: Note[] }) => {
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [likes, setLikes] = useState<{ [key: string]: number }>({});
  const [dislikes, setDislikes] = useState<{ [key: string]: number }>({});

  const handleLike = (noteId: string) => {
    setLikes((prevLikes) => ({
      ...prevLikes,
      [noteId]: (prevLikes[noteId] || 0) + 1,
    }));
  };

  const handleDislike = (noteId: string) => {
    setDislikes((prevDislikes) => ({
      ...prevDislikes,
      [noteId]: (prevDislikes[noteId] || 0) + 1,
    }));
  };

  return (
    <div className="max-w-screen-lg mx-auto dark:text-white">
      <h1 className="text-3xl font-semibold text-center mb-8">
        Hello there 👋
      </h1>
      <div className="grid grid-cols-1 px-2 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {notes.length > 0 ? (
          notes.map((note) => (
            <div
              key={note.id}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4"
            >
              <h2 className="text-lg font-semibold mb-2">{note.title!}</h2>
              <div
                dangerouslySetInnerHTML={{ __html: note.content! }}
                className="text-gray-600 dark:text-white mb-4"
              ></div>
              <div className="flex items-center space-x-2">
                {note.collaborators &&
                  note.collaborators.map((collaborator, index) => (
                    <div key={index} className="flex-shrink-0">
                      <img
                        src={`https://via.placeholder.com/40`}
                        alt="User Avatar"
                        className="w-8 h-8 rounded-full"
                      />
                    </div>
                  ))}
                {/* Like Button */}
                <button
                  className="flex items-center justify-center w-8 h-8 text-gray-400 dark:text-gray-200 bg-transparent border border-transparent rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                  onClick={() => handleLike(note.id!)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="w-4 h-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 15l7-7 7 7"
                    />
                  </svg>
                </button>
                {/* Display Like Count */}
                <span>{likes[note.id!] || 0}</span>
                {/* Dislike Button */}
                <button
                  className="flex items-center justify-center w-8 h-8 text-gray-400 dark:text-gray-200 bg-transparent border border-transparent rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                  onClick={() => handleDislike(note.id!)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="w-4 h-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
                {/* Display Dislike Count */}
                <span>{dislikes[note.id!] || 0}</span>

                <button className="flex justify-end ml-5 w-28">
                  <span onClick={() => setIsDialogOpen(true)}>open</span>
                </button>

                {/* Add NoteDialog component here */}
                <NoteDialog
                  note={note}
                  isDialogOpen={isDialogOpen}
                  setIsDialogOpen={setIsDialogOpen}
                />
              </div>
            </div>
          ))
        ) : (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
            <h2 className="text-lg font-semibold mb-2">No notes to display</h2>
          </div>
        )}
      </div>
    </div>
  );
};

export default NoteList;
