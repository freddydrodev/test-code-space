import * as React from "react";
import {
  Button,
  Card,
  CardActionArea,
  Container,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import ServiceCard from "./ServiceCard";
import {
  OUR_SERVICES_TEXT,
  SEE_MORE_BUTTON_TEXT,
  WHAT_DO_WE_OFFER_TEXT,
} from "../../i18n/global";
import { useRouter } from "next/router";
import { IServiceDocument } from "../../utils/interfaces";
import { onSnapshot } from "firebase/firestore";
import { SERVICES_COLLECTION } from "../../server/firebase";

const HomeOurServices = () => {
  const { locale, push } = useRouter();

  const [services, setServices] = React.useState<IServiceDocument[]>([]);

  React.useEffect(
    () =>
      onSnapshot(SERVICES_COLLECTION, (snap) => {
        setServices(
          snap.docs.map((doc) => ({ ...doc.data(), _id: doc.id })) as any[]
        );
      }),
    []
  );

  return (
    <Container>
      <Grid container mt={5} mb={2}>
        <Grid item xs={12} sm={4}>
          <Typography
            variant="h3"
            mt={2}
            mb={1}
            sx={{
              fontSize: 14,
              letterSpacing: 2,
              textTransform: "uppercase",
              fontWeight: 900,
            }}
            color="GrayText"
          >
            {OUR_SERVICES_TEXT[locale]}
          </Typography>
          <Typography
            fontWeight={900}
            color="primary.main"
            sx={{ fontSize: 36 }}
          >
            {WHAT_DO_WE_OFFER_TEXT[locale]}
          </Typography>
        </Grid>
        <Grid item xs>
          <Grid
            container
            py={5}
            spacing={2}
            alignItems="stretch"
            justifyContent="stretch"
          >
            {services
              .filter((_, i) => i < 3)
              .map((service, i) => (
                <Grid item xs={12} sm={6} key={service._id}>
                  <ServiceCard index={"0" + (i + 1)} {...service} />
                </Grid>
              ))}

            {services.length > 3 && (
              <Grid item xs={12} sm={6}>
                <Card
                  variant="outlined"
                  sx={{
                    height: "100%",
                    transition: "0.2s linear all",
                    alignItems: "center",
                    justifyContent: "center",
                    "&:hover": {
                      borderColor: "secondary.main",
                      color: "secondary.main",
                      bgcolor: "white",
                      boxShadow: "0 0 120px -40px rgba(71, 54, 6,0.25)",
                    },
                  }}
                >
                  <CardActionArea
                    onClick={() => push("/services")}
                    sx={{
                      height: "100%",
                      alignItems: "center",
                      justifyContent: "center",
                      textAlign: "center",
                    }}
                  >
                    <Typography variant="h6">Voir Tout</Typography>
                  </CardActionArea>
                </Card>
              </Grid>
            )}
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

export default HomeOurServices;
