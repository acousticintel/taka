
import { useState, useEffect, createContext, useContext } from 'react';
//custom packs
import { useSession } from 'next-auth/react';
import { db } from '../firebase';
import {
  doc, addDoc, setDoc, updateDoc,
  getDoc, collection, onSnapshot,
  orderBy, where, query, serverTimestamp
} from '@firebase/firestore';

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
  const [reqModal, setReqModal] = useState(false);
  const [recModal, setRecModal] = useState(false);
  const [side, setSide] = useState(false);
  const [redeem, setRedeem] = useState(false);
  const [selRequest, setSelRequest] = useState(null);
  //hold data
  const [posts, setPosts] = useState([]);
  const [redeemFilter, setRedeemFilter] = useState(null);
  const [vouchers, setVouchers] = useState([]);
  const [requests, setRequests] = useState([]);
  const [discounts, setDiscounts] = useState([]);
  const [filVouchers, setFilVouchers] = useState([]);
  const [filDiscounts, setFilDiscounts] = useState([]);

  const onSetReqModal = (val) => setReqModal(val);
  const onSetRecModal = (val) => setRecModal(val);
  const onSetSide = (val) => setSide(val);
  const onSetUserPoints = (val) => setUserPoints(val);
  const onSetRedeem = (val) => setRedeem(val);
  const onSetRedeemFilter = (val) => setRedeemFilter(val);
  const onSetSelRequest = (val) => setSelRequest(val);
  const onSetPosts = (val) => { if (val?.length > 0) setPosts(val) };
  const onSetVouchers = (val) => { if (val?.length > 0) setVouchers(val) };
  const onSetFilVouchers = (val) => setFilVouchers(val);
  const onSetDiscounts = (val) => { if (val?.length > 0) setDiscounts(val) };
  const onSetRequests = (val) => { if (val?.length > 0) setRequests(val) };
  const onSetFilDiscounts = (val) => setFilDiscounts(val);

  //useEffect(() => { }, []);
  useEffect(() => {
    createUser();
    readPostsHistory();
    readVouchersPromos();
    readDiscountsPromos();
    readUserData();
    readRequests();
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

  async function readRequests() {
    if (session?.user) {
      const q = query(collection(db, 'requests'), where("userId", "==", session?.user.uid), orderBy('timestamp', 'desc'));
      return onSnapshot(q, snapshot => {
        const d = [];
        snapshot.forEach((doc) => {
          d.push(doc.data());
        });
        onSetRequests(d);
      });
    };
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

  async function uploadRequest(order, total) {
    return new Promise(async (resolve, reject) => {
      try {
        if (status !== 'unauthenticated') {
          const docRef = await addDoc(collection(db, `requests`), {
            profileImg: session.user.image,
            username: session.user.name,
            userId: session.user.uid,
            order,
            total,
            timestamp: serverTimestamp()
          })
          //console.log('New doc added with ID', docRef.id);

          if (docRef) resolve({ status: 200 })
        }
      } catch (error) {
        reject({ status: 500, mes: error });
      };
    })
  }

  return {
    reqModal, onSetReqModal,
    recModal, onSetRecModal,
    side, onSetSide,
    redeem, onSetRedeem,
    selRequest, onSetSelRequest,
    redeemFilter, onSetRedeemFilter,
    requests, onSetRequests,
    userPoints, posts,
    filVouchers, filDiscounts,
    uploadRequest
  }
}

