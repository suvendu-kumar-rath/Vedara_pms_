import { useState, useMemo } from "react";
import { activityLogs } from "@/data/mockData";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
function ActivityLogs() {
  const [userFilter, setUserFilter] = useState("all");
  const [projectFilter, setProjectFilter] = useState("all");
  const uniqueUsers = useMemo(() => [...new Set(activityLogs.map((l) => l.user))], []);
  const uniqueProjects = useMemo(() => [...new Set(activityLogs.map((l) => l.project))], []);
  const filtered = activityLogs.filter(
    (l) => (userFilter === "all" || l.user === userFilter) && (projectFilter === "all" || l.project === projectFilter)
  );
  return <div className="space-y-6 max-w-7xl">
      <h1 className="text-2xl font-bold tracking-tight text-foreground">Activity Logs</h1>

      <div className="flex flex-wrap gap-3">
        <Select value={userFilter} onValueChange={setUserFilter}>
          <SelectTrigger className="w-[200px]"><SelectValue placeholder="Filter by user" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Users</SelectItem>
            {uniqueUsers.map((u) => <SelectItem key={u} value={u}>{u}</SelectItem>)}
          </SelectContent>
        </Select>
        <Select value={projectFilter} onValueChange={setProjectFilter}>
          <SelectTrigger className="w-[240px]"><SelectValue placeholder="Filter by project" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Projects</SelectItem>
            {uniqueProjects.map((p) => <SelectItem key={p} value={p}>{p}</SelectItem>)}
          </SelectContent>
        </Select>
      </div>

      <div className="bg-card rounded-2xl border shadow-soft overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-muted/40">
                {["User", "Action", "Project", "Time"].map((h) => <th key={h} className="text-left px-5 py-3 font-medium text-muted-foreground">{h}</th>)}
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? <tr><td colSpan={4} className="px-5 py-10 text-center text-muted-foreground">No activity matching filters.</td></tr> : filtered.map((log) => <tr key={log.id} className="border-b last:border-0 transition-colors hover:bg-muted/30">
                  <td className="px-5 py-3.5 font-medium text-foreground">{log.user}</td>
                  <td className="px-5 py-3.5 text-muted-foreground">{log.action}</td>
                  <td className="px-5 py-3.5"><Badge variant="secondary" className="font-normal">{log.project}</Badge></td>
                  <td className="px-5 py-3.5 text-muted-foreground text-xs font-mono">{log.time}</td>
                </tr>)}
            </tbody>
          </table>
        </div>
      </div>
    </div>;
}
export {
  ActivityLogs as default
};
