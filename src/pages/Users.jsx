import { useState } from "react";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { users as initialUsers } from "@/data/mockData";

export default function Users() {
  const [userList, setUserList] = useState(initialUsers);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editUser, setEditUser] = useState(null);
  const [form, setForm] = useState({ name: "", email: "", password: "", role: "Designer", status: "Active" });

  const openAdd = () => {
    setEditUser(null);
    setForm({ name: "", email: "", password: "", role: "Designer", status: "Active" });
    setDialogOpen(true);
  };

  const openEdit = (user) => {
    setEditUser(user);
    setForm({ ...user, password: "" });
    setDialogOpen(true);
  };

  const handleSave = () => {
    if (!form.name || !form.email) return;
    if (editUser) {
      setUserList((prev) => prev.map((u) => (u.id === editUser.id ? { ...u, ...form } : u)));
    } else {
      setUserList((prev) => [...prev, { ...form, id: String(Date.now()) }]);
    }
    setDialogOpen(false);
  };

  const handleDelete = (id) => {
    setUserList((prev) => prev.filter((u) => u.id !== id));
  };

  const roleBadge = (role) => {
    const styles = {
      Admin: "bg-primary/10 text-primary",
      Designer: "bg-info/10 text-info",
      Operation: "bg-warning/10 text-warning",
    };
    return <Badge className={`${styles[role] || ""} border-0 font-medium`}>{role}</Badge>;
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Users</h1>
          <p className="text-sm text-muted-foreground mt-1">Manage system users and roles</p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={openAdd} className="gap-2">
              <Plus className="h-4 w-4" /> Add User
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>{editUser ? "Edit User" : "Add New User"}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 pt-2">
              <div className="space-y-2">
                <Label>Name</Label>
                <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Full name" />
              </div>
              <div className="space-y-2">
                <Label>Email</Label>
                <Input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="email@example.com" />
              </div>
              <div className="space-y-2">
                <Label>Password</Label>
                <Input type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} placeholder={editUser ? "Leave blank to keep" : "Password"} />
              </div>
              <div className="space-y-2">
                <Label>Role</Label>
                <Select value={form.role} onValueChange={(val) => setForm({ ...form, role: val })}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Admin">Admin</SelectItem>
                    <SelectItem value="Designer">Designer</SelectItem>
                    <SelectItem value="Operation">Operation</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center justify-between">
                <Label>Active</Label>
                <Switch
                  checked={form.status === "Active"}
                  onCheckedChange={(val) => setForm({ ...form, status: val ? "Active" : "Inactive" })}
                />
              </div>
              <Button className="w-full" onClick={handleSave}>
                {editUser ? "Update User" : "Create User"}
              </Button>
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
                  <th className="text-left py-3 px-5 font-medium text-muted-foreground">Name</th>
                  <th className="text-left py-3 px-5 font-medium text-muted-foreground">Email</th>
                  <th className="text-left py-3 px-5 font-medium text-muted-foreground">Role</th>
                  <th className="text-left py-3 px-5 font-medium text-muted-foreground">Status</th>
                  <th className="text-right py-3 px-5 font-medium text-muted-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {userList.map((user) => (
                  <tr key={user.id} className="border-b last:border-0 hover:bg-muted/30 transition-colors">
                    <td className="py-3.5 px-5 font-medium text-foreground">{user.name}</td>
                    <td className="py-3.5 px-5 text-muted-foreground">{user.email}</td>
                    <td className="py-3.5 px-5">{roleBadge(user.role)}</td>
                    <td className="py-3.5 px-5">
                      <Badge
                        variant="outline"
                        className={
                          user.status === "Active"
                            ? "border-success/30 text-success bg-success/5"
                            : "border-muted-foreground/30 text-muted-foreground bg-muted/50"
                        }
                      >
                        {user.status}
                      </Badge>
                    </td>
                    <td className="py-3.5 px-5 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-primary" onClick={() => openEdit(user)}>
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-destructive" onClick={() => handleDelete(user.id)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
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
