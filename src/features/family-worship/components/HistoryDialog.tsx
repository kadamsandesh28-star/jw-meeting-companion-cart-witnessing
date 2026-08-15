import { useMemo, useState } from "react";

import CloseRoundedIcon from "@mui/icons-material/CloseRounded";

import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
} from "@mui/material";

import { FamilyWorshipSession } from "../models/FamilyWorshipSession";

import DeleteSessionDialog from "./DeleteSessionDialog";
import HistoryToolbar, {
  HistorySort,
} from "./HistoryToolbar";
import SessionHistoryList from "./SessionHistoryList";

interface Props {
  open: boolean;

  sessions: FamilyWorshipSession[];

  onClose: () => void;

  onOpen: (
    session: FamilyWorshipSession
  ) => void;

  onDelete: (
    id: string
  ) => void;
}

export default function HistoryDialog({
  open,
  sessions,
  onClose,
  onOpen,
  onDelete,
}: Props) {
  const [search, setSearch] =
    useState("");

  const [sort, setSort] =
    useState<HistorySort>(
      "newest"
    );

  const [
    sessionToDelete,
    setSessionToDelete,
  ] =
    useState<FamilyWorshipSession | null>(
      null
    );

  const filteredSessions =
    useMemo(() => {
      const query =
        search.toLowerCase().trim();

      const filtered =
        sessions.filter((session) =>
          [
            session.title,
            session.theme,
            session.bibleReading,
          ]
            .join(" ")
            .toLowerCase()
            .includes(query)
        );

      switch (sort) {
        case "oldest":
          return [...filtered].sort(
            (a, b) =>
              a.updatedAt -
              b.updatedAt
          );

        case "title-asc":
          return [...filtered].sort(
            (a, b) =>
              a.title.localeCompare(
                b.title
              )
          );

        case "title-desc":
          return [...filtered].sort(
            (a, b) =>
              b.title.localeCompare(
                a.title
              )
          );

        case "newest":
        default:
          return [...filtered].sort(
            (a, b) =>
              b.updatedAt -
              a.updatedAt
          );
      }
    }, [
      sessions,
      search,
      sort,
    ]);

  return (
    <>
      <Dialog
        open={open}
        onClose={onClose}
        fullWidth
        maxWidth="md"
      >
        <DialogTitle>
          Family Worship History

          <IconButton
            onClick={onClose}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
            }}
          >
            <CloseRoundedIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent>
          <HistoryToolbar
            value={search}
            sort={sort}
            onChange={setSearch}
            onSortChange={setSort}
          />

          <SessionHistoryList
            sessions={filteredSessions}
            onOpen={onOpen}
            onDelete={(id) => {
              const selected =
                sessions.find(
                  (s) => s.id === id
                ) ?? null;

              setSessionToDelete(
                selected
              );
            }}
          />
        </DialogContent>
      </Dialog>

      <DeleteSessionDialog
        open={
          sessionToDelete !== null
        }
        title={
          sessionToDelete?.title ?? ""
        }
        onCancel={() =>
          setSessionToDelete(null)
        }
        onConfirm={() => {
          if (sessionToDelete) {
            onDelete(
              sessionToDelete.id
            );
          }

          setSessionToDelete(
            null
          );
        }}
      />
    </>
  );
}