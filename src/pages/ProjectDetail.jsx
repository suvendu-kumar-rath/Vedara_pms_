import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, MapPin, User, CheckCircle2, Clock, AlertCircle, MessageSquare, Upload, X } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { projects } from "@/data/mockData";
import { useState } from "react";

const statusConfig = {
  completed: { icon: CheckCircle2, label: "Completed", color: "text-success", bg: "bg-success", ring: "ring-success/20" },
  "in-progress": { icon: Clock, label: "In Progress", color: "text-warning", bg: "bg-warning", ring: "ring-warning/20" },
  pending: { icon: AlertCircle, label: "Pending", color: "text-destructive", bg: "bg-destructive", ring: "ring-destructive/20" },
};

export default function ProjectDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const project = projects.find((p) => p.id === id);
  const [stages, setStages] = useState(project?.stages || []);
  const [uploadedFiles, setUploadedFiles] = useState({});

  const handleStatusChange = (stageId, newStatus) => {
    setStages(prevStages =>
      prevStages.map(stage =>
        stage.id === stageId ? { ...stage, status: newStatus } : stage
      )
    );
  };

  const handleFileUpload = (stageId, event) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      setUploadedFiles(prev => ({
        ...prev,
        [stageId]: [...(prev[stageId] || []), ...Array.from(files)]
      }));
    }
  };

  const removeFile = (stageId, fileIndex) => {
    setUploadedFiles(prev => ({
      ...prev,
      [stageId]: prev[stageId].filter((_, idx) => idx !== fileIndex)
    }));
  };

  if (!project) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-muted-foreground">Project not found.</p>
      </div>
    );
  }

  const completedCount = stages.filter((s) => s.status === "completed").length;
  const progress = Math.round((completedCount / stages.length) * 100);

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
            {completedCount} of {stages.length} stages completed
          </p>
        </CardContent>
      </Card>

      <Card className="shadow-card border-0">
        <CardHeader className="pb-2">
          <CardTitle className="text-base font-semibold">Design Workflow</CardTitle>
        </CardHeader>
        <CardContent className="pb-6">
          <div className="relative">
            {stages.map((stage, idx) => {
              const config = statusConfig[stage.status];
              const Icon = config.icon;
              const isLast = idx === stages.length - 1;

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
                    <div className="flex items-center justify-between flex-wrap gap-2 mb-2">
                      <h3 className="font-semibold text-foreground text-sm">{stage.name}</h3>
                      <select
                        value={stage.status}
                        onChange={(e) => handleStatusChange(stage.id, e.target.value)}
                        className="px-3 py-1 rounded border border-border bg-card text-card-foreground text-xs font-medium hover:border-primary/50 focus:outline-none focus:ring-1 focus:ring-primary cursor-pointer"
                      >
                        <option value="pending">Pending</option>
                        <option value="in-progress">In Progress</option>
                        <option value="completed">Completed</option>
                      </select>
                    </div>
                    <p className="text-xs text-muted-foreground mb-3">Updated: {stage.date}</p>
                    
                    {stage.note && (
                      <div className="flex items-start gap-1.5 mb-3 text-xs text-muted-foreground bg-muted/50 rounded-md px-3 py-2">
                        <MessageSquare className="h-3 w-3 mt-0.5 shrink-0" />
                        <span>{stage.note}</span>
                      </div>
                    )}

                    {/* Upload Section */}
                    <div className="mt-4 p-3 bg-muted/30 rounded-md border border-dashed border-border">
                      <div className="flex items-center gap-2 mb-2">
                        <Upload className="h-4 w-4 text-muted-foreground" />
                        <label className="text-xs font-medium text-foreground cursor-pointer hover:text-primary transition">
                          Upload Files
                          <input
                            type="file"
                            multiple
                            onChange={(e) => handleFileUpload(stage.id, e)}
                            className="hidden"
                          />
                        </label>
                      </div>
                      
                      {/* Uploaded Files List */}
                      {uploadedFiles[stage.id] && uploadedFiles[stage.id].length > 0 && (
                        <div className="mt-2 space-y-1">
                          {uploadedFiles[stage.id].map((file, idx) => (
                            <div key={idx} className="flex items-center justify-between bg-card/50 p-2 rounded text-xs">
                              <span className="text-muted-foreground truncate">{file.name}</span>
                              <button
                                onClick={() => removeFile(stage.id, idx)}
                                className="text-destructive hover:text-destructive/80 transition"
                              >
                                <X className="h-3 w-3" />
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                      
                      {(!uploadedFiles[stage.id] || uploadedFiles[stage.id].length === 0) && (
                        <p className="text-xs text-muted-foreground">No files uploaded yet</p>
                      )}
                    </div>
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
