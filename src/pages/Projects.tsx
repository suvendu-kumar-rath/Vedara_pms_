import { useState } from "react";
import { Plus, Eye } from "lucide-react";
import { projects as initialProjects, users, Project } from "@/data/mockData";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useNavigate } from "react-router-dom";
import { defaultStages } from "@/data/mockData";

const statusColor: Record<string, string> = {
  "In Progress": "bg-warning/10 text-warning border-warning/20",
  "Completed": "bg-success/10 text-success border-success/20",
  "On Hold": "bg-destructive/10 text-destructive border-destructive/20",
};

export default function Projects() {
  const navigate = useNavigate();
  const [projectList, setProjectList] = useState<Project[]>(initialProjects);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ name: "", clientName: "", location: "", assignedDesigner: "" });

  const designers = users.filter(u => u.role === "Designer");

  const create = () => {
    setProjectList(prev => [...prev, {
      id: Date.now().toString(),
      ...form,
      status: "In Progress",
      stages: defaultStages.map(s => ({ ...s, status: "pending" as const, date: "-", note: "" })),
    }]);
    setOpen(false);
    setForm({ name: "", clientName: "", location: "", assignedDesigner: "" });
  };

  return (
    <div className="space-y-6 max-w-7xl">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight text-foreground">Projects</h1>
        <Button onClick={() => { setForm({ name: "", clientName: "", location: "", assignedDesigner: "" }); setOpen(true); }} className="gap-2">
          <Plus className="h-4 w-4" strokeWidth={1.5} /> Create Project
        </Button>
      </div>

      <div className="bg-card rounded-2xl border shadow-soft overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-muted/40">
                {["Project Name", "Client", "Location", "Designer", "Status", "Action"].map(h => (
                  <th key={h} className="text-left px-5 py-3 font-medium text-muted-foreground">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {projectList.map(p => (
                <tr key={p.id} className="border-b last:border-0 transition-colors hover:bg-muted/30">
                  <td className="px-5 py-3.5 font-medium text-foreground">{p.name}</td>
                  <td className="px-5 py-3.5 text-muted-foreground">{p.clientName}</td>
                  <td className="px-5 py-3.5 text-muted-foreground">{p.location}</td>
                  <td className="px-5 py-3.5 text-muted-foreground">{p.assignedDesigner}</td>
                  <td className="px-5 py-3.5">
                    <Badge variant="outline" className={statusColor[p.status]}>{p.status}</Badge>
                  </td>
                  <td className="px-5 py-3.5">
                    <Button variant="ghost" size="icon" onClick={() => navigate(`/projects/${p.id}`)} className="text-muted-foreground hover:text-primary">
                      <Eye className="h-4 w-4" strokeWidth={1.5} />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader><DialogTitle>Create Project</DialogTitle></DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-1.5"><Label>Project Name</Label><Input value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} /></div>
            <div className="space-y-1.5"><Label>Client Name</Label><Input value={form.clientName} onChange={e => setForm(f => ({ ...f, clientName: e.target.value }))} /></div>
            <div className="space-y-1.5"><Label>Location</Label><Input value={form.location} onChange={e => setForm(f => ({ ...f, location: e.target.value }))} /></div>
            <div className="space-y-1.5">
              <Label>Assign Designer</Label>
              <Select value={form.assignedDesigner} onValueChange={v => setForm(f => ({ ...f, assignedDesigner: v }))}>
                <SelectTrigger><SelectValue placeholder="Select designer" /></SelectTrigger>
                <SelectContent>
                  {designers.map(d => <SelectItem key={d.id} value={d.name}>{d.name}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
            <Button onClick={create}>Create</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
