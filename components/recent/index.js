import { useRouter } from "next/router";
import Image from "next/image";
//custom
import { AuthGuard } from "../elements/authGuard";
import { useData } from "../../context/dataContext";
import RecentTable from "../tables/recentTable";

export default function Recent() {
  const router = useRouter();
  const { recent } = useData();

  return (
    <AuthGuard>
      <div className="recent-page">
        <h5>Recent History</h5>
        <div className="section-divider" />
        <section>
          <RecentTable/>
        </section>
      </div>
    </AuthGuard>
  );
}
