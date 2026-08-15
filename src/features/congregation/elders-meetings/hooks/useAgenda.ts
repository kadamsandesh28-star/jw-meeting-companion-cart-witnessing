import { useEffect, useState } from "react";

import type { AgendaItem } from "../models/AgendaItem";

import { meetingStorage } from "../services/meetingStorage";

export function useAgenda() {
  const [agendaItems, setAgendaItems] = useState<AgendaItem[]>(() => {
    const stored = meetingStorage.load();

    if (stored.agenda.length > 0) {
      return stored.agenda;
    }

    return [
      {
        id: crypto.randomUUID(),
        title: "Congregation Spiritual Condition",
        proposedBy: "Coordinator",
        duration: 15,
        reference: "Acts 20:28",
        notes: "",
        confidential: false,
        status: "Pending",
        actions: [],
      },
      {
        id: crypto.randomUUID(),
        title: "Publisher Matters",
        proposedBy: "Secretary",
        duration: 20,
        reference: "",
        notes: "",
        confidential: false,
        status: "Pending",
        actions: [],
      },
    ];
  });

  useEffect(() => {
    meetingStorage.save({
      agenda: agendaItems,
    });
  }, [agendaItems]);

  function addAgendaItem() {
    setAgendaItems((current) => [
      ...current,
      {
        id: crypto.randomUUID(),
        title: "",
        proposedBy: "",
        duration: 15,
        reference: "",
        notes: "",
        confidential: false,
        status: "Pending",
        actions: [],
      },
    ]);
  }

  function removeAgendaItem(id: string) {
    setAgendaItems((current) =>
      current.filter((item) => item.id !== id)
    );
  }

  function duplicateAgendaItem(id: string) {
    const item = agendaItems.find(
      (a) => a.id === id
    );

    if (!item) return;

    setAgendaItems((current) => [
      ...current,
      {
        ...item,
        id: crypto.randomUUID(),
      },
    ]);
  }

  function updateAgendaItem(updated: AgendaItem) {
    setAgendaItems((current) =>
      current.map((item) =>
        item.id === updated.id
          ? updated
          : item
      )
    );
  }

  function clearAgenda() {
    setAgendaItems([]);

    meetingStorage.clear();
  }

  return {
    agendaItems,

    addAgendaItem,

    removeAgendaItem,

    duplicateAgendaItem,

    updateAgendaItem,

    clearAgenda,
  };
}