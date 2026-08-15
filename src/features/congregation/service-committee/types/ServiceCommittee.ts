export interface ServiceCommittee {
  id: string;

  name: string;

  coordinatorPublisherId?: string;
  secretaryPublisherId?: string;
  serviceOverseerPublisherId?: string;

  memberPublisherIds: string[];

  responsibilities: string[];

  notes?: string;

  createdAt: string;
  updatedAt: string;
}