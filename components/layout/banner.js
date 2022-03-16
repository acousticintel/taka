import { useState, useEffect } from "react";
//custom packs
import { AnimatePresence, motion } from "framer-motion";

const bannerVar = {
  hide: {
    opacity: 0,
    y: 15,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      mass: 1,
      damping: 10,
    },
  },
};

export default function Banner() {
  const [show, setShow] = useState(false);
  const [state, setState] = useState(null);

  useEffect(() => {
    window.addEventListener("beforeinstallprompt", (event) => {
      // Prevent the mini-infobar from appearing on mobile.
      event.preventDefault();
      // Stash the event so it can be triggered later.
      window.deferredPrompt = event;
      // Remove the 'hidden' class from the install button container.
      setShow(true);
      // Optionally, send analytics event that PWA install promo was shown.
      console.log("👍", "beforeinstallprompt fired");
    });

    window.addEventListener("appinstalled", (event) => {
      // Clear the deferredPrompt so it can be garbage collected
      window.deferredPrompt = null;
      // Hide the install button.
      setState("installed");
      console.log("👍", "appinstalled fired");
    });
  });

  useEffect(() => {
    let timer1;
    let delay = 2.5;
    console.log(state);
    if (state && (state == "installed" || state == "dismissed")) {
      timer1 = setTimeout(() => setShow(false), delay * 1000);
    }
    return () => {
      clearTimeout(timer1);
    };
  }, [state]);

  const pwaInstall = async () => {
    console.log("👍", "pwaInstall-clicked");
    const promptEvent = window.deferredPrompt;
    if (!promptEvent) {
      // The deferred prompt isn't available.
      return;
    }
    // Show the install prompt.
    promptEvent.prompt();
    // Log the result
    const result = await promptEvent.userChoice;
    console.log("👍", "userChoice", result);
    if (result) {
      if (result.outcome == "dismissed") {
        setState("dismissed");
      }
    }
    // Reset the deferred prompt variable, since
    // prompt() can only be called once.
    window.deferredPrompt = null;
  };

  return (
    <div className={`banner ${!show && "hidden"} ${state && "shrink"}`}>
      <AnimatePresence>
        {show && (
          <motion.div
            variants={bannerVar}
            initial="hide"
            animate="show"
            exit="hide"
            className="content"
          >
            <span>
              {!state && "Add the Taka application to your HomeScreen"}
              {state && state == "installed" && "Thank you 😀"}
              {state && state == "dismissed" && "Maybe another time"}
            </span>
            {!state && <button onClick={pwaInstall}>Install</button>}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 p-1 -mt-10"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
              onClick={() => setShow(false)}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
