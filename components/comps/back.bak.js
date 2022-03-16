import Image from "next/image";
import { motion, useCycle } from "framer-motion";
import { useEffect } from "react";

const syncVar = {
  start: {
    opacity: 1,
  },
  end: {
    opacity: 1,
    transition: {
      staggerChildren: 0.5,
    },
  },
};

const contVar = {
  start: {
    rotate: 0,
  },
  end: {
    rotate: 360,
    transition: {
      repeat: Infinity,
      ease: "linear",
      duration: 4,
      staggerChildren: 0.5,
    },
  },
};

const dev1Var = {
  show: {
    y: 150,
    scale: 1,
    opacity: 1,
    transition: {
      duration: 4,
    },
  },
  hide: {
    y: 0,
    scale: 0,
    opacity: 0,
    transition: {
      duration: 2,
    },
  },
};

const dev2Var = {
  show: {
    x: 150,
    scale: 1,
    opacity: 1,
    transition: {
      duration: 2,
    },
  },
  hide: {
    x: 0,
    scale: 0,
    opacity: 0,
    transition: {
      duration: 2,
    },
  },
};

const dev3Var = {
  show: {
    y: -150,
    scale: 1,
    opacity: 1,
    transition: {
      duration: 2,
    },
  },
  hide: {
    y: 0,
    scale: 0,
    opacity: 0,
    transition: {
      duration: 2,
    },
  },
};

const dev4Var = {
  show: {
    x: -150,
    scale: 1,
    opacity: 1,
    transition: {
      duration: 2,
    },
  },
  hide: {
    x: 0,
    scale: 0,
    opacity: 0,
    transition: {
      duration: 2,
    },
  },
};

export default function Back() {
  const [anime, cycleAnime] = useCycle("hide", "show");

  useEffect(() => {
    const timer = setInterval(cycleAnime, 6000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    console.log(anime);
  }, [anime]);

  return (
    <div className="back">
      {/**
       *<div className="absolute w-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <Image
          src="/assets/nature.webp"
          width={800}
          height={600}
          objectFit="contain"
        />
      </div>
       */}
      <motion.div
        variants={syncVar}
        initial="start"
        animate={anime}
        className="relative w-full h-96 "
      >
        <div className="abs-center">
          <Image
            src="/assets/logoPhone.png"
            width={200}
            height={150}
            objectFit="contain"
          />
        </div>
        <div className="abs-center">
          <Image
            src="/assets/bin.png"
            width={80}
            height={80}
            objectFit="contain"
          />
        </div>
        <motion.div className="abs-center">
          <motion.div
            className="relative"
            variants={contVar}
            initial="start"
            animate="end"
          >
            <motion.div
              className="relative z-10"
              variants={dev1Var}
              initial="hide"
              animate={anime}
            >
              <Image
                src="/assets/server.png"
                width={100}
                height={75}
                objectFit="contain"
              />
            </motion.div>
            <motion.div
              className="relative z-10"
              variants={dev2Var}
              initial="hide"
              animate={anime}
            >
              <Image
                src="/assets/laptop.png"
                width={100}
                height={75}
                objectFit="contain"
              />
            </motion.div>
            <motion.div
              className="relative z-10"
              variants={dev3Var}
              initial="hide"
              animate={anime}
            >
              <Image
                src="/assets/smartphone.png"
                width={100}
                height={75}
                objectFit="contain"
              />
            </motion.div>
            <motion.div
              className="relative z-10"
              variants={dev4Var}
              initial="hide"
              animate={anime}
            >
              <Image
                src="/assets/laptop1.png"
                width={100}
                height={75}
                objectFit="contain"
              />
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}
