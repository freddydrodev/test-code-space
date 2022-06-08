import HomeBanner from "../components/home/HomeBanner";
import HomeOurServices from "../components/home/HomeOurServices";
import HomeAboutUs from "../components/home/HomeAboutUs";
import HomeOurMission from "../components/home/HomeOurMission";
import HomeOurLocations from "../components/home/HomeOurLocations";
import HomeActivities from "../components/home/HomeActivities";
import Layout from "../components/Layout";

export default function Home() {
  return (
    <Layout title="Accueil" description={null} path="/">
      <HomeBanner />
      <HomeOurServices />
      <HomeAboutUs />
      <HomeOurMission />
      <HomeOurLocations />
      <HomeActivities />
    </Layout>
  );
}
