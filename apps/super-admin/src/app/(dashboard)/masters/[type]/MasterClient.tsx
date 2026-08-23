"use client";

import React, { useState } from "react";
import { IMasterEntity } from "@commercex/types/src/masters.types";
import { MASTER_CONFIGS } from "@commercex/types/src/master.config";
import { MasterDataTable } from "@/components/masters/MasterDataTable";
import { MasterFormDialog } from "@/components/masters/MasterFormDialog";
import { MasterDeleteDialog } from "@/components/masters/MasterDeleteDialog";
import { createMasterAction, updateMasterAction, deleteMasterAction, checkDependenciesAction } from "@/actions/master.actions";

export function MasterClient({ typeSlug, initialData }: { typeSlug: string, initialData: any[] }) {
  const config = MASTER_CONFIGS[typeSlug];

  const [data, setData] = useState<any[]>(initialData);
  const [formOpen, setFormOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<IMasterEntity | null>(null);

  if (!config) return <div>Invalid Master Type</div>;

  const handleAdd = () => {
    setSelectedItem(null);
    setFormOpen(true);
  };

  const handleEdit = (item: any) => {
    // Augment virtual cascading fields from included nested objects
    const augmentedItem = { ...item };
    
    if (typeSlug === 'states' && item.country) {
      augmentedItem.continentId = item.country.continentId;
    }
    
    if (typeSlug === 'cities') {
      if (item.country) {
        augmentedItem.continentId = item.country.continentId;
      }
      if (item.state && item.state.country) {
        augmentedItem.continentId = item.state.country.continentId;
        // If countryId was missing on city but present on state
        if (!augmentedItem.countryId) {
          augmentedItem.countryId = item.state.countryId;
        }
      }
    }
    
    setSelectedItem(augmentedItem);
    setFormOpen(true);
  };

  const handleDeleteRequest = (item: any) => {
    setSelectedItem(item);
    setDeleteOpen(true);
  };

  const handleToggleStatus = async (item: any) => {
    const newStatus = item.status === "ACTIVE" ? "INACTIVE" : "ACTIVE";
    // Optimistic UI update
    setData(data.map(d => d.id === item.id ? { ...d, status: newStatus } : d));
    try {
      await updateMasterAction(typeSlug, item.id, { status: newStatus });
    } catch (e) {
      // Revert on error
      setData(data.map(d => d.id === item.id ? item : d));
    }
  };

  const handleSave = async (formData: any) => {
    // Generate a quick slug if not provided but name exists
    if (!formData.slug && formData.name) {
      formData.slug = formData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    }

    if (selectedItem) {
      const updated = await updateMasterAction(typeSlug, selectedItem.id, formData);
      setData(data.map(d => d.id === selectedItem.id ? updated : d));
    } else {
      const created = await createMasterAction(typeSlug, formData);
      setData([...data, created]);
    }
  };

  const handleConfirmDelete = async (item: any, forceDeactivate: boolean) => {
    await deleteMasterAction(typeSlug, item.id, forceDeactivate);
    if (forceDeactivate) {
      setData(data.map(d => d.id === item.id ? { ...d, status: "INACTIVE" } : d));
    } else {
      setData(data.filter(d => d.id !== item.id));
    }
  };

  const handleCheckDependencies = async (item: any) => {
    return await checkDependenciesAction(typeSlug, item.id);
  };

  return (
    <>
      <MasterDataTable
        title={config.displayName}
        description={`Manage ${config.displayName.toLowerCase()} for the platform.`}
        data={data}
        columns={config?.fields?.filter(f => !f.virtual && f.name !== 'status' && f.name !== 'isActive').map(f => ({ 
          key: f.name as string, 
          label: f.label,
          render: f.type === 'reference' ? (item: any) => {
            const relationName = f.name.replace(/Id$/, '');
            return item[relationName] ? item[relationName].name : item[f.name as string];
          } : undefined
        })) || []}
        onAdd={handleAdd}
        onEdit={handleEdit}
        onDelete={handleDeleteRequest}
        onToggleStatus={handleToggleStatus}
      />

      <MasterFormDialog
        open={formOpen}
        onOpenChange={setFormOpen}
        title={config.displayName}
        initialData={selectedItem}
        fields={config.fields}
        onSave={handleSave}
      />

      <MasterDeleteDialog
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        item={selectedItem}
        onConfirm={handleConfirmDelete}
        checkDependencies={(config.dependencies?.length ?? 0) > 0 ? handleCheckDependencies : undefined}
      />
    </>
  );
}
