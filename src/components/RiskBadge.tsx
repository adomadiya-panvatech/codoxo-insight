import { Badge } from "@/components/ui/badge";

interface RiskBadgeProps {
  level: "low" | "medium" | "high";
}

export const RiskBadge = ({ level }: RiskBadgeProps) => {
  const getRiskConfig = (level: "low" | "medium" | "high") => {
    switch (level) {
      case "low":
        return { label: "Low Risk", className: "bg-success/10 text-success border-success/20" };
      case "medium":
        return { label: "Medium Risk", className: "bg-warning/10 text-warning border-warning/20" };
      case "high":
        return { label: "High Risk", className: "bg-destructive/10 text-destructive border-destructive/20" };
    }
  };

  const config = getRiskConfig(level);

  return (
    <Badge variant="outline" className={config.className}>
      {config.label}
    </Badge>
  );
};
