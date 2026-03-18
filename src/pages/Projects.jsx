import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, Eye } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { projects as initialProjects, users, defaultStages } from "@/data/mockData";

const designers = users.filter((u) => u.role === "Designer");

const statusStyles = {
  "In Progress": "bg-info/10 text-info border-info/20",
  Completed: "bg-success/10 text-success border-success/20",
  "On Hold": "bg-warning/10 text-warning border-warning/20",
};

export default function Projects() {
  const navigate = useNavigate();
  const [projectList, setProjectList] = useState(initialProjects);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [form, setForm] = useState({ name: "", clientName: "", location: "", assignedDesigner: "" });

  const handleCreate = () => {
    if (!form.name || !form.clientName) return;
    const newProject = {
      ...form,
      id: String(Date.now()),
      status: "In Progress",
      stages: defaultStages.map((s) => ({ ...s, status: "pending", date: "—", note: "" })),
    };
    setProjectList((prev) => [...prev, newProject]);
    setDialogOpen(false);
    setForm({ name: "", clientName: "", location: "", assignedDesigner: "" });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Projects</h1>
          <p className="text-sm text-muted-foreground mt-1">All interior design projects</p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" /> Create Project
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Create New Project</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 pt-2">
              <div className="space-y-2">
                <Label>Project Name</Label>
                <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="e.g. Luxury Villa — Bandra" />
              </div>
              <div className="space-y-2">
                <Label>Client Name</Label>
                <Input value={form.clientName} onChange={(e) => setForm({ ...form, clientName: e.target.value })} placeholder="Client full name" />
              </div>
              <div className="space-y-2">
                <Label>Location</Label>
                <Input value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} placeholder="City, Area" />
              </div>
              <div className="space-y-2">
                <Label>Assign Designer</Label>
                <Select value={form.assignedDesigner} onValueChange={(val) => setForm({ ...form, assignedDesigner: val })}>
                  <SelectTrigger><SelectValue placeholder="Select designer" /></SelectTrigger>
                  <SelectContent>
                    {designers.map((d) => (
                      <SelectItem key={d.id} value={d.name.split(" ").pop()}>
                        {d.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <Button className="w-full" onClick={handleCreate}>Create Project</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Card className="shadow-card border-0">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-muted/30">
                  <th className="text-left py-3 px-5 font-medium text-muted-foreground">Project Name</th>
                  <th className="text-left py-3 px-5 font-medium text-muted-foreground">Client</th>
                  <th className="text-left py-3 px-5 font-medium text-muted-foreground hidden md:table-cell">Location</th>
                  <th className="text-left py-3 px-5 font-medium text-muted-foreground">Designer</th>
                  <th className="text-left py-3 px-5 font-medium text-muted-foreground">Status</th>
                  <th className="text-right py-3 px-5 font-medium text-muted-foreground">Action</th>
                </tr>
              </thead>
              <tbody>
                {projectList.map((project) => (
                  <tr key={project.id} className="border-b last:border-0 hover:bg-muted/30 transition-colors">
                    <td className="py-3.5 px-5 font-medium text-foreground">{project.name}</td>
                    <td className="py-3.5 px-5 text-muted-foreground">{project.clientName}</td>
                    <td className="py-3.5 px-5 text-muted-foreground hidden md:table-cell">{project.location}</td>
                    <td className="py-3.5 px-5 text-foreground">{project.assignedDesigner}</td>
                    <td className="py-3.5 px-5">
                      <Badge variant="outline" className={statusStyles[project.status] || ""}>
                        {project.status}
                      </Badge>
                    </td>
                    <td className="py-3.5 px-5 text-right">
                      <Button variant="ghost" size="sm" className="gap-1.5 text-primary hover:text-primary" onClick={() => navigate(`/projects/${project.id}`)}>
                        <Eye className="h-4 w-4" /> View
                      </Button>
                    </td>
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
