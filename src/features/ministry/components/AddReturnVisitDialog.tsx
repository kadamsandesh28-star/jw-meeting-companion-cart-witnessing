import { useState } from "react";
import { ReturnVisit } from "../types/returnVisit";
import { addReturnVisit } from "../services/returnVisitService";

interface AddReturnVisitDialogProps {
  open: boolean;
  onClose: () => void;
  onSaved: () => void;
}

export default function AddReturnVisitDialog({
  open,
  onClose,
  onSaved,
}: AddReturnVisitDialogProps) {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [nextVisit, setNextVisit] = useState("");
  const [notes, setNotes] = useState("");
  const [status, setStatus] =
    useState<ReturnVisit["status"]>("Pending");

  if (!open) return null;

  function handleSave() {
    if (!name.trim()) {
      alert("Please enter the person's name.");
      return;
    }

    if (!address.trim()) {
      alert("Please enter an address.");
      return;
    }

    if (!nextVisit) {
      alert("Please select the next visit date.");
      return;
    }

    const now = new Date().toISOString();

    const visit: ReturnVisit = {
      id: crypto.randomUUID(),
      name,
      address,
      phone,
      email,
      nextVisit,
      notes,
      status,
      createdAt: now,
      updatedAt: now,
    };

    addReturnVisit(visit);

    onSaved();

    onClose();

    setName("");
    setAddress("");
    setPhone("");
    setEmail("");
    setNextVisit("");
    setNotes("");
    setStatus("Pending");
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
      <div className="w-full max-w-xl rounded-2xl bg-white p-6 shadow-2xl dark:bg-slate-900">
        <h2 className="mb-6 text-2xl font-bold text-slate-900 dark:text-white">
          Add Return Visit
        </h2>

        <div className="space-y-4">
          <input
            className="w-full rounded-lg border border-slate-300 p-3 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            className="w-full rounded-lg border border-slate-300 p-3 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
            placeholder="Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />

          <input
            className="w-full rounded-lg border border-slate-300 p-3 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
            placeholder="Phone (Optional)"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />

          <input
            className="w-full rounded-lg border border-slate-300 p-3 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
            placeholder="Email (Optional)"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
              Next Visit
            </label>

            <input
              type="date"
              className="w-full rounded-lg border border-slate-300 p-3 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              value={nextVisit}
              onChange={(e) => setNextVisit(e.target.value)}
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
              Status
            </label>

            <select
              className="w-full rounded-lg border border-slate-300 p-3 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              value={status}
              onChange={(e) =>
                setStatus(e.target.value as ReturnVisit["status"])
              }
            >
              <option value="Pending">Pending</option>
              <option value="Completed">Completed</option>
              <option value="Not Home">Not Home</option>
              <option value="Moved Away">Moved Away</option>
            </select>
          </div>

          <textarea
            className="w-full rounded-lg border border-slate-300 p-3 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
            rows={4}
            placeholder="Notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />

          <div className="flex justify-end gap-3 pt-4">
            <button
              onClick={onClose}
              className="rounded-lg border border-slate-300 px-5 py-2 hover:bg-slate-100 dark:border-slate-700 dark:hover:bg-slate-800"
            >
              Cancel
            </button>

            <button
              onClick={handleSave}
              className="rounded-lg bg-blue-600 px-5 py-2 font-medium text-white hover:bg-blue-700"
            >
              Save Return Visit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}