import Image from 'next/image';
import { motion } from "framer-motion";

const ellipseVariants = {
  start: {
    d: "M186.5 -206.6C253.5 -166.1 327.6 -118.5 328.2 -65.3C328.8 -12.1 255.7 46.7 204.3 101.1C152.8 155.5 122.9 205.6 68.4 254C13.9 302.5 -65.2 349.5 -140.9 341.6C-216.6 333.8 -288.9 271.1 -307.6 197.5C-326.4 123.9 -291.7 39.3 -258.3 -27.4C-224.9 -94.1 -192.8 -142.8 -150 -187.6C-107.1 -232.3 -53.6 -273.2 3.1 -276.9C59.8 -280.6 119.6 -247.2 186.5 -206.6"
  },
  end: {
    d: "M240.9 -260.8C302.3 -235.6 335.3 -150.3 320.9 -79.2C306.4 -8.1 244.6 48.7 198.8 102.4C153 156.1 123.4 206.8 79.7 225.6C36 244.3 -21.7 231.2 -98.2 223.4C-174.7 215.7 -270 213.3 -311.9 167.2C-353.9 121.2 -342.4 31.4 -318.8 -48.2C-295.2 -127.8 -259.4 -197.2 -204.3 -223.4C-149.1 -249.7 -74.6 -232.9 7.6 -241.9C89.8 -251 179.6 -286 240.9 -260.8"
  }
};

export default function Back() {
  return (
    <div className='back'>
      <div className='absolute w-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
        <Image src='/assets/nature.webp' width={800} height={600}
          objectFit='contain' />
      </div>
      <div className='relative w-full'>
        <motion.svg
          className='block'
          initial="start"
          viewBox="0 0 900 700"
          width="100%" height="auto"
          preserveAspectRatio="slice"
          xmlns="http://www.w3.org/2000/svg"
          animate="end"
        >
          <rect x="0" y="0" width="100%" height="100%" fill="#f7fee7" mask="url(#mask)" />
          <defs>
            <mask id="mask" x="0" y="0" width="100%" height="100%" >
              <rect x="0" y="0" width="100%" height="100%" fill="#fff" />
              <g transform="translate(450 320)">
                <motion.path
                  variants={ellipseVariants}
                  transition={{
                    duration: 2,
                    yoyo: Infinity,
                    repeat: Infinity
                  }}
                />
              </g>
            </mask>
          </defs>
        </motion.svg>
      </div>
    </div>
  );
}
