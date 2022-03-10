import { useState, useEffect } from "react";
//custom packs
import { AnimatePresence } from "framer-motion";

const bannerVar = {
  hide: {
    opacity: 0,
    x: -15,
  },
  show: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.25,
      ease: "easeIn",
    },
  },
};

export default function Banner() {
  const [show, setShow] = useState(false);
  // Initialize deferredPrompt for use later to show browser install prompt.
  let deferredPrompt;

  useEffect(() => {
    window.addEventListener("beforeinstallprompt", (e) => {
      // Prevent the mini-infobar from appearing on mobile
      e.preventDefault();
      // Stash the event so it can be triggered later.
      deferredPrompt = e;
      // Update UI notify the user they can install the PWA
      showInstallPromotion();
      // Optionally, send analytics event that PWA install promo was shown.
      console.log(`'beforeinstallprompt' event was fired.`);
    });
  });

  const showInstallPromotion = () => {
    setShow(true);
  };

  const pwaInstall  = async () => {
    console.log('👍', 'butInstall-clicked');
    const promptEvent = window.deferredPrompt;
    if (!promptEvent) {
      // The deferred prompt isn't available.
      return;
    }
    // Show the install prompt.
    promptEvent.prompt();
    // Log the result
    const result = await promptEvent.userChoice;
    console.log('👍', 'userChoice', result);
    // Reset the deferred prompt variable, since
    // prompt() can only be called once.
    window.deferredPrompt = null;
    // Hide the install button.
    setShow(false);
  };

  return (
    <AnimatePresence exitBeforeEnter className="banner">
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
  );
}
