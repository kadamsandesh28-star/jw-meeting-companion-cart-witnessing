export interface ServiceGroup {
  id: string;

  name: string;

  overseerPublisherId?: string;

  assistantPublisherId?: string;

  meetingDay: string;

  meetingTime: string;

  territoryIds: string[];

  publisherIds: string[];

  notes?: string;

  createdAt: string;

  updatedAt: string;
}    