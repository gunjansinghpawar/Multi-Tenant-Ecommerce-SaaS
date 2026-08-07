import React from 'react';
import { OrderTimelineEvent, OrderStatus } from '../../lib/mock-orders';
import { CheckCircle2, Clock, Package, Truck, XCircle, RotateCcw } from 'lucide-react';

interface OrderTimelineProps {
  timeline: OrderTimelineEvent[];
  currentStatus: OrderStatus;
}

export function OrderTimeline({ timeline, currentStatus }: OrderTimelineProps) {
  const getIcon = (status: OrderStatus) => {
    switch (status) {
      case 'Pending': return <Clock className="h-5 w-5" />;
      case 'Processing': return <Package className="h-5 w-5" />;
      case 'Shipped': return <Truck className="h-5 w-5" />;
      case 'Delivered': return <CheckCircle2 className="h-5 w-5" />;
      case 'Returned': return <RotateCcw className="h-5 w-5" />;
      case 'Cancelled': return <XCircle className="h-5 w-5" />;
      default: return <Clock className="h-5 w-5" />;
    }
  };

  const getColorClass = (status: OrderStatus, isPast: boolean) => {
    if (!isPast && status !== currentStatus) return 'text-muted-foreground bg-muted';
    switch (status) {
      case 'Delivered': return 'text-green-600 bg-green-100';
      case 'Cancelled':
      case 'Returned': return 'text-red-600 bg-red-100';
      default: return 'text-primary bg-primary/10';
    }
  };

  return (
    <div className="bg-card border rounded-xl p-6">
      <h3 className="text-lg font-bold mb-6">Order Timeline</h3>
      
      <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-muted-foreground/20 before:to-transparent">
        {timeline.map((event, index) => {
          const isLast = index === timeline.length - 1;
          const dateObj = new Date(event.date);
          const formattedDate = dateObj.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
          const formattedTime = dateObj.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });

          return (
            <div key={index} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
              <div className={`flex items-center justify-center w-10 h-10 rounded-full border-4 border-card shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow ${getColorClass(event.status, !isLast)} z-10`}>
                {getIcon(event.status)}
              </div>
              <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-muted/20 p-4 rounded-xl border">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-1">
                  <span className="font-bold text-foreground">{event.status}</span>
                  <span className="text-xs text-muted-foreground font-medium">{formattedDate} at {formattedTime}</span>
                </div>
                <div className="text-sm text-muted-foreground">
                  {event.description}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
