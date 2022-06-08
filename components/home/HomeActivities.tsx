import * as React from "react";
import { Button, Container, Grid, Stack, Typography } from "@mui/material";

import ActivityCard from "./ActivityCard";
import {
  ACTIVITIES_TEXT,
  RECENT_ACTIVITIES_TEXT,
  SEE_MORE_BUTTON_TEXT,
} from "../../i18n/global";
import { useRouter } from "next/router";
import { IActivityDocument } from "../../utils/interfaces";
import { onSnapshot } from "firebase/firestore";
import { ACTIVITIES_COLLECTION } from "../../server/firebase";

const HomeActivities: React.FC<{ type?: "section" | "page" }> = ({
  type = "section",
}) => {
  const { locale, push } = useRouter();
  const [activities, setActivities] = React.useState<IActivityDocument[]>([]);

  React.useEffect(
    () =>
      onSnapshot(ACTIVITIES_COLLECTION, (snap) => {
        setActivities(
          snap.docs.map((doc) => ({ ...doc.data(), _id: doc.id })) as any[]
        );
      }),
    []
  );

  const activitiesList =
    type === "section" ? activities.filter((_, i) => i < 5) : activities;

  return (
    <Stack py={10} bgcolor={"rgba(0,0,0,0.025)"}>
      <Container>
        <Typography color="secondary" textAlign={"center"}>
          {ACTIVITIES_TEXT[locale]}
        </Typography>
        <Typography variant="h2" textAlign={"center"} mb={5}>
          {RECENT_ACTIVITIES_TEXT[locale]}
        </Typography>
        <Grid container spacing={3} alignItems="stretch">
          {activitiesList
            .filter((_, i) => i < 5)
            .map((activity, i) => {
              return (
                <Grid key={activity._id} item xs={12} sm={i === 0 ? 8 : 4}>
                  <ActivityCard first={i === 0} {...activity} />
                </Grid>
              );
            })}
        </Grid>
        {type === "section" && (
          <Button
            variant="outlined"
            sx={{ my: 5, mx: "auto", px: 10, py: 2, display: "block" }}
            color="primary"
            onClick={() => push("/blog")}
          >
            {SEE_MORE_BUTTON_TEXT[locale]}
          </Button>
        )}
      </Container>
    </Stack>
  );
};

export default HomeActivities;
