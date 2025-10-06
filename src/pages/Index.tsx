import { useState, useMemo } from "react";
import { mockAudits } from "@/data/mockAudits";
import { AuditCard } from "@/components/AuditCard";
import { StatsCard } from "@/components/StatsCard";
import { AuditDistributionChart } from "@/components/AuditDistributionChart";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FileText, Clock, CheckCircle2, TrendingUp, Search } from "lucide-react";
import { AuditStatus, AuditCategory } from "@/types/audit";

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<AuditStatus | "all">("all");
  const [categoryFilter, setCategoryFilter] = useState<AuditCategory | "all">("all");

  const filteredAudits = useMemo(() => {
    return mockAudits.filter((audit) => {
      const matchesSearch = audit.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          audit.auditor.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = statusFilter === "all" || audit.status === statusFilter;
      const matchesCategory = categoryFilter === "all" || audit.category === categoryFilter;
      
      return matchesSearch && matchesStatus && matchesCategory;
    });
  }, [searchQuery, statusFilter, categoryFilter]);

  const stats = {
    total: mockAudits.length,
    inProgress: mockAudits.filter((a) => a.status === "in-progress").length,
    completed: mockAudits.filter((a) => a.status === "completed").length,
    avgProgress: Math.round(mockAudits.reduce((acc, a) => acc + a.progress, 0) / mockAudits.length),
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Hero Section */}
      <header className="bg-gradient-primary text-primary-foreground py-16 px-4">
        <div className="container mx-auto max-w-7xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Codoxo Audit Scope Overview</h1>
          <p className="text-lg md:text-xl opacity-90 max-w-2xl">
            Comprehensive audit management and tracking system for compliance, security, and operational excellence.
          </p>
        </div>
      </header>

      {/* Stats Section */}
      <section className="container mx-auto max-w-7xl px-4 -mt-8 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatsCard
            title="Total Audits"
            value={stats.total}
            icon={FileText}
            trend={{ value: 12, isPositive: true }}
          />
          <StatsCard
            title="In Progress"
            value={stats.inProgress}
            icon={Clock}
          />
          <StatsCard
            title="Completed"
            value={stats.completed}
            icon={CheckCircle2}
            trend={{ value: 8, isPositive: true }}
          />
          <StatsCard
            title="Avg. Progress"
            value={`${stats.avgProgress}%`}
            icon={TrendingUp}
          />
        </div>
      </section>

      {/* Main Content */}
      <main className="container mx-auto max-w-7xl px-4 pb-16 space-y-8">
        {/* Filters Section */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold">Audit Dashboard</h2>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search audits or auditors..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={(value) => setStatusFilter(value as AuditStatus | "all")}>
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="in-progress">In Progress</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="review">Under Review</SelectItem>
              </SelectContent>
            </Select>
            <Select value={categoryFilter} onValueChange={(value) => setCategoryFilter(value as AuditCategory | "all")}>
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="compliance">Compliance</SelectItem>
                <SelectItem value="security">Security</SelectItem>
                <SelectItem value="financial">Financial</SelectItem>
                <SelectItem value="operational">Operational</SelectItem>
                <SelectItem value="technical">Technical</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <p className="text-sm text-muted-foreground">
            Showing {filteredAudits.length} of {mockAudits.length} audits
          </p>
        </section>

        {/* Chart Section */}
        <section>
          <AuditDistributionChart audits={mockAudits} />
        </section>

        {/* Audits Grid */}
        <section>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAudits.map((audit) => (
              <AuditCard key={audit.id} audit={audit} />
            ))}
          </div>
          {filteredAudits.length === 0 && (
            <div className="text-center py-16">
              <p className="text-lg text-muted-foreground">No audits found matching your filters.</p>
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default Index;
