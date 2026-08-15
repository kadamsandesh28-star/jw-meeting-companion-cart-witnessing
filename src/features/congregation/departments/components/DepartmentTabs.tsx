import { Box, Tab, Tabs } from "@mui/material";

export interface DepartmentTab {
  label: string;
  content: React.ReactNode;
}

interface DepartmentTabsProps {
  value: number;
  onChange: (value: number) => void;
  tabs: DepartmentTab[];
}

export default function DepartmentTabs({
  value,
  onChange,
  tabs,
}: DepartmentTabsProps) {
  return (
    <>
      <Tabs
        value={value}
        onChange={(_, newValue) => onChange(newValue)}
        variant="scrollable"
        scrollButtons="auto"
        sx={{ mb: 3 }}
      >
        {tabs.map((tab) => (
          <Tab
            key={tab.label}
            label={tab.label}
          />
        ))}
      </Tabs>

      <Box>{tabs[value]?.content}</Box>
    </>
  );
}