import {
  ArrowForwardIos,
  Event,
  Groups,
  MenuBook,
  People,
  Person,
  Place,
  ReceiptLong,
} from "@mui/icons-material";

import {
  Avatar,
  Box,
  Card,
  CardActionArea,
  CardContent,
  Divider,
  List,
  ListItem,
  ListItemText,
  Paper,
  Stack,
  Typography,
} from "@mui/material";

import { Link as RouterLink } from "react-router-dom";

import { publisherService } from "../publishers/services/publisherService";
import { serviceGroupService } from "../service-groups/services/serviceGroupService";
import { territoryService } from "../territories/services/territoryService";
import { serviceCommitteeService } from "../service-committee/services/serviceCommitteeService";

type Activity = {
  title: string;
  subtitle: string;
  createdAt: string;
};

type WorkspaceCardProps = {
  title: string;
  description: string;
  icon: React.ReactNode;
  to: string;
};

function WorkspaceCard({
  title,
  description,
  icon,
  to,
}: WorkspaceCardProps) {
  return (
    <Card
      elevation={0}
      sx={{
        borderRadius: 4,
        border: "1px solid",
        borderColor: "divider",
        transition: "all .25s ease",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: 4,
        },
      }}
    >
      <CardActionArea
        component={RouterLink}
        to={to}
        sx={{ p: 3 }}
      >
        <Stack
          direction="row"
          spacing={2}
          alignItems="center"
        >
          <Avatar
            sx={{
              width: 58,
              height: 58,
            }}
          >
            {icon}
          </Avatar>

          <Box sx={{ flexGrow: 1 }}>
            <Typography
              variant="h6"
              fontWeight={700}
            >
              {title}
            </Typography>

            <Typography
              variant="body2"
              color="text.secondary"
            >
              {description}
            </Typography>
          </Box>

          <ArrowForwardIos
            fontSize="small"
            color="action"
          />
        </Stack>
      </CardActionArea>
    </Card>
  );
}

export default function Dashboard() {
  const activities: Activity[] = [
    ...publisherService.getAll().map((p) => ({
      title: `${p.firstName} ${p.lastName}`,
      subtitle: "Publisher created",
      createdAt: p.createdAt,
    })),

    ...serviceGroupService.getAll().map((g) => ({
      title: g.name,
      subtitle: "Service Group created",
      createdAt: g.createdAt,
    })),

    ...territoryService.getAll().map((t) => ({
      title: t.name,
      subtitle: "Territory created",
      createdAt: t.createdAt,
    })),

    ...serviceCommitteeService.getAll().map((c) => ({
      title: c.name,
      subtitle: "Service Committee created",
      createdAt: c.createdAt,
    })),
  ]
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() -
        new Date(a.createdAt).getTime()
    )
    .slice(0, 5);

  return (
    <Box sx={{ p: 4 }}>
      <Stack spacing={4}>

        <Paper
          elevation={0}
          sx={{
            p: 5,
            borderRadius: 5,
            background:
              "linear-gradient(135deg,#1976d2 0%,#42a5f5 100%)",
            color: "white",
          }}
        >
          <Typography
            variant="overline"
            sx={{
              opacity: 0.9,
              letterSpacing: 2,
            }}
          >
            JW MEETING COMPANION
          </Typography>

          <Typography
            variant="h3"
            fontWeight={700}
            gutterBottom
          >
            Congregation Hub
          </Typography>

          <Typography
            variant="h6"
            sx={{
              opacity: 0.9,
              maxWidth: 700,
            }}
          >
            Welcome. Choose a workspace below to
            manage your congregation records,
            meetings and responsibilities.
          </Typography>
        </Paper>

        <Box>
          <Typography
            variant="h5"
            fontWeight={700}
            gutterBottom
          >
            Workspaces
          </Typography>

          <Typography color="text.secondary">
            Everything is organised into dedicated
            workspaces for a cleaner experience.
          </Typography>
        </Box>

        <Box
          sx={{
            display: "grid",
            gap: 3,
            gridTemplateColumns: {
              xs: "1fr",
              md: "repeat(2,1fr)",
            },
          }}
        >
          <WorkspaceCard
            title="Body of Elders"
            description="Members, appointments and shepherding records."
            icon={<Person />}
            to="/congregation/body-of-elders"
          />

          <WorkspaceCard
            title="Service Committee"
            description="Committee members and congregation responsibilities."
            icon={<Groups />}
            to="/congregation/service-committee"
          />

          <WorkspaceCard
            title="Publishers"
            description="Publisher records and congregation directory."
            icon={<People />}
            to="/congregation/publishers"
          />
                    <WorkspaceCard
            title="Service Groups"
            description="Organise publishers into field service groups."
            icon={<Groups />}
            to="/congregation/service-groups"
          />

          <WorkspaceCard
            title="Territories"
            description="Manage congregation territories and assignments."
            icon={<Place />}
            to="/congregation/territories"
          />

          <WorkspaceCard
            title="Reports"
            description="View congregation reports and summaries."
            icon={<ReceiptLong />}
            to="/congregation/reports"
          />

          <WorkspaceCard
            title="Meetings"
            description="Midweek, weekend meetings and meeting notes."
            icon={<Event />}
            to="/meetings"
          />

          <WorkspaceCard
            title="Study Resources"
            description="Workbook, assignments and study material."
            icon={<MenuBook />}
            to="/workbook"
          />
        </Box>

        <Divider />

        <Box>
          <Typography
            variant="h5"
            fontWeight={700}
            gutterBottom
          >
            Recent Activity
          </Typography>

          <Typography
            color="text.secondary"
            sx={{ mb: 2 }}
          >
            The latest congregation records that have
            been added.
          </Typography>

          <Card
            elevation={0}
            sx={{
              borderRadius: 4,
              border: "1px solid",
              borderColor: "divider",
            }}
          >
            <CardContent>
              {activities.length === 0 ? (
                <Typography color="text.secondary">
                  No congregation data has been added
                  yet.
                </Typography>
              ) : (
                <List disablePadding>
                  {activities.map(
                    (activity, index) => (
                      <ListItem
                        key={index}
                        divider={
                          index <
                          activities.length - 1
                        }
                      >
                        <ListItemText
                          primary={
                            <Typography
                              fontWeight={600}
                            >
                              {activity.title}
                            </Typography>
                          }
                          secondary={
                            activity.subtitle
                          }
                        />
                      </ListItem>
                    )
                  )}
                </List>
              )}
            </CardContent>
          </Card>
          
        </Box>

      </Stack>
    </Box>
  );
}