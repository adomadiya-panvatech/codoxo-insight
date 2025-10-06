import { Audit } from "@/types/audit";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StatusBadge } from "./StatusBadge";
import { RiskBadge } from "./RiskBadge";
import { Progress } from "@/components/ui/progress";
import { Calendar, User, AlertCircle } from "lucide-react";

interface AuditCardProps {
  audit: Audit;
}

export const AuditCard = ({ audit }: AuditCardProps) => {
  return (
    <Card className="shadow-card hover:shadow-elevated transition-all duration-300 hover:scale-[1.02]">
      <CardHeader className="space-y-3">
        <div className="flex items-start justify-between gap-4">
          <CardTitle className="text-lg font-semibold leading-tight">{audit.name}</CardTitle>
          <StatusBadge status={audit.status} />
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
            {audit.category}
          </span>
          <RiskBadge level={audit.riskLevel} />
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Progress</span>
            <span className="font-semibold">{audit.progress}%</span>
          </div>
          <Progress value={audit.progress} className="h-2" />
        </div>
        
        <div className="grid grid-cols-2 gap-4 pt-2">
          <div className="flex items-center gap-2 text-sm">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <div className="flex flex-col">
              <span className="text-xs text-muted-foreground">Start Date</span>
              <span className="font-medium">{new Date(audit.startDate).toLocaleDateString()}</span>
            </div>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <div className="flex flex-col">
              <span className="text-xs text-muted-foreground">End Date</span>
              <span className="font-medium">{new Date(audit.endDate).toLocaleDateString()}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between pt-2 border-t">
          <div className="flex items-center gap-2 text-sm">
            <User className="h-4 w-4 text-muted-foreground" />
            <span className="text-muted-foreground">{audit.auditor}</span>
          </div>
          {audit.findings > 0 && (
            <div className="flex items-center gap-1 text-sm">
              <AlertCircle className="h-4 w-4 text-destructive" />
              <span className="font-medium">{audit.findings} findings</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
