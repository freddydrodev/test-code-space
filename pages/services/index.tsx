import * as React from "react";
import { Typography } from "@mui/material";
import Layout from "../../components/Layout";
import ServiceMissionList from "../../components/ServiceMissionList";
import { onSnapshot } from "firebase/firestore";
import { IServiceDocument } from "../../utils/interfaces";
import { SERVICES_COLLECTION } from "../../server/firebase";
import { OUR_SERVICES_TEXT, WHAT_DO_WE_OFFER_TEXT } from "../../i18n/global";
import { useRouter } from "next/router";

export default function Services() {
  const { locale } = useRouter();
  const [services, setServices] = React.useState<IServiceDocument[]>([]);

  React.useEffect(
    () =>
      onSnapshot(SERVICES_COLLECTION, (snap) => {
        setServices(
          snap.docs.map((doc) => ({ ...doc.data(), _id: doc.id })) as any[]
        );
      }),
    []
  );

  return (
    <Layout
      title={OUR_SERVICES_TEXT[locale]}
      description={null}
      path="/services"
    >
      <Typography color="secondary" textAlign={"center"} sx={{ mt: 5 }}>
        {OUR_SERVICES_TEXT[locale]}
      </Typography>
      <Typography variant="h2" textAlign={"center"}>
        {WHAT_DO_WE_OFFER_TEXT[locale]}
      </Typography>
      <ServiceMissionList list={services} />
    </Layout>
  );
}
