import { Publisher } from "../types/Publisher";
import { samplePublishers } from "../data/samplePublishers";

const STORAGE_KEY = "jw-meeting-companion.publishers";

class PublisherService {
  private publishers: Publisher[];

  constructor() {
    this.publishers = this.load();
  }

  private load(): Publisher[] {
    const stored = localStorage.getItem(STORAGE_KEY);

    if (!stored) {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(samplePublishers)
      );

      return [...samplePublishers];
    }

    try {
      return JSON.parse(stored) as Publisher[];
    } catch {
      localStorage.removeItem(STORAGE_KEY);

      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(samplePublishers)
      );

      return [...samplePublishers];
    }
  }

  private save() {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(this.publishers)
    );
  }

  getAll(): Publisher[] {
    return [...this.publishers];
  }

  getById(id: string): Publisher | undefined {
    return this.publishers.find(
      (publisher) => publisher.id === id
    );
  }

  add(publisher: Publisher) {
    this.publishers.push(publisher);
    this.save();
  }

  update(updated: Publisher) {
    this.publishers = this.publishers.map((publisher) =>
      publisher.id === updated.id
        ? updated
        : publisher
    );

    this.save();
  }

  delete(id: string) {
    this.publishers = this.publishers.filter(
      (publisher) => publisher.id !== id
    );

    this.save();
  }

  reset() {
    this.publishers = [...samplePublishers];
    this.save();
  }
}

export const publisherService = new PublisherService();