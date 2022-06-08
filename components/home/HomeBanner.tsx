import * as React from "react";
import { Stack } from "@mui/material";
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import BannerItem from "./BannerItem";
import { IBannerDocument } from "../../utils/interfaces";
import { onSnapshot } from "firebase/firestore";
import { BANNERS_COLLECTION } from "../../server/firebase";
import { useRouter } from "next/router";

const HomeBanner = () => {
  const { locale } = useRouter();
  const settings = {
    dots: false,
    infinite: true,
    speed: 2000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    arrow: false,
  };

  const [banners, setBanners] = React.useState<IBannerDocument[]>([]);

  React.useEffect(
    () =>
      onSnapshot(BANNERS_COLLECTION, (snap) => {
        setBanners(
          snap.docs.map((doc) => ({ ...doc.data(), _id: doc.id })) as any[]
        );
      }),
    []
  );

  return (
    <Stack
      position={"relative"}
      sx={{
        "& .slick-slide": {
          "& .slick-title": {
            transition: "linear 1s all",
            opacity: 0,
            transform: "translateY(-30px)",
          },
          "& .slick-description": {
            transition: "linear 1s all",
            opacity: 0,
            transform: "translateY(-50px)",
            transitionDelay: "0.25s",
          },
          "& .slick-btns": {
            transition: "linear 1s all",
            opacity: 0,
            transform: "translateY(-60px)",
            transitionDelay: "0.5s",
          },
        },
        "& .slick-slide.slick-active": {
          "& .slick-title": {
            opacity: 1,
            transform: "translateY(0px)",
          },
          "& .slick-description": {
            opacity: 1,
            transform: "translateY(0px)",
          },
          "& .slick-btns": {
            opacity: 1,
            transform: "translateY(0px)",
          },
        },
      }}
    >
      <Slider {...settings}>
        {banners.map((banner) => (
          <BannerItem
            key={banner._id}
            image={banner.image}
            title={banner.title[locale]}
            description={banner.description[locale]}
          />
        ))}
        {/* 
        <BannerItem
          image="/banner2.jpeg"
          title="Transport & Dedouanement de marchandise"
          description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum
                  dignissimos nihil voluptatibus impedit natus quis minima dicta
                  provident tempora eligendi porro similique assumenda,
                  perspiciatis magnam error ab ipsa et blanditiis."
        /> */}
      </Slider>
    </Stack>
  );
};

export default HomeBanner;
