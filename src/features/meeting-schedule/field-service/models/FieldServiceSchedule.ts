export interface FieldServiceArrangement {
  id: string;

  time: string;

  arrangement: string;

  location: string;

  conductor: string;

  notes: string;
}

export interface FieldServiceDay {
  day: string;

  arrangements: FieldServiceArrangement[];
}

export interface FieldServiceWeek {
  id: string;

  weekNumber: number;

  weekLabel: string;

  days: FieldServiceDay[];
}

export interface FieldServiceSchedule {
  id: string;

  title: string;

  month: string;

  weeks: FieldServiceWeek[];

  createdAt: number;

  updatedAt: number;
}