import { useEffect, useState } from "react";
import {
  Users,
  BookOpen,
  CheckCircle2,
  PauseCircle,
} from "lucide-react";

import {
  deleteBibleStudy,
  getBibleStudies,
  getBibleStudyStatistics,
  searchBibleStudies,
} from "../services/bibleStudyService";

import { BibleStudy } from "../types/bibleStudy";

import AddBibleStudyDialog from "../components/AddBibleStudyDialog";
import EditBibleStudyDialog from "../components/EditBibleStudyDialog";
import BibleStudyCard from "../components/BibleStudyCard";
import StatCard from "../../../components/StatCard";

type Filter =
  | "All"
  | "Active"
  | "Inactive"
  | "Completed";

export default function BibleStudies() {
  const [studies, setStudies] = useState<BibleStudy[]>([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<Filter>("All");

  const [openAddDialog, setOpenAddDialog] = useState(false);

  const [openEditDialog, setOpenEditDialog] =
    useState(false);

  const [selectedStudy, setSelectedStudy] =
    useState<BibleStudy | null>(null);

  const [stats, setStats] = useState(
    getBibleStudyStatistics()
  );

  function loadStudies() {
    let data =
      search.trim() === ""
        ? getBibleStudies()
        : searchBibleStudies(search);

    if (filter !== "All") {
      data = data.filter(
        (study) => study.status === filter
      );
    }

    setStudies(data);
    setStats(getBibleStudyStatistics());
  }

  useEffect(() => {
    loadStudies();
  }, [search, filter]);

  function handleDelete(id: string) {
    if (!window.confirm("Delete this Bible Study?")) {
      return;
    }

    deleteBibleStudy(id);
    loadStudies();
  }

  function handleEdit(study: BibleStudy) {
    setSelectedStudy(study);
    setOpenEditDialog(true);
  }

  const filters: Filter[] = [
    "All",
    "Active",
    "Inactive",
    "Completed",
  ];

  return (
    <div className="space-y-8">
      {/* Header */}

      <div>
        <h1 className="text-3xl font-bold">
          Bible Studies
        </h1>

        <p className="mt-1 text-slate-600 dark:text-slate-400">
          Manage and organize your Bible studies.
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
          title="Active"
          value={stats.active}
          icon={<BookOpen className="h-7 w-7 text-white" />}
          color="bg-green-600"
        />

        <StatCard
          title="Inactive"
          value={stats.inactive}
          icon={<PauseCircle className="h-7 w-7 text-white" />}
          color="bg-amber-500"
        />

        <StatCard
          title="Completed"
          value={stats.completed}
          icon={<CheckCircle2 className="h-7 w-7 text-white" />}
          color="bg-indigo-600"
        />
      </div>

      {/* Search */}

      <div className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm lg:flex-row lg:items-center lg:justify-between dark:border-slate-700 dark:bg-slate-900">
        <input
          type="text"
          placeholder="Search by student, publication, address or notes..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-xl border border-slate-300 px-4 py-3 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
        />

        <button
          onClick={() => setOpenAddDialog(true)}
          className="rounded-xl bg-blue-600 px-6 py-3 font-medium text-white transition hover:bg-blue-700"
        >
          + Add Bible Study
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
          {studies.length} Bible Stud
          {studies.length !== 1 ? "ies" : "y"}
        </h2>
      </div>

      {/* Cards */}

      {studies.length === 0 ? (
        <div className="rounded-2xl border-2 border-dashed border-slate-300 py-16 text-center dark:border-slate-700">
          <h3 className="text-xl font-semibold">
            No Bible Studies Found
          </h3>

          <p className="mt-2 text-slate-500">
            Try another search or add your first Bible Study.
          </p>
        </div>
      ) : (
        <div className="space-y-5">
          {studies.map((study) => (
            <BibleStudyCard
              key={study.id}
              study={study}
              onEdit={handleEdit}
              onDelete={() => handleDelete(study.id)}
            />
          ))}
        </div>
      )}

      <AddBibleStudyDialog
        open={openAddDialog}
        onClose={() => setOpenAddDialog(false)}
        onSaved={loadStudies}
      />

      <EditBibleStudyDialog
        open={openEditDialog}
        study={selectedStudy}
        onClose={() => {
          setOpenEditDialog(false);
          setSelectedStudy(null);
        }}
        onSaved={loadStudies}
      />
    </div>
  );
}