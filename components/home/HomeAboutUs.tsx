import * as React from "react";
import {
  Button,
  CardMedia,
  Container,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import { useRouter } from "next/router";
import { ABOUT_US_TEXT, SEE_MORE_BUTTON_TEXT } from "../../i18n/global";
import { IText } from "../../utils/interfaces";
import { getDoc } from "firebase/firestore";
import { GENERAL_DOC } from "../../server/firebase";
import { f_limitChar } from "../../utils/functions";

const HomeAboutUs = () => {
  const [description, setDescription] = React.useState<IText>();

  React.useEffect(() => {
    const getDescription = async () => {
      const doc = await getDoc(GENERAL_DOC);

      const data = doc.exists() ? doc.data().description : {};

      setDescription({ fr: "", en: "", es: "", ...data });
    };

    getDescription();
  }, []);

  const { locale, push } = useRouter();

  return (
    <Stack py={5} bgcolor={"primary.main"}>
      <Container>
        <Grid container alignItems={"center"} spacing={4}>
          <Grid item xs={12} sm={7}>
            <Typography
              my={2}
              lineHeight={1.5}
              color="secondary.main"
              fontWeight={700}
            >
              {ABOUT_US_TEXT[locale]}
            </Typography>
            <Typography variant="h3" width={"80%"} color="white">
              Shipping International Agency (SIA)
            </Typography>
            <Typography
              my={4}
              lineHeight={2}
              fontWeight={300}
              fontSize={18}
              fontFamily={"Nunito Sans"}
              color={"white"}
            >
              {description &&
                description[locale].length > 0 &&
                f_limitChar(description[locale], 420)}
            </Typography>
            <Button
              variant="contained"
              color="secondary"
              size="large"
              sx={{ px: 8, py: 2, borderRadius: 0 }}
              disableElevation
              onClick={() => push("/about-us")}
            >
              {SEE_MORE_BUTTON_TEXT[locale]}
            </Button>
          </Grid>
          <Grid item xs>
            <CardMedia
              component={"img"}
              src="/SIA_NEW_LOOK_LIGHT.png"
              alt="logo SIA"
              width={"100%"}
              height={"100%"}
            />
          </Grid>
        </Grid>
      </Container>
    </Stack>
  );
};

export default HomeAboutUs;
