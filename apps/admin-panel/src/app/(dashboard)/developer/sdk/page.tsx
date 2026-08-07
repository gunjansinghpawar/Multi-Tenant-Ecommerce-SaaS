"use client";

import React from "react";
import { 
  PageHeader, 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription,
  Button
} from "@commercex/ui";
import { TerminalIcon, CodeIcon, CopyIcon } from "lucide-react";

export default function SdkPage() {
  return (
    <div className="space-y-6">
      <PageHeader 
        heading="CommerceX SDK" 
        text="Official libraries for Node.js, React, and Python."
      />
      
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <div className="bg-blue-100 w-10 h-10 rounded-md flex items-center justify-center mb-4">
              <TerminalIcon className="h-5 w-5 text-blue-600" />
            </div>
            <CardTitle>TypeScript / Node.js SDK</CardTitle>
            <CardDescription>The official `@commercex/sdk` for JavaScript environments.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-slate-950 p-4 rounded-md relative group">
              <code className="text-emerald-400 text-sm font-mono">npm install @commercex/sdk</code>
              <Button variant="ghost" size="icon" className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 text-slate-400 hover:text-white">
                <CopyIcon className="h-4 w-4" />
              </Button>
            </div>
            <div className="bg-slate-950 p-4 rounded-md relative group">
              <pre className="text-slate-300 text-sm font-mono overflow-x-auto whitespace-pre-wrap">
{`import { CommerceX } from '@commercex/sdk';

const client = new CommerceX({
  apiKey: process.env.COMMERCEX_API_KEY,
  storeId: 'store_12345'
});

const products = await client.products.list();`}
              </pre>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="bg-orange-100 w-10 h-10 rounded-md flex items-center justify-center mb-4">
              <CodeIcon className="h-5 w-5 text-orange-600" />
            </div>
            <CardTitle>React Hooks Library</CardTitle>
            <CardDescription>UI hooks for headless storefronts using React.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-slate-950 p-4 rounded-md relative group">
              <code className="text-emerald-400 text-sm font-mono">npm install @commercex/react</code>
              <Button variant="ghost" size="icon" className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 text-slate-400 hover:text-white">
                <CopyIcon className="h-4 w-4" />
              </Button>
            </div>
            <div className="bg-slate-950 p-4 rounded-md relative group">
              <pre className="text-slate-300 text-sm font-mono overflow-x-auto whitespace-pre-wrap">
{`import { useCart } from '@commercex/react';

function CartButton() {
  const { totalItems, addItem } = useCart();
  return (
    <button>Cart ({totalItems})</button>
  );
}`}
              </pre>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
