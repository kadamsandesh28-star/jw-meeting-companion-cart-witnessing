import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";

import PersonIcon from "@mui/icons-material/Person";
import GroupsIcon from "@mui/icons-material/Groups";
import ApartmentIcon from "@mui/icons-material/Apartment";
import FavoriteIcon from "@mui/icons-material/Favorite";

import { globalSearch } from "../../services/globalSearchService";
import { SearchResult } from "../../types/SearchResult";

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function SearchDialog({
  open,
  onClose,
}: Props) {
  const [query, setQuery] = useState("");

  const navigate = useNavigate();

  const results = useMemo(() => globalSearch(query), [query]);

  function getIcon(type: string) {
    switch (type) {
      case "publisher":
        return <PersonIcon color="primary" />;

      case "group":
        return <GroupsIcon color="success" />;

      case "department":
        return <ApartmentIcon color="warning" />;

      case "shepherding":
        return <FavoriteIcon color="error" />;

      default:
        return <PersonIcon />;
    }
  }

  function openResult(result: SearchResult) {
    switch (result.type) {
      case "publisher":
        navigate("/congregation/directory", {
          state: {
            search: result.title,
            selectedId: result.id,
          },
        });
        break;

      case "group":
        navigate("/congregation/groups", {
          state: {
            search: result.title,
            selectedId: result.id,
          },
        });
        break;

      case "department":
        navigate("/congregation/departments", {
          state: {
            search: result.title,
            selectedId: result.id,
          },
        });
        break;

      case "shepherding":
        navigate("/congregation/shepherding", {
          state: {
            search: result.title,
            selectedId: result.id,
          },
        });
        break;
    }

    setQuery("");
    onClose();
  }

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
    >
      <DialogTitle>Global Search</DialogTitle>

      <DialogContent>
        <TextField
          fullWidth
          autoFocus
          margin="normal"
          placeholder="Search publishers, groups, departments..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />

        <List>
          {results.length === 0 && query !== "" && (
            <Typography
              sx={{ mt: 2 }}
              color="text.secondary"
            >
              No results found.
            </Typography>
          )}

          {results.map((result) => (
            <ListItemButton
              key={`${result.type}-${result.id}`}
              onClick={() => openResult(result)}
            >
              <ListItemIcon>
                {getIcon(result.type)}
              </ListItemIcon>

              <ListItemText
                primary={result.title}
                secondary={result.subtitle}
              />
            </ListItemButton>
          ))}
        </List>
      </DialogContent>
    </Dialog>
  );
}