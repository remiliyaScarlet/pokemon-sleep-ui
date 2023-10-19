export type PatreonEventType = 'members:pledge:create' | 'members:pledge:update' | 'members:pledge:delete';

// The only successful status is Paid. `null` if never charged.
// One of `Paid`, `Declined`, `Deleted`, `Pending`, `Refunded`, `Fraud`, `Other`.
export type PatreonChargeStatus =
  'Paid' |
  'Declined' |
  'Deleted' |
  'Pending' |
  'Refunded' |
  'Fraud' |
  'Other' |
  null;

export type PatronStatus = 'active_patron' | 'declined_patron' | 'former_patron' | null;
