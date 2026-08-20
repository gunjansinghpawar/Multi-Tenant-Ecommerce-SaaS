'use client';

import { usePopupStore } from '@/store/usePopupStore';
import { Button, Dialog, DialogContent } from '@commercex/ui';
import { X, Share2, Facebook, Twitter, Mail, Link as LinkIcon, CheckCircle } from 'lucide-react';
import { useState } from 'react';

export function ShareModal() {
  const { activePopup, popupData, closePopup } = usePopupStore();
  const isOpen = activePopup === 'SHARE';
  const [copied, setCopied] = useState(false);
  
  if (!isOpen || !popupData) return null;
  
  const { title, message, shareUrl = typeof window !== 'undefined' ? window.location.href : '' } = popupData;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Dialog open={isOpen} onOpenChange={closePopup}>
      <DialogContent className="sm:max-w-[425px] p-6">
        <button 
          onClick={closePopup}
          className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </button>
        
        <div className="space-y-6">
          <div className="flex flex-col space-y-2 text-center">
            <div className="flex justify-center mb-2 text-primary">
              <Share2 className="h-8 w-8" />
            </div>
            <h2 className="text-xl font-bold">{title || "Share this"}</h2>
            <p className="text-sm text-muted-foreground">
              {message || "Share this with your friends and family."}
            </p>
          </div>

          <div className="flex justify-center gap-4">
            <Button variant="outline" size="icon" className="h-12 w-12 rounded-full" onClick={() => window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`, '_blank')}>
              <Facebook className="h-5 w-5" />
            </Button>
            <Button variant="outline" size="icon" className="h-12 w-12 rounded-full" onClick={() => window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}`, '_blank')}>
              <Twitter className="h-5 w-5" />
            </Button>
            <Button variant="outline" size="icon" className="h-12 w-12 rounded-full" onClick={() => window.location.href = `mailto:?subject=${encodeURIComponent(title || 'Check this out')}&body=${encodeURIComponent(shareUrl)}`}>
              <Mail className="h-5 w-5" />
            </Button>
          </div>

          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <LinkIcon className="h-4 w-4 text-muted-foreground" />
            </div>
            <input 
              type="text" 
              readOnly 
              value={shareUrl} 
              className="w-full pl-9 pr-24 py-2 border rounded-md bg-secondary/30 text-sm text-muted-foreground"
            />
            <Button 
              size="sm" 
              className="absolute right-1 top-1 h-8"
              onClick={handleCopyLink}
            >
              {copied ? <><CheckCircle className="h-4 w-4 mr-1"/> Copied</> : 'Copy'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
