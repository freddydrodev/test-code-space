import {
  Button,
  Card,
  CardMedia,
  Divider,
  Stack,
  Typography,
} from "@mui/material";
import { useRouter } from "next/router";
import { SEE_MORE_BUTTON_TEXT } from "../../i18n/global";
import { f_limitChar } from "../../utils/functions";
import { IMissionDocument } from "../../utils/interfaces";

const MissionCard: React.FC<IMissionDocument> = ({
  title,
  description,
  image,

  _id,
}) => {
  const { locale, push } = useRouter();

  return (
    <Card sx={{ borderRadius: 0, height: "100%" }}>
      <Stack position={"relative"} height="100%">
        <CardMedia src={image} component="img" height="100%" />
        <Stack
          position="absolute"
          p={5}
          justifyContent={"flex-end"}
          alignItems={"flex-start"}
          color={"white"}
          height={"100%"}
          width={"100%"}
          sx={{
            transition: "all linear 0.4s",
            "& .mission-card-title": {
              transition: "all linear 0.4s",
              transform: "translateY(100px)",
            },
            "& .mission-card-description": {
              transition: "all linear 0.2s",
              transitionDelay: "0.2s",
              opacity: 0,
              pointerEvents: "none",
            },
            "&:hover": {
              backdropFilter: "blur(10px)",

              "& .mission-card-title": {
                transform: "translateY(0px)",
              },
              "& .mission-card-description": {
                opacity: 1,
                pointerEvents: "inherit",
                transitionDelay: 0,
              },
            },
            background:
              "linear-gradient(0deg, rgba(14,19,60,0.85) 15%, rgba(7,26,56,0.025) 100%)",
          }}
        >
          <Typography
            variant="h4"
            fontWeight={700}
            fontSize={25}
            width={"80%"}
            className="mission-card-title"
          >
            {title[locale]}
          </Typography>
          <Typography
            className="mission-card-description"
            lineHeight={1.6}
            fontWeight={200}
            fontSize={18}
            mt={2}
            color="rgba(255,255,255,0.75)"
          >
            {f_limitChar(description[locale], 180)}
          </Typography>

          <Divider
            sx={{
              my: 1.5,
              borderColor: "rgba(255,255,255,0.5)",
              width: "100%",
            }}
          />
          <Button onClick={() => push("/about-us/#" + _id)} color="secondary">
            {SEE_MORE_BUTTON_TEXT[locale]}
          </Button>
        </Stack>
      </Stack>
    </Card>
  );
};

export default MissionCard;
