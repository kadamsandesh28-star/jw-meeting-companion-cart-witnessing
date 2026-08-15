export interface ResearchCollection {
  id: string;
  title: string;
  icon: string;
  createdAt: string;
  notes: string;
}

const STORAGE_KEY = "jw-research-collections";

export function loadCollections(): ResearchCollection[] {
  const saved = localStorage.getItem(STORAGE_KEY);

  if (!saved) {
    return [];
  }

  return JSON.parse(saved);
}

export function saveCollections(
  collections: ResearchCollection[]
) {
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(collections)
  );
}

export function createCollection(
  title: string,
  icon: string
) {
  const collections = loadCollections();

  collections.push({
    id: crypto.randomUUID(),
    title,
    icon,
    createdAt: new Date().toISOString(),
    notes: "",
  });

  saveCollections(collections);
}

export function getCollection(id: string) {
  return loadCollections().find(
    (collection) => collection.id === id
  );
}

export function updateCollection(
  updated: ResearchCollection
) {
  const collections = loadCollections().map(
    (collection) =>
      collection.id === updated.id
        ? updated
        : collection
  );

  saveCollections(collections);
}

export function renameCollection(
  id: string,
  title: string,
  icon: string
) {
  const collections = loadCollections().map(
    (collection) =>
      collection.id === id
        ? {
            ...collection,
            title,
            icon,
          }
        : collection
  );

  saveCollections(collections);
}

export function deleteCollection(id: string) {
  const collections = loadCollections().filter(
    (collection) => collection.id !== id
  );

  saveCollections(collections);
}