// import { useState } from 'react';
// //  import { uploadImage } from '../utils/firebaseUtils';
// import { useDropzone } from 'react-dropzone';
// import { useAuth } from '../../context/GoogleAuthContext';
// import AppLayout from '../../components/app-layout';
// import { Upload } from 'lucide-react';

// const ImageUploadPage = () => {
//   const { user } = useAuth();
//   const [uploading, setUploading] = useState(false);
//   const [imageUrl, setImageUrl] = useState(null);
//   const [error, setError] = useState<any>(null);

//   const onDrop = async (acceptedFiles) => {
//     const file = acceptedFiles[0];

//     if (!file) {
//       setError('Please select a file');
//       return;
//     }

//     try {
//       setUploading(true);
//       setError(null);

//       //   const url = await uploadImage(file);

//       //   setImageUrl(url);
//     } catch (error) {
//       setError('Failed to upload image. Please try again later.');
//     } finally {
//       setUploading(false);
//     }
//   };

//   const { getRootProps, getInputProps } = useDropzone({ onDrop });

//   return (
//     <AppLayout>
//       <div className="max-w-md mx-auto p-6">
//         <h1 className="text-2xl font-bold mb-4">Image Upload</h1>
//         {error && <p className="text-red-500 mb-4">{error}</p>}
//         <div {...getRootProps({ className: 'dropzone' })}>
//           <input {...getInputProps()} />
//           <p>Drag 'n' drop some files here, or click to select files</p>
//           <Upload size="48" className="mx-auto text-blue-500" />{' '}
//           {/* Lucid Upload icon */}
//         </div>
//         {uploading && (
//           <p className="mt-2 text-sm text-slate-400 animate-pulse">
//             Uploading...
//           </p>
//         )}
//         {imageUrl && (
//           <div className="mt-4">
//             <p className="text-green-500">Image uploaded successfully!</p>
//             <img src={imageUrl} alt="Uploaded" className="mt-2 max-w-full" />
//           </div>
//         )}
//       </div>
//     </AppLayout>
//   );
// };

// export default ImageUploadPage;

import { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { useAuth } from '../../context/GoogleAuthContext';
import AppLayout from '../../components/app-layout';
import { Upload } from 'lucide-react';

const ImageUploadPage = () => {
  const { user } = useAuth();
  const [uploading, setUploading] = useState(false);
  const [imageUrl, setImageUrl] = useState(null);
  const [error, setError] = useState<any>(null);

  const onDrop = async (acceptedFiles) => {
    const file = acceptedFiles[0];

    if (!file) {
      setError('Please select a file');
      return;
    }

    try {
      setUploading(true);
      setError(null);

      //   const url = await uploadImage(file);

      //   setImageUrl(url);
    } catch (error) {
      setError('Failed to upload image. Please try again later.');
    } finally {
      setUploading(false);
    }
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <AppLayout>
      <div className="max-w-md mx-auto p-6">
        <h1 className="text-2xl font-bold mb-4 text-center">Image Upload</h1>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <div
          {...getRootProps({
            className:
              'dropzone flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-8',
          })}
        >
          <input {...getInputProps()} />
          <p className="text-gray-500 text-center">
            Drag 'n' drop some files here, or click to select files
          </p>
          <Upload size="48" className="mx-auto text-blue-500" />{' '}
          {/* Lucid Upload icon */}
        </div>
        {uploading && (
          <p className="mt-4 text-sm text-center text-slate-400 animate-pulse">
            Uploading...
          </p>
        )}
        {imageUrl && (
          <div className="mt-4">
            <p className="text-green-500 text-center">
              Image uploaded successfully!
            </p>
            <img
              src={imageUrl}
              alt="Uploaded"
              className="mt-2 mx-auto max-w-full"
            />
          </div>
        )}
      </div>
    </AppLayout>
  );
};

export default ImageUploadPage;
