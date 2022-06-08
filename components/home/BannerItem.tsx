import { Button, CardMedia, Container, Stack, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { CONTACT_BUTTON_TEXT, SEE_MORE_BUTTON_TEXT } from "../../i18n/global";

const BannerItem: React.FC<{
  title: string;
  description: string;
  image: string;
}> = ({ title, description, image }) => {
  const { locale, push, pathname } = useRouter();

  return (
    <Stack position={"relative"} width="100vw" bgcolor={"black"}>
      <CardMedia
        src={image}
        component="img"
        width={"100%"}
        height={600}
        sx={{ opacity: 0.7 }}
      />
      <Stack
        position={"absolute"}
        top={0}
        left={0}
        width="100%"
        height="100%"
        justifyContent={"center"}
      >
        <Container>
          <Stack width={{ xs: "100%", md: "60%" }} spacing={4}>
            <Typography
              width={{ xs: "100%", md: "80%" }}
              color={"white"}
              variant="h2"
              className="slick-title"
            >
              {title}
            </Typography>
            <Typography
              color={"white"}
              sx={{
                fontWeight: 300,
                lineHeight: 2,
                fontSize: 18,
                opacity: 0.75,
              }}
              className="slick-description"
            >
              {description}
            </Typography>
            <Stack direction={"row"} spacing={2} className="slick-btns">
              <Button
                onClick={() => push("/about-us")}
                variant="contained"
                color="secondary"
                size="large"
                disableElevation
                sx={{ borderRadius: 0, color: "white", py: 2, px: 5 }}
              >
                {SEE_MORE_BUTTON_TEXT[locale]}
              </Button>
              <Button
                onClick={() => push({ pathname, hash: "contact-us" })}
                color="secondary"
                size="large"
                sx={{ borderRadius: 0, py: 2, px: 5 }}
              >
                {CONTACT_BUTTON_TEXT[locale]}
              </Button>
            </Stack>
          </Stack>
        </Container>
      </Stack>
    </Stack>
  );
};

export default BannerItem;
