import {

  Card,

  CardContent,

  Typography,

} from "@mui/material";



import { Publisher } from "../../../features/congregation/publishers/models/Publisher";

import ProfileSection from "./ProfileSection";



interface NotesCardProps {

  publisher: Publisher;

}



export default function NotesCard({

  publisher,

}: NotesCardProps) {

  return (

    <Card elevation={2}>

      <CardContent>

        <ProfileSection title="Notes">

          {publisher.notes ? (

            <Typography

              variant="body1"

              sx={{

                whiteSpace: "pre-wrap",

              }}

            >

              {publisher.notes}

            </Typography>

          ) : (

            <Typography

              color="text.secondary"

            >

              No notes available.

            </Typography>

          )}

        </ProfileSection>

      </CardContent>

    </Card>

  );

}