export type ContractTermsSection = {
  heading: string;
  // Entries starting with "IMPORTANT:" render in red, with that
  // prefix stripped for display.
  body: string[];
};

export const CONTRACT_INTRO =
  "This Vehicle Rental Agreement (\"Agreement\") is entered into between K22 Auto Rentals (\"Owner\"), including where acting on behalf of the registered owner of the vehicle, and the Renter named below.";

export const CONTRACT_TERMS_SECTIONS: ContractTermsSection[] = [
  {
    heading: "Rental Payments",
    body: [
      "The Renter agrees to pay all rental payments on or before the agreed due date. Failure to pay on time is a breach of this Agreement and may result in recovery action.",
      "IMPORTANT: The Owner may terminate this Agreement and recover the Vehicle if rent becomes overdue. Any unpaid rent remains payable after termination.",
    ],
  },
  {
    heading: "Bond / Security Deposit",
    body: [
      "The bond may be used to cover unpaid rent, vehicle damage, towing or impound fees, insurance excess, tolls, infringements, cleaning, administration, legal fees, loss of income while the Vehicle is off the road, and any other financial loss caused by the Renter.",
      "IMPORTANT: If costs owing exceed the bond amount, the Renter remains personally liable for the difference.",
      "Any remaining bond is refunded after a final inspection and once all outstanding amounts are cleared.",
    ],
  },
  {
    heading: "Use of the Vehicle",
    body: [
      "The Vehicle may only be driven by the Renter named on this Agreement, unless the Owner approves another driver in writing.",
      "IMPORTANT: The Vehicle must not be used for any unlawful purpose, racing, towing, or dangerous driving, and must stay within Victoria unless the Owner approves otherwise in writing.",
      "The Renter must report any accident, warning light, unusual noise, or mechanical issue immediately, and must not continue driving if the Vehicle shows signs of a serious mechanical problem.",
    ],
  },
  {
    heading: "Tolls, Fines and Infringements",
    body: [
      "The Renter is responsible for all tolls, fines, and infringements incurred during the rental period, including any administration fee charged for processing them.",
    ],
  },
  {
    heading: "Insurance and Liability",
    body: [
      "IMPORTANT: The Renter is responsible for the insurance excess and any damage or loss not covered by insurance, including damage from at-fault accidents, negligent driving, unauthorised drivers, or theft caused by negligence.",
      "Drivers under 21 are not covered unless approved by the Owner in writing.",
      "The Renter agrees to compensate the Owner for any loss, damage, or expense arising from the Renter's use of the Vehicle.",
    ],
  },
  {
    heading: "Vehicle Condition",
    body: [
      "The Renter should inspect the Vehicle before taking possession and is encouraged to photograph its condition, including the exterior, interior, and odometer reading.",
      "Damage not recorded before the start of the rental may be treated as having occurred during the rental period.",
    ],
  },
  {
    heading: "Default, Non-Payment and Legal Action",
    body: [
      "IMPORTANT: Failure to comply with this Agreement may result in recovery action, including engaging debt collection, repossession agents, or legal proceedings where necessary.",
      "IMPORTANT: The Renter remains liable for unpaid rent, recovery costs, and any other losses incurred by the Owner as a result of a breach.",
    ],
  },
  {
    heading: "Termination",
    body: [
      "The Owner may terminate this Agreement immediately if rent becomes overdue, the Vehicle is damaged or misused, or any term of this Agreement is breached.",
      "IMPORTANT: Termination does not remove the Renter's liability for any outstanding debts or damages.",
    ],
  },
  {
    heading: "General",
    body: [
      "This Agreement is the entire agreement between both parties and replaces any prior verbal or written arrangement.",
      "Any changes to this Agreement must be made in writing and agreed to by both parties.",
      "This Agreement is governed by the laws of Victoria, Australia.",
    ],
  },
];

export const CONTRACT_ACKNOWLEDGMENT =
  "By signing below, the Renter acknowledges that they have read, understood, and agreed to all terms and conditions in this Agreement, and accepts full responsibility for the Vehicle during the rental period. This Agreement becomes binding once signed by both parties and remains in effect until the Vehicle is returned, all outstanding payments are cleared, and the Owner confirms termination in writing.";
