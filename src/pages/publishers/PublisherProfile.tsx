import React from "react";
import { Box, Grid, Stack } from "@mui/material";

import ProfileHeader from "../../components/publisher/ProfileHeader";
import SectionCard from "../../components/publisher/SectionCard";
import InfoCard from "../../components/publisher/InfoCard";
import InfoRow from "../../components/publisher/InfoRow";
import PrivilegeChip from "../../components/publisher/PrivilegeChip";


const publisher = {
  fullName: "John Smith",
  displayName: "John",
  role: "Elder",
  congregationGroup: "2",
  phone: "+91 9876543210",
  email: "john.smith@email.com",
  whatsapp: "+91 9876543210",

  dateOfBirth: "15 Jan 1988",
  baptized: "10 May 2008",
  publisherSince: "2005",

  spouse: "Jane Smith",
  children: "2",

  emergencyContact: "Jane Smith",
  emergencyPhone: "+91 9876543210",

  privileges: [
    "Elder",
    "Regular Pioneer",
    "Public Speaker",
    "LDC",
  ],
};

const PublisherProfile: React.FC = () => {
  return (
    <Box p={3}>
      <ProfileHeader
        fullName={publisher.fullName}
        displayName={publisher.displayName}
        role={publisher.role}
        congregationGroup={publisher.congregationGroup}
        phone={publisher.phone}
        email={publisher.email}
        whatsapp={publisher.whatsapp}
        privileges={publisher.privileges}
      />

      <Grid container spacing={3}>
        <Grid
          size={{
            xs: 12,
            md: 6,
          }}
        >
          <SectionCard title="Personal Information">
            <InfoCard title="Basic Details">
              <InfoRow
                label="Full Name"
                value={publisher.fullName}
              />

              <InfoRow
                label="Date of Birth"
                value={publisher.dateOfBirth}
              />

              <InfoRow
                label="Baptized"
                value={publisher.baptized}
              />

              <InfoRow
                label="Publisher Since"
                value={publisher.publisherSince}
                divider={false}
              />
            </InfoCard>
          </SectionCard>

          <SectionCard title="Family">
            <InfoCard title="Family Information">
              <InfoRow
                label="Spouse"
                value={publisher.spouse}
              />

              <InfoRow
                label="Children"
                value={publisher.children}
                divider={false}
              />
            </InfoCard>
          </SectionCard>
        </Grid>

        <Grid
          size={{
            xs: 12,
            md: 6,
          }}
        >
          <SectionCard title="Contact Information">
            <InfoCard title="Contact Details">
              <InfoRow
                label="Phone"
                value={publisher.phone}
              />

              <InfoRow
                label="Email"
                value={publisher.email}
              />

              <InfoRow
                label="WhatsApp"
                value={publisher.whatsapp}
                divider={false}
              />
            </InfoCard>
          </SectionCard>

          <SectionCard title="Privileges">
            <InfoCard title="Congregation Privileges">
              <Stack
                direction="row"
                spacing={1}
                useFlexGap
                flexWrap="wrap"
              >
                {publisher.privileges.map((privilege) => (
                  <PrivilegeChip
                    key={privilege}
                    label={privilege}
                  />
                ))}
              </Stack>
            </InfoCard>
          </SectionCard>

          <SectionCard title="Emergency Contact">
            <InfoCard title="Emergency Information">
              <InfoRow
                label="Contact Person"
                value={publisher.emergencyContact}
              />

              <InfoRow
                label="Phone"
                value={publisher.emergencyPhone}
                divider={false}
              />
            </InfoCard>
          </SectionCard>
        </Grid>
      </Grid>
    </Box>
  );
};

export default PublisherProfile;