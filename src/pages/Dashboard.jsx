import { Users, Palette, FolderKanban, CheckCircle2, Clock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { users, projects, activityLogs } from "@/data/mockData";

const stats = [
  {
    label: "Total Users",
    value: users.length,
    icon: Users,
    color: "text-primary",
    bg: "bg-primary/10",
  },
  {
    label: "Total Designers",
    value: users.filter((u) => u.role === "Designer").length,
    icon: Palette,
    color: "text-info",
    bg: "bg-info/10",
  },
  {
    label: "Total Projects",
    value: projects.length,
    icon: FolderKanban,
    color: "text-warning",
    bg: "bg-warning/10",
  },
  {
    label: "Completed",
    value: projects.filter((p) => p.status === "Completed").length,
    icon: CheckCircle2,
    color: "text-success",
    bg: "bg-success/10",
  },
  {
    label: "Pending Stages",
    value: projects.reduce(
      (sum, p) => sum + p.stages.filter((s) => s.status === "pending").length,
      0
    ),
    icon: Clock,
    color: "text-destructive",
    bg: "bg-destructive/10",
  },
];

export default function Dashboard() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Overview of your interior design projects
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {stats.map((s) => (
          <Card key={s.label} className="shadow-card border-0 hover:shadow-soft transition-shadow">
            <CardContent className="p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    {s.label}
                  </p>
                  <p className="text-2xl font-bold text-foreground mt-1">{s.value}</p>
                </div>
                <div className={`h-10 w-10 rounded-lg ${s.bg} flex items-center justify-center`}>
                  <s.icon className={`h-5 w-5 ${s.color}`} strokeWidth={1.8} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="shadow-card border-0">
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-semibold">Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">User</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Action</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Project</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Time</th>
                </tr>
              </thead>
              <tbody>
                {activityLogs.slice(0, 5).map((log) => (
                  <tr key={log.id} className="border-b last:border-0 hover:bg-muted/40 transition-colors">
                    <td className="py-3 px-4 font-medium text-foreground">{log.user}</td>
                    <td className="py-3 px-4 text-muted-foreground">{log.action}</td>
                    <td className="py-3 px-4">
                      <Badge variant="secondary" className="font-normal">{log.project}</Badge>
                    </td>
                    <td className="py-3 px-4 text-muted-foreground text-xs">{log.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
