import { useRecoilState } from "recoil";
import { modalState } from "../atoms/modalAtom";
import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useRef, useState, useEffect } from "react";
import { CameraIcon } from '@heroicons/react/outline';
import { db, storage } from '../firebase';
import { doc, collection, addDoc, updateDoc, serverTimestamp } from "@firebase/firestore";
import { ref, getDownloadURL, uploadString } from "@firebase/storage";
import QRCode from 'qrcode';
import { async } from "@firebase/util";

export default function Modal({ session }) {
  const [open, setOpen] = useRecoilState(modalState);
  const filePickerRef = useRef(null);
  const captionRef = useRef(null);
  const [qrCode, setQrCode] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {

  }, [])

  const uploadPost = async () => {
    if (loading) return;
    setLoading(true);
    // 1) Create a post and add to firestore 'user id' collection
    // 2) get the post ID for the newly created post
    // 3) upload the image to firebase storage with the user id
    // 4) get a down load URL from fb storage and update the
    const docRef = await addDoc(collection(db, session.user.uid), {
      username: session.user.name,
      caption: captionRef.current.value,
      profileImg: session.user.image,
      timestamp: serverTimestamp()
    })
    console.log("New doc added with ID", docRef.id);

    const imageRef = ref(storage, session.user.uid + '/' + docRef.id + '/image');
    const qrRef = ref(storage, session.user.uid + '/' + docRef.id + '/qr');

    await uploadString(imageRef, selectedFile, "data_url").then(async snapshot => {
      const downloadURL = await getDownloadURL(imageRef);

      await updateDoc(doc(db, session.user.uid, docRef.id), {
        image: downloadURL
      })
    });

    // With promises
    QRCode.toDataURL(`uid: ${session.user.uid} **end** doc: ${docRef.id}`)
      .then(async (url) =>  {
        await uploadString(qrRef, url, "data_url").then(async snapshot => {
          const downloadURL = await getDownloadURL(qrRef);

          await updateDoc(doc(db, session.user.uid, docRef.id), {
            qr: downloadURL
          })
        });
      })
      .catch(err => {
        console.error(err)
      })

    setOpen(false);
    setLoading(false);
    setSelectedFile(null);
  }

  const addImageToPost = (e) => {
    const reader = new FileReader();
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    };

    reader.onload = (readerEvent) => {
      setSelectedFile(readerEvent.target.result);
    };
  };

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="fixed z-10 inset-0 overflow-y-auto text-gray-800"
        onClose={setOpen}
      >
        <div className="flex items-end justify-center min-h-[808px] 
        sm:min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>
          {/* This elenent is to trick the browser into centering the modal contents. */}
          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true">
            &#8203;
          </ span>

          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:t ranslate-y-0 sm:scale-95"
          >
            <div
              className="inline-block align-bottom bg-white rounded-lg px-4
              pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all
              sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-6">
              {
                selectedFile ? (
                  <img src={selectedFile} className="max-w-40 " onClick={() => setSelectedFile(null)} alt="" />
                ) : (
                  <div
                    onClick={() => filePickerRef.current.click()}
                    className="mx-auto flex items-center justify-center 
                    h-12 w-12 rounded-full bg-red-100 cursor-pointer">
                    <CameraIcon
                      className="h-6 w-6 text-red-600"
                      aria-hidden="true"
                    />
                  </div>
                )
              }

              <div className="mt-3 text-center sm:mt-5">
                <Dialog.Title
                  as="h3"
                  className="text-lg leading-6 font-medium text-gray-900"
                >
                  Upload a photo
                </Dialog.Title>
                <div>
                  <input
                    ref={filePickerRef}
                    type="file"
                    hidden
                    onChange={addImageToPost}
                  />
                </div>
                <div className="mt-2">
                  <input
                    className="border-none p-3 focus:ring-0 w-full text-center"
                    type="text"
                    ref={captionRef}
                    placeholder="Please enter a caption..."
                  />
                </div>
              </div>
              <div className="mt-5 sm:mt-6">
                <button
                  type="button"
                  disabled={!selectedFile}
                  className=" inline-flex justify-center w-full rounded-md
                    border border-transparent shadow-sm px-4 py-2 bg-red-600
                    text-base font-medium items-center focus:ring-2 focus:ring-offset-2
                    focus:ring-red-500 sm:text-sm text-white hover:bg-red-700
                    focus:outline-none disabled:bg-gray-300 
                    disabled:cursor-not-allowed hover:disabled:bg-gray-300"
                  onClick={uploadPost}
                >
                  {loading ? 'Uploading' : 'Upload Post'}
                </button>
              </div>

            </div>
          </Transition.Child>
        </div>
      </Dialog >
    </Transition.Root >
  )
}