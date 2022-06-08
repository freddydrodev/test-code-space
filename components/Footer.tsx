import * as React from "react";
import {
  alpha,
  Container,
  Grid,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import {
  FacebookRounded,
  Instagram,
  Twitter,
  WhatsappRounded,
  YouTube,
} from "@mui/icons-material";
import { useRouter } from "next/router";
import {
  COPYRIGHT_TEXT,
  MENU_TEXT,
  OUR_SERVICES_TEXT,
  USEFUL_LINK_TEXT,
} from "../i18n/global";
import { IServiceDocument, IText } from "../utils/interfaces";
import { getDoc, onSnapshot } from "firebase/firestore";
import { GENERAL_DOC, SERVICES_COLLECTION } from "../server/firebase";
import { f_limitChar } from "../utils/functions";

const Footer = () => {
  const { locale, push } = useRouter();

  const [services, setServices] = React.useState<IServiceDocument[]>([]);
  const [description, setDescription] = React.useState<IText>();

  React.useEffect(
    () =>
      onSnapshot(SERVICES_COLLECTION, (snap) => {
        setServices(
          snap.docs.map((doc) => ({ ...doc.data(), _id: doc.id })) as any[]
        );
      }),
    []
  );

  React.useEffect(() => {
    const getDescription = async () => {
      const doc = await getDoc(GENERAL_DOC);

      const data = doc.exists() ? doc.data().description : {};

      setDescription({ fr: "", en: "", es: "", ...data });
    };

    getDescription();
  }, []);

  return (
    <>
      <Stack component={"footer"} py={10} bgcolor={"#191b1f"}>
        <Container>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={5}>
              <Image
                alt="logo SIA-CI"
                src="/SIA_NEW_LOOK_LIGHT.png"
                height={95}
                width={250}
                objectFit="contain"
              />

              <Typography
                py={2}
                color="white"
                fontWeight={200}
                lineHeight={1.8}
                letterSpacing={1}
              >
                {description &&
                  description[locale].length > 0 &&
                  f_limitChar(description[locale], 200)}
              </Typography>
              <Stack direction={"row"} spacing={0.5} mt={1}>
                <IconButton>
                  <FacebookRounded
                    sx={{
                      fontSize: 30,
                      color: alpha("#ffffff", 0.6),
                      "&:hover": { color: "secondary.main" },
                    }}
                  />
                </IconButton>
                <IconButton>
                  <Instagram
                    sx={{
                      fontSize: 30,
                      color: alpha("#ffffff", 0.6),
                      "&:hover": { color: "secondary.main" },
                    }}
                  />
                </IconButton>
                <IconButton>
                  <WhatsappRounded
                    sx={{
                      fontSize: 30,
                      color: alpha("#ffffff", 0.6),
                      "&:hover": { color: "secondary.main" },
                    }}
                  />
                </IconButton>
                <IconButton>
                  <Twitter
                    sx={{
                      fontSize: 30,
                      color: alpha("#ffffff", 0.6),
                      "&:hover": { color: "secondary.main" },
                    }}
                  />
                </IconButton>
                <IconButton>
                  <YouTube
                    sx={{
                      fontSize: 30,
                      color: alpha("#ffffff", 0.6),
                      "&:hover": { color: "secondary.main" },
                    }}
                  />
                </IconButton>
              </Stack>
            </Grid>
            <Grid item xs={12} sm={3}>
              <Stack color="white" spacing={3}>
                <Typography variant="h5" color="secondary.main">
                  {USEFUL_LINK_TEXT[locale]}
                </Typography>
                <Link href="/">
                  <a>{MENU_TEXT[locale][0]}</a>
                </Link>
                <Link href="/services">
                  <a>{MENU_TEXT[locale][1]}</a>
                </Link>
                <Link href="/about-us">
                  <a>{MENU_TEXT[locale][2]}</a>
                </Link>
                <Link href="/blog">
                  <a>{MENU_TEXT[locale][3]}</a>
                </Link>
              </Stack>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Stack color="white" spacing={3}>
                <Typography variant="h5" color="secondary.main">
                  {OUR_SERVICES_TEXT[locale]}
                </Typography>
                {services.map((service) => (
                  <Link key={service._id} href={"/services/#" + service._id}>
                    <a>{service.name[locale]}</a>
                  </Link>
                ))}
              </Stack>
            </Grid>
          </Grid>
        </Container>
        <Typography color="GrayText" textAlign={"center"} mt={5}>
          {COPYRIGHT_TEXT[locale]}
          <strong>
            <a href="https://drosarl.com"> DRO SARL</a>
          </strong>
        </Typography>
      </Stack>
    </>
  );
};

export default Footer;
