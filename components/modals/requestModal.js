import Script from "next/script";
import { useRef, useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
//context
import { useData } from "../../context/dataContext";
//components
import SelectDropdown from "../elements/selectdropdown";

const contVar = {
  hide: {
    opacity: 1,
  },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const modalVar = {
  hide: {
    opacity: 0,
  },
  show: {
    opacity: 0.5,
    transition: {
      duration: 0.35,
    },
  },
};

const contentVar = {
  hide: {
    scale: 0,
    opacity: 0,
  },
  show: {
    scale: 1,
    opacity: 1,
    transition: {
      duration: 0.25,
    },
  },
};

export default function RecentModal() {
  const box = useRef(null);
  useOutsideAlerter(box);
  const { reqModal, onSetReqModal, uploadRequest } = useData();

  const [order, setOrder] = useState([
    {
      device: "Phone",
      count: "",
    },
  ]);

  const [total, setTotal] = useState(0);
  const [rfrsh, setRfrsh] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let t = getTotal();
    setTotal(t)
    //console.log(order)
  }, [rfrsh]);

  const getRates = (cat) => {
    let r;
    switch (cat) {
      case "Phone":
        r = 30;
        break;
      case "Laptop":
        r = 40;
        break;
      case "Computer":
        r = 50;
        break;
      case "Other":
        r = 20;
        break;
      default:
        r = 0;
        break;
    }
    return r;
  }

  // function that verifies if value contains only numbers
  const verifyNumber = (value) => {
    var numberRex = new RegExp("^[0-9]+$");
    var emptyRex = new RegExp("^$|pattern");
    if (numberRex.test(value) || emptyRex.test(value)) {
      return true;
    }
    return false;
  };

  const change = (type, event, setFunction, index) => {
    switch (type) {
      case "number":
        if (verifyNumber(event.target.value)) {
          let n = order
          n[index].count = event.target.value
          setFunction(n);
          setRfrsh(!rfrsh);
        }
        break;
      case "select":
        let n = order
        n[index].device = event.value
        setFunction(n);
        setRfrsh(!rfrsh);
        break;
      default:
        break;
    }
  };

  const uploadRequestCall = () => {
    if (loading) return;
    setLoading(true);
    uploadRequest(order,total).then((res) => {
      if (res.status === 200) {
        onSetReqModal(false);
        setLoading(false);
      } else if (res.status === 500) {
        console.log(res.mes);
      }
    });
  };

  const addItem = () => {
    let n = order;
    n.push({
      device: "Phone",
      count: ""
    })
    setOrder(n);
    setRfrsh(!rfrsh);
  }

  const removeItem = (i) => {
    let n = order;
    if (i > -1) {
      n.splice(i, 1); // 2nd parameter means remove one item only
    }

    setOrder(n);
    setRfrsh(!rfrsh);
  }

  const validate = () => {
    let cleared = 0;

    order?.length > 0 &&
      order.map(order => {
        if (order.count > 0) { cleared++ };
      })

    let valid = cleared / order.length === 1;
    return !valid;
  }

  const getTotal = () => {
    let final = 0;

    order?.length > 0 &&
      order.map(order => {
        let t = getRates(order.device) * Number(order.count);
        final = final + t;
      })
    return final;
  }

  return (
    <AnimatePresence className="overflow-auto">
      {reqModal && (
        <motion.div variants={contVar}
          initial="hide"
          animate="show"
          exit="hide"
          className="modal"
          aria-labelledby="modal-title"
          role="dialog"
          aria-modal="true">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <motion.div variants={modalVar} className="modal__blind" />
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            <motion.div ref={box}
              variants={contentVar}
              className="relative inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="px-10 sm:px-20 py-10 h-30">
                <div className="text-center my-5">
                  <div className="relative">
                    <Script src="https://cdn.lordicon.com/libs/mssddfmo/lord-icon-2.1.0.js" />
                    <lord-icon
                      src="https://cdn.lordicon.com/jyijxczt.json"
                      trigger="loop"
                      colors="primary:#000537,secondary:#f97316"
                      style={{ width: "80px", height: "80px" }}
                    />
                  </div>
                  <div className="w-full py-5 flex" onClick={addItem}>
                    <h3 className="flex grow text-lg leading-6 font-medium text-gray-900 mb-6 mr-8">
                      Request Pick Up
                    </h3>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 float-right" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="">
                    {order?.length > 0 &&
                      order.map((o, i) => (
                        <div className="order mb-5" key={i}>
                          <div className="flex items-center gap-4">
                            <div className="w-2/3">
                              <SelectDropdown
                                value={o.device}
                                list={["Phone", "Laptop", "Computer", "Other"]}
                                change={change}
                                setFunc={setOrder}
                                index={i}
                              />
                            </div>
                            <div className="w-1/3">
                              <input
                                className="appearance-none block w-full bg-gray-100 text-center
                              text-emerald-900 border-2 rounded py-3 px-4  leading-tight 
                                focus:outline-none focus:border-green-600 focus:bg-white"
                                type="text"
                                value={o.count}
                                placeholder="Quantity..."
                                onChange={(e) => change("number", e, setOrder, i)}
                              />
                            </div>
                            <div onClick={() => removeItem(i)} >
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                              </svg>
                            </div>
                          </div>
                          <div
                            className="text-emerald-900  text-left ml-8 
                          font-light text-sm"
                          >
                            {`recyled at Ksh ${getRates(o.device)}`}
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
                <div className="mb-6 py-4 text-center text-emerald-900 
                        font-semibold text-2xl bg-lime-50 rounded-md"
                >
                  {`Ksh ${total}`}
                </div>
                <div className="mt-5 sm:mt-6 flex justify-center">
                  <button
                    type="button"
                    disabled={validate()}
                    className="inline-flex justify-center items-center w-2/3 rounded-md
                    border border-transparent shadow-sm px-3 py-4 bg-emerald-700
                    text-base font-medium focus:ring-2 focus:ring-offset-2
                    focus:ring-emerald-500 sm:text-sm text-white
                    focus:outline-none disabled:bg-gray-300 
                    disabled:cursor-not-allowed hover:disabled:bg-gray-300
                    transition-all transform hover:scale-105 duration-200"
                    onClick={uploadRequestCall}
                  >
                    {loading ? "Requesting.." : "Request Pick Up"}
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function useOutsideAlerter(ref) {
  const { reqModal, onSetReqModal } = useData();

  useEffect(() => {
    // Function for click event
    function handleOutsideClick(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        if (reqModal) onSetReqModal(false);
      }
    }

    // Adding click event listener
    document.addEventListener("click", handleOutsideClick);
    return () => document.removeEventListener("click", handleOutsideClick);
  }, [ref, reqModal, onSetReqModal]);
}
