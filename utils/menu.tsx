import * as React from "react";
import {
  ArticleRounded,
  DirectionsBoatRounded,
  FavoriteRounded,
  FeedRounded,
  PeopleRounded,
  PersonPinRounded,
  ViewCarouselRounded,
  VolunteerActivismRounded,
  WorkRounded,
} from "@mui/icons-material";

export const MENU = [
  {
    icon: <FeedRounded color="inherit" />,
    label: "Details de la Compagnie",
    path: "/admin/details",
  },
  {
    icon: <ViewCarouselRounded color="inherit" />,
    label: "Bannieres Principales",
    path: "/admin/banners",
  },
  {
    icon: <WorkRounded color="inherit" />,
    label: "Les Services",
    path: "/admin/services",
  },
  {
    icon: <VolunteerActivismRounded color="inherit" />,
    label: "Missions",
    path: "/admin/missions",
  },
  {
    icon: <PersonPinRounded color="inherit" />,
    label: "Les Agences",
    path: "/admin/locations",
  },
  {
    icon: <PeopleRounded color="inherit" />,
    label: "Les Membres",
    path: "/admin/teams",
  },
  {
    icon: <DirectionsBoatRounded color="inherit" />,
    label: "Les Activites",
    path: "/admin/blog",
  },
];
