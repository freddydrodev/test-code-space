import * as React from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Container,
  Divider,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import Image from "next/image";
import HomeOurLocations from "../../components/home/HomeOurLocations";
import Layout from "../../components/Layout";
import {
  IMissionDocument,
  IServiceDocument,
  ITeamDocument,
  IText,
} from "../../utils/interfaces";
import { getDoc, onSnapshot } from "firebase/firestore";
import {
  GENERAL_DOC,
  MISSIONS_COLLECTION,
  SERVICES_COLLECTION,
  TEAMS_COLLECTION,
} from "../../server/firebase";
import { useRouter } from "next/router";
import {
  ABOUT_US_TEXT,
  OUR_MISSION_TEXT,
  OUR_SERVICES_TEXT,
  WHAT_DO_WE_OFFER_TEXT,
} from "../../i18n/global";
import { f_limitChar } from "../../utils/functions";
import ServiceMissionList from "../../components/ServiceMissionList";

export default function AboutUs() {
  const { locale } = useRouter();
  const [description, setDescription] = React.useState<IText>();
  const [teams, setTeams] = React.useState<ITeamDocument[]>([]);
  const [services, setServices] = React.useState<IServiceDocument[]>([]);
  const [missions, setMissions] = React.useState<IMissionDocument[]>([]);

  React.useEffect(
    () =>
      onSnapshot(MISSIONS_COLLECTION, (snap) => {
        setMissions(
          snap.docs.map((doc) => ({ ...doc.data(), _id: doc.id })) as any[]
        );
      }),
    []
  );

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

  React.useEffect(
    () =>
      onSnapshot(TEAMS_COLLECTION, (snap) => {
        setTeams(
          snap.docs.map((doc) => ({ ...doc.data(), _id: doc.id })) as any[]
        );
      }),
    []
  );

  return (
    <Layout title="A Propos de Nous" description={null} path="/about-us">
      <Container sx={{ py: 5 }}>
        <Typography
          variant="h4"
          fontWeight={900}
          maxWidth={500}
          color="primary"
          mb={4}
        >
          {ABOUT_US_TEXT[locale]}
        </Typography>
        <Typography sx={{ lineHeight: 2, textAlign: "justify" }}>
          <span style={{ float: "left", marginRight: 15, marginBottom: 15 }}>
            <CardMedia
              src="/SIA_NEW_LOOK.png"
              alt="logo SIA"
              component={"img"}
              width={270}
              height={120}
              sx={{ float: "left" }}
            />
          </span>

          {description && description[locale]}
        </Typography>
      </Container>
      <Divider />
      <HomeOurLocations />
      <Stack bgcolor={"#F7F9FB"} py={5}>
        <Container>
          <Typography
            my={2}
            lineHeight={1.5}
            color="secondary.main"
            fontWeight={700}
          >
            Notre Equipe
          </Typography>
          <Typography variant="h3" maxWidth={500} color="primary" mb={5}>
            Nos Chefs de services chez SIA
          </Typography>
          <Grid container spacing={3} alignItems="stretch">
            {teams.map((member) => {
              return (
                <Grid key={member._id} item xs={12} sm={6} md={3}>
                  <Card variant="outlined" sx={{ height: "100%" }}>
                    <CardMedia
                      component={"img"}
                      src={member.image}
                      alt={member.fullname}
                      width={"100%"}
                    />
                    <CardContent sx={{ textAlign: "center" }}>
                      <Typography variant="h6">{member.fullname}</Typography>
                      <Typography variant="overline" color="secondary">
                        {member.role[locale]}
                      </Typography>
                      <br />
                      <Typography color="GrayText">
                        {member.description[locale]}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              );
            })}
          </Grid>
        </Container>
      </Stack>
      <Stack bgcolor={"#F7F9FB"} py={5}>
        <Container>
          <Typography
            my={2}
            lineHeight={1.5}
            color="secondary.main"
            fontWeight={700}
            textAlign={"center"}
            mx="auto"
          >
            {OUR_SERVICES_TEXT[locale]}
          </Typography>
          <Typography
            variant="h3"
            maxWidth={600}
            textAlign={"center"}
            mx="auto"
            color="primary"
            mb={5}
          >
            {WHAT_DO_WE_OFFER_TEXT[locale]}
          </Typography>
          <Grid container spacing={4}>
            {services.map((service) => {
              return (
                <Grid key={service._id} item xs={12} sm={6} md={4}>
                  <Typography variant="h6" fontWeight={500} color="black">
                    {service.name[locale]}
                  </Typography>
                  <Typography color="GrayText">
                    {f_limitChar(service.description[locale], 250)}
                  </Typography>
                </Grid>
              );
            })}
          </Grid>
        </Container>
      </Stack>
      <Typography
        variant="h3"
        maxWidth={600}
        textAlign={"center"}
        mx="auto"
        color="secondary.main"
        my={5}
      >
        {OUR_MISSION_TEXT[locale]}
      </Typography>
      <ServiceMissionList list={missions} />
    </Layout>
  );
}
