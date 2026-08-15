import { useMemo, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import {
  Box,
  Button,
  Chip,
  Stack,
  Typography,
} from "@mui/material";

import { useDepartments } from "../hooks/useDepartments";

import WorkspaceHero from "../../../../components/workspace/WorkspaceHero";
import WorkspaceSearch from "../../../../components/workspace/WorkspaceSearch";
import WorkspaceCard from "../../../../components/workspace/WorkspaceCard";
import EmptyState from "../../../../components/workspace/EmptyState";

export default function DepartmentsPage() {
  const { departments } = useDepartments();

  const [search, setSearch] = useState("");

  const filteredDepartments = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) return departments;

    return departments.filter(
      (department) =>
        department.name.toLowerCase().includes(query) ||
        department.description.toLowerCase().includes(query)
    );
  }, [departments, search]);

  return (
    <Stack spacing={3}>
      <WorkspaceHero
        title="Congregation Departments"
        subtitle="Manage congregation departments, assignments and responsibilities."
        actionLabel="Add Department"
        actionTo="/departments/new"
      />

      <WorkspaceSearch
        title="Search Departments"
        value={search}
        onChange={setSearch}
        placeholder="Search departments..."
      />

      {filteredDepartments.length === 0 ? (
        <EmptyState
          title="No Departments Found"
          description="Create your first department to begin."
        />
      ) : (
        <Box
          display="grid"
          gridTemplateColumns={{
            xs: "1fr",
            sm: "repeat(2, 1fr)",
            lg: "repeat(3, 1fr)",
          }}
          gap={3}
        >
          {filteredDepartments.map((department) => (
            <WorkspaceCard key={department.id}>
              <Stack spacing={2}>
                <Typography variant="h4">
                  {department.icon ?? "🏢"}
                </Typography>

                <Typography
                  variant="h6"
                  fontWeight={700}
                >
                  {department.name}
                </Typography>

                <Typography
                  variant="body2"
                  color="text.secondary"
                >
                  {department.description}
                </Typography>

                <Stack
                  direction="row"
                  spacing={1}
                  flexWrap="wrap"
                >
                  <Chip
                    size="small"
                    label={`Members: ${
                      department.memberIds?.length ?? 0
                    }`}
                  />

                  <Chip
                    size="small"
                    label={`Key Members: ${
                      department.keyMemberPublisherIds.length
                    }`}
                  />
                </Stack>

                <Button
                  component={RouterLink}
                  to={`/congregation/departments/${department.id}`}
                  variant="contained"
                  fullWidth
                >
                  Open Department
                </Button>
              </Stack>
            </WorkspaceCard>
          ))}
        </Box>
      )}
    </Stack>
  );
}