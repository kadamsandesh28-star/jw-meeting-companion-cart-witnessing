import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import {
  createCollection,
  deleteCollection,
  loadCollections,
  renameCollection,
  ResearchCollection,
} from "../../services/researchService";

export default function Research() {
  const navigate = useNavigate();

  const [collections, setCollections] =
    useState<ResearchCollection[]>([]);

  const [search, setSearch] = useState("");

  const [openCreate, setOpenCreate] =
    useState(false);

  const [openRename, setOpenRename] =
    useState(false);

  const [openDelete, setOpenDelete] =
    useState(false);

  const [selected, setSelected] =
    useState<ResearchCollection | null>(null);

  const [title, setTitle] = useState("");

  const [icon, setIcon] = useState("📖");

  function refresh() {
    setCollections(loadCollections());
  }

  useEffect(() => {
    refresh();
  }, []);

  function create() {
    if (!title.trim()) return;

    createCollection(title, icon);

    setTitle("");
    setIcon("📖");

    setOpenCreate(false);

    refresh();
  }

  function rename() {
    if (!selected) return;

    renameCollection(
      selected.id,
      title,
      icon
    );

    setOpenRename(false);

    refresh();
  }

  function remove() {
    if (!selected) return;

    deleteCollection(selected.id);

    setOpenDelete(false);

    refresh();
  }

  const filteredCollections =
    collections.filter((collection) =>
      collection.title
        .toLowerCase()
        .includes(search.toLowerCase())
    );

  return (
    <Box>
      <Typography
        variant="h4"
        fontWeight="bold"
        gutterBottom
      >
        📂 Research
      </Typography>

      <Typography
        color="text.secondary"
        sx={{ mb: 3 }}
      >
        Organize your Bible research into
        collections.
      </Typography>

      <TextField
        fullWidth
        placeholder="🔍 Search Collections..."
        value={search}
        onChange={(e) =>
          setSearch(e.target.value)
        }
        sx={{ mb: 3 }}
      />

      <Button
        variant="contained"
        onClick={() =>
          setOpenCreate(true)
        }
        sx={{ mb: 3 }}
      >
        ➕ New Collection
      </Button>

      <Grid container spacing={3}>
        {filteredCollections.map(
          (collection) => (
            <Grid
              key={collection.id}
              size={{
                xs: 12,
                sm: 6,
                md: 4,
              }}
            >
              <Card
                sx={{
                  borderRadius: 3,
                }}
              >
                <CardActionArea
                  onClick={() =>
                    navigate(
                      `/library/research/${collection.id}`
                    )
                  }
                >
                  <CardContent>
                    <Typography variant="h5">
                      {collection.icon}{" "}
                      {collection.title}
                    </Typography>

                    <Typography
                      color="text.secondary"
                      sx={{ mt: 1 }}
                    >
                      Research Collection
                    </Typography>
                  </CardContent>
                </CardActionArea>

                <Stack
                  direction="row"
                  justifyContent="flex-end"
                  sx={{
                    px: 2,
                    pb: 2,
                  }}
                >
                  <IconButton
                    color="primary"
                    onClick={() => {
                      setSelected(
                        collection
                      );

                      setTitle(
                        collection.title
                      );

                      setIcon(
                        collection.icon
                      );

                      setOpenRename(
                        true
                      );
                    }}
                  >
                    <EditIcon />
                  </IconButton>

                  <IconButton
                    color="error"
                    onClick={() => {
                      setSelected(
                        collection
                      );

                      setOpenDelete(
                        true
                      );
                    }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Stack>
              </Card>
            </Grid>
          )
        )}
      </Grid>

      {filteredCollections.length ===
        0 && (
        <Typography
          color="text.secondary"
          sx={{ mt: 4 }}
        >
          No matching collections
          found.
        </Typography>
      )}
            {/* CREATE DIALOG */}

      <Dialog
        open={openCreate}
        onClose={() => setOpenCreate(false)}
      >
        <DialogTitle>
          New Collection
        </DialogTitle>

        <DialogContent>
          <Stack spacing={2} sx={{ mt: 1 }}>
            <TextField
              label="Collection Name"
              value={title}
              onChange={(e) =>
                setTitle(e.target.value)
              }
            />

            <TextField
              label="Emoji"
              value={icon}
              onChange={(e) =>
                setIcon(e.target.value)
              }
            />
          </Stack>
        </DialogContent>

        <DialogActions>
          <Button
            onClick={() =>
              setOpenCreate(false)
            }
          >
            Cancel
          </Button>

          <Button
            variant="contained"
            onClick={create}
          >
            Create
          </Button>
        </DialogActions>
      </Dialog>

      {/* RENAME DIALOG */}

      <Dialog
        open={openRename}
        onClose={() => setOpenRename(false)}
      >
        <DialogTitle>
          Rename Collection
        </DialogTitle>

        <DialogContent>
          <Stack spacing={2} sx={{ mt: 1 }}>
            <TextField
              label="Collection Name"
              value={title}
              onChange={(e) =>
                setTitle(e.target.value)
              }
            />

            <TextField
              label="Emoji"
              value={icon}
              onChange={(e) =>
                setIcon(e.target.value)
              }
            />
          </Stack>
        </DialogContent>

        <DialogActions>
          <Button
            onClick={() =>
              setOpenRename(false)
            }
          >
            Cancel
          </Button>

          <Button
            variant="contained"
            onClick={rename}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>

      {/* DELETE DIALOG */}

      <Dialog
        open={openDelete}
        onClose={() => setOpenDelete(false)}
      >
        <DialogTitle>
          Delete Collection?
        </DialogTitle>

        <DialogContent>
          <Typography>
            Are you sure you want to delete this
            collection?
          </Typography>
        </DialogContent>

        <DialogActions>
          <Button
            onClick={() =>
              setOpenDelete(false)
            }
          >
            Cancel
          </Button>

          <Button
            color="error"
            variant="contained"
            onClick={remove}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}