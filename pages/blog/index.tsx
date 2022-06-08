import HomeActivities from "../../components/home/HomeActivities";
import Layout from "../../components/Layout";

export default function Blog() {
  return (
    <Layout title="Nos Activites" description={null} path="/blog">
      <HomeActivities type="page" />
    </Layout>
  );
}
