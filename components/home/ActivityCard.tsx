import * as React from "react";
import {
  Card,
  CardActionArea,
  CardMedia,
  Stack,
  CardContent,
  Typography,
} from "@mui/material";
import moment from "moment";
import { AccessTime } from "@mui/icons-material";
import { useRouter } from "next/router";
import { IActivityDocument } from "../../utils/interfaces";
import { f_limitChar } from "../../utils/functions";

interface IActivityCardProps extends IActivityDocument {
  first?: boolean;
}

const ActivityCard: React.FC<IActivityCardProps> = ({
  first,
  title,
  images,
  createdAt,
  _id,
  contentText,
}) => {
  const { push, locale } = useRouter();

  if (first) {
    return (
      <Card>
        <CardActionArea
          onClick={() => {
            push("/blog/" + _id);
          }}
        >
          <CardMedia component="img" src={images[0]} width="100%" />
          <Stack
            position="absolute"
            top={0}
            left={0}
            p={5}
            justifyContent={"flex-end"}
            alignItems={"flex-start"}
            color={"white"}
            height={"100%"}
            width={"100%"}
            sx={{
              background:
                "linear-gradient(0deg, rgba(14,19,60,0.85) 35%, rgba(7,26,56,0.05) 100%)",
            }}
          >
            <Typography
              color="secondary"
              variant="overline"
              alignItems={"center"}
              display={"flex"}
            >
              <AccessTime sx={{ fontSize: 15, mr: 1 }} />
              {moment(createdAt.toDate()).format("DD MMM YYYY hh:mm")}
            </Typography>
            <Typography variant="h5">{title[locale]}</Typography>
            <Typography
              className="mission-card-description"
              lineHeight={1.6}
              fontWeight={200}
              fontSize={18}
              mt={2}
              color="rgba(255,255,255,0.75)"
            >
              {f_limitChar(contentText[locale], 200)}
            </Typography>
          </Stack>
        </CardActionArea>
      </Card>
    );
  }

  return (
    <Card variant="outlined">
      <CardActionArea
        onClick={() => {
          push("/blog/" + _id);
        }}
      >
        <CardMedia component="img" src={images[0]} width="100%" />
        <CardContent>
          <Typography
            color="secondary"
            variant="overline"
            alignItems={"center"}
            display={"flex"}
          >
            <AccessTime sx={{ fontSize: 15, mr: 1 }} />
            {moment(createdAt.toDate()).format("DD MMM YYYY hh:mm")}
          </Typography>
          <Typography variant="h5">{title[locale]}</Typography>
          <Typography
            className="mission-card-description"
            lineHeight={1.6}
            fontWeight={200}
            height={90}
            fontSize={18}
            mt={2}
            sx={{
              overflow: "hidden",
              textOverflow: "ellipsis",
              display: "box",
              lineClamp: 2,
            }}
          >
            {f_limitChar(contentText[locale], 200)}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default ActivityCard;
