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
      mass: 0.8,
      damping: 5,
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
    <div className={`banner ${state && "shrink"}`}>
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
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
