import { useEffect, useState } from "react";

import { templateFavoritesService } from "../services/templateFavoritesService";

export function useTemplateFavorites() {
  const [favorites, setFavorites] =
    useState<string[]>([]);

  useEffect(() => {
    setFavorites(
      templateFavoritesService.get()
    );
  }, []);

  function toggleFavorite(id: string) {
    templateFavoritesService.toggle(id);

    setFavorites(
      templateFavoritesService.get()
    );
  }

  function isFavorite(id: string) {
    return favorites.includes(id);
  }

  return {
    favorites,
    isFavorite,
    toggleFavorite,
  };
}