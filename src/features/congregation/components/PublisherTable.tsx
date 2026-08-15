import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  Avatar,
  Chip,
  IconButton,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";

import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import { Publisher } from "../publishers/types/Publisher";
import { PublisherStatus } from "../publishers/types/enums";

interface Props {
  publishers: Publisher[];
}

export default function PublisherTable({
  publishers,
}: Props) {
  const navigate = useNavigate();

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] =
    useState(10);

  const handlePageChange = (
    _event: unknown,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(
      parseInt(event.target.value, 10)
    );
    setPage(0);
  };

  const paginatedPublishers = publishers.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const handleEdit = (publisher: Publisher) => {
    navigate(
      `/congregation/publishers/${publisher.id}`
    );
  };

  const handleView = (publisher: Publisher) => {
    navigate(
      `/congregation/publishers/${publisher.id}`
    );
  };

  const handleDelete = (publisher: Publisher) => {
    console.log("Delete", publisher.id);
  };

  return (
    <Paper sx={{ mt: 2 }}>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Publisher Type</TableCell>
              <TableCell>Service Group</TableCell>
              <TableCell>Status</TableCell>
              <TableCell align="right">
                Actions
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {paginatedPublishers.map(
              (publisher) => (
                <TableRow
                  key={publisher.id}
                  hover
                >
                  <TableCell>
                    <Stack
                      direction="row"
                      spacing={2}
                      alignItems="center"
                    >
                      <Avatar>
                        {publisher.firstName.charAt(
                          0
                        )}
                        {publisher.lastName.charAt(
                          0
                        )}
                      </Avatar>

                      <Stack>
                        <Typography fontWeight={600}>
                          {publisher.firstName}{" "}
                          {publisher.lastName}
                        </Typography>

                        <Typography
                          variant="body2"
                          color="text.secondary"
                        >
                          {
                            publisher.contact
                              .email
                          }
                        </Typography>
                      </Stack>
                    </Stack>
                  </TableCell>

                  <TableCell>
                    {
                      publisher.congregation
                        .role
                    }
                  </TableCell>

                  <TableCell>
                    {
                      publisher.congregation
                        .publisherType
                    }
                  </TableCell>

                  <TableCell>
                    {
                      publisher.congregation
                        .fieldServiceGroup
                    }
                  </TableCell>

                  <TableCell>
                    <Chip
                      label={
                        publisher
                          .congregation
                          .status
                      }
                      color={
                        publisher
                          .congregation
                          .status ===
                        PublisherStatus.Active
                          ? "success"
                          : "default"
                      }
                      size="small"
                    />
                  </TableCell>

                  <TableCell align="right">
                    <IconButton
                      color="primary"
                      onClick={() =>
                        handleView(
                          publisher
                        )
                      }
                    >
                      <VisibilityIcon />
                    </IconButton>

                    <IconButton
                      color="warning"
                      onClick={() =>
                        handleEdit(
                          publisher
                        )
                      }
                    >
                      <EditIcon />
                    </IconButton>

                    <IconButton
                      color="error"
                      onClick={() =>
                        handleDelete(
                          publisher
                        )
                      }
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              )
            )}

            {paginatedPublishers.length ===
              0 && (
              <TableRow>
                <TableCell
                  colSpan={6}
                  align="center"
                >
                  No publishers found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        component="div"
        count={publishers.length}
        page={page}
        rowsPerPage={rowsPerPage}
        onPageChange={handlePageChange}
        onRowsPerPageChange={
          handleRowsPerPageChange
        }
        rowsPerPageOptions={[
          5, 10, 25, 50,
        ]}
      />
    </Paper>
  );
}