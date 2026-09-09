import type { Metadata } from "next";
import ContractClient from "./ContractClient";

export const metadata: Metadata = {
  title: "Contract",
  robots: { index: false, follow: false },
};

export default function ContractPage() {
  return <ContractClient />;
}
