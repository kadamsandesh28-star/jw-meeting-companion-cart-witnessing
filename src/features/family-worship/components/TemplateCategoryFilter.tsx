import {
  Chip,
  Stack,
} from "@mui/material";

interface Props {
  categories: string[];
  selected: string;
  onSelect: (
    category: string
  ) => void;
}

export default function TemplateCategoryFilter({
  categories,
  selected,
  onSelect,
}: Props) {
  return (
    <Stack
      direction="row"
      spacing={1}
      sx={{
        overflowX: "auto",
        pb: 1,
      }}
    >
      {categories.map((category) => (
        <Chip
          key={category}
          label={category}
          clickable
          color={
            selected === category
              ? "primary"
              : "default"
          }
          onClick={() =>
            onSelect(category)
          }
        />
      ))}
    </Stack>
  );
}