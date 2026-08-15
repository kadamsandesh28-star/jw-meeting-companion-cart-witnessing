import {
  Card,
  CardContent,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Checkbox,
} from "@mui/material";

const tasks = [
  {
    id: 1,
    title: "Prepare Midweek Meeting",
    completed: false,
  },
  {
    id: 2,
    title: "Prepare Weekend Meeting",
    completed: false,
  },
  {
    id: 3,
    title: "Personal Study",
    completed: false,
  },
  {
    id: 4,
    title: "Review Notes",
    completed: false,
  },
];

export default function TodayTasksCard() {
  return (
    <Card sx={{ mb: 2 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          ✅ Today's Tasks
        </Typography>

        <List disablePadding>
          {tasks.map((task) => (
            <ListItem key={task.id} disableGutters>
              <ListItemIcon>
                <Checkbox checked={task.completed} />
              </ListItemIcon>

              <ListItemText primary={task.title} />
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  );
}