import React, { useState } from 'react';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../../components/ui/dialog';
import ReactQuill from 'react-quill';
import notesService from '../../service/notes.service';
import { useAuth } from '../../context/GoogleAuthContext';
const AddNoteDialog = (props: any) => {
  const [note, setNote] = useState({
    title: '',
    content: '',
  });
  const { user } = useAuth();

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setNote((prevNote) => ({
      ...prevNote,
      [name]: value,
    }));
  };

  const handleClose = () => {
    setNote({
      title: '',
      content: '',
    });
    props.setOpen(false);
  };

  const handleAddNote = async () => {
    try {
      // Construct the new note object with additional fields (e.g., createdAt, updatedAt)
      const newNote = {
        ...note,

        // Add other fields like courseId, yearId, userId as needed
      };

      // Add the new note to the Firestore collection
      //   await addDoc(collection(db, 'notes'), newNote);

      handleClose();
      console.log('Note added successfully!');
    } catch (error) {
      console.error('Error adding note:', error);
    }
  };

  return (
    // <Dialog open={props.open}>
    //   <DialogTrigger asChild>
    //     <Button onClick={() => props.setOpen(true)}>Open Dialog</Button>
    //   </DialogTrigger>
    //   <DialogContent>
    //     <Input
    //       autoFocus
    //       placeholder="Title"
    //       name="title"
    //       value={note.title}
    //       onChange={handleInputChange}
    //     />
    //     <Input
    //       placeholder="Content"
    //       name="content"
    //       value={note.content}
    //       onChange={handleInputChange}
    //     />
    //     <Button onClick={handleClose} color="secondary">
    //       Cancel
    //     </Button>
    //     <Button onClick={handleAddNote} color="primary">
    //       Add
    //     </Button>
    //   </DialogContent>
    // </Dialog>
    <Dialog open={props.open} onOpenChange={() => props.setOpen(!props.open)}>
      <DialogTrigger asChild>
        <Button
          className="bg-black text-white dark:bg-white dark:text-black"
          onClick={() => props.setOpen(true)}
          variant="outline"
        >
          Add note
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[550px]">
        <DialogHeader>
          <DialogTitle>Add notes</DialogTitle>
        </DialogHeader>
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            console.log({
              content: note.content,
              title: note.title,
              userId: user?.id,
              yearId: props.activeYear.id,
              courseId: props.activeCourse.id,
            });
            notesService
              .create({
                content: note.content,
                title: note.title,
                userId: user?.id,
                yearId: props.activeYear.id,
                courseId: props.activeCourse.id,
              })
              .then((res) => {
                console.log(res);
                props.setOpen(!props.open);
                setNote({
                  title: '',
                  content: '',
                });
              })
              .catch((err) => console.log(err));
          }}
          className="grid gap-4 py-4"
        >
          <div className="grid grid-cols-4 items-center gap-4">
            <Input
              id="yearId"
              defaultValue={props?.activeYear?.name! || ''}
              readOnly
              className="col-span-4"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Input
              id="courseId"
              defaultValue={props?.activeCourse?.name! || ''}
              readOnly
              className="col-span-4"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Input
              id="title"
              name="title"
              value={note.title}
              onChange={handleInputChange}
              className="col-span-4"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <ReactQuill
              value={note.content}
              id="content"
              onChange={(value: string) => {
                setNote({ content: value, title: note.title });
              }}
              className="col-span-4"
            />
          </div>
          <DialogFooter>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddNoteDialog;
