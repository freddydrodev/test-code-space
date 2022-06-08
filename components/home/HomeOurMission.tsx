import * as React from "react";
import { Container, Grid, Stack, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { OUR_MISSION_TEXT } from "../../i18n/global";
import MissionCard from "./MissionCard";
import { IMissionDocument } from "../../utils/interfaces";
import { onSnapshot } from "firebase/firestore";
import { MISSIONS_COLLECTION } from "../../server/firebase";

const HomeOurMission = () => {
  const { locale } = useRouter();

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

  return (
    <Stack py={5}>
      <Container>
        <Typography variant="h3" textAlign={"center"} color="primary.main">
          {OUR_MISSION_TEXT[locale]}
        </Typography>

        <Grid container mt={5} spacing={5} alignItems="stretch">
          {missions.map((mission) => (
            <Grid item xs={12} sm={6} key={mission._id}>
              <MissionCard {...mission} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Stack>
  );
};

export default HomeOurMission;
