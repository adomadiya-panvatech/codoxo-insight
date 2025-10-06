import { AuditStatus } from "@/types/audit";
import { Badge } from "@/components/ui/badge";

interface StatusBadgeProps {
  status: AuditStatus;
}

export const StatusBadge = ({ status }: StatusBadgeProps) => {
  const getStatusConfig = (status: AuditStatus) => {
    switch (status) {
      case "completed":
        return { label: "Completed", variant: "default" as const, className: "bg-success text-success-foreground" };
      case "in-progress":
        return { label: "In Progress", variant: "default" as const, className: "bg-primary text-primary-foreground" };
      case "pending":
        return { label: "Pending", variant: "secondary" as const, className: "" };
      case "review":
        return { label: "Under Review", variant: "default" as const, className: "bg-warning text-warning-foreground" };
    }
  };

  const config = getStatusConfig(status);

  return (
    <Badge variant={config.variant} className={config.className}>
      {config.label}
    </Badge>
  );
};
