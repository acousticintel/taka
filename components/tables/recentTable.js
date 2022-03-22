import { motion } from "framer-motion";
import React, { useEffect } from "react";
//custom
import { useData } from "../../context/dataContext";

const childVar = {
  hide: {
    y: 5,
    scale: 0.95,
    opacity: 0,
  },
  show: i => ({
    y: 0,
    scale: 1,
    opacity: 1,
    transition: {
      delay: i * 0.1,
    },
  }),
};


export default function RecentTable() {
  const { onSetRecModal, requests, onSetSelRequest } = useData();

  const handleClick = (r) => {
    onSetSelRequest(r)
    onSetRecModal(true);
  };

  useEffect(() => {
    //console.log(requests)
  }, [requests])

  const listOfOrders = (data) => {
    const unique = [...new Set(data.map(item => item.device))];
    if (unique) {
      let s = "";
      unique?.length > 0 && unique.map(item => s = `${s} ${item}`)
      return s;
    }
  }

  const totalOfOrders = (data) => {
    const t = 0;
    data.map(item => t = t + Number(item.count));
    return t;
  }

  return (
    <div className="recent__table">
      <div className="overflow-x-auto">
        <div className="inline-block min-w-full">
          <div className="overflow-hidden">
            <table>
              <thead>
                <tr>
                  <th scope="col">Items</th>
                  <th scope="col">Price</th>
                  <th scope="col">Status</th>
                </tr>
              </thead>
              <tbody>
                {
                  requests?.length > 0 &&
                  requests.map((r, i) => (
                    <motion.tr
                      variants={childVar}
                      initial="hide"
                      animate="show"
                      exit="hide"
                      custom={i}
                      key={i}
                      onClick={() => handleClick(r)}
                    >
                      <td>{listOfOrders(r.order)} x{totalOfOrders(r.order)}</td>
                      <td>{`Ksh ${r.total}`}</td>
                      <td className="scheduled">Scheduled</td>
                    </motion.tr>
                  ))
                }
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
