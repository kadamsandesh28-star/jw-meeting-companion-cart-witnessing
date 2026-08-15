import { Box, Typography } from "@mui/material";

interface StatRowProps {
  label: string;
  value: string | number;
}

const StatRow = ({ label, value }: StatRowProps) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        py: 1.2,
      }}
    >
      <Typography
        variant="body1"
        color="text.secondary"
      >
        {label}
      </Typography>

      <Typography
        variant="h6"
        fontWeight={700}
      >
        {value}
      </Typography>
    </Box>
  );
};

export default StatRow;