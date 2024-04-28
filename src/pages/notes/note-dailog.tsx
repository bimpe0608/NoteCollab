// import React, { useState, useEffect } from 'react';
// import ReactQuill from 'react-quill';
// import 'react-quill/dist/quill.snow.css'; // Import Quill styles
// import { Note } from '../../context/NotesContext';

// const NoteDialog = ({ note }: Note) => {
//   const [isDialogOpen, setIsDialogOpen] = useState(false);
//   const [editedNote, setEditedNote] = useState(note);
//   const [content, setContent] = useState('');

//   useEffect(() => {
//     setContent(editedNote.content || '');
//   }, [editedNote.content]);

//   const openDialog = () => {
//     setIsDialogOpen(true);
//   };

//   const closeDialog = () => {
//     setIsDialogOpen(false);
//   };

//   const handleChange = (value) => {
//     setContent(value);
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     setEditedNote({
//       ...editedNote,
//       content: content,
//     });
//     // Handle submit action (e.g., update note in database)
//     console.log('Edited note:', editedNote);
//     // Close dialog after submitting
//     closeDialog();
//   };

//   return (
//     <>
//       {/* Button to open dialog */}
//       <button
//         onClick={openDialog}
//         className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded"
//       >
//         View/Edit
//       </button>
//       {/* Dialog overlay */}
//       {isDialogOpen && (
//         <div className="fixed inset-0 z-10 flex items-center justify-center bg-gray-900 bg-opacity-50">
//           {/* Dialog content */}
//           <div className="bg-white w-96 rounded-lg p-6">
//             {/* Close button */}
//             <button
//               onClick={closeDialog}
//               className="absolute top-0 right-0 m-4 text-gray-600 hover:text-gray-800"
//             >
//               <svg
//                 className="w-6 h-6"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M6 18L18 6M6 6l12 12"
//                 />
//               </svg>
//             </button>
//             {/* Note content */}
//             <h2 className="text-lg font-semibold mb-4">{editedNote.title}</h2>
//             <form onSubmit={handleSubmit}>
//               <ReactQuill
//                 value={content}
//                 onChange={handleChange}
//                 className="h-32 mb-4"
//               />
//               <button
//                 type="submit"
//                 className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded"
//               >
//                 Save
//               </button>
//             </form>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default NoteDialog;

import React, { useState, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Import Quill styles
import { Note } from '../../context/NotesContext';
import { FormControl } from '../../components/ui/form';
import notesService from '../../service/notes.service';
import { Button } from '../../components/ui/button';

interface NoteDialogProps {
  note: any;
  isDialogOpen: boolean;
  setIsDialogOpen: any;
}

const NoteDialog: React.FC<NoteDialogProps> = ({
  note,
  isDialogOpen,
  setIsDialogOpen,
}: NoteDialogProps) => {
  const [editedNote, setEditedNote] = useState<any>({
    title: '',
    content: '',
    collaborators: [],
    createdAt: '',
    updatedAt: '',
  });

  function closeDialog() {
    console.log(1);
    setIsDialogOpen(false);
  }

  const modules = {
    toolbar: {
      container: [
        [{ header: [2, 3, 4, false] }],
        ['bold', 'italic', 'underline', 'blockquote'],
        [{ color: [] }],
        [
          { list: 'ordered' },
          { list: 'bullet' },
          { indent: '-1' },
          { indent: '+1' },
        ],
        ['link', 'image'],
        ['clean'],
      ],
    },
    clipboard: {
      matchVisual: true,
    },
  };
  useEffect(() => {
    if (note) {
      setEditedNote(note);
    }
  }, [note]);

  const [content, setContent] = useState<string>('');

  useEffect(() => {
    if (note) {
      setContent(note.content || '');
    }
  }, [note]);

  const handleChange = (value: string) => {
    setContent(value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editedNote) {
      setEditedNote({
        ...editedNote,
        content: content,
      });
      // Handle submit action (e.g., update note in database)
      notesService
        .update(editedNote.id, editedNote)
        .then((res) => {
          closeDialog();
          console.log(res);
        })
        .catch((err) => console.log(err));
      // Close dialog after submitting
    }
  };

  return (
    <>
      {/* Dialog overlay */}
      {isDialogOpen && (
        <div className="fixed inset-0 z-10 flex rounded-lg items-center justify-center bg-black bg-opacity-10">
          <div className="bg-white w-[80%]  p-6">
            <div className="flex justify-end items-center">
              <button
                onClick={() => closeDialog()}
                className="text-black  hover:text-black"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            {/* Note content */}
            <h2 className="text-lg font-semibold mb-4 text-black">
              {editedNote?.title!}
            </h2>
            <div>
              <form onSubmit={handleSubmit} className="flex flex-col">
                <div className="my-6">
                  <ReactQuill
                    modules={modules}
                    value={content}
                    onChange={handleChange}
                    className="h-32 mb-4 dark:text-black"
                  />
                </div>
                <Button type="submit" className="my-5">
                  Save
                </Button>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default NoteDialog;
