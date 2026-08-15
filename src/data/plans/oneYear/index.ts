import { genesis } from "./books/genesis";
import { exodus } from "./books/exodus";
import { leviticus } from "./books/leviticus";
import { numbers } from "./books/numbers";
import { deuteronomy } from "./books/deuteronomy";

import { ReadingRangeDefinition } from "../../../types/readingPlan";

export const oneYearRanges: ReadingRangeDefinition[] = [
  genesis,
  exodus,
  leviticus,
  numbers,
  deuteronomy,
];