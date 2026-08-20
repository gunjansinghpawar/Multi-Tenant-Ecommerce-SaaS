'use client';

import { useState } from 'react';
import { Download, FileText, Music, Video, Package, CheckCircle2 } from 'lucide-react';

interface DigitalDownload {
  id: string;
  orderId: string;
  productName: string;
  type: 'PDF' | 'Audio' | 'Video' | 'Software';
  size: string;
  date: string;
  expiresOn?: string;
  downloadsRemaining?: number;
  fileUrl: string;
}

export default function DownloadsPage() {
  const [downloads, setDownloads] = useState<DigitalDownload[]>([
    {
      id: 'd1',
      orderId: 'ORD-987654',
      productName: 'The Complete E-commerce Guide (eBook)',
      type: 'PDF',
      size: '12.5 MB',
      date: 'Oct 20, 2026',
      downloadsRemaining: 5,
      fileUrl: '#'
    },
    {
      id: 'd2',
      orderId: 'ORD-987111',
      productName: 'Storefront UI Kit - Figma File',
      type: 'Software',
      size: '45.2 MB',
      date: 'Oct 15, 2026',
      fileUrl: '#'
    },
    {
      id: 'd3',
      orderId: 'ORD-987000',
      productName: 'Marketing Masterclass Video Course',
      type: 'Video',
      size: '1.2 GB',
      date: 'Oct 01, 2026',
      expiresOn: 'Oct 01, 2027',
      fileUrl: '#'
    }
  ]);

  const [downloadingId, setDownloadingId] = useState<string | null>(null);

  const handleDownload = (download: DigitalDownload) => {
    setDownloadingId(download.id);
    
    // Simulate download delay
    setTimeout(() => {
      setDownloadingId(null);
      alert(`Downloaded ${download.productName} successfully!`);
      
      // If it has limits, decrement it visually
      if (download.downloadsRemaining !== undefined) {
        setDownloads(downloads.map(d => 
          d.id === download.id 
            ? { ...d, downloadsRemaining: Math.max(0, d.downloadsRemaining! - 1) } 
            : d
        ));
      }
    }, 2000);
  };

  const getIcon = (type: string) => {
    switch(type) {
      case 'PDF': return <FileText className="w-6 h-6 text-red-500" />;
      case 'Audio': return <Music className="w-6 h-6 text-purple-500" />;
      case 'Video': return <Video className="w-6 h-6 text-blue-500" />;
      default: return <Package className="w-6 h-6 text-orange-500" />;
    }
  };

  return (
    <div className="max-w-5xl mx-auto py-12 px-4 sm:px-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Digital Downloads</h1>
        <p className="text-gray-500">Access and download your purchased digital products.</p>
      </div>

      <div className="bg-white dark:bg-gray-900 rounded-3xl border border-gray-100 dark:border-gray-800 overflow-hidden shadow-sm">
        <div className="divide-y divide-gray-100 dark:divide-gray-800">
          
          {downloads.map(item => {
            const isLimitReached = item.downloadsRemaining === 0;

            return (
              <div key={item.id} className="p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors">
                
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 bg-gray-50 dark:bg-gray-800 rounded-2xl flex items-center justify-center flex-shrink-0">
                    {getIcon(item.type)}
                  </div>
                  <div>
                    <h2 className="font-bold text-lg text-gray-900 dark:text-white mb-1">{item.productName}</h2>
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-gray-500">
                      <span>Order: #{item.orderId}</span>
                      <span className="hidden sm:inline">•</span>
                      <span>{item.size} {item.type}</span>
                      <span className="hidden sm:inline">•</span>
                      <span>Purchased: {item.date}</span>
                    </div>
                    
                    {(item.downloadsRemaining !== undefined || item.expiresOn) && (
                      <div className="flex items-center gap-3 mt-3">
                        {item.downloadsRemaining !== undefined && (
                          <span className={`text-xs px-2.5 py-1 rounded-full font-bold ${isLimitReached ? 'bg-red-100 text-red-600 dark:bg-red-900/30' : 'bg-green-100 text-green-700 dark:bg-green-900/30'}`}>
                            {item.downloadsRemaining} downloads remaining
                          </span>
                        )}
                        {item.expiresOn && (
                          <span className="text-xs text-gray-500 bg-gray-100 dark:bg-gray-800 px-2.5 py-1 rounded-full">
                            Expires: {item.expiresOn}
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                <button 
                  onClick={() => handleDownload(item)}
                  disabled={isLimitReached || downloadingId === item.id}
                  className="w-full sm:w-auto flex items-center justify-center px-6 py-3 bg-black dark:bg-white text-white dark:text-black font-bold rounded-xl hover:bg-gray-900 dark:hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex-shrink-0"
                >
                  {downloadingId === item.id ? (
                    <>
                      <span className="w-5 h-5 border-2 border-gray-400 border-t-white dark:border-t-black rounded-full animate-spin mr-2" />
                      Downloading...
                    </>
                  ) : isLimitReached ? (
                    <>Limit Reached</>
                  ) : (
                    <>
                      <Download className="w-5 h-5 mr-2" />
                      Download
                    </>
                  )}
                </button>

              </div>
            );
          })}
          
          {downloads.length === 0 && (
            <div className="p-12 text-center">
              <Package className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">No Downloads Found</h3>
              <p className="text-gray-500">You haven't purchased any digital products yet.</p>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
