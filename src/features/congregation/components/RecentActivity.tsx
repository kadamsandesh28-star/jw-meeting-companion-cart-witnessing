import {
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";

import { publisherService } from "../publishers/services/publisherService";
import { serviceGroupService } from "../service-groups/services/serviceGroupService";
import { territoryService } from "../territories/services/territoryService";
import { serviceCommitteeService } from "../service-committee/services/serviceCommitteeService";

type Activity = {
  title: string;
  subtitle: string;
  createdAt: string;
};

export default function RecentActivity() {
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
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Recent Activity
        </Typography>

        {activities.length === 0 ? (
          <Typography color="text.secondary">
            No congregation data has been added yet.
          </Typography>
        ) : (
          <List disablePadding>
            {activities.map((activity, index) => (
              <ListItem
                key={index}
                divider={index < activities.length - 1}
              >
                <ListItemText
                  primary={activity.title}
                  secondary={activity.subtitle}
                />
              </ListItem>
            ))}
          </List>
        )}
      </CardContent>
    </Card>
  );
}