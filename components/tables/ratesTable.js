import { motion } from "framer-motion";

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

const data = [
  {
    text: "Accessories – may include, but not limited to, cables, privacy filters, adapters, carrying cases, etc.",
    quantity: "1kg",
    price: 300
  },
  {
    text: "Tapes (loose), tape drives for desktops/laptops, electromagnetic drives",
    quantity: "1kg",
    price: 300
  },
  {
    text: "Solar lights, PV panels (complete or incomplete), all types of batteries",
    quantity: "1kg",
    price: 500
  },
  {
    text: "Fluorescent tubes, filament, energy saving bulbs",
    quantity: "1kg",
    price: 600
  },
  {
    text: "Other assorted items and/or waste not on the asset category list",
    quantity: "1kg",
    price: 600
  },
  {
    text: "Communication – IP phones, cellphones, pagers, tablets, kindles, cameras, smart phones, mouse, keyboard, etc.",
    quantity: "1pc",
    price: 400
  },
  {
    text: "Hard drives (loose)",
    quantity: "1pc",
    price: 400
  },
  {
    text: "Small household appliances – kettles, blenders, toasters, hand mixers etc.",
    quantity: "1pc",
    price: 400
  },
  {
    text: "Microwave ovens, heaters, iron boxes, mixers, juicers, hair driers, soap dispensers",
    quantity: "1pc",
    price: 450
  },
  {
    text: "DVDs, home theaters, Hifi equipment, decoders",
    quantity: "1pc",
    price: 500
  },
  {
    text: "CPUs/system units, network equipment, laptops, servers, projectors/scanners /LCDs/PDPs/cameras, desk printers, UPS:s and power devices, cartridges, routers, access points, switches",
    quantity: "1pc",
    price: 550
  },
  {
    text: "Vacuum cleaners, electric suction machines, water dispensers",
    quantity: "1pc",
    price: 550
  },
  {
    text: "Monitors – CRT, TFT, plasma, CRT TV, projection TV",
    quantity: "1pc",
    price: 1000
  },
  {
    text: "Floor printers, server cabinets, Photocopiers",
    quantity: "1pc",
    price: 1000
  },
  {
    text: "Washing machines, clothes driers",
    quantity: "1pc",
    price: 1000
  },
  {
    text: "Fridges, freezers, air conditioners",
    quantity: "1pc",
    price: 2000
  },
]

export default function RatesTable() {
  return (
    <div className="rates__table">
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
                  data?.length > 0 &&
                  data.map((d, i) => (
                    <motion.tr
                      variants={childVar}
                      initial="hide"
                      animate="show"
                      exit="hide"
                      custom={i}
                      key={i}
                      onClick={() => handleClick(r)}
                    >
                      <td className='word-wrap'>{d.text}</td>
                      <td>{d.quantity}</td>
                      <td className="font-semibold">{`Ksh ${d.price}`}</td>
                    </motion.tr>
                  ))
                }
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
