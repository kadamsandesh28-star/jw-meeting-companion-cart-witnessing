export interface CongregationProfile {
  congregationName: string;
  kingdomHall: string;
  city: string;
  circuit: string;
  language: string;
  scriptureText: string;
  scriptureReference: string;
}

const STORAGE_KEY = "jw-congregation-profile";

const DEFAULT_PROFILE: CongregationProfile = {
  congregationName: "Vadodara East Congregation",
  kingdomHall: "",
  city: "",
  circuit: "",
  language: "English",
  scriptureText:
    "Do not go beyond the things that are written.",
  scriptureReference: "1 Corinthians 4:6",
};

export function loadCongregationProfile(): CongregationProfile {
  try {
    const data = localStorage.getItem(STORAGE_KEY);

    if (!data) {
      return DEFAULT_PROFILE;
    }

    const parsed = JSON.parse(data);

    if (
      !parsed ||
      typeof parsed !== "object" ||
      Array.isArray(parsed)
    ) {
      return DEFAULT_PROFILE;
    }

    const merged = {
      ...DEFAULT_PROFILE,
      ...parsed,
    };

    // Migrate the original placeholder so Cart Witnessing exports use the
    // congregation name by default without overwriting a custom name.
    if (parsed.congregationName === "My Congregation" || parsed.congregationName === "Sunrise Congregation") {
      merged.congregationName = DEFAULT_PROFILE.congregationName;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(merged));
    }

    return merged;
  } catch (error) {
    console.warn(
      "Unable to load congregation profile:",
      error
    );

    return DEFAULT_PROFILE;
  }
}

export function saveCongregationProfile(
  profile: CongregationProfile
): void {
  try {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(profile)
    );
  } catch (error) {
    console.warn(
      "Unable to save congregation profile:",
      error
    );
  }
}