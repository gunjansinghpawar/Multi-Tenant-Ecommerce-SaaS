"use client";

import React, { useState } from "react";
import { 
  PageHeader, 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle,
  CardDescription,
  Button
} from "@commercex/ui";
import { SaveIcon, ShieldCheckIcon } from "lucide-react";

const modules = [
  "Orders", "Products", "Customers", "Marketing", "Analytics", "Settings", "Staff"
];
const actions = ["View", "Create", "Edit", "Delete"];

export default function PermissionsPage() {
  const [selectedRole, setSelectedRole] = useState("Store Manager");
  
  // Mock state for checkboxes
  const [permissions, setPermissions] = useState<Record<string, Record<string, boolean>>>({
    "Orders": { "View": true, "Create": true, "Edit": true, "Delete": false },
    "Products": { "View": true, "Create": true, "Edit": true, "Delete": false },
    "Customers": { "View": true, "Create": true, "Edit": true, "Delete": false },
    "Marketing": { "View": true, "Create": false, "Edit": false, "Delete": false },
    "Analytics": { "View": true, "Create": false, "Edit": false, "Delete": false },
    "Settings": { "View": false, "Create": false, "Edit": false, "Delete": false },
    "Staff": { "View": false, "Create": false, "Edit": false, "Delete": false },
  });

  const togglePermission = (mod: string, act: string) => {
    setPermissions(prev => ({
      ...prev,
      [mod]: {
        ...prev[mod],
        [act]: !prev[mod][act]
      }
    }));
  };

  const handleSave = () => {
    alert(`Permissions saved for ${selectedRole}`);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <PageHeader 
          heading="Permissions Matrix" 
          text="Configure granular access rights for each role across all platform modules."
        />
        <Button onClick={handleSave}>
          <SaveIcon className="mr-2 h-4 w-4" /> Save Changes
        </Button>
      </div>

      <div className="flex space-x-2 mb-6 overflow-x-auto pb-2">
        {["Super Admin", "Store Manager", "Support Agent", "Marketing Lead", "Fulfillment Staff"].map(role => (
          <Button 
            key={role} 
            variant={selectedRole === role ? "default" : "outline"}
            onClick={() => setSelectedRole(role)}
            className="whitespace-nowrap"
          >
            {role}
          </Button>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <ShieldCheckIcon className="mr-2 h-5 w-5 text-primary" />
            Editing Permissions: {selectedRole}
          </CardTitle>
          <CardDescription>Changes apply immediately to all users assigned this role.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="border rounded-md overflow-hidden">
            <table className="w-full text-sm text-left">
              <thead className="bg-muted/50 border-b">
                <tr>
                  <th className="px-6 py-4 font-semibold text-muted-foreground w-1/3">Module / Resource</th>
                  {actions.map(act => (
                    <th key={act} className="px-6 py-4 font-semibold text-muted-foreground text-center">{act}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y">
                {modules.map(mod => (
                  <tr key={mod} className="hover:bg-muted/30 transition-colors">
                    <td className="px-6 py-4 font-medium">{mod}</td>
                    {actions.map(act => {
                      const isChecked = permissions[mod]?.[act] || false;
                      const isDisabled = selectedRole === "Super Admin"; // Super Admin can't be edited
                      return (
                        <td key={act} className="px-6 py-4 text-center">
                          <input 
                            type="checkbox" 
                            className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary disabled:opacity-50"
                            checked={selectedRole === "Super Admin" ? true : isChecked}
                            disabled={isDisabled}
                            onChange={() => togglePermission(mod, act)}
                          />
                        </td>
                      );
                    })}
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
