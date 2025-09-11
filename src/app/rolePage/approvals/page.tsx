import { redirect } from "next/navigation";

export default function ApprovalsIndexPage() {
    redirect("/role/approvals/approved");
}
