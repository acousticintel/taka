
import { useState, useEffect, createContext, useContext } from 'react';
//custom packs
import { useSession } from 'next-auth/react';
import { db, storage } from '../firebase';
import {
  doc, addDoc, setDoc, updateDoc,
  getDoc, collection, onSnapshot,
  orderBy, query, serverTimestamp
} from '@firebase/firestore';
import { ref, getDownloadURL, uploadString } from '@firebase/storage';
import QRCode from 'qrcode';

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
  const { data: session, status } = useSession();
  //hold app states
  const [userPoints, setUserPoints] = useState(null);
  const [modal, setModal] = useState(false);
  const [redeem, setRedeem] = useState(false);
  //hold data
  const [posts, setPosts] = useState([]);
  const [redeemFilter, setRedeemFilter] = useState(null);
  const [vouchers, setVouchers] = useState([]);
  const [discounts, setDiscounts] = useState([]);
  const [filVouchers, setFilVouchers] = useState([]);
  const [filDiscounts, setFilDiscounts] = useState([]);

  const onSetModal = (val) => setModal(val);
  const onSetUserPoints = (val) => setUserPoints(val);
  const onSetRedeem = (val) => setRedeem(val);
  const onSetRedeemFilter = (val) => setRedeemFilter(val);
  const onSetPosts = (val) => { if (val?.length > 0) setPosts(val) };
  const onSetVouchers = (val) => { if (val?.length > 0) setVouchers(val) };
  const onSetFilVouchers = (val) => setFilVouchers(val);
  const onSetDiscounts = (val) => { if (val?.length > 0) setDiscounts(val) };
  const onSetFilDiscounts = (val) => setFilDiscounts(val);

  //useEffect(() => { }, []);
  useEffect(() => {
    createUser();
    readPostsHistory();
    readVouchersPromos();
    readDiscountsPromos();
    readUserData();
  }, [db, session])

  useEffect(() => {
    filteredVouchers();
    filteredDiscounts();
  }, [vouchers, discounts, redeemFilter]);

  async function readPostsHistory() {
    if (session?.user) {
      const q = query(collection(db, `collections/${session?.user.uid}/posts`), orderBy('timestamp', 'desc'));
      return onSnapshot(q, snapshot => {
        onSetPosts(snapshot.docs);
      })
    };
  }

  async function createUser() {
    if (session?.user) {
      const docRef = doc(db, 'users', session.user.uid);
      const docSnap = await getDoc(docRef);

      if (!docSnap.exists()) {
        // Add a new document in collection "cities"
        await setDoc(doc(db, 'users', session.user.uid), {
          name: session.user.name,
          email: session.user.email,
        });
      }
    };
  }

  async function readUserData() {
    if (session?.user) {
      const docRef = doc(db, 'users', session.user.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        // Add a new document in collection "cities"
        onSetUserPoints(docSnap.data()?.points);
      }
    };
  }

  async function readVouchersPromos() {
    const q = query(collection(db, 'vouchers'), orderBy('name', 'desc'));
    return onSnapshot(q, snapshot => {
      const v = [];
      snapshot.forEach((doc) => {
        v.push(doc.data());
      });
      onSetVouchers(v);
    });
  }

  async function readDiscountsPromos() {
    const q = query(collection(db, 'discounts'), orderBy('name', 'desc'));
    return onSnapshot(q, snapshot => {
      const d = [];
      snapshot.forEach((doc) => {
        d.push(doc.data());
      });
      onSetDiscounts(d);
    });
  }

  async function filteredVouchers() {
    if (redeemFilter === null) {
      onSetFilVouchers(vouchers);
    } else if (redeemFilter !== null && vouchers.length > 0) {
      var newArray = vouchers.filter(function (v) {
        return v.points <= redeemFilter;
      });

      if (newArray) {
        onSetFilVouchers(newArray);
      }
    }
  }

  async function filteredDiscounts() {
    if (redeemFilter === null) {
      onSetFilDiscounts(discounts);
    } if (redeemFilter !== null && vouchers.length > 0) {
      var newArray = discounts.filter(function (d) {
        return d.points <= redeemFilter;
      });

      if (newArray) {
        onSetFilDiscounts(newArray);
      }
    }
  }

  async function uploadPost(cat, selectedFile) {
    return new Promise(async (resolve, reject) => {
      try {
        if (status !== 'unauthenticated') {
          // 1) Create a post and add to firestore 'user id' collection
          // 2) get the post ID for the newly created post
          // 3) upload the image to firebase storage with the user id
          // 4) get a down load URL from fb storage and update the
          let points;
          switch (cat) {
            case 'Phone':
              points = 30;
              break;
            case 'Laptop':
              points = 40;
              break;
            case 'Computer':
              points = 50;
              break;
            case 'Other':
              points = 20;
              break;
            default:
              points = 0;
              break;
          }

          const docRef = await addDoc(collection(db, `collections/${session.user.uid}/posts`), {
            username: session.user.name,
            category: cat,
            points,
            //caption: captionRef.current.value,
            profileImg: session.user.image,
            timestamp: serverTimestamp()
          })
          //console.log('New doc added with ID', docRef.id);

          const imageRef = ref(storage, session.user.uid + '/' + docRef.id + '/image');
          const qrRef = ref(storage, session.user.uid + '/' + docRef.id + '/qr');

          await uploadString(imageRef, selectedFile, 'data_url').then(async snapshot => {
            const downloadURL = await getDownloadURL(imageRef);

            await updateDoc(doc(db, `collections/${session?.user.uid}/posts`, docRef.id), {
              image: downloadURL
            })
          });

          // With promises
          QRCode.toDataURL(`uid: ${session.user.uid} **end** doc: ${docRef.id}`)
            .then(async (url) => {
              await uploadString(qrRef, url, 'data_url').then(async snapshot => {
                const downloadURL = await getDownloadURL(qrRef);

                await updateDoc(doc(db, `collections/${session?.user.uid}/posts`, docRef.id), {
                  qr: downloadURL
                })
              });
            })

          resolve({ status: 200 })
        }
      } catch (error) {
        reject({ status: 500, mes: error });
      };
    })
  }

  return {
    modal, onSetModal,
    redeem, onSetRedeem,
    redeemFilter, onSetRedeemFilter,
    userPoints, posts,
    filVouchers, filDiscounts,
    uploadPost
  }
}

