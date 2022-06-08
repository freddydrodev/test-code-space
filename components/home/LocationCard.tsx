import { Button, Divider, Stack, Typography } from "@mui/material";
import LocationOnRoundedIcon from "@mui/icons-material/LocationOnRounded";
import { useRouter } from "next/router";
import { CONTACT_BUTTON_TEXT } from "../../i18n/global";
import { ILocationDocument } from "../../utils/interfaces";
import { f_limitChar } from "../../utils/functions";

const LocationCard: React.FC<ILocationDocument> = ({ city, description }) => {
  const { locale, push, pathname } = useRouter();

  return (
    <Stack
      p={5}
      borderRight={"1px solid #777"}
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
          backdropFilter: "blur(20px)",

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
          "linear-gradient(0deg, rgba(14,19,60,0.2) 15%, rgba(7,26,56,0.025) 100%)",
      }}
    >
      <Typography
        variant="h4"
        fontWeight={700}
        fontSize={25}
        width={"70%"}
        className="mission-card-title"
        alignItems={"center"}
        display={"flex"}
      >
        <LocationOnRoundedIcon sx={{ mr: 1, fontSize: 30 }} color="secondary" />
        {city}
      </Typography>
      <Typography
        className="mission-card-description"
        lineHeight={1.6}
        fontWeight={200}
        fontSize={18}
        mt={2}
        color="rgba(255,255,255,0.75)"
      >
        {f_limitChar(description[locale], 250)}
      </Typography>
      <Divider
        sx={{
          my: 1.5,
          borderColor: "rgba(255,255,255,0.5)",
          width: "100%",
        }}
      />
      <Button
        onClick={() => push({ pathname, hash: "contact-us" })}
        color="secondary"
      >
        {CONTACT_BUTTON_TEXT[locale]}
      </Button>
    </Stack>
  );
};

export default LocationCard;
