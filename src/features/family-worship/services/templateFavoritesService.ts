const STORAGE_KEY =
  "family-worship-template-favorites";

export const templateFavoritesService = {
  get(): string[] {
    const raw =
      localStorage.getItem(STORAGE_KEY);

    if (!raw) {
      return [];
    }

    try {
      return JSON.parse(raw);
    } catch {
      return [];
    }
  },

  save(ids: string[]) {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(ids)
    );
  },

  toggle(id: string) {
    const favorites =
      this.get();

    if (favorites.includes(id)) {
      this.save(
        favorites.filter(
          (item) => item !== id
        )
      );
    } else {
      this.save([
        ...favorites,
        id,
      ]);
    }
  },

  isFavorite(id: string) {
    return this.get().includes(id);
  },
};