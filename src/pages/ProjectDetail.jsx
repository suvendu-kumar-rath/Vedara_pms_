import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, MapPin, User, CheckCircle2, Clock, AlertCircle, MessageSquare } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { projects } from "@/data/mockData";

const statusConfig = {
  completed: { icon: CheckCircle2, label: "Completed", color: "text-success", bg: "bg-success", ring: "ring-success/20" },
  "in-progress": { icon: Clock, label: "In Progress", color: "text-warning", bg: "bg-warning", ring: "ring-warning/20" },
  pending: { icon: AlertCircle, label: "Pending", color: "text-destructive", bg: "bg-destructive", ring: "ring-destructive/20" },
};

export default function ProjectDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const project = projects.find((p) => p.id === id);

  if (!project) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-muted-foreground">Project not found.</p>
      </div>
    );
  }

  const completedCount = project.stages.filter((s) => s.status === "completed").length;
  const progress = Math.round((completedCount / project.stages.length) * 100);

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-start gap-4">
        <Button variant="ghost" size="icon" onClick={() => navigate("/projects")} className="mt-0.5 shrink-0">
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-foreground">{project.name}</h1>
          <div className="flex flex-wrap items-center gap-3 mt-2 text-sm text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <User className="h-3.5 w-3.5" /> {project.clientName}
            </span>
            <span className="flex items-center gap-1.5">
              <MapPin className="h-3.5 w-3.5" /> {project.location}
            </span>
          </div>
        </div>
        <Badge variant="outline" className="shrink-0 mt-1">
          Designer: {project.assignedDesigner}
        </Badge>
      </div>

      <Card className="shadow-card border-0">
        <CardContent className="py-5 px-6">
          <div className="flex items-center justify-between mb-3">
            <p className="text-sm font-medium text-foreground">Overall Progress</p>
            <p className="text-sm font-bold text-primary">{progress}%</p>
          </div>
          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-primary rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            {completedCount} of {project.stages.length} stages completed
          </p>
        </CardContent>
      </Card>

      <Card className="shadow-card border-0">
        <CardHeader className="pb-2">
          <CardTitle className="text-base font-semibold">Design Workflow</CardTitle>
        </CardHeader>
        <CardContent className="pb-6">
          <div className="relative">
            {project.stages.map((stage, idx) => {
              const config = statusConfig[stage.status];
              const Icon = config.icon;
              const isLast = idx === project.stages.length - 1;

              return (
                <div key={stage.id} className="flex gap-4 relative">
                  <div className="flex flex-col items-center">
                    <div className={`h-9 w-9 rounded-full flex items-center justify-center ring-4 ${config.ring} ${config.bg} shrink-0`}>
                      <Icon className="h-4 w-4 text-card" strokeWidth={2.5} />
                    </div>
                    {!isLast && (
                      <div className={`w-0.5 flex-1 min-h-[40px] ${stage.status === "completed" ? "bg-success/30" : "bg-border"}`} />
                    )}
                  </div>

                  <div className={`pb-6 pt-1 flex-1 ${isLast ? "pb-0" : ""}`}>
                    <div className="flex items-center justify-between flex-wrap gap-2">
                      <h3 className="font-semibold text-foreground text-sm">{stage.name}</h3>
                      <Badge
                        variant="outline"
                        className={`text-xs border-0 ${
                          stage.status === "completed"
                            ? "bg-success/10 text-success"
                            : stage.status === "in-progress"
                            ? "bg-warning/10 text-warning"
                            : "bg-destructive/10 text-destructive"
                        }`}
                      >
                        {config.label}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">Updated: {stage.date}</p>
                    {stage.note && (
                      <div className="flex items-start gap-1.5 mt-2 text-xs text-muted-foreground bg-muted/50 rounded-md px-3 py-2">
                        <MessageSquare className="h-3 w-3 mt-0.5 shrink-0" />
                        <span>{stage.note}</span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
