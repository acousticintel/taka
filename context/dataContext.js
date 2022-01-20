import { useSession } from 'next-auth/react';
import { useState, useEffect, createContext, useContext } from "react";
import QRCode from 'qrcode';
import { db, storage } from '../firebase';
import { doc, collection, addDoc, updateDoc, serverTimestamp } from "@firebase/firestore";
import { ref, getDownloadURL, uploadString } from "@firebase/storage";

const dataContext = createContext();

export function ProvideData({ children }) {
  const data = useProvideData();
  return (
    <dataContext.Provider value={data}>
      {children}
    </dataContext.Provider>
  )
}

export const useData = () => {
  return useContext(dataContext)
}

function useProvideData() {
  const { data: session, loading } = useSession();
  const [modal, setModal] = useState(false);

  const onSetModal = (val) => setModal(val);

  useEffect(() => { }, []);

  async function uploadPost(cat, selectedFile) {
    return new Promise(async (resolve, reject) => {
      try {
        // 1) Create a post and add to firestore 'user id' collection
        // 2) get the post ID for the newly created post
        // 3) upload the image to firebase storage with the user id
        // 4) get a down load URL from fb storage and update the
        const docRef = await addDoc(collection(db, session.user.uid), {
          username: session.user.name,
          category: cat,
          //caption: captionRef.current.value,
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
          .then(async (url) => {
            await uploadString(qrRef, url, "data_url").then(async snapshot => {
              const downloadURL = await getDownloadURL(qrRef);

              await updateDoc(doc(db, session.user.uid, docRef.id), {
                qr: downloadURL
              })
            });
          })

        resolve({ status: 200 })
      } catch (error) {
        reject({ status: 500, mes: error });
      };
    })
  }

  return {
    modal, onSetModal,
    uploadPost
  }
}

