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
      console.log("👍", "appinstalled fired");
      // Clear the deferredPrompt so it can be garbage collected
      window.deferredPrompt = null;
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
