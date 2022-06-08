import { IconButton, Stack, Typography } from "@mui/material";
import ArrowRightAltRoundedIcon from "@mui/icons-material/ArrowRightAltRounded";
import { IServiceDocument } from "../../utils/interfaces";
import { useRouter } from "next/router";
import { f_limitChar } from "../../utils/functions";
interface IServiceProps extends IServiceDocument {
  index: string;
}

const ServiceCard: React.FC<IServiceProps> = ({
  description,
  index,
  _id,
  name,
}) => {
  const { locale, push } = useRouter();

  return (
    <Stack
      height="100%"
      spacing={2}
      p={3}
      sx={{
        border: 1,
        borderColor: "#ddd",
        transition: "0.2s linear all",
        "&:hover": {
          borderColor: "white",
          bgcolor: "white",
          boxShadow: "0 0 120px -40px rgba(71, 54, 6,0.25)",
        },
      }}
      alignItems={"flex-start"}
    >
      <Stack flex={1} spacing={2} alignItems={"flex-start"}>
        <Typography
          variant="h4"
          sx={{
            position: "relative",
            pl: 3,
            lineHeight: "60px",
            fontSize: 30,
            "&:before": {
              content: `"${index}"`,
              fontWeight: 900,
              fontSize: 80,
              lineHeight: "60px",
              position: "absolute",
              top: 0,
              left: 0,
              color: "secondary.main",
              opacity: 0.2,
            },
          }}
        >
          {name[locale]}
        </Typography>
        <Typography color="GrayText">
          {f_limitChar(description[locale], 90)}
        </Typography>
        <IconButton onClick={() => push("/services/#" + _id)}>
          <ArrowRightAltRoundedIcon
            sx={{ fontSize: 40, color: "primary.main" }}
          />
        </IconButton>
      </Stack>
    </Stack>
  );
};

export default ServiceCard;
