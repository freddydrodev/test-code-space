import * as React from "react";
import {
  Breadcrumbs,
  Card,
  CardContent,
  Stack,
  Typography,
} from "@mui/material";

import {
  AccessTime,
  AlternateEmail,
  LocationOn,
  Phone,
} from "@mui/icons-material";

const ContactCard: React.FC<{
  location: string;
  address: string;
  phones: string[];
  emails: string[];
  horaires: string;
}> = ({ location, address, phones, emails, horaires }) => {
  return (
    <Card variant="outlined" sx={{ bgcolor: "#225CA6", color: "white", mb: 3 }}>
      <CardContent>
        <Typography variant="h5" mb={3}>
          {location}
        </Typography>
        <Stack spacing={2}>
          <Typography sx={{ display: "flex" }}>
            <LocationOn sx={{ mr: 1, color: "black" }} />
            {address}
          </Typography>
          <Typography sx={{ display: "flex" }}>
            <Phone sx={{ mr: 1, color: "black" }} />
            <Breadcrumbs>
              <a href="tel:+2250102030405" style={{ color: "white" }}>
                +2250708517414
              </a>
              <a href="tel:+2250102030405" style={{ color: "white" }}>
                +2250708517414
              </a>
            </Breadcrumbs>
          </Typography>
          <Typography sx={{ display: "flex" }}>
            <AlternateEmail sx={{ mr: 1, color: "black" }} />
            <Breadcrumbs>
              <a href="mailto:myemail@domain.com" style={{ color: "white" }}>
                myemail@domain.com
              </a>
            </Breadcrumbs>
          </Typography>
          <Typography sx={{ display: "flex" }}>
            <AccessTime sx={{ mr: 1, color: "black" }} />
            Lun - Ven ( 9:00 - 17:00 )
          </Typography>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default ContactCard;
