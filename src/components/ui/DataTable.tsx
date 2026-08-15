import { ReactNode } from "react";
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

export interface DataTableColumn<T> {
  /** Unique column key */
  id: keyof T | string;

  /** Column heading */
  label: string;

  /** Alignment */
  align?: "left" | "center" | "right";

  /** Fixed width */
  width?: number | string;

  /** Optional custom cell renderer */
  render?: (row: T) => ReactNode;
}

export interface DataTableProps<T> {
  /** Table columns */
  columns: DataTableColumn<T>[];

  /** Row data */
  rows: T[];

  /** Row key selector */
  getRowKey: (row: T) => string | number;

  /** Message when there are no rows */
  emptyMessage?: string;

  /** Optional toolbar shown above the table */
  toolbar?: ReactNode;

  /** Optional footer shown below the table */
  footer?: ReactNode;

  /** Called when a row is clicked */
  onRowClick?: (row: T) => void;
}

export default function DataTable<T>({
  columns,
  rows,
  getRowKey,
  emptyMessage = "No data available.",
  toolbar,
  footer,
  onRowClick,
}: DataTableProps<T>) {
  return (
    <Paper
      elevation={0}
      sx={{
        border: 1,
        borderColor: "divider",
        borderRadius: 2,
        overflow: "hidden",
      }}
    >
      {toolbar && (
        <Box
          px={2}
          py={1.5}
          borderBottom={1}
          borderColor="divider"
        >
          {toolbar}
        </Box>
      )}

      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id.toString()}
                  align={column.align}
                  sx={{
                    width: column.width,
                    fontWeight: 700,
                    whiteSpace: "nowrap",
                  }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {rows.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  align="center"
                  sx={{ py: 6 }}
                >
                  <Typography color="text.secondary">
                    {emptyMessage}
                  </Typography>
                </TableCell>
              </TableRow>
            ) : (
              rows.map((row) => (
                <TableRow
                  key={getRowKey(row)}
                  hover={!!onRowClick}
                  onClick={() => onRowClick?.(row)}
                  sx={{
                    cursor: onRowClick ? "pointer" : "default",
                    transition: "background-color 0.2s ease",
                  }}
                >
                  {columns.map((column) => (
                    <TableCell
                      key={column.id.toString()}
                      align={column.align}
                    >
                      {column.render
                        ? column.render(row)
                        : (() => {
                            const value =
                              row[column.id as keyof T];

                            if (
                              value === null ||
                              value === undefined
                            ) {
                              return "";
                            }

                            return value as ReactNode;
                          })()}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {footer && (
        <Box
          px={2}
          py={1.5}
          borderTop={1}
          borderColor="divider"
        >
          {footer}
        </Box>
      )}
    </Paper>
  );
}