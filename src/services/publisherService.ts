import { Publisher } from "../features/congregation/publishers/models/Publisher";
import { createEmptyPublisher } from "../features/congregation/publishers/models/createEmptyPublisher";

const STORAGE_KEY = "jw-companion-publishers";

class PublisherService {
  private publishers: Publisher[] = [];

  constructor() {
    this.load();

    if (this.publishers.length === 0) {
      this.seed();
    }
  }

  private seed() {
    const publisher = createEmptyPublisher();

    publisher.firstName = "John";
    publisher.lastName = "Smith";
    publisher.displayName = "John Smith";
    publisher.gender = "Brother";
    publisher.publisherStatus = "Publisher";
    publisher.baptized = true;
    publisher.active = true;
    publisher.congregationGroup = 1;

    this.publishers = [publisher];

    this.save();
  }

  private load() {
    const json = localStorage.getItem(STORAGE_KEY);

    if (!json) {
      this.publishers = [];
      return;
    }

    try {
      this.publishers = JSON.parse(json);
    } catch {
      this.publishers = [];
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

  getActive(): Publisher[] {
    return this.publishers.filter(
      (publisher) => publisher.active
    );
  }

  getById(id: string): Publisher | undefined {
    return this.publishers.find(
      (publisher) => publisher.id === id
    );
  }

  getByStatus(status: string): Publisher[] {
    return this.publishers.filter(
      (publisher) =>
        publisher.publisherStatus === status
    );
  }

  search(searchText: string): Publisher[] {
    const text = searchText.trim().toLowerCase();

    if (!text) {
      return this.getAll();
    }

    return this.publishers.filter((publisher) => {
      return (
        publisher.firstName
          .toLowerCase()
          .includes(text) ||
        publisher.lastName
          .toLowerCase()
          .includes(text) ||
        publisher.displayName
          .toLowerCase()
          .includes(text) ||
       (publisher.email ?? "")
  .toLowerCase()
  .includes(text) ||
        (publisher.phone ?? "")
  .toLowerCase()
  .includes(text)
      );
    });
  }

  create(publisher: Publisher) {
    publisher.createdAt = new Date().toISOString();
    publisher.updatedAt = new Date().toISOString();

    this.publishers.push(publisher);

    this.save();
  }

  update(publisher: Publisher) {
    const index = this.publishers.findIndex(
      (p) => p.id === publisher.id
    );

    if (index === -1) return;

    publisher.updatedAt = new Date().toISOString();

    this.publishers[index] = publisher;

    this.save();
  }

  delete(id: string) {
    this.publishers = this.publishers.filter(
      (publisher) => publisher.id !== id
    );

    this.save();
  }

  archive(id: string) {
    const publisher = this.getById(id);

    if (!publisher) return;

    publisher.active = false;
    publisher.updatedAt = new Date().toISOString();

    this.save();
  }

  count(): number {
    return this.publishers.length;
  }

  countActive(): number {
    return this.publishers.filter(
      (publisher) => publisher.active
    ).length;
  }
}

export const publisherService =
  new PublisherService();