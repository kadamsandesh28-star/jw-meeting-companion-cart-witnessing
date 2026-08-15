import { useEffect, useState } from "react";
import {
  Users,
  Clock3,
  CheckCircle2,
  TriangleAlert,
} from "lucide-react";

import {
  deleteReturnVisit,
  getReturnVisitStatistics,
  getReturnVisits,
  searchReturnVisits,
} from "../../features/ministry/services/returnVisitService";

import { ReturnVisit } from "../../features/ministry/types/returnVisit";

import AddReturnVisitDialog from "../../features/ministry/components/AddReturnVisitDialog";
import EditReturnVisitDialog from "../../features/ministry/components/EditReturnVisitDialog";

import ReturnVisitCard from "../../features/ministry/components/ReturnVisitCard";
import StatCard from "../../components/StatCard";

type Filter =
  | "All"
  | "Pending"
  | "Completed"
  | "Not Home"
  | "Moved Away";

export default function ReturnVisits() {
  const [visits, setVisits] = useState<ReturnVisit[]>([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<Filter>("All");

  const [openAddDialog, setOpenAddDialog] = useState(false);

  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [selectedVisit, setSelectedVisit] =
    useState<ReturnVisit | null>(null);

  const [stats, setStats] = useState(
    getReturnVisitStatistics()
  );

  function loadVisits() {
    let data =
      search.trim() === ""
        ? getReturnVisits()
        : searchReturnVisits(search);

    if (filter !== "All") {
      data = data.filter(
        (visit) => visit.status === filter
      );
    }

    setVisits(data);
    setStats(getReturnVisitStatistics());
  }

  useEffect(() => {
    loadVisits();
  }, [search, filter]);

  function handleDelete(id: string) {
    if (!window.confirm("Delete this return visit?")) {
      return;
    }

    deleteReturnVisit(id);
    loadVisits();
  }

  function handleEdit(visit: ReturnVisit) {
    setSelectedVisit(visit);
    setOpenEditDialog(true);
  }

  const filters: Filter[] = [
    "All",
    "Pending",
    "Completed",
    "Not Home",
    "Moved Away",
  ];

  return (
    <div className="space-y-8">
      {/* Header */}

      <div>
        <h1 className="text-3xl font-bold">
          Return Visits
        </h1>

        <p className="mt-1 text-slate-600 dark:text-slate-400">
          Manage and organize your return visits.
        </p>
      </div>

      {/* Dashboard */}

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Total"
          value={stats.total}
          icon={<Users className="h-7 w-7 text-white" />}
          color="bg-blue-600"
        />

        <StatCard
          title="Pending"
          value={stats.pending}
          icon={<Clock3 className="h-7 w-7 text-white" />}
          color="bg-amber-500"
        />

        <StatCard
          title="Completed"
          value={stats.completed}
          icon={<CheckCircle2 className="h-7 w-7 text-white" />}
          color="bg-green-600"
        />

        <StatCard
          title="Overdue"
          value={stats.overdue}
          icon={<TriangleAlert className="h-7 w-7 text-white" />}
          color="bg-red-600"
        />
      </div>

      {/* Search */}

      <div className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm lg:flex-row lg:items-center lg:justify-between dark:border-slate-700 dark:bg-slate-900">
        <input
          type="text"
          placeholder="Search by name, address, phone or notes..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-xl border border-slate-300 px-4 py-3 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
        />

        <button
          onClick={() => setOpenAddDialog(true)}
          className="rounded-xl bg-blue-600 px-6 py-3 font-medium text-white transition hover:bg-blue-700"
        >
          + Add Return Visit
        </button>
      </div>

      {/* Filters */}

      <div className="flex flex-wrap gap-2">
        {filters.map((item) => (
          <button
            key={item}
            onClick={() => setFilter(item)}
            className={`rounded-full px-4 py-2 text-sm font-medium transition ${
              filter === item
                ? "bg-blue-600 text-white shadow"
                : "bg-slate-200 hover:bg-slate-300 dark:bg-slate-800 dark:text-white dark:hover:bg-slate-700"
            }`}
          >
            {item}
          </button>
        ))}
      </div>

      {/* Count */}

      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">
          {visits.length} Return Visit
          {visits.length !== 1 ? "s" : ""}
        </h2>
      </div>

      {/* Cards */}

      {visits.length === 0 ? (
        <div className="rounded-2xl border-2 border-dashed border-slate-300 py-16 text-center dark:border-slate-700">
          <h3 className="text-xl font-semibold">
            No Return Visits Found
          </h3>

          <p className="mt-2 text-slate-500">
            Try another search or add your first return visit.
          </p>
        </div>
      ) : (
        <div className="space-y-5">
          {visits.map((visit) => (
            <ReturnVisitCard
              key={visit.id}
              visit={visit}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}

      <AddReturnVisitDialog
        open={openAddDialog}
        onClose={() => setOpenAddDialog(false)}
        onSaved={loadVisits}
      />

      <EditReturnVisitDialog
        open={openEditDialog}
        visit={selectedVisit}
        onClose={() => {
          setOpenEditDialog(false);
          setSelectedVisit(null);
        }}
        onSaved={loadVisits}
      />
    </div>
  );
}