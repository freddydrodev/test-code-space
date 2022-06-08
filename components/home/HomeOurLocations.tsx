import * as React from "react";
import { CardMedia, Container, Grid, Stack, Typography } from "@mui/material";
import LocationCard from "./LocationCard";
import { WHERE_WE_ARE } from "../../i18n/global";
import { useRouter } from "next/router";
import { ILocationDocument } from "../../utils/interfaces";
import { onSnapshot } from "firebase/firestore";
import { LOCATIONS_COLLECTION } from "../../server/firebase";

const HomeOurLocations = () => {
  const { locale } = useRouter();

  const [locations, setLocations] = React.useState<ILocationDocument[]>([]);

  React.useEffect(
    () =>
      onSnapshot(LOCATIONS_COLLECTION, (snap) => {
        setLocations(
          snap.docs.map((doc) => ({ ...doc.data(), _id: doc.id })) as any[]
        );
      }),
    []
  );

  return (
    <Stack pt={5}>
      <Container>
        <Typography
          variant="h3"
          textAlign={"center"}
          mb={5}
          color="primary.main"
        >
          {WHERE_WE_ARE[locale]}
        </Typography>
      </Container>
      <Stack position={"relative"}>
        <CardMedia component="img" src="/locations.jpeg" width={"100%"} />
        <Stack
          position={"absolute"}
          width="100%"
          height={"100%"}
          top={0}
          left={0}
        >
          <Grid container height={"100%"}>
            {locations.map((location) => (
              <Grid key={location._id} item xs={12} sm={3} height={"100%"}>
                <LocationCard {...location} />
              </Grid>
            ))}
          </Grid>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default HomeOurLocations;
