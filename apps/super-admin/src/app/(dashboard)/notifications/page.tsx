"use client";

import React, { useState, useEffect, useCallback } from "react";
import {
  Card, Button, Badge, Skeleton, Switch, Label,
  Dialog, DialogContent, DialogTitle, DialogDescription,
  Input,
} from "@commercex/ui";
import {
  Settings, Mail, MessageSquare, Phone, LayoutTemplate,
  Plus, CheckCircle2, XCircle, Star, Trash2, Edit3,
  AlertCircle, ScrollText, ToggleLeft,
} from "lucide-react";
import { TemplatesManager } from "./TemplatesManager";
import {
  getProviders, upsertProvider, toggleProviderStatus,
  setPrimaryProvider, deleteProvider,
  getNotificationSettings, updateNotificationSettings,
  ProviderConfig,
} from "./actions";

// ---------------------------------------------------------------------------
// Provider channel meta
// ---------------------------------------------------------------------------

const CHANNEL_META: Record<string, { label: string; icon: React.ReactNode; color: string }> = {
  EMAIL:    { label: "Email",    icon: <Mail className="h-5 w-5" />,          color: "text-blue-500" },
  SMS:      { label: "SMS",      icon: <MessageSquare className="h-5 w-5" />, color: "text-purple-500" },
  WHATSAPP: { label: "WhatsApp", icon: <Phone className="h-5 w-5" />,         color: "text-green-500" },
};

const PROVIDER_CODES: Record<string, string[]> = {
  EMAIL:    ["RESEND", "SES", "SMTP", "SENDGRID", "MAILGUN"],
  SMS:      ["TWILIO", "MSG91", "VONAGE", "TELNYX"],
  WHATSAPP: ["META", "360DIALOG", "WABA"],
};

// ---------------------------------------------------------------------------
// Add/Edit Provider Dialog
// ---------------------------------------------------------------------------

const CREDENTIAL_FIELDS: Record<string, { label: string; key: string; secret?: boolean }[]> = {
  RESEND:    [{ label: "API Key",        key: "apiKey",      secret: true  }],
  SES:       [{ label: "Access Key ID",  key: "accessKeyId" }, { label: "Secret Access Key", key: "secretAccessKey", secret: true }, { label: "Region", key: "region" }],
  SMTP:      [{ label: "Host",           key: "host" }, { label: "Port", key: "port" }, { label: "Username", key: "user" }, { label: "Password", key: "pass", secret: true }],
  SENDGRID:  [{ label: "API Key",        key: "apiKey",      secret: true  }],
  MAILGUN:   [{ label: "API Key",        key: "apiKey",      secret: true  }, { label: "Domain", key: "domain" }],
  TWILIO:    [{ label: "Account SID",    key: "accountSid" }, { label: "Auth Token", key: "authToken", secret: true }, { label: "From Number", key: "fromNumber" }],
  MSG91:     [{ label: "Auth Key",       key: "authKey",     secret: true  }, { label: "Sender ID", key: "senderId" }],
  VONAGE:    [{ label: "API Key",        key: "apiKey" },     { label: "API Secret",  key: "apiSecret",  secret: true }],
  TELNYX:   [{ label: "API Key",        key: "apiKey",      secret: true  }],
  META:      [{ label: "Access Token",   key: "accessToken", secret: true  }, { label: "Phone Number ID", key: "phoneNumberId" }],
  "360DIALOG": [{ label: "API Key",     key: "apiKey",      secret: true  }, { label: "Namespace", key: "namespace" }],
  WABA:      [{ label: "Business Account ID", key: "wabaId" }, { label: "API Key", key: "apiKey", secret: true }],
};

interface ProviderDialogProps {
  open: boolean;
  editing: ProviderConfig | null;
  onClose: () => void;
  onSaved: () => void;
}

