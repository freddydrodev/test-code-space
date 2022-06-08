import * as React from "react";
import { CardMedia, Container, Grid, Stack, Typography } from "@mui/material";
import Image from "next/image";
import { IMissionDocument, IServiceDocument } from "../utils/interfaces";
import { useRouter } from "next/router";

const ServiceMissionList: React.FC<{
  list: (IServiceDocument | IMissionDocument)[];
}> = ({ list }) => {
  const { locale } = useRouter();

  return (
    <Stack
      sx={{
        "& .service-item": {
          "& .service-img": {
            width: "calc(100% - 30px)",
          },
        },
      }}
    >
      {list.map((item, i) => {
        const name =
          (item as IServiceDocument).name ?? (item as IMissionDocument).title;
        const odd = i % 2 === 0;

        return (
          <Stack key={item._id} id={item._id} py={10} className="service-item">
            <Container>
              <Grid spacing={4} container alignItems={"center"}>
                <Grid order={odd ? 1 : 2} item xs={12} sm={6}>
                  <Typography
                    my={2}
                    lineHeight={1.5}
                    color="secondary.main"
                    fontWeight={700}
                  >
                    {((item as IMissionDocument).title
                      ? "Mission "
                      : "Service ") +
                      (i + 1)}
                  </Typography>
                  <Typography variant="h3" width={"80%"}>
                    {name[locale]}
                  </Typography>
                  <Typography
                    my={4}
                    lineHeight={2}
                    fontWeight={300}
                    fontSize={18}
                    fontFamily={"Nunito Sans"}
                  >
                    {item.description[locale]}
                  </Typography>
                </Grid>
                <Grid
                  order={odd ? 2 : 1}
                  item
                  xs={12}
                  sm={6}
                  sx={{ position: "relative" }}
                >
                  <CardMedia
                    className="service-img"
                    component={"img"}
                    src={item.image}
                    alt={name[locale]}
                    height={"100%"}
                    style={{
                      position: "relative",
                      top: -30,
                      left: odd ? 30 : 0,
                    }}
                  />
                  <Stack
                    position={"absolute"}
                    justifyContent={"flex-start"}
                    alignItems={"flex-start"}
                    zIndex={-1}
                    sx={
                      odd
                        ? {
                            bottom: 0,
                            left: 30,
                          }
                        : {
                            bottom: 0,
                            right: 0,
                          }
                    }
                  >
                    <Image
                      src={"/service-conner.png"}
                      width={220}
                      height={220}
                      alt="service name"
                    />
                  </Stack>
                </Grid>
              </Grid>
            </Container>
          </Stack>
        );
      })}
    </Stack>
  );
};

export default ServiceMissionList;
