import { Stack } from "@mui/material";
import Header from "../components/Header";
import Footer from "../components/Footer";
import HomeContacts from "./home/HomeContacts";

const Layout: React.FC<{
  title: string;
  description?: string;
  path: string;
}> = ({ children, title, description, path }) => {
  return (
    <Stack>
      <Header title={title} description={description} path={path} />
      {children}
      <HomeContacts />
      <Footer />
    </Stack>
  );
};

export default Layout;