function ProviderDialog({ open, editing, onClose, onSaved }: ProviderDialogProps) {
  const [channel, setChannel]   = useState<"EMAIL" | "SMS" | "WHATSAPP">(editing?.channel ?? "EMAIL");
  const [code, setCode]         = useState(editing?.code ?? "RESEND");
  const [name, setName]         = useState(editing?.name ?? "");
  const [isPrimary, setIsPrimary] = useState(editing?.isPrimary ?? false);
  const [creds, setCreds]       = useState<Record<string, string>>(editing?.credentials ?? {});
  const [saving, setSaving]     = useState(false);
  const [error, setError]       = useState("");

  // Reset on open/editing change
  useEffect(() => {
    if (open) {
      setChannel(editing?.channel ?? "EMAIL");
      setCode(editing?.code ?? "RESEND");
      setName(editing?.name ?? "");
      setIsPrimary(editing?.isPrimary ?? false);
      setCreds(editing?.credentials ?? {});
      setError("");
    }
  }, [open, editing]);

  const fields = CREDENTIAL_FIELDS[code] ?? [];
  const codes  = PROVIDER_CODES[channel] ?? [];

  const handleSave = async () => {
    if (!name.trim()) { setError("Provider name is required."); return; }
    setSaving(true);
    const res = await upsertProvider({
      id:          editing?.id,
      channel,
      code,
      name:        name.trim(),
      credentials: creds,
      isPrimary,
      status:      "ACTIVE",
    });
    setSaving(false);
    if (res.success) { onSaved(); onClose(); }
    else setError(res.error ?? "Failed to save provider.");
  };

  return (
    <Dialog open={open} onOpenChange={v => !v && onClose()}>
      {/*
        flex flex-col + max-h makes the dialog a fixed-height container.
        The scrollable body sits between the sticky header and sticky footer
        so Cancel / Save are always visible regardless of credential count.
      */}
      <DialogContent className="sm:max-w-lg flex flex-col max-h-[90vh] p-0 gap-0 overflow-hidden">

        {/* ── Sticky Header ───────────────────────────────────────────── */}
        <div className="px-6 pt-6 pb-4 border-b shrink-0">
          <DialogTitle className="flex items-center gap-2 text-base font-semibold">
            <div className="rounded-full bg-primary/10 p-1.5 shrink-0">
              <Settings className="h-4 w-4 text-primary" />
            </div>
            {editing ? "Edit Provider" : "Add New Provider"}
          </DialogTitle>
          <DialogDescription className="mt-1 text-sm text-muted-foreground">
            Configure a notification provider. Credentials are encrypted at rest.
          </DialogDescription>
        </div>

        {/* ── Scrollable Body ──────────────────────────────────────────── */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4 min-h-0">

          {/* Channel selector */}
          <div className="grid grid-cols-3 gap-2">
            {(["EMAIL", "SMS", "WHATSAPP"] as const).map(ch => (
              <button
                key={ch}
                onClick={() => { setChannel(ch); setCode(PROVIDER_CODES[ch][0]); setCreds({}); }}
                disabled={!!editing}
                className={`flex flex-col items-center gap-1.5 p-3 rounded-xl border text-sm font-medium transition-all ${
                  channel === ch
                    ? "bg-primary/10 border-primary text-primary"
                    : "border-border text-muted-foreground hover:border-primary/40"
                } disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                <span className={CHANNEL_META[ch].color}>{CHANNEL_META[ch].icon}</span>
                {CHANNEL_META[ch].label}
              </button>
            ))}
          </div>

          {/* Provider code chips */}
          <div className="space-y-1.5">
            <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Provider</Label>
            <div className="flex flex-wrap gap-2">
              {codes.map(c => (
                <button
                  key={c}
                  onClick={() => { setCode(c); setCreds({}); }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                    code === c
                      ? "bg-primary text-primary-foreground border-primary"
                      : "border-border text-muted-foreground hover:border-primary/40"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          {/* Display name */}
          <div className="space-y-1.5">
            <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Display Name</Label>
            <Input placeholder={`e.g. ${code} Primary`} value={name} onChange={e => setName(e.target.value)} />
          </div>

          {/* Credentials — dynamic per provider */}
          {fields.length > 0 && (
            <div className="space-y-3">
              <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Credentials</Label>
              {fields.map(f => (
                <div key={f.key} className="space-y-1">
                  <Label className="text-xs text-muted-foreground">{f.label}</Label>
                  <Input
                    type={f.secret ? "password" : "text"}
                    placeholder={f.secret ? "••••••••" : f.label}
                    value={creds[f.key] ?? ""}
                    onChange={e => setCreds(prev => ({ ...prev, [f.key]: e.target.value }))}
                  />
                </div>
              ))}
            </div>
          )}

          {/* Set as Primary */}
          <div className="flex items-center justify-between p-3 rounded-xl border bg-muted/20">
            <div>
              <Label className="text-sm font-medium">Set as Primary</Label>
              <p className="text-xs text-muted-foreground mt-0.5">
                Primary provider is used by default for this channel.
              </p>
            </div>
            <Switch checked={isPrimary} onCheckedChange={setIsPrimary} />
          </div>

          {/* Inline error */}
          {error && (
            <div className="flex items-center gap-2 text-sm text-destructive bg-destructive/10 px-3 py-2 rounded-md">
              <AlertCircle className="h-4 w-4 shrink-0" />{error}
            </div>
          )}
        </div>

        {/* ── Sticky Footer ────────────────────────────────────────────── */}
        <div className="px-6 py-4 border-t shrink-0 flex items-center justify-end gap-3 bg-background">
          <Button variant="outline" onClick={onClose} className="min-w-[80px]">
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={saving} className="min-w-[120px]">
            {saving
              ? <span className="flex items-center gap-2">
                  <span className="h-3 w-3 border-2 border-current border-t-transparent rounded-full animate-spin" />
                  Saving…
                </span>
              : "Save Provider"}
          </Button>
        </div>

      </DialogContent>
    </Dialog>
  );
}


// ---------------------------------------------------------------------------
// Channel Settings Panel — enable/disable per channel
// ---------------------------------------------------------------------------

interface ChannelSettingsPanelProps {
  settings: { emailEnabled: boolean; smsEnabled: boolean; whatsappEnabled: boolean };
  onToggle: (channel: "email" | "sms" | "whatsapp", val: boolean) => void;
  saving: boolean;
}

function ChannelSettingsPanel({ settings, onToggle, saving }: ChannelSettingsPanelProps) {
  const channels = [
    { key: "email" as const,    label: "Email Notifications",    desc: "Send transactional and marketing emails.",                icon: <Mail className="h-4 w-4 text-blue-500" />,          enabled: settings.emailEnabled },
    { key: "sms" as const,      label: "SMS Notifications",      desc: "Send text messages via Twilio, MSG91, etc.",              icon: <MessageSquare className="h-4 w-4 text-purple-500" />, enabled: settings.smsEnabled },
    { key: "whatsapp" as const, label: "WhatsApp Notifications", desc: "Send messages via Meta WhatsApp Business API.",           icon: <Phone className="h-4 w-4 text-green-500" />,         enabled: settings.whatsappEnabled },
  ];

  return (
    <div className="space-y-3 mb-6">
      <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide flex items-center gap-2">
        <ToggleLeft className="h-4 w-4" /> Channel Toggles
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {channels.map(ch => (
          <div key={ch.key} className={`flex items-center justify-between p-4 rounded-xl border transition-all ${
            ch.enabled ? "bg-card border-primary/30 shadow-sm" : "bg-muted/20 border-border"
          }`}>
            <div className="flex items-center gap-3">
              <div className={`rounded-full p-2 ${ch.enabled ? "bg-primary/10" : "bg-muted"}`}>{ch.icon}</div>
              <div>
                <p className="text-sm font-semibold">{ch.label}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{ch.desc}</p>
              </div>
            </div>
            <Switch
              checked={ch.enabled}
              disabled={saving}
              onCheckedChange={val => onToggle(ch.key, val)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Provider Card
// ---------------------------------------------------------------------------

interface ProviderCardProps {
  provider: ProviderConfig & { id: string };
  onEdit: (p: ProviderConfig & { id: string }) => void;
  onToggle: (id: string, status: "ACTIVE" | "INACTIVE") => void;
  onSetPrimary: (id: string, channel: "EMAIL" | "SMS" | "WHATSAPP") => void;
  onDelete: (id: string) => void;
}

function ProviderCard({ provider: p, onEdit, onToggle, onSetPrimary, onDelete }: ProviderCardProps) {
  const meta = CHANNEL_META[p.channel];
  const isActive = p.status === "ACTIVE";

  return (
    <Card className={`p-5 relative overflow-hidden transition-all hover:shadow-md border-t-4 ${
      isActive ? "border-t-primary" : "border-t-muted opacity-70"
    }`}>
      <div className={`absolute top-4 right-4 ${meta.color}`}>{meta.icon}</div>

      <h3 className="font-semibold text-base pr-8">{p.name}</h3>
      <p className="text-xs text-muted-foreground mb-3 font-mono">{p.code} · {meta.label}</p>

      <div className="flex items-center gap-2 mb-4 flex-wrap">
        <Badge variant={isActive ? "default" : "secondary"} className="text-xs">
          {isActive ? <><CheckCircle2 className="h-3 w-3 mr-1" />Active</> : <><XCircle className="h-3 w-3 mr-1" />Inactive</>}
        </Badge>
        {p.isPrimary && (
          <Badge variant="outline" className="text-xs border-amber-400 text-amber-500">
            <Star className="h-3 w-3 mr-1" />Primary
          </Badge>
        )}
      </div>

      {/* Enable/Disable toggle */}
      <div className="flex items-center justify-between mb-4 p-2.5 rounded-lg border bg-muted/20">
        <Label className="text-xs font-medium cursor-pointer">
          {isActive ? "Enabled — receiving traffic" : "Disabled — not in use"}
        </Label>
        <Switch
          checked={isActive}
          onCheckedChange={checked => onToggle(p.id!, checked ? "ACTIVE" : "INACTIVE")}
        />
      </div>

      <div className="flex gap-2">
        <Button variant="outline" size="sm" className="flex-1 gap-1.5" onClick={() => onEdit(p as any)}>
          <Edit3 className="h-3.5 w-3.5" /> Edit
        </Button>
        {!p.isPrimary && isActive && (
          <Button variant="secondary" size="sm" className="flex-1 gap-1.5" onClick={() => onSetPrimary(p.id!, p.channel)}>
            <Star className="h-3.5 w-3.5" /> Make Primary
          </Button>
        )}
        {!p.isPrimary && (
          <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive hover:bg-destructive/10" onClick={() => onDelete(p.id!)}>
            <Trash2 className="h-3.5 w-3.5" />
          </Button>
        )}
      </div>
    </Card>
  );
}

// ---------------------------------------------------------------------------
// Main Notifications Page
// ---------------------------------------------------------------------------

export default function NotificationsPage() {
  const [activeTab, setActiveTab] = useState<"PROVIDERS" | "TEMPLATES" | "LOGS">("PROVIDERS");
  const [providers, setProviders] = useState<(ProviderConfig & { id: string })[]>([]);
  const [settings, setSettings]   = useState({ emailEnabled: true, smsEnabled: false, whatsappEnabled: false });
  const [loading, setLoading]     = useState(true);
  const [settingsSaving, setSettingsSaving] = useState(false);

  const [dialogOpen, setDialogOpen]   = useState(false);
  const [editingProvider, setEditingProvider] = useState<(ProviderConfig & { id: string }) | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    const [provRes, settRes] = await Promise.all([getProviders(), getNotificationSettings()]);
    if (provRes.success) setProviders(provRes.providers as any);
    if (settRes.success && settRes.settings) setSettings(settRes.settings);
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  const handleChannelToggle = async (channel: "email" | "sms" | "whatsapp", val: boolean) => {
    setSettingsSaving(true);
    const patch: any = {};
    if (channel === "email")    patch.emailEnabled    = val;
    if (channel === "sms")      patch.smsEnabled      = val;
    if (channel === "whatsapp") patch.whatsappEnabled = val;
    setSettings(prev => ({ ...prev, ...patch }));
    await updateNotificationSettings(patch);
    setSettingsSaving(false);
  };

  const handleToggleProvider = async (id: string, status: "ACTIVE" | "INACTIVE") => {
    setProviders(prev => prev.map(p => p.id === id ? { ...p, status } : p));
    await toggleProviderStatus(id, status);
    load();
  };

  const handleSetPrimary = async (id: string, channel: "EMAIL" | "SMS" | "WHATSAPP") => {
    setProviders(prev => prev.map(p => ({
      ...p,
      isPrimary: p.id === id ? true : p.channel === channel ? false : p.isPrimary,
    })));
    await setPrimaryProvider(id, channel);
    load();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this provider? This cannot be undone.")) return;
    setProviders(prev => prev.filter(p => p.id !== id));
    await deleteProvider(id);
    load();
  };

  // Group providers by channel
  const grouped = {
    EMAIL:    providers.filter(p => p.channel === "EMAIL"),
    SMS:      providers.filter(p => p.channel === "SMS"),
    WHATSAPP: providers.filter(p => p.channel === "WHATSAPP"),
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Notification Center</h1>
          <p className="text-muted-foreground mt-1">Manage providers, templates, channel settings, and delivery logs.</p>
        </div>
        <div className="flex gap-2">
          <Button variant={activeTab === "TEMPLATES" ? "default" : "outline"} onClick={() => setActiveTab("TEMPLATES")}>
            <LayoutTemplate className="mr-2 h-4 w-4" /> Templates
          </Button>
          <Button variant={activeTab === "LOGS" ? "default" : "outline"} onClick={() => setActiveTab("LOGS")}>
            <ScrollText className="mr-2 h-4 w-4" /> View Logs
          </Button>
          <Button variant={activeTab === "PROVIDERS" ? "default" : "outline"} onClick={() => setActiveTab("PROVIDERS")}>
            <Settings className="mr-2 h-4 w-4" /> Providers
          </Button>
        </div>
      </div>

      {loading ? (
        <div className="space-y-4">
          <div className="grid grid-cols-3 gap-3"><Skeleton className="h-24" /><Skeleton className="h-24" /><Skeleton className="h-24" /></div>
          <div className="grid grid-cols-3 gap-4"><Skeleton className="h-48" /><Skeleton className="h-48" /><Skeleton className="h-48" /></div>
        </div>
      ) : activeTab === "TEMPLATES" ? (
        <TemplatesManager />
      ) : activeTab === "PROVIDERS" ? (
        <div className="space-y-8">

          {/* Channel-level enable/disable */}
          <ChannelSettingsPanel
            settings={settings}
            onToggle={handleChannelToggle}
            saving={settingsSaving}
          />

          {/* Providers grouped by channel */}
          {(["EMAIL", "SMS", "WHATSAPP"] as const).map(ch => (
            <div key={ch}>
              <div className="flex items-center justify-between mb-3">
                <h3 className={`text-sm font-semibold uppercase tracking-wide flex items-center gap-2 ${CHANNEL_META[ch].color}`}>
                  {CHANNEL_META[ch].icon} {CHANNEL_META[ch].label} Providers
                  <Badge variant="outline" className="text-[10px] normal-case">
                    {grouped[ch].filter(p => p.status === "ACTIVE").length} active
                  </Badge>
                  {ch === "EMAIL" && !settings.emailEnabled && (
                    <Badge variant="secondary" className="text-[10px] normal-case text-amber-500 border-amber-300">Channel disabled</Badge>
                  )}
                  {ch === "SMS" && !settings.smsEnabled && (
                    <Badge variant="secondary" className="text-[10px] normal-case text-amber-500 border-amber-300">Channel disabled</Badge>
                  )}
                  {ch === "WHATSAPP" && !settings.whatsappEnabled && (
                    <Badge variant="secondary" className="text-[10px] normal-case text-amber-500 border-amber-300">Channel disabled</Badge>
                  )}
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {grouped[ch].map(p => (
                  <ProviderCard
                    key={p.id}
                    provider={p}
                    onEdit={setEditingProvider}
                    onToggle={handleToggleProvider}
                    onSetPrimary={handleSetPrimary}
                    onDelete={handleDelete}
                  />
                ))}

                {/* Add card */}
                <Card
                  className="p-5 flex flex-col items-center justify-center border-dashed border-2 cursor-pointer hover:bg-accent/50 transition-colors min-h-[200px] group"
                  onClick={() => { setEditingProvider(null); setDialogOpen(true); }}
                >
                  <div className="rounded-full bg-primary/10 p-3 mb-3 group-hover:bg-primary/20 transition-colors">
                    <Plus className="text-primary h-5 w-5" />
                  </div>
                  <p className="font-medium text-sm">Add {CHANNEL_META[ch].label} Provider</p>
                  <p className="text-xs text-muted-foreground text-center mt-1 max-w-[160px]">
                    Connect {PROVIDER_CODES[ch].join(", ")}
                  </p>
                </Card>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <Card className="p-6">
          <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
            <ScrollText className="h-5 w-5 text-muted-foreground" /> Recent Delivery Logs
          </h3>
          <div className="text-sm text-muted-foreground text-center py-12">
            Logs will appear here once notifications are processed by the worker queue.
          </div>
        </Card>
      )}

      {/* Add/Edit Provider Dialog */}
      <ProviderDialog
        open={dialogOpen || !!editingProvider}
        editing={editingProvider}
        onClose={() => { setDialogOpen(false); setEditingProvider(null); }}
        onSaved={load}
      />
    </div>
  );
}