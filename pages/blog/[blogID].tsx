import {
  ArrowBack,
  ArrowForward,
  CalendarToday,
  Person,
  Photo,
} from "@mui/icons-material";
import {
  Breadcrumbs,
  Card,
  CardActionArea,
  CardMedia,
  Chip,
  Container,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";
import Layout from "../../components/Layout";
import * as React from "react";
import { GetServerSideProps, GetStaticPaths, GetStaticProps } from "next";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { ACTIVITIES_COLLECTION, FIRESTORE } from "../../server/firebase";
import { IActivityDocument } from "../../utils/interfaces";
import moment from "moment";
import { useRouter } from "next/router";
import HtmlReactParser from "html-react-parser";

const SingleBlog: React.FC<{
  activity: IActivityDocument;
}> = ({ activity }) => {
  const [selectedImage, setSelectedImage] = React.useState(0);
  const [openLightBox, setOpenLightBox] = React.useState(false);
  const [activities, setActivities] = React.useState<IActivityDocument[]>([]);
  const { locale, push } = useRouter();

  React.useEffect(() => {
    const getActivities = async () => {
      if (!activity) return;

      const results = await getDocs(ACTIVITIES_COLLECTION);

      const _activities = results.docs.map((doc) => ({
        ...doc.data(),
        _id: doc.id,
        createdAt: moment(doc.data().createdAt.toDate()).format(
          "DD MMMM YYYY hh:mm"
        ),
      }));

      setActivities(_activities.filter((a) => a._id !== activity._id) as any[]);
    };

    getActivities();
  }, [activity]);

  return (
    <Layout title="Blog Name" description={null} path="/blog">
      <Stack bgcolor={"#DFE1E5"} py={10} mb={10}>
        <Container>
          <Breadcrumbs>
            <Link href="/">
              <a>
                <Typography
                  component="span"
                  color="black"
                  fontWeight={500}
                  variant="h6"
                >
                  Accueil
                </Typography>
              </a>
            </Link>
            <Link href="/blog">
              <a>
                <Typography
                  component="span"
                  color="black"
                  fontWeight={500}
                  variant="h6"
                >
                  Actualites
                </Typography>
              </a>
            </Link>

            <Typography
              variant="h6"
              color="GrayText"
              component="p"
              fontWeight={500}
            >
              {activity.title[locale]}
            </Typography>
          </Breadcrumbs>
        </Container>
      </Stack>
      <Container>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={9}>
            <Typography variant="h4" fontWeight={800}>
              {activity.title[locale]}
            </Typography>
            <Stack direction={"row"} spacing={2} py={1} color={"GrayText"}>
              <Typography
                display={"flex"}
                alignItems={"center"}
                borderRight={1}
                p={0}
                pr={2}
                lineHeight={1}
              >
                <CalendarToday sx={{ fontSize: 18, mr: 1 }} />{" "}
                {activity.createdAt}
              </Typography>
              <Typography
                display={"flex"}
                alignItems={"center"}
                borderRight={1}
                pr={2}
              >
                <Person sx={{ fontSize: 18, mr: 1 }} /> Administrateur
              </Typography>
              <Typography display={"flex"} alignItems={"center"}>
                <Photo sx={{ fontSize: 18, mr: 1 }} /> {activity.images.length}{" "}
                Media(s)
              </Typography>
            </Stack>
            <CardMedia
              component={"img"}
              src={activity.images[0]}
              alt={activity.title[locale]}
              width={"100%"}
            />
            <Stack
              sx={{
                my: 4,
                fontSize: 16,
                fontFamily: (theme) => theme.typography.fontFamily,
                fontWeight: 300,
                lineHeight: 2.1,
                "& p": { p: 0, m: 0 },
                "& a": {
                  color: "secondary.main",
                  "&:hover": { textDecoration: "underline" },
                },
                "& blockquote": {
                  padding: "10px 20px",
                  margin: "0 0 20px",
                  fontSize: 18,
                  borderLeft: "5px solid #eee",
                },
                "& ul": {
                  listStyleType: "circle",
                  p: 0,
                  listStylePosition: "inside",
                },
              }}
            >
              {HtmlReactParser(activity.contentHtml[locale])}
            </Stack>
            {/* <Stack direction="row" spacing={2}>
              <Chip variant="outlined" size="small" label="tag1" />
              <Chip variant="outlined" size="small" label="tag2" />
              <Chip variant="outlined" size="small" label="tag3" />
            </Stack> */}
            {/* <Stack
              direction="row"
              spacing={2}
              justifyContent={"space-between"}
              py={3}
              my={3}
              borderTop={1}
              borderBottom={1}
              borderColor={"#d0d0d0"}
              sx={{
                "& a:hover": {
                  textDecoration: "underline",
                  color: "secondary.main",
                },
              }}
            >
              <Link href="/blog/back">
                <a>
                  <Typography
                    variant="h6"
                    component="span"
                    display={"flex"}
                    alignItems={"center"}
                    color="secondary.main"
                  >
                    <ArrowBack sx={{ mr: 3 }} /> Nom de l&apos;article precedent
                  </Typography>
                </a>
              </Link>
              <Link href="/blog/next">
                <a>
                  <Typography
                    variant="h6"
                    component="span"
                    display={"flex"}
                    alignItems={"center"}
                    color="secondary.main"
                  >
                    Nom de l&apos;article suivant
                    <ArrowForward sx={{ ml: 3 }} />
                  </Typography>
                </a>
              </Link>
            </Stack> */}
          </Grid>
          <Grid item xs={12} sm={3}>
            <Stack mb={3}>
              <Typography variant="h6" py={2} fontWeight={800}>
                Similaires
              </Typography>
              <List disablePadding>
                {activities.map((_activity) => {
                  return (
                    <ListItem key={_activity._id} sx={{ px: 0 }}>
                      <ListItemButton
                        sx={{ p: 0 }}
                        onClick={() => push("/blog/" + _activity._id)}
                      >
                        <ListItemAvatar>
                          <Image
                            src={_activity.images[0]}
                            alt="blog name"
                            width={60}
                            height={60}
                            objectFit="cover"
                          />
                        </ListItemAvatar>
                        <ListItemText
                          sx={{ ml: 1 }}
                          primary={_activity.title[locale]}
                          primaryTypographyProps={{
                            fontWeight: 600,
                          }}
                          secondary={
                            _activity.createdAt + " par Administrateur"
                          }
                        />
                      </ListItemButton>
                    </ListItem>
                  );
                })}
              </List>
            </Stack>
            <Stack mb={3}>
              <Typography variant="h6" py={2} fontWeight={800}>
                Galerie
              </Typography>
              <Grid container>
                {activity.images.map((image, i) => {
                  console.log(image);
                  return (
                    <Grid key={i.toString()} item xs={3}>
                      <Card variant="outlined" sx={{ position: "relative" }}>
                        <CardActionArea
                          onClick={() => {
                            setSelectedImage(i);
                            setOpenLightBox(true);
                          }}
                        >
                          <Image
                            src={image}
                            alt="logo SIA"
                            width={100}
                            height={100}
                            objectFit="cover"
                          />
                        </CardActionArea>
                      </Card>
                    </Grid>
                  );
                })}
              </Grid>
              {openLightBox && (
                <Lightbox
                  mainSrc={activity.images[selectedImage]}
                  nextSrc={
                    activity.images[
                      (selectedImage + 1) % activity.images.length
                    ]
                  }
                  prevSrc={
                    activity.images[
                      (selectedImage + activity.images.length - 1) %
                        activity.images.length
                    ]
                  }
                  onCloseRequest={() => setOpenLightBox(false)}
                  onMovePrevRequest={() =>
                    setSelectedImage(
                      (selectedImage + activity.images.length - 1) %
                        activity.images.length
                    )
                  }
                  onMoveNextRequest={() =>
                    setSelectedImage(
                      (selectedImage + 1) % activity.images.length
                    )
                  }
                />
              )}
            </Stack>
            {/* <Stack mb={3}>
              <Typography variant="h6" py={2} fontWeight={800}>
                Categories
              </Typography>
              <Stack direction="row" flexWrap={"wrap"}>
                {Array(11)
                  .fill("")
                  .map((_, i) => {
                    return (
                      <Chip
                        key={i.toString()}
                        variant="outlined"
                        size="small"
                        label={"categorie" + (i + 1)}
                        sx={{ mb: 1, mr: 1 }}
                      />
                    );
                  })}
              </Stack>
            </Stack> */}
          </Grid>
        </Grid>
      </Container>
    </Layout>
  );
};

export default SingleBlog;

// export const getStaticPaths: GetStaticPaths = async (context) => {
//   const result = await getDocs(ACTIVITIES_COLLECTION);

//   const paths = result.docs.map((doc) => ({ params: { blogID: doc.id } }));

//   return {
//     paths: paths,
//     fallback: false,

//   };
// };

// export const getStaticProps: GetStaticProps = async (context) => {
//   const result = await getDoc(
//     doc(FIRESTORE, ACTIVITIES_COLLECTION.path + "/" + context.params.blogID)
//   );

//   const results = await getDocs(ACTIVITIES_COLLECTION);

//   const activities = results.docs.map((doc) => ({
//     ...doc.data(),
//     _id: doc.id,
//     createdAt: moment(doc.data().createdAt.toDate()).format(
//       "DD MMMM YYYY hh:mm"
//     ),
//   }));

//   const activity: IActivityDocument = (
//     result.exists ? { ...result.data() } : {}
//   ) as any;

//   return {
//     notFound: !result.exists(),
//     props: {
//       activity: {
//         ...activity,
//         createdAt: moment(activity.createdAt.toDate()).format(
//           "DD MMMM YYYY hh:mm"
//         ),
//         _id: result.id,
//       },
//       activities: activities.filter((a) => a._id !== context.params.blogID),
//     },
//     revalidate: 60,

//   };
// };
export const getServerSideProps: GetServerSideProps = async (context) => {
  const result = await getDoc(
    doc(FIRESTORE, ACTIVITIES_COLLECTION.path + "/" + context.params.blogID)
  );

  const activity: IActivityDocument = (
    result.exists ? { ...result.data() } : {}
  ) as any;

  return {
    notFound: !result.exists(),
    props: {
      activity: {
        ...activity,
        createdAt: moment(activity.createdAt.toDate()).format(
          "DD MMMM YYYY hh:mm"
        ),
        _id: result.id,
      },
      // activities: activities.filter((a) => a._id !== context.params.blogID),
    },
    revalidate: 60,
  };
};

// export const getServerSideProps: GetServerSideProps = async (context) => {
//   const result = await getDoc(
//     doc(FIRESTORE, ACTIVITIES_COLLECTION.path + "/" + context.params.blogID)
//   );

//   const results = await getDocs(ACTIVITIES_COLLECTION);

//   const activities = results.docs.map((doc) => ({
//     ...doc.data(),
//     _id: doc.id,
//     createdAt: moment(doc.data().createdAt.toDate()).format(
//       "DD MMMM YYYY hh:mm"
//     ),
//   }));

//   const activity: IActivityDocument = (
//     result.exists ? { ...result.data() } : {}
//   ) as any;

//   return {
//     notFound: !result.exists(),
//     props: {
//       activity: {
//         ...activity,
//         createdAt: moment(activity.createdAt.toDate()).format(
//           "DD MMMM YYYY hh:mm"
//         ),
//         _id: result.id,
//       },
//       activities: activities.filter((a) => a._id !== context.params.blogID),
//     },
//   };
// };
