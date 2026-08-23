"use client";

import React, { useState, useEffect, useCallback } from "react";
import {
  Card, Button, Input, Textarea, Badge, Skeleton,
  Tabs, TabsList, TabsTrigger, TabsContent,
  Switch, Label,
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter,
} from "@commercex/ui";
import {
  Mail, MessageSquare, Phone, Save, Zap, AlertCircle,
  Plus, ChevronRight, CheckCircle2, Search, ShieldAlert,
  CreditCard, ShoppingCart, Bell
} from "lucide-react";
import { getTemplatesForEvent, saveTemplate, deleteTemplate, TemplateData } from "./actions";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface NotificationEventDef {
  id: string;
  name: string;
  description: string;
  variables: string[];
  category: "Auth" | "Billing" | "Commerce" | "Custom";
}

// ---------------------------------------------------------------------------
// Built-in event registry — lives client-side, seeded via seed script
// ---------------------------------------------------------------------------

const BUILT_IN_EVENTS: NotificationEventDef[] = [
  // Auth
  {
    id: "LOGIN_SUCCESS",
    name: "Login Successful",
    description: "Sent when a super admin or tenant admin logs in successfully.",
    variables: ["name", "email", "ip", "device", "loginTime"],
    category: "Auth",
  },
  {
    id: "LOGIN_FAILED",
    name: "Login Failed",
    description: "Alert sent after consecutive failed login attempts.",
    variables: ["email", "attemptCount", "ip", "time"],
    category: "Auth",
  },
  {
    id: "OTP_CREATED",
    name: "OTP Verification",
    description: "Sent for MFA, phone verification, or email verification.",
    variables: ["name", "otpCode", "expiryMins"],
    category: "Auth",
  },
  {
    id: "USER_REGISTER",
    name: "User Registration",
    description: "Sent when a new user account is created on the platform.",
    variables: ["name", "email", "storeName", "verifyLink"],
    category: "Auth",
  },
  {
    id: "PASSWORD_RESET",
    name: "Password Reset",
    description: "Sent when a user requests a password reset link.",
    variables: ["name", "resetLink", "expiryHours"],
    category: "Auth",
  },

  // Billing
  {
    id: "SUBSCRIPTION_PURCHASED",
    name: "Subscription Purchased",
    description: "Sent when a tenant successfully purchases a subscription plan.",
    variables: ["storeName", "planName", "amount", "currency", "billingCycle", "nextBillingDate"],
    category: "Billing",
  },
  {
    id: "SUBSCRIPTION_FAILED",
    name: "Subscription Payment Failed",
    description: "Sent when the recurring subscription payment fails.",
    variables: ["storeName", "planName", "amount", "failureReason", "retryDate", "updateCardLink"],
    category: "Billing",
  },
  {
    id: "SUBSCRIPTION_RENEWED",
    name: "Subscription Renewed",
    description: "Sent on successful auto-renewal of a subscription.",
    variables: ["storeName", "planName", "amount", "currency", "nextBillingDate"],
    category: "Billing",
  },
  {
    id: "SUBSCRIPTION_CANCELLED",
    name: "Subscription Cancelled",
    description: "Sent when a subscription is cancelled by the admin or system.",
    variables: ["storeName", "planName", "cancelledAt", "activeUntil"],
    category: "Billing",
  },
  {
    id: "PAYMENT_REMINDER",
    name: "Payment Reminder",
    description: "Proactive reminder before the next billing date.",
    variables: ["storeName", "planName", "amount", "dueDate", "updateCardLink"],
    category: "Billing",
  },
  {
    id: "PAYMENT_REMAINING",
    name: "Payment Remaining Notice",
    description: "Sent when there is an outstanding/overdue balance.",
    variables: ["storeName", "remainingAmount", "currency", "dueDate", "payNowLink"],
    category: "Billing",
  },

  // Commerce
  {
    id: "ORDER_PLACED",
    name: "Order Placed",
    description: "Sent when a customer successfully completes checkout.",
    variables: ["customerName", "orderId", "totalAmount", "storeName", "orderLink"],
    category: "Commerce",
  },
  {
    id: "ORDER_SHIPPED",
    name: "Order Shipped",
    description: "Sent when an order is dispatched for delivery.",
    variables: ["customerName", "orderId", "courierName", "trackingNumber", "trackingUrl"],
    category: "Commerce",
  },
  {
    id: "ORDER_DELIVERED",
    name: "Order Delivered",
    description: "Sent when an order is marked as delivered.",
    variables: ["customerName", "orderId", "deliveredAt", "storeName"],
    category: "Commerce",
  },
  {
    id: "PAYMENT_FAILED",
    name: "Payment Failed",
    description: "Sent when a customer payment attempt fails at checkout.",
    variables: ["customerName", "orderId", "amount", "failureReason", "retryLink"],
    category: "Commerce",
  },
  {
    id: "REFUND_PROCESSED",
    name: "Refund Processed",
    description: "Sent when a refund has been issued for an order.",
    variables: ["customerName", "orderId", "refundAmount", "currency", "refundId"],
    category: "Commerce",
  },
];

