export type ContractTermsSection = {
  heading: string;
  // Entries starting with "IMPORTANT:" render in red, with that
  // prefix stripped for display.
  body: string[];
};

export const CONTRACT_INTRO =
  "This Car Rental Agreement (\"Agreement\") is entered into between K22 Auto Rentals (\"Rental Provider\"), including where acting on behalf of the registered owner of the vehicle, and the \"Renter\" named below.";

export const CONTRACT_TERMS_SECTIONS: ContractTermsSection[] = [
  {
    heading: "Rental Payments",
    body: [
      "The Renter agrees to pay all rental payments on or before the agreed due date. Failure to make payment on time will constitute a breach of this Agreement and may result in immediate recovery action.",
      "IMPORTANT: The Owner reserves the right to terminate this Agreement and repossess the Vehicle if rent becomes overdue. Any unpaid rent will remain payable even after termination of the Agreement.",
    ],
  },
  {
    heading: "Bond / Security Deposit",
    body: [
      "The bond or security deposit may be retained by the Owner to cover any costs associated with the rental period including unpaid rent, vehicle damage, towing fees, impound fees, insurance excess, tolls, infringements, cleaning expenses, administration costs, legal fees, loss of income while the Vehicle is off-road, and any other financial loss suffered by the Owner due to the actions of the Renter.",
      "IMPORTANT: If the total amount owing exceeds the bond amount, the Renter remains personally liable for the remaining balance.",
      "Any remaining bond amount may be refunded after final inspection and clearance of all outstanding amounts.",
    ],
  },
  {
    heading: "Use of Vehicle",
    body: [
      "The Renter agrees that the Vehicle will only be driven by the approved Renter listed in this Agreement unless written permission is provided by the Owner.",
      "IMPORTANT: The Vehicle must not be used for any unlawful purpose, reckless driving, racing, burnouts, towing, dangerous driving, or any activity that may place the Vehicle or other road users at risk.",
      "The Renter agrees to obey all Victorian road laws and accepts full responsibility for the Vehicle while it is in their possession.",
      "The Vehicle is only permitted to be operated within Victoria unless otherwise approved by the Owner in writing.",
      "The Renter agrees to maintain safe operation of the Vehicle and immediately report any accident, overheating, warning lights, unusual noises, damage, or mechanical issues. Continuing to drive the Vehicle after signs of overheating or mechanical failure may result in the Renter being held liable for resulting engine or mechanical damage.",
      "The Renter also agrees to notify the rental provider of any maintenance and agrees to bring the Vehicle for servicing or maintenance when requested by the rental provider.",
    ],
  },
  {
    heading: "Tolls, Fines and Infringements",
    body: [
      "The Renter accepts full responsibility for all tolls, parking fines, speeding fines, traffic infringements, towing charges, impound fees, and any penalties incurred during the rental period.",
      "An administration fee of $10 may be charged for every toll notice, infringement nomination, or related processing handled by the Owner.",
      "Any unpaid tolls, fines, or infringements may be recovered from the Renter together with any associated administrative or legal costs.",
    ],
  },
  {
    heading: "Insurance and Liability",
    body: [
      "The Vehicle may be covered by comprehensive insurance; however, the Renter remains fully responsible for the insurance excess and all damages or losses not covered by insurance.",
      "IMPORTANT: The Renter may be held liable for damages arising from at-fault accidents, negligent driving, hit and run incidents, unauthorised drivers, theft caused by negligence, or any actions that result in insurance claims being denied or reduced.",
      "Drivers under the age of 21 years are not covered unless specifically approved by the Owner in writing.",
      "IMPORTANT: Regardless of insurance coverage, the Renter indemnifies and agrees to fully compensate the Owner for any loss, damage, legal action, injury, recovery expense, or financial loss resulting from the Renter's possession or use of the Vehicle.",
    ],
  },
  {
    heading: "Vehicle Condition",
    body: [
      "The Renter acknowledges responsibility to inspect the Vehicle before taking possession and is strongly advised to take photos and videos of the Vehicle including the exterior, interior, wheels, fuel level, and odometer reading and should be sent to the rental provider.",
      "Any damage not recorded prior to commencement of the rental period may be considered damage caused during the rental period.",
    ],
  },
  {
    heading: "Default, Non-Payment and Legal Action",
    body: [
      "The Renter acknowledges that failure to comply with this Agreement may result in immediate legal and recovery action.",
      "IMPORTANT: If rent becomes overdue for more than Seven (7) days, or the Renter becomes uncontactable for more than three (3) consecutive days, the Owner reserves the right to report the Vehicle to Victoria Police as unlawfully retained, stolen, or missing.",
      "The Owner may immediately commence recovery proceedings without further notice and may engage debt collection agencies, repossession agents, solicitors, recovery agents, or court proceedings where necessary.",
      "IMPORTANT: The Renter agrees to remain liable for all unpaid rent, recovery costs, towing fees, repossession costs, storage fees, legal fees, court costs, damages, loss of income, and all other financial losses incurred by the Owner.",
      "IMPORTANT: Failure to return the Vehicle upon request may result in both civil and criminal proceedings being commenced against the Renter.",
      "The Parties agree to be bound by any lawful judgment or decision made by the court or tribunal with jurisdiction over any dispute arising from this Agreement. Neither Party shall be entitled to claim punitive or exemplary damages against the other.",
    ],
  },
  {
    heading: "Termination of Agreement",
    body: [
      "The Owner reserves the right to terminate this Agreement immediately if rent becomes overdue, the Vehicle is damaged or misused, illegal activity occurs, false information is provided, or any condition of this Agreement is breached.",
      "IMPORTANT: Termination of this Agreement does not remove the Renter's liability for outstanding debts, damages, or legal obligations.",
    ],
  },
  {
    heading: "General Conditions",
    body: [
      "This Agreement represents the entire agreement between both parties and supersedes any prior verbal or written agreements.",
      "Any amendments to this Agreement must be made in writing and agreed to by both parties.",
      "If any part of this Agreement is found invalid or unenforceable, the remaining sections will continue to remain valid and enforceable.",
      "This Agreement shall be governed by the laws of Victoria, Australia.",
    ],
  },
];

export const CONTRACT_ACKNOWLEDGMENT: string[] = [
  "By signing this Agreement, the Renter acknowledges that they have read, understood, and agreed to all terms and conditions outlined in this Agreement and accepts full responsibility for the vehicle during the rental period.",
  "This Agreement becomes legally binding once signed by both parties and remains in effect until the vehicle is returned to the Owner, all outstanding payments have been cleared, and the Owner confirms termination of the rental arrangement in writing or by message.",
];
