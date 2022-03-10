import { useState, useEffect } from "react";

export default function Banner() {

  const [show, setShow ] = useState(false);

  useEffect(() => {
    // Initialize deferredPrompt for use later to show browser install prompt.
    let deferredPrompt;

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

  const showInstallPromotion = () =>{
    setShow(true);
  };

  return (
    <div className="banner">
      <div className="content">
        <span>Add the Taka application to your HomeScreen</span>
        <button>Install</button>
      </div>
    </div>
  );
}
