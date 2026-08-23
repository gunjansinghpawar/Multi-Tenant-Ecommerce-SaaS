import React from "react";
import { PageHeader, Card, CardContent, CardHeader, CardTitle, CardDescription } from "@commercex/ui";
import { KeyboardIcon, SearchIcon, CommandIcon, ArrowRightIcon } from "lucide-react";

const shortcutGroups = [
  {
    title: "Global Navigation",
    icon: <CommandIcon className="w-5 h-5 text-primary" />,
    shortcuts: [
      { keys: ["Ctrl", "K"], description: "Open global search" },
      { keys: ["Ctrl", "B"], description: "Toggle sidebar" },
      { keys: ["Alt", "T"], description: "Toggle theme (Light/Dark)" },
      { keys: ["Esc"], description: "Close modals and drawers" },
    ]
  },
  {
    title: "Data Tables",
    icon: <SearchIcon className="w-5 h-5 text-primary" />,
    shortcuts: [
      { keys: ["/"], description: "Focus table search" },
      { keys: ["Shift", "A"], description: "Add new item" },
      { keys: ["Shift", "E"], description: "Export current view" },
    ]
  }
];

export default function KeyboardShortcutsPage() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500 max-w-4xl mx-auto">
      <PageHeader 
        heading="Keyboard Shortcuts" 
        text="Boost your productivity with these system-wide keyboard shortcuts."
      />

      <div className="grid gap-6 md:grid-cols-2">
        {shortcutGroups.map((group, idx) => (
          <Card key={idx} className="h-full">
            <CardHeader className="flex flex-row items-center gap-3 pb-4">
              <div className="p-2 bg-primary/10 rounded-md">
                {group.icon}
              </div>
              <div>
                <CardTitle className="text-lg">{group.title}</CardTitle>
                <CardDescription>Shortcuts for {group.title.toLowerCase()}</CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                {group.shortcuts.map((shortcut, sIdx) => (
                  <li key={sIdx} className="flex items-center justify-between py-2 border-b last:border-0 border-border/50">
                    <span className="text-sm font-medium text-muted-foreground">{shortcut.description}</span>
                    <div className="flex items-center gap-1">
                      {shortcut.keys.map((k, kIdx) => (
                        <React.Fragment key={kIdx}>
                          <kbd className="inline-flex items-center justify-center rounded border bg-muted px-2 py-1 text-xs font-mono font-medium text-muted-foreground">
                            {k}
                          </kbd>
                          {kIdx < shortcut.keys.length - 1 && (
                            <span className="text-muted-foreground text-xs">+</span>
                          )}
                        </React.Fragment>
                      ))}
                    </div>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <Card className="bg-primary/5 border-primary/20">
        <CardContent className="p-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-background rounded-full border border-primary/20">
              <KeyboardIcon className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">Master the Platform</h3>
              <p className="text-sm text-muted-foreground">Using keyboard shortcuts can speed up your workflow by up to 40%.</p>
            </div>
          </div>
          <ArrowRightIcon className="w-5 h-5 text-muted-foreground hidden sm:block" />
        </CardContent>
      </Card>
    </div>
  );
}
