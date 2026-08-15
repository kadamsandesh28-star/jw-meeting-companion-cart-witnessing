import { useMemo, useState } from "react";

import AutoStoriesRoundedIcon from "@mui/icons-material/AutoStoriesRounded";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";

import {
  InputAdornment,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import { useTemplateFavorites } from "../hooks/useTemplateFavorites";
import { WorshipTemplate } from "../models/WorshipTemplate";

import TemplateCategoryFilter from "./TemplateCategoryFilter";
import TemplateGrid from "./TemplateGrid";

interface Props {
  templates: WorshipTemplate[];
  onSelect?: (
    template: WorshipTemplate
  ) => void;
}

export default function TemplateLibrary({
  templates,
  onSelect,
}: Props) {
  const [search, setSearch] =
    useState("");

  const [category, setCategory] =
    useState("All");

  const { favorites } =
    useTemplateFavorites();

  const categories = useMemo(
    () => [
      "All",
      ...new Set(
        templates.map(
          (t) => t.category
        )
      ),
    ],
    [templates]
  );

  const filteredTemplates =
    useMemo(() => {
      const query =
        search.trim().toLowerCase();

      return templates
        .filter((template) => {
          const matchesSearch =
            template.name
              .toLowerCase()
              .includes(query) ||
            template.description
              .toLowerCase()
              .includes(query) ||
            template.category
              .toLowerCase()
              .includes(query);

          const matchesCategory =
            category === "All" ||
            template.category ===
              category;

          return (
            matchesSearch &&
            matchesCategory
          );
        })
        .sort((a, b) => {
          const aFavorite =
            favorites.includes(a.id);

          const bFavorite =
            favorites.includes(b.id);

          if (
            aFavorite === bFavorite
          ) {
            return a.name.localeCompare(
              b.name
            );
          }

          return aFavorite ? -1 : 1;
        });
    }, [
      templates,
      search,
      category,
      favorites,
    ]);

  return (
    <Stack spacing={3}>
      <Paper
        elevation={0}
        sx={{
          p: 3,
          borderRadius: 6,
          border: "1px solid",
          borderColor: "#F2D9A6",
          background:
            "linear-gradient(135deg,#FFFDF6 0%,#FFF8E8 100%)",
          boxShadow:
            "0 10px 30px rgba(245,158,11,.08)",
        }}
      >
        <Stack spacing={1}>
          <Typography
            variant="h5"
            fontWeight={700}
            color="#B45309"
          >
            <AutoStoriesRoundedIcon
              sx={{
                mr: 1,
                verticalAlign: "middle",
              }}
            />
            Template Library
          </Typography>

          <Typography
            sx={{
              color: "#64748B",
              lineHeight: 1.7,
            }}
          >
            Explore inspiring family worship
            templates organized by topic.
            Search, browse by category,
            and save your favorites.
          </Typography>
        </Stack>
      </Paper>

      <TextField
        fullWidth
        placeholder="Search templates..."
        value={search}
        onChange={(e) =>
          setSearch(e.target.value)
        }
        sx={{
          "& .MuiOutlinedInput-root": {
            borderRadius: 4,
            backgroundColor: "#FFFFFF",
          },
        }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchRoundedIcon
                color="action"
              />
            </InputAdornment>
          ),
        }}
      />

      <TemplateCategoryFilter
        categories={categories}
        selected={category}
        onSelect={setCategory}
      />

      <TemplateGrid
        templates={filteredTemplates}
        onSelect={onSelect}
      />
    </Stack>
  );
}