import { Users, Palette, FolderKanban, CheckCircle2, Clock } from "lucide-react";
import { users, projects, activityLogs } from "@/data/mockData";
import { Badge } from "@/components/ui/badge";
const stats = [
  { label: "Total Users", value: users.length, icon: Users, color: "text-primary" },
  { label: "Total Designers", value: users.filter((u) => u.role === "Designer").length, icon: Palette, color: "text-violet-500" },
  { label: "Total Projects", value: projects.length, icon: FolderKanban, color: "text-primary" },
  { label: "Completed", value: projects.filter((p) => p.status === "Completed").length, icon: CheckCircle2, color: "text-success" },
  { label: "Pending Stages", value: projects.filter((p) => p.status === "In Progress").reduce((acc, p) => acc + p.stages.filter((s) => s.status === "pending").length, 0), icon: Clock, color: "text-warning" }
];
function Dashboard() {
  return <div className="space-y-8 max-w-7xl">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">Good morning, Admin.</h1>
        <p className="text-sm text-muted-foreground mt-1">
          You have {projects.filter((p) => p.status === "In Progress").length} projects requiring attention today.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {stats.map((s) => <div key={s.label} className="bg-card p-5 rounded-2xl border shadow-soft">
            <div className="flex items-center gap-2 mb-2">
              <s.icon className={`h-4 w-4 ${s.color}`} strokeWidth={1.5} />
              <p className="text-sm font-medium text-muted-foreground">{s.label}</p>
            </div>
            <h3 className="text-3xl font-bold tracking-tight text-foreground tabular-nums">{s.value}</h3>
          </div>)}
      </div>

      <div className="bg-card rounded-2xl border shadow-soft">
        <div className="p-5 border-b">
          <h2 className="text-base font-semibold text-foreground">Recent Activity</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-muted/40">
                <th className="text-left px-5 py-3 font-medium text-muted-foreground">User</th>
                <th className="text-left px-5 py-3 font-medium text-muted-foreground">Action</th>
                <th className="text-left px-5 py-3 font-medium text-muted-foreground">Project</th>
                <th className="text-left px-5 py-3 font-medium text-muted-foreground">Time</th>
              </tr>
            </thead>
            <tbody>
              {activityLogs.slice(0, 5).map((log) => <tr key={log.id} className="border-b last:border-0 transition-colors hover:bg-muted/30">
                  <td className="px-5 py-3.5 font-medium text-foreground">{log.user}</td>
                  <td className="px-5 py-3.5 text-muted-foreground">{log.action}</td>
                  <td className="px-5 py-3.5">
                    <Badge variant="secondary" className="font-normal">{log.project}</Badge>
                  </td>
                  <td className="px-5 py-3.5 text-muted-foreground text-xs font-mono">{log.time}</td>
                </tr>)}
            </tbody>
          </table>
        </div>
      </div>
    </div>;
}
export {
  Dashboard as default
};
