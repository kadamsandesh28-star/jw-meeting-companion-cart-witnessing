/**
 * Represents a member of a publisher's immediate family or household.
 */

export enum FamilyRelationship {
  Spouse = "Spouse",
  Son = "Son",
  Daughter = "Daughter",
  Father = "Father",
  Mother = "Mother",
  Brother = "Brother",
  Sister = "Sister",
  Guardian = "Guardian",
  Grandparent = "Grandparent",
  Grandchild = "Grandchild",
  Other = "Other"
}

export interface FamilyMember {
  id: string;

  firstName: string;

  lastName: string;

  relationship: FamilyRelationship;

  dateOfBirth?: string;

  phone?: string;

  email?: string;

  publisherId?: string;

  emergencyContact: boolean;

  notes?: string;
}