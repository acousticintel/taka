import { useRouter } from "next/router";
//custom pack
import { useSession } from "next-auth/react";
import { motion } from "framer-motion";
//custom func
import { useData } from "../context/dataContext";
import { AuthGuard } from "../components/elements/authGuard";
//custom
import Modal from "../components/modals/requestModal";
import RedeemSection from "../components/redeem";
import PointsSection from "../components/points";
import RecentSection from "../components/recent";
import RecentModal from "../components/modals/recentModal";

const contVar = {
  hide: {},
  show: {
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.15,
    },
  },
};

const riseVar = {
  hide: {
    opacity: 0,
    y: 50,
    scale: 0.95,
  },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.25,
    },
  },
};

export default function Profile() {
  const router = useRouter();
  const { data: session } = useSession();
  const { onSetReqModal } = useData();

  const handleHistoryClick = (e) => {
    e.preventDefault();
    router.push("/rates");
  };

  return (
    <AuthGuard>
      <motion.div
        className="profile-page"
        variants={contVar}
        initial="hide"
        animate="show"
      >
        <RecentModal/>
        <Modal session={session} />
        <motion.h5 variants={riseVar}>Hello {session?.user.name}</motion.h5>
        <motion.div className="buttons-sec" variants={riseVar}>
          <button className="button" onClick={() => onSetReqModal(true)}>
            Request Pickup
          </button>
          <button className="button" onClick={handleHistoryClick}>
            Rates
          </button>
        </motion.div>
        <motion.section variants={riseVar}>
          <PointsSection />
        </motion.section>
        <motion.section variants={riseVar}>
          <RecentSection />
        </motion.section>
        <motion.section variants={riseVar}>
          <RedeemSection />
        </motion.section>
      </motion.div>
    </AuthGuard>
  );
}
