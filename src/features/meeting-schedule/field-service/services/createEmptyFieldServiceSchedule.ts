import {
  FieldServiceArrangement,
  FieldServiceDay,
  FieldServiceSchedule,
  FieldServiceWeek,
} from "../models/FieldServiceSchedule";

function createArrangement(): FieldServiceArrangement {
  return {
    id: crypto.randomUUID(),
    time: "",
    arrangement: "",
    location: "",
    conductor: "",
    notes: "",
  };
}

function createDay(day: string): FieldServiceDay {
  return {
    day,
    arrangements: [createArrangement()],
  };
}

function createWeek(
  weekNumber: number,
  weekLabel: string
): FieldServiceWeek {
  return {
    id: crypto.randomUUID(),

    weekNumber,

    weekLabel,

    days: [
      createDay("Monday"),
      createDay("Wednesday"),
      createDay("Thursday"),
      createDay("Friday"),
      createDay("Saturday"),
    ],
  };
}

export function createEmptyFieldServiceSchedule(
  month: string
): FieldServiceSchedule {
  return {
    id: crypto.randomUUID(),

    title: `${month} Field Service Schedule`,

    month,

    weeks: [
      createWeek(1, "Week 1"),
      createWeek(2, "Week 2"),
      createWeek(3, "Week 3"),
      createWeek(4, "Week 4"),
      createWeek(5, "Week 5"),
    ],

    createdAt: Date.now(),

    updatedAt: Date.now(),
  };
}