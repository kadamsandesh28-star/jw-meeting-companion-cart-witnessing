import { bibleBookTemplates } from "./bibleBooks";
import { bibleCharacterTemplates } from "./bibleCharacters";
import { christianLivingTemplates } from "./christianLiving";
import { familyLifeTemplates } from "./familyLife";

export const worshipTemplates = [
  ...christianLivingTemplates,
  ...bibleCharacterTemplates,
  ...familyLifeTemplates,
  ...bibleBookTemplates,
];