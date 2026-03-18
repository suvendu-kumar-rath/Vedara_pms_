import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { activityLogs } from "@/data/mockData";

export default function ActivityLogs() {
  const [filterUser, setFilterUser] = useState("all");
  const [filterProject, setFilterProject] = useState("all");

  const filtered = activityLogs.filter((log) => {
    if (filterUser !== "all" && log.user !== filterUser) return false;
    if (filterProject !== "all" && log.project !== filterProject) return false;
    return true;
  });

  const uniqueUsers = [...new Set(activityLogs.map((l) => l.user))];
  const uniqueProjects = [...new Set(activityLogs.map((l) => l.project))];

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Activity Logs</h1>
        <p className="text-sm text-muted-foreground mt-1">Track all user actions across projects</p>
      </div>

      <div className="flex flex-wrap gap-3">
        <Select value={filterUser} onValueChange={setFilterUser}>
          <SelectTrigger className="w-[200px] bg-card">
            <SelectValue placeholder="Filter by user" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Users</SelectItem>
            {uniqueUsers.map((u) => (
              <SelectItem key={u} value={u}>{u}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={filterProject} onValueChange={setFilterProject}>
          <SelectTrigger className="w-[240px] bg-card">
            <SelectValue placeholder="Filter by project" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Projects</SelectItem>
            {uniqueProjects.map((p) => (
              <SelectItem key={p} value={p}>{p}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Card className="shadow-card border-0">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-muted/30">
                  <th className="text-left py-3 px-5 font-medium text-muted-foreground">User</th>
                  <th className="text-left py-3 px-5 font-medium text-muted-foreground">Action</th>
                  <th className="text-left py-3 px-5 font-medium text-muted-foreground">Project</th>
                  <th className="text-left py-3 px-5 font-medium text-muted-foreground">Time</th>
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="py-8 text-center text-muted-foreground">
                      No activity found for the selected filters.
                    </td>
                  </tr>
                ) : (
                  filtered.map((log) => (
                    <tr key={log.id} className="border-b last:border-0 hover:bg-muted/30 transition-colors">
                      <td className="py-3.5 px-5 font-medium text-foreground">{log.user}</td>
                      <td className="py-3.5 px-5 text-muted-foreground">{log.action}</td>
                      <td className="py-3.5 px-5">
                        <Badge variant="secondary" className="font-normal">{log.project}</Badge>
                      </td>
                      <td className="py-3.5 px-5 text-muted-foreground text-xs">{log.time}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
