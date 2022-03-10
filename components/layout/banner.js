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
  const [show, setShow] = useState(true);
  // Initialize deferredPrompt for use later to show browser install prompt.
  let deferredPrompt;

  useEffect(() => {
    window.addEventListener("beforeinstallprompt", (event) => {
      // Prevent the mini-infobar from appearing on mobile.
      event.preventDefault();
      console.log("👍", "beforeinstallprompt", event);
      // Stash the event so it can be triggered later.
      window.deferredPrompt = event;
      // Remove the 'hidden' class from the install button container.
      setShow(true);
      // Optionally, send analytics event that PWA install promo was shown.
      console.log(`'beforeinstallprompt' event was fired.`);
    });
  });

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
    // Reset the deferred prompt variable, since
    // prompt() can only be called once.
    window.deferredPrompt = null;
    // Hide the install button.
    setShow(false);
  };

  return (
    <div className="banner">
      <AnimatePresence>
        {show && (
          <motion.div
            variants={bannerVar}
            initial="hide"
            animate="show"
            exit="hide"
            className="content"
          >
            <span>Add the Taka application to your HomeScreen</span>
            <button onClick={pwaInstall}>Install</button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
