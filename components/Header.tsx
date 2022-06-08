import { Button, Container, MenuItem, Select, Stack } from "@mui/material";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { CONTACT_BUTTON_TEXT, MENU_TEXT } from "../i18n/global";

const Header: React.FC<{
  title?: string;
  description?: string;
  path: string;
}> = ({ title, description, path }) => {
  const { push, pathname, query, asPath, locale } = useRouter();

  return (
    <>
      <Head>
        <title>SIA-CI | {title ?? "Official Website"}</title>
        <meta
          name="description"
          content={
            description ?? "Nouvelle version de SIA-CI creer par DRO SARL"
          }
        />
        <link rel="icon" href="/LOGO.png" />
      </Head>
      <Stack
        component={"header"}
        bgcolor={"white"}
        width={"100vw"}
        boxShadow={"0 20px 35px -25px rgba(25, 32, 107,0.2)"}
        left={0}
        top={0}
        position="fixed"
        zIndex={100}
      >
        <Container>
          <Stack
            py={1}
            direction={"row"}
            justifyContent={"space-between"}
            alignItems={"center"}
            spacing={3}
            sx={{
              "& a": {
                py: 1,
                "&.active": {
                  color: "primary.main",
                  borderBottom: 3,
                  borderColor: "secondary.main",
                },
              },
            }}
          >
            <Link href="/">
              <a>
                <Image
                  alt="logo SIA-CI"
                  src="/SIA_NEW_LOOK.png"
                  height={64}
                  width={200}
                  objectFit="contain"
                />
              </a>
            </Link>
            <Stack direction={"row"} alignItems={"center"} spacing={3}>
              <Link href="/">
                <a className={"/" === path ? "active" : ""}>
                  {MENU_TEXT[locale][0]}
                </a>
              </Link>
              <Link href="/services">
                <a className={"/services" === path ? "active" : ""}>
                  {MENU_TEXT[locale][1]}
                </a>
              </Link>
              <Link href="/about-us">
                <a className={"/about-us" === path ? "active" : ""}>
                  {MENU_TEXT[locale][2]}
                </a>
              </Link>
              <Link href="/blog">
                <a className={"/blog" === path ? "active" : ""}>
                  {MENU_TEXT[locale][3]}
                </a>
              </Link>
              <Button
                variant="contained"
                color="primary"
                size="large"
                sx={{ borderRadius: 0 }}
                disableElevation
                onClick={() => {
                  push({ pathname, query, hash: "contact-us" });
                }}
              >
                {CONTACT_BUTTON_TEXT[locale]}
              </Button>
              <Select
                labelId="change-lang"
                id="demo-simple-select-standard"
                label="Age"
                size="small"
                value={locale ?? "fr"}
                variant="standard"
                onChange={(e) => {
                  console.log(e.target.value);

                  push(pathname, asPath, { locale: e.target.value });
                }}
              >
                <MenuItem value={"fr"}>
                  <Stack
                    direction={"row"}
                    alignItems={"center"}
                    component={"span"}
                  >
                    <Image src="/fr.png" alt="french" width={20} height={20} />
                    <strong style={{ marginLeft: 10 }}>FR</strong>
                  </Stack>
                </MenuItem>
                <MenuItem value={"en"}>
                  <Stack
                    direction={"row"}
                    alignItems={"center"}
                    component={"span"}
                  >
                    <Image src="/en.png" alt="french" width={20} height={20} />
                    <strong style={{ marginLeft: 10 }}>EN</strong>
                  </Stack>
                </MenuItem>
                <MenuItem value={"es"}>
                  <Stack
                    direction={"row"}
                    alignItems={"center"}
                    component={"span"}
                  >
                    <Image src="/es.png" alt="french" width={20} height={20} />
                    <strong style={{ marginLeft: 10 }}>ES</strong>
                  </Stack>
                </MenuItem>
              </Select>
            </Stack>
          </Stack>
        </Container>
      </Stack>
      <Stack height={100} width="100%" />
    </>
  );
};

export default Header;
