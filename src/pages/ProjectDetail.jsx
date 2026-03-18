import { useParams, useNavigate } from "react-router-dom";
import { projects } from "@/data/mockData";
import { ArrowLeft, CheckCircle2, MapPin, User, Briefcase } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
function ProjectDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const project = projects.find((p) => p.id === id);
  if (!project) {
    return <div className="flex flex-col items-center justify-center py-20 text-muted-foreground">
        <p>Project not found.</p>
        <Button variant="outline" className="mt-4" onClick={() => navigate("/projects")}>Back to Projects</Button>
      </div>;
  }
  return <div className="space-y-8 max-w-4xl">
      <Button variant="ghost" onClick={() => navigate("/projects")} className="gap-2 text-muted-foreground -ml-2">
        <ArrowLeft className="h-4 w-4" strokeWidth={1.5} /> Back
      </Button>

      <div className="bg-card rounded-2xl border shadow-soft p-6 space-y-4">
        <h1 className="text-2xl font-bold tracking-tight text-foreground">{project.name}</h1>
        <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground">
          <span className="flex items-center gap-1.5"><User className="h-4 w-4" strokeWidth={1.5} /> {project.clientName}</span>
          <span className="flex items-center gap-1.5"><MapPin className="h-4 w-4" strokeWidth={1.5} /> {project.location}</span>
          <span className="flex items-center gap-1.5"><Briefcase className="h-4 w-4" strokeWidth={1.5} /> Designer: {project.assignedDesigner}</span>
        </div>
        <Badge variant="outline" className={project.status === "Completed" ? "bg-success/10 text-success border-success/20" : project.status === "In Progress" ? "bg-warning/10 text-warning border-warning/20" : "bg-destructive/10 text-destructive border-destructive/20"}>{project.status}</Badge>
      </div>

      <div className="bg-card rounded-2xl border shadow-soft p-6">
        <h2 className="text-base font-semibold text-foreground mb-6">Design Workflow</h2>

        <div className="space-y-0 relative before:absolute before:left-[17px] before:top-2 before:bottom-2 before:w-[2px] before:bg-border">
          {project.stages.map((stage) => <div key={stage.id} className="relative pl-12 pb-10 last:pb-0 group">
              <div className={`absolute left-0 top-1 w-9 h-9 rounded-xl border-4 border-card shadow-sm flex items-center justify-center z-10 
                ${stage.status === "completed" ? "bg-success" : stage.status === "in-progress" ? "bg-warning animate-pulse" : "bg-muted"}`}>
                {stage.status === "completed" && <CheckCircle2 className="w-4 h-4 text-success-foreground" strokeWidth={1.5} />}
              </div>

              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-3">
                  <h4 className="font-semibold text-foreground">{stage.name}</h4>
                  <span className="text-xs font-mono text-muted-foreground uppercase tracking-wider">{stage.date}</span>
                </div>
                {stage.note && <p className="text-sm text-muted-foreground bg-muted p-3 rounded-lg border mt-2 italic">
                    "{stage.note}"
                  </p>}
              </div>
            </div>)}
        </div>
      </div>
    </div>;
}
export {
  ProjectDetail as default
};
