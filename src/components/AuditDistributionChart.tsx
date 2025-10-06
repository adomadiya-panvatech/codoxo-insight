import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";
import { Audit, AuditCategory } from "@/types/audit";

interface AuditDistributionChartProps {
  audits: Audit[];
}

export const AuditDistributionChart = ({ audits }: AuditDistributionChartProps) => {
  const categoryColors: Record<AuditCategory, string> = {
    "claims-processing": "hsl(221 83% 53%)",
    "payment-integrity": "hsl(142 76% 36%)",
    "provider-network": "hsl(262 83% 58%)",
    "compliance": "hsl(0 84% 60%)",
    "utilization-management": "hsl(38 92% 50%)",
  };

  const data = Object.entries(
    audits.reduce((acc, audit) => {
      acc[audit.category] = (acc[audit.category] || 0) + 1;
      return acc;
    }, {} as Record<AuditCategory, number>)
  ).map(([category, count]) => ({
    name: category.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '),
    value: count,
    color: categoryColors[category as AuditCategory],
  }));

  return (
    <Card className="shadow-card">
      <CardHeader>
        <CardTitle>Audit Distribution by Category</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};
