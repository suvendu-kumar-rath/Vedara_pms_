export interface User {
  id: string;
  name: string;
  email: string;
  role: "Admin" | "Designer" | "Operation";
  status: "Active" | "Inactive";
}

export interface Project {
  id: string;
  name: string;
  clientName: string;
  location: string;
  assignedDesigner: string;
  status: "In Progress" | "Completed" | "On Hold";
  stages: Stage[];
}

export interface Stage {
  id: number;
  name: string;
  status: "completed" | "in-progress" | "pending";
  date: string;
  note: string;
}

export interface ActivityLog {
  id: string;
  user: string;
  action: string;
  project: string;
  time: string;
}

export const users: User[] = [
  { id: "1", name: "Admin Priya", email: "priya@atelier.io", role: "Admin", status: "Active" },
  { id: "2", name: "Designer Rahul", email: "rahul@atelier.io", role: "Designer", status: "Active" },
  { id: "3", name: "Designer Ananya", email: "ananya@atelier.io", role: "Designer", status: "Active" },
  { id: "4", name: "Ops Manager Vikram", email: "vikram@atelier.io", role: "Operation", status: "Active" },
  { id: "5", name: "Designer Meera", email: "meera@atelier.io", role: "Designer", status: "Inactive" },
  { id: "6", name: "Ops Coordinator Arjun", email: "arjun@atelier.io", role: "Operation", status: "Active" },
];

export const defaultStages: Stage[] = [
  { id: 1, name: "Site Survey Report", status: "completed", date: "Oct 12", note: "Measurements verified." },
  { id: 2, name: "Theme Idea", status: "completed", date: "Oct 14", note: "Modern Scandinavian selected." },
  { id: 3, name: "Furniture Layout", status: "in-progress", date: "Oct 18", note: "Awaiting client feedback on sofa placement." },
  { id: 4, name: "Outline", status: "pending", date: "-", note: "" },
  { id: 5, name: "2D Design", status: "pending", date: "-", note: "" },
  { id: 6, name: "3D Design", status: "pending", date: "-", note: "" },
  { id: 7, name: "P2P Transfer to Operation", status: "pending", date: "-", note: "" },
];

export const projects: Project[] = [
  { id: "1", name: "Luxury Villa — Bandra", clientName: "Mr. Kapoor", location: "Mumbai, Bandra West", assignedDesigner: "Rahul", status: "In Progress", stages: defaultStages },
  { id: "2", name: "Modern Apartment — Koramangala", clientName: "Ms. Sharma", location: "Bangalore, Koramangala", assignedDesigner: "Ananya", status: "In Progress", stages: [
    { id: 1, name: "Site Survey Report", status: "completed", date: "Sep 20", note: "All done." },
    { id: 2, name: "Theme Idea", status: "completed", date: "Sep 25", note: "Industrial loft theme." },
    { id: 3, name: "Furniture Layout", status: "completed", date: "Oct 2", note: "Approved by client." },
    { id: 4, name: "Outline", status: "completed", date: "Oct 8", note: "Finalized." },
    { id: 5, name: "2D Design", status: "in-progress", date: "Oct 14", note: "Kitchen layout pending." },
    { id: 6, name: "3D Design", status: "pending", date: "-", note: "" },
    { id: 7, name: "P2P Transfer to Operation", status: "pending", date: "-", note: "" },
  ]},
  { id: "3", name: "Penthouse — Juhu", clientName: "Mr. Mehta", location: "Mumbai, Juhu", assignedDesigner: "Rahul", status: "Completed", stages: defaultStages.map(s => ({ ...s, status: "completed" as const, date: "Sep " + (s.id + 5), note: "Completed successfully." })) },
  { id: "4", name: "Studio — Indiranagar", clientName: "Ms. Reddy", location: "Bangalore, Indiranagar", assignedDesigner: "Meera", status: "On Hold", stages: [
    { id: 1, name: "Site Survey Report", status: "completed", date: "Oct 1", note: "Done." },
    { id: 2, name: "Theme Idea", status: "pending", date: "-", note: "" },
    { id: 3, name: "Furniture Layout", status: "pending", date: "-", note: "" },
    { id: 4, name: "Outline", status: "pending", date: "-", note: "" },
    { id: 5, name: "2D Design", status: "pending", date: "-", note: "" },
    { id: 6, name: "3D Design", status: "pending", date: "-", note: "" },
    { id: 7, name: "P2P Transfer to Operation", status: "pending", date: "-", note: "" },
  ]},
];

export const activityLogs: ActivityLog[] = [
  { id: "1", user: "Designer Rahul", action: "Completed 3D Design", project: "Luxury Villa — Bandra", time: "2 hours ago" },
  { id: "2", user: "Designer Ananya", action: "Uploaded Furniture Layout", project: "Modern Apartment — Koramangala", time: "4 hours ago" },
  { id: "3", user: "Ops Manager Vikram", action: "Initiated P2P Transfer", project: "Penthouse — Juhu", time: "6 hours ago" },
  { id: "4", user: "Admin Priya", action: "Created new project", project: "Studio — Indiranagar", time: "1 day ago" },
  { id: "5", user: "Designer Rahul", action: "Updated Site Survey Report", project: "Luxury Villa — Bandra", time: "1 day ago" },
  { id: "6", user: "Designer Meera", action: "Submitted Theme Idea", project: "Studio — Indiranagar", time: "2 days ago" },
  { id: "7", user: "Ops Coordinator Arjun", action: "Verified delivery schedule", project: "Penthouse — Juhu", time: "2 days ago" },
  { id: "8", user: "Designer Ananya", action: "Completed 2D Design", project: "Modern Apartment — Koramangala", time: "3 days ago" },
];
