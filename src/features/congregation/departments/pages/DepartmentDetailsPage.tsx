import { useCallback, useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Alert,
  Box,
  Button,
  Paper,
  Snackbar,
  Stack,
  Typography,
} from "@mui/material";

import WorkspaceHero from "../../../../components/workspace/WorkspaceHero";
import DepartmentMembersCard from "../components/DepartmentMembersCard";
import DepartmentOverviewCard from "../components/DepartmentOverviewCard";
import DepartmentOverseerCard from "../components/DepartmentOverseerCard";
import DepartmentScheduleCard from "../components/DepartmentScheduleCard";
import DepartmentWorkTemplatesCard from "../components/DepartmentWorkTemplatesCard";

import { DepartmentWorkTemplate } from "../models/DepartmentWorkTemplate";
import { departmentService } from "../services/departmentService";
import { departmentWorkTemplateService } from "../services/departmentWorkTemplateService";

export default function DepartmentDetailsPage() {
  const { id } = useParams<{ id: string }>();

  const [refreshKey, setRefreshKey] = useState(0);
  const [saved, setSaved] = useState(false);

  const department = useMemo(() => {
    if (!id) return undefined;
    return departmentService.getById(id);
  }, [id, refreshKey]);

  const [templates, setTemplates] = useState<
    DepartmentWorkTemplate[]
  >([]);

  const refreshTemplates = useCallback(() => {
    if (!id) return;

    setTemplates(
      departmentWorkTemplateService.getByDepartment(id)
    );
  }, [id]);

  useEffect(() => {
    refreshTemplates();
  }, [refreshTemplates]);

  const [overseerId, setOverseerId] = useState(
    department?.overseerId ?? ""
  );

  const [assistantId, setAssistantId] = useState(
    department?.assistantId ?? ""
  );

  const [memberIds, setMemberIds] = useState<string[]>(
    department?.memberIds ?? []
  );

  const [keyMemberIds, setKeyMemberIds] = useState<string[]>(
    department?.keyMemberPublisherIds ?? []
  );

  if (!department) {
    return (
      <Alert severity="warning">
        Department not found.
      </Alert>
    );
  }

  const handleMembersChange = (members: string[]) => {
    setMemberIds(members);

    setKeyMemberIds((current) =>
      current.filter((id) => members.includes(id))
    );
  };

  const handleSave = () => {
    departmentService.update({
      ...department,
      overseerId,
      assistantId,
      memberIds,
      keyMemberPublisherIds: keyMemberIds,
      updatedAt: new Date().toISOString(),
    });

    setRefreshKey((value) => value + 1);
    setSaved(true);
  };

  return (
    <>
      <Stack spacing={3}>
        <WorkspaceHero
          title={`${department.icon ?? "🏢"} ${department.name}`}
          subtitle={department.description}
        />

        <Box
          display="grid"
          gridTemplateColumns={{
            xs: "1fr",
            lg: "340px 1fr",
          }}
          gap={3}
        >
          {/* Left Column */}
          <Stack spacing={3}>
            <DepartmentOverviewCard
              active={department.active}
              memberCount={memberIds.length}
              keyMemberCount={keyMemberIds.length}
            />

            <DepartmentMembersCard
              overseer={overseerId}
              assistant={assistantId}
              members={memberIds}
              keyMembers={keyMemberIds}
            />
          </Stack>

          {/* Right Column */}
          <Stack spacing={3}>
            <DepartmentOverseerCard
              overseerId={overseerId}
              assistantId={assistantId}
              memberIds={memberIds}
              keyMemberIds={keyMemberIds}
              onOverseerChange={setOverseerId}
              onAssistantChange={setAssistantId}
              onMembersChange={handleMembersChange}
              onKeyMembersChange={setKeyMemberIds}
            />

            <DepartmentWorkTemplatesCard
              departmentId={department.id}
              templates={templates}
              onChanged={refreshTemplates}
            />

            <DepartmentScheduleCard
              departmentId={department.id}
              memberIds={memberIds}
              templates={templates}
            />

            <Paper sx={{ p: 3, borderRadius: 3 }}>
              <Typography
                variant="h6"
                gutterBottom
              >
                Department Description
              </Typography>

              <Typography color="text.secondary">
                {department.description}
              </Typography>

              <Button
                sx={{ mt: 3 }}
                variant="contained"
                onClick={handleSave}
              >
                Save Department
              </Button>
            </Paper>
          </Stack>
        </Box>
      </Stack>

      <Snackbar
        open={saved}
        autoHideDuration={2500}
        onClose={() => setSaved(false)}
      >
        <Alert
          severity="success"
          onClose={() => setSaved(false)}
          sx={{ width: "100%" }}
        >
          Department saved successfully.
        </Alert>
      </Snackbar>
    </>
  );
}