const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  Auth: <ShieldAlert className="h-3.5 w-3.5" />,
  Billing: <CreditCard className="h-3.5 w-3.5" />,
  Commerce: <ShoppingCart className="h-3.5 w-3.5" />,
  Custom: <Bell className="h-3.5 w-3.5" />,
};

const CATEGORY_COLORS: Record<string, string> = {
  Auth: "bg-violet-500/10 text-violet-600 dark:text-violet-400 border-violet-200 dark:border-violet-800",
  Billing: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-200 dark:border-amber-800",
  Commerce: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-800",
  Custom: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800",
};

const CATEGORIES = ["All", "Auth", "Billing", "Commerce", "Custom"] as const;
type Category = (typeof CATEGORIES)[number];

// ---------------------------------------------------------------------------
// Add Event Dialog
// ---------------------------------------------------------------------------

interface AddEventDialogProps {
  open: boolean;
  onClose: () => void;
  onAdd: (event: NotificationEventDef) => void;
}

function AddEventDialog({ open, onClose, onAdd }: AddEventDialogProps) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [variables, setVariables] = useState("");
  const [error, setError] = useState("");

  // Auto-generate ID from name
  const generatedId = name
    .toUpperCase()
    .replace(/[^A-Z0-9\s]/g, "")
    .trim()
    .replace(/\s+/g, "_");

  const handleAdd = () => {
    if (!name.trim()) { setError("Event name is required."); return; }
    if (!generatedId) { setError("Could not generate an event ID from the name."); return; }
    setError("");

    const vars = variables
      .split(",")
      .map((v) => v.trim())
      .filter(Boolean);

    onAdd({
      id: generatedId,
      name: name.trim(),
      description: description.trim() || `Custom event: ${name.trim()}`,
      variables: vars,
      category: "Custom",
    });

    setName("");
    setDescription("");
    setVariables("");
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <div className="rounded-full bg-primary/10 p-1.5">
              <Plus className="h-4 w-4 text-primary" />
            </div>
            Add Notification Event
          </DialogTitle>
          <DialogDescription>
            Create a new notification event. Templates for Email, SMS, and WhatsApp can be configured after.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-2">
          <div className="space-y-1.5">
            <Label htmlFor="event-name">Event Name <span className="text-destructive">*</span></Label>
            <Input
              id="event-name"
              placeholder="e.g. Trial Period Ending"
              value={name}
              onChange={(e) => { setName(e.target.value); setError(""); }}
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="event-id">Auto-generated Event ID</Label>
            <Input
              id="event-id"
              readOnly
              value={generatedId || "—"}
              className="font-mono text-sm bg-muted/50 text-muted-foreground cursor-not-allowed"
            />
            <p className="text-xs text-muted-foreground">
              This ID is used internally and in templates. It's derived from the name.
            </p>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="event-desc">Description</Label>
            <Input
              id="event-desc"
              placeholder="Briefly describe when this event fires"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="event-vars">Template Variables</Label>
            <Input
              id="event-vars"
              placeholder="name, email, daysLeft, upgradeLink"
              value={variables}
              onChange={(e) => setVariables(e.target.value)}
            />
            <p className="text-xs text-muted-foreground">
              Comma-separated. These will appear as <code className="bg-muted px-1 rounded">{"{{variable}}"}</code> hints in the editor.
            </p>
          </div>

          {error && (
            <div className="flex items-center gap-2 text-sm text-destructive bg-destructive/10 px-3 py-2 rounded-md">
              <AlertCircle className="h-4 w-4 shrink-0" />
              {error}
            </div>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={handleAdd} className="gap-2">
            <Plus className="h-4 w-4" />
            Add Event
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

// ---------------------------------------------------------------------------
// Channel status dot
// ---------------------------------------------------------------------------

function ActiveDot() {
  return <span className="relative flex h-2 w-2 ml-1">
    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
  </span>;
}

// ---------------------------------------------------------------------------
// Main TemplatesManager
// ---------------------------------------------------------------------------

export function TemplatesManager() {
  const [events, setEvents] = useState<NotificationEventDef[]>(() => {
    // Merge built-ins with any custom events persisted in localStorage
    if (typeof window === "undefined") return BUILT_IN_EVENTS;
    try {
      const stored = localStorage.getItem("custom_notification_events");
      const custom: NotificationEventDef[] = stored ? JSON.parse(stored) : [];
      return [...BUILT_IN_EVENTS, ...custom];
    } catch {
      return BUILT_IN_EVENTS;
    }
  });

  const [selectedEventId, setSelectedEventId] = useState(BUILT_IN_EVENTS[0].id);
  const [activeChannel, setActiveChannel] = useState<"EMAIL" | "SMS" | "WHATSAPP">("EMAIL");
  const [categoryFilter, setCategoryFilter] = useState<Category>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [addDialogOpen, setAddDialogOpen] = useState(false);

  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState<"EMAIL" | "SMS" | "WHATSAPP" | null>(null);

  const [emailData, setEmailData] = useState<TemplateData>({ subject: "", content: "" });
  const [smsData, setSmsData] = useState<TemplateData>({ content: "" });
  const [waData, setWaData] = useState<TemplateData>({ content: "" });

  const [emailActive, setEmailActive] = useState(false);
  const [smsActive, setSmsActive] = useState(false);
  const [waActive, setWaActive] = useState(false);

  // Filtered event list
  const filteredEvents = events.filter((e) => {
    const matchesCategory = categoryFilter === "All" || e.category === categoryFilter;
    const matchesSearch =
      !searchQuery ||
      e.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.id.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const selectedEvent = events.find((e) => e.id === selectedEventId) ?? events[0];

  const loadTemplates = useCallback(async (eventId: string) => {
    setLoading(true);
    const res = await getTemplatesForEvent(eventId);
    if (res.success && res.templates) {
      const { EMAIL, SMS, WHATSAPP } = res.templates;
      setEmailData(EMAIL ? { id: EMAIL.id, subject: EMAIL.subject, content: EMAIL.content } : { subject: "", content: "" });
      setEmailActive(!!EMAIL);
      setSmsData(SMS ? { id: SMS.id, content: SMS.content } : { content: "" });
      setSmsActive(!!SMS);
      setWaData(WHATSAPP ? { id: WHATSAPP.id, content: WHATSAPP.content } : { content: "" });
      setWaActive(!!WHATSAPP);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    loadTemplates(selectedEventId);
  }, [selectedEventId, loadTemplates]);

  const handleSave = async (channel: "EMAIL" | "SMS" | "WHATSAPP", isActive: boolean, data: TemplateData) => {
    setSaving(true);
    try {
      if (!isActive) {
        await deleteTemplate(selectedEventId, channel);
      } else {
        await saveTemplate(selectedEventId, channel, data);
      }
      setSaveSuccess(channel);
      setTimeout(() => setSaveSuccess(null), 2500);
    } finally {
      setSaving(false);
      await loadTemplates(selectedEventId);
    }
  };

  const handleToggle = async (channel: "EMAIL" | "SMS" | "WHATSAPP", checked: boolean) => {
    if (channel === "EMAIL") setEmailActive(checked);
    if (channel === "SMS") setSmsActive(checked);
    if (channel === "WHATSAPP") setWaActive(checked);
    if (!checked) {
      await handleSave(channel, false, channel === "EMAIL" ? emailData : channel === "SMS" ? smsData : waData);
    }
  };

  const handleAddEvent = (event: NotificationEventDef) => {
    setEvents((prev) => {
      const updated = [...prev, event];
      // Persist custom events only
      const custom = updated.filter((e) => e.category === "Custom");
      try { localStorage.setItem("custom_notification_events", JSON.stringify(custom)); } catch { /* noop */ }
      return updated;
    });
    setSelectedEventId(event.id);
  };

  // Count active channels across selected event
  const activeCount = [emailActive, smsActive, waActive].filter(Boolean).length;

  return (
    <div className="flex flex-col gap-6 animate-in fade-in duration-500">

      {/* Toolbar */}
      <div className="flex items-center gap-3 flex-wrap">
        {/* Category filters */}
        <div className="flex items-center gap-2 flex-wrap flex-1">
          {CATEGORIES.map((cat) => {
            const count = cat === "All"
              ? events.length
              : events.filter((e) => e.category === cat).length;
            return (
              <button
                key={cat}
                onClick={() => setCategoryFilter(cat)}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border transition-all duration-200 ${
                  categoryFilter === cat
                    ? "bg-primary text-primary-foreground border-primary shadow-sm"
                    : "bg-card text-muted-foreground border-border hover:border-primary/50 hover:text-foreground"
                }`}
              >
                {cat !== "All" && CATEGORY_ICONS[cat]}
                {cat}
                <span className={`ml-0.5 text-[10px] font-semibold rounded-full px-1.5 py-0.5 ${
                  categoryFilter === cat ? "bg-white/20" : "bg-muted"
                }`}>{count}</span>
              </button>
            );
          })}
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
          <Input
            placeholder="Search events..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-8 h-8 text-sm w-48"
          />
        </div>

        {/* Add button */}
        <Button
          size="sm"
          className="gap-1.5 shrink-0"
          onClick={() => setAddDialogOpen(true)}
        >
          <Plus className="h-4 w-4" />
          Add Event
        </Button>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">

        {/* Sidebar: Event List */}
        <div className="md:col-span-1 space-y-1 max-h-[70vh] overflow-y-auto pr-1 custom-scrollbar">
          {filteredEvents.length === 0 ? (
            <div className="text-center py-8 text-sm text-muted-foreground">
              No events match your filter.
            </div>
          ) : (
            filteredEvents.map((event) => {
              const isSelected = selectedEventId === event.id;
              return (
                <button
                  key={event.id}
                  onClick={() => setSelectedEventId(event.id)}
                  className={`w-full text-left px-3 py-3 rounded-xl transition-all duration-200 border group ${
                    isSelected
                      ? "bg-primary/5 border-primary/40 shadow-sm"
                      : "bg-card border-transparent hover:bg-accent/60 hover:border-border"
                  }`}
                >
                  <div className="flex items-start justify-between gap-1">
                    <div className="font-medium text-sm leading-tight">{event.name}</div>
                    {isSelected && <ChevronRight className="h-3.5 w-3.5 text-primary shrink-0 mt-0.5" />}
                  </div>
                  <div className="flex items-center gap-1.5 mt-1.5">
                    <span className={`inline-flex items-center gap-1 text-[10px] font-medium px-1.5 py-0.5 rounded-full border ${CATEGORY_COLORS[event.category]}`}>
                      {CATEGORY_ICONS[event.category]}
                      {event.category}
                    </span>
                  </div>
                  <div className="text-xs text-muted-foreground mt-1 line-clamp-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    {event.id}
                  </div>
                </button>
              );
            })
          )}
        </div>

        {/* Main Area: Editor */}
        <div className="md:col-span-3">
          <Card className="flex flex-col min-h-[600px] shadow-md border-border/50 overflow-hidden">

            {/* Header */}
            <div className="p-6 border-b bg-muted/20">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2.5 flex-wrap">
                    <h2 className="text-xl font-bold tracking-tight">{selectedEvent.name}</h2>
                    <span className={`inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full border ${CATEGORY_COLORS[selectedEvent.category]}`}>
                      {CATEGORY_ICONS[selectedEvent.category]}
                      {selectedEvent.category}
                    </span>
                  </div>
                  <p className="text-muted-foreground mt-1 text-sm">{selectedEvent.description}</p>
                </div>
                <div className="flex flex-col items-end gap-2 shrink-0">
                  <Badge variant="outline" className="font-mono bg-background text-xs">
                    {selectedEvent.id}
                  </Badge>
                  {activeCount > 0 && (
                    <Badge variant="default" className="text-[10px] px-1.5 py-0.5 bg-green-600 hover:bg-green-600">
                      <CheckCircle2 className="h-3 w-3 mr-1" />
                      {activeCount} channel{activeCount > 1 ? "s" : ""} active
                    </Badge>
                  )}
                </div>
              </div>

              {/* Variables Guide */}
              {selectedEvent.variables.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-2 items-center">
                  <Zap className="h-3.5 w-3.5 text-amber-500 shrink-0" />
                  <span className="text-xs font-medium text-muted-foreground">Variables:</span>
                  {selectedEvent.variables.map((v) => (
                    <Badge
                      key={v}
                      variant="secondary"
                      className="font-mono text-xs cursor-help py-0"
                      title={`Use as {{${v}}}`}
                    >
                      {`{{${v}}}`}
                    </Badge>
                  ))}
                </div>
              )}
            </div>

            {/* Editor Body */}
            <div className="p-6 flex-1 flex flex-col">
              {loading ? (
                <div className="space-y-4">
                  <Skeleton className="h-12 w-full" />
                  <Skeleton className="h-64 w-full" />
                </div>
              ) : (
                <Tabs
                  value={activeChannel}
                  onValueChange={(v: any) => setActiveChannel(v)}
                  className="flex-1 flex flex-col"
                >
                  <TabsList className="grid grid-cols-3 w-full max-w-md mb-6">
                    <TabsTrigger value="EMAIL" className="flex items-center gap-1.5">
                      <Mail className="h-3.5 w-3.5" /> Email
                      {emailActive && <ActiveDot />}
                    </TabsTrigger>
                    <TabsTrigger value="SMS" className="flex items-center gap-1.5">
                      <MessageSquare className="h-3.5 w-3.5" /> SMS
                      {smsActive && <ActiveDot />}
                    </TabsTrigger>
                    <TabsTrigger value="WHATSAPP" className="flex items-center gap-1.5">
                      <Phone className="h-3.5 w-3.5" /> WhatsApp
                      {waActive && <ActiveDot />}
                    </TabsTrigger>
                  </TabsList>

                  {/* ── EMAIL ─────────────────────────────────── */}
                  <TabsContent value="EMAIL" className="flex-1 flex flex-col space-y-5 mt-0">
                    <div className="flex items-center justify-between p-4 rounded-xl border bg-card">
                      <div className="space-y-0.5">
                        <Label className="text-sm font-semibold flex items-center gap-2">
                          <Mail className="h-4 w-4 text-blue-500" />
                          Enable Email Notification
                        </Label>
                        <p className="text-xs text-muted-foreground">Send email notifications for this event.</p>
                      </div>
                      <Switch
                        checked={emailActive}
                        onCheckedChange={(checked) => handleToggle("EMAIL", checked)}
                      />
                    </div>

                    <div className={`space-y-4 flex-1 flex flex-col transition-opacity duration-300 ${!emailActive ? "opacity-40 pointer-events-none" : ""}`}>
                      <div className="space-y-1.5">
                        <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Subject Line</Label>
                        <Input
                          placeholder="e.g. Your verification code is {{otpCode}}"
                          value={emailData.subject}
                          onChange={(e) => setEmailData((d) => ({ ...d, subject: e.target.value }))}
                        />
                      </div>
                      <div className="space-y-1.5 flex-1 flex flex-col">
                        <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">HTML Body</Label>
                        <Textarea
                          className="flex-1 min-h-[260px] font-mono text-xs resize-none"
                          placeholder={"<html><body><h1>Hello {{name}}</h1>...</body></html>"}
                          value={emailData.content}
                          onChange={(e) => setEmailData((d) => ({ ...d, content: e.target.value }))}
                        />
                      </div>
                    </div>

                    <div className="flex justify-end pt-2">
                      <Button
                        disabled={!emailActive || saving}
                        onClick={() => handleSave("EMAIL", true, emailData)}
                        className="gap-2 min-w-[160px]"
                      >
                        {saving ? (
                          <span className="flex items-center gap-2"><span className="h-3 w-3 border-2 border-current border-t-transparent rounded-full animate-spin" />Saving…</span>
                        ) : saveSuccess === "EMAIL" ? (
                          <span className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-green-400" />Saved!</span>
                        ) : (
                          <><Save className="h-4 w-4" />Save Email Template</>
                        )}
                      </Button>
                    </div>
                  </TabsContent>

                  {/* ── SMS ───────────────────────────────────── */}
                  <TabsContent value="SMS" className="flex-1 flex flex-col space-y-5 mt-0">
                    <div className="flex items-center justify-between p-4 rounded-xl border bg-card">
                      <div className="space-y-0.5">
                        <Label className="text-sm font-semibold flex items-center gap-2">
                          <MessageSquare className="h-4 w-4 text-purple-500" />
                          Enable SMS Notification
                        </Label>
                        <p className="text-xs text-muted-foreground">Send text messages for this event.</p>
                      </div>
                      <Switch
                        checked={smsActive}
                        onCheckedChange={(checked) => handleToggle("SMS", checked)}
                      />
                    </div>

                    <div className={`space-y-4 flex-1 flex flex-col transition-opacity duration-300 ${!smsActive ? "opacity-40 pointer-events-none" : ""}`}>
                      <div className="flex items-start gap-3 bg-blue-50/50 dark:bg-blue-950/20 text-blue-700 dark:text-blue-300 p-3 rounded-lg border border-blue-100 dark:border-blue-900 text-sm">
                        <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
                        <p>SMS segments are 160 characters. Using variables increases length dynamically and may cost more segments per message.</p>
                      </div>
                      <div className="space-y-1.5 flex-1 flex flex-col">
                        <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wide flex justify-between">
                          <span>Message Content</span>
                          <span className={`font-normal normal-case ${smsData.content.length > 160 ? "text-amber-500 font-semibold" : ""}`}>
                            {smsData.content.length} chars · {Math.ceil(smsData.content.length / 160) || 1} segment{Math.ceil(smsData.content.length / 160) > 1 ? "s" : ""}
                          </span>
                        </Label>
                        <Textarea
                          className="flex-1 min-h-[260px] resize-none"
                          placeholder={"Hi {{name}}, your OTP is {{otpCode}}. Valid for {{expiryMins}} mins."}
                          value={smsData.content}
                          onChange={(e) => setSmsData((d) => ({ ...d, content: e.target.value }))}
                        />
                      </div>
                    </div>

                    <div className="flex justify-end pt-2">
                      <Button
                        disabled={!smsActive || saving}
                        onClick={() => handleSave("SMS", true, smsData)}
                        className="gap-2 min-w-[160px]"
                      >
                        {saving ? (
                          <span className="flex items-center gap-2"><span className="h-3 w-3 border-2 border-current border-t-transparent rounded-full animate-spin" />Saving…</span>
                        ) : saveSuccess === "SMS" ? (
                          <span className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-green-400" />Saved!</span>
                        ) : (
                          <><Save className="h-4 w-4" />Save SMS Template</>
                        )}
                      </Button>
                    </div>
                  </TabsContent>

                  {/* ── WHATSAPP ──────────────────────────────── */}
                  <TabsContent value="WHATSAPP" className="flex-1 flex flex-col space-y-5 mt-0">
                    <div className="flex items-center justify-between p-4 rounded-xl border bg-card">
                      <div className="space-y-0.5">
                        <Label className="text-sm font-semibold flex items-center gap-2">
                          <Phone className="h-4 w-4 text-green-500" />
                          Enable WhatsApp Notification
                        </Label>
                        <p className="text-xs text-muted-foreground">Send WhatsApp messages for this event.</p>
                      </div>
                      <Switch
                        checked={waActive}
                        onCheckedChange={(checked) => handleToggle("WHATSAPP", checked)}
                      />
                    </div>

                    <div className={`space-y-4 flex-1 flex flex-col transition-opacity duration-300 ${!waActive ? "opacity-40 pointer-events-none" : ""}`}>
                      <div className="flex items-start gap-3 bg-green-50/50 dark:bg-green-950/20 text-green-700 dark:text-green-300 p-3 rounded-lg border border-green-100 dark:border-green-900 text-sm">
                        <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
                        <p>
                          WhatsApp requires pre-approved templates. Enter the exact <strong>Template Name</strong> from your Meta Business account.
                          Variables will be passed as positional parameters automatically.
                        </p>
                      </div>
                      <div className="space-y-1.5">
                        <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Meta Template Name</Label>
                        <Input
                          placeholder="e.g. otp_verification_en"
                          value={waData.content}
                          onChange={(e) => setWaData((d) => ({ ...d, content: e.target.value }))}
                          className="font-mono"
                        />
                        <p className="text-xs text-muted-foreground">
                          Must match the approved template name in Meta Business Manager exactly (case-sensitive).
                        </p>
                      </div>
                      {selectedEvent.variables.length > 0 && (
                        <div className="rounded-lg border bg-muted/30 p-3">
                          <p className="text-xs font-medium text-muted-foreground mb-2">Variables that will be passed (in order):</p>
                          <div className="flex flex-wrap gap-1.5">
                            {selectedEvent.variables.map((v, i) => (
                              <Badge key={v} variant="outline" className="font-mono text-xs">
                                <span className="text-muted-foreground mr-1">#{i + 1}</span> {`{{${v}}}`}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="flex justify-end pt-2 mt-auto">
                      <Button
                        disabled={!waActive || saving}
                        onClick={() => handleSave("WHATSAPP", true, waData)}
                        className="gap-2 min-w-[160px]"
                      >
                        {saving ? (
                          <span className="flex items-center gap-2"><span className="h-3 w-3 border-2 border-current border-t-transparent rounded-full animate-spin" />Saving…</span>
                        ) : saveSuccess === "WHATSAPP" ? (
                          <span className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-green-400" />Saved!</span>
                        ) : (
                          <><Save className="h-4 w-4" />Save WhatsApp Template</>
                        )}
                      </Button>
                    </div>
                  </TabsContent>

                </Tabs>
              )}
            </div>

          </Card>
        </div>

      </div>

      {/* Add Event Dialog */}
      <AddEventDialog
        open={addDialogOpen}
        onClose={() => setAddDialogOpen(false)}
        onAdd={handleAddEvent}
      />
    </div>
  );
}
