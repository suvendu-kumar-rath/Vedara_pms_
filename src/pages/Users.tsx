import { useState } from "react";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { users as initialUsers, User } from "@/data/mockData";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";

export default function Users() {
  const [userList, setUserList] = useState<User[]>(initialUsers);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<User | null>(null);
  const [form, setForm] = useState({ name: "", email: "", password: "", role: "Designer" as User["role"], status: "Active" as User["status"] });

  const openNew = () => { setEditing(null); setForm({ name: "", email: "", password: "", role: "Designer", status: "Active" }); setOpen(true); };
  const openEdit = (u: User) => { setEditing(u); setForm({ name: u.name, email: u.email, password: "", role: u.role, status: u.status }); setOpen(true); };

  const save = () => {
    if (editing) {
      setUserList(prev => prev.map(u => u.id === editing.id ? { ...u, ...form } : u));
    } else {
      setUserList(prev => [...prev, { id: Date.now().toString(), ...form }]);
    }
    setOpen(false);
  };

  const remove = (id: string) => setUserList(prev => prev.filter(u => u.id !== id));

  return (
    <div className="space-y-6 max-w-7xl">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight text-foreground">Users</h1>
        <Button onClick={openNew} className="gap-2">
          <Plus className="h-4 w-4" strokeWidth={1.5} /> Add User
        </Button>
      </div>

      <div className="bg-card rounded-2xl border shadow-soft overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-muted/40">
                {["Name", "Email", "Role", "Status", "Actions"].map(h => (
                  <th key={h} className="text-left px-5 py-3 font-medium text-muted-foreground">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {userList.map(u => (
                <tr key={u.id} className="border-b last:border-0 transition-colors hover:bg-muted/30">
                  <td className="px-5 py-3.5 font-medium text-foreground">{u.name}</td>
                  <td className="px-5 py-3.5 text-muted-foreground">{u.email}</td>
                  <td className="px-5 py-3.5">
                    <Badge variant="secondary">{u.role}</Badge>
                  </td>
                  <td className="px-5 py-3.5">
                    <Badge className={u.status === "Active" ? "bg-success/10 text-success border-success/20" : "bg-destructive/10 text-destructive border-destructive/20"} variant="outline">
                      {u.status}
                    </Badge>
                  </td>
                  <td className="px-5 py-3.5 flex gap-1">
                    <Button variant="ghost" size="icon" onClick={() => openEdit(u)} className="text-muted-foreground hover:text-primary">
                      <Pencil className="h-4 w-4" strokeWidth={1.5} />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => remove(u.id)} className="text-muted-foreground hover:text-destructive">
                      <Trash2 className="h-4 w-4" strokeWidth={1.5} />
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
          <DialogHeader>
            <DialogTitle>{editing ? "Edit User" : "Add User"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-1.5">
              <Label>Name</Label>
              <Input value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
            </div>
            <div className="space-y-1.5">
              <Label>Email</Label>
              <Input type="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} />
            </div>
            <div className="space-y-1.5">
              <Label>Password</Label>
              <Input type="password" value={form.password} onChange={e => setForm(f => ({ ...f, password: e.target.value }))} placeholder={editing ? "Leave blank to keep current" : ""} />
            </div>
            <div className="space-y-1.5">
              <Label>Role</Label>
              <Select value={form.role} onValueChange={(v) => setForm(f => ({ ...f, role: v as User["role"] }))}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="Admin">Admin</SelectItem>
                  <SelectItem value="Designer">Designer</SelectItem>
                  <SelectItem value="Operation">Operation</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center gap-3">
              <Label>Active</Label>
              <Switch checked={form.status === "Active"} onCheckedChange={(c) => setForm(f => ({ ...f, status: c ? "Active" : "Inactive" }))} />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
            <Button onClick={save}>{editing ? "Save Changes" : "Add User"}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
