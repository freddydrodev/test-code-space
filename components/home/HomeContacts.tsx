import * as React from "react";
import {
  Breadcrumbs,
  Button,
  Card,
  CardContent,
  Container,
  Grid,
  Stack,
  Typography,
} from "@mui/material";

import {
  AccessTime,
  AlternateEmail,
  LocationOn,
  Phone,
} from "@mui/icons-material";
import {
  CONTACT_BUTTON_TEXT,
  DO_YOU_WANT_TO_CONTACT_US_TEXT,
} from "../../i18n/global";
import { useRouter } from "next/router";
import { ILocationDocument } from "../../utils/interfaces";
import { LOCATIONS_COLLECTION } from "../../server/firebase";
import { onSnapshot } from "firebase/firestore";

const HomeContacts = () => {
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
    <Stack bgcolor={"#32373E"} py={10} id="contact-us">
      <Container>
        <Grid container spacing={2} alignItems={"flex-end"}>
          <Grid item xs={12} sm={8} color="white">
            <Typography color="secondary">
              {CONTACT_BUTTON_TEXT[locale]}
            </Typography>
            <Typography variant="h3" width={"90%"} mb={6}>
              {DO_YOU_WANT_TO_CONTACT_US_TEXT[locale]}
            </Typography>
          </Grid>
          {locations.map((location) => (
            <Grid item xs={12} sm={4} key={location._id}>
              <Card
                variant="outlined"
                sx={{ bgcolor: "#225CA6", color: "white" }}
              >
                <CardContent>
                  <Typography variant="h5" mb={3}>
                    {location.city}
                  </Typography>
                  <Stack spacing={2}>
                    <Typography sx={{ display: "flex" }}>
                      <LocationOn sx={{ mr: 1, color: "black" }} />
                      {location.location}
                    </Typography>
                    <Typography sx={{ display: "flex" }} component="div">
                      <Phone sx={{ mr: 1, color: "black" }} />
                      <Breadcrumbs component={"span"}>
                        {location.phones.split(",").map((phone) => (
                          <a
                            key={phone}
                            href={"tel:" + phone}
                            style={{ color: "white" }}
                          >
                            {phone}
                          </a>
                        ))}
                      </Breadcrumbs>
                    </Typography>
                    <Typography sx={{ display: "flex" }} component="div">
                      <AlternateEmail sx={{ mr: 1, color: "black" }} />
                      <Breadcrumbs component={"span"}>
                        {location.emails.split(",").map((email) => (
                          <a
                            key={email}
                            href={"mailto:" + email}
                            style={{ color: "white" }}
                          >
                            {email}
                          </a>
                        ))}
                      </Breadcrumbs>
                    </Typography>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Stack>
  );
};

export default HomeContacts;
