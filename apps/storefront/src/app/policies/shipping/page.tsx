import { ProseLayout } from '@/components/static/ProseLayout';

export default function ShippingPolicyPage() {
  return (
    <ProseLayout title="Shipping Policy" lastUpdated="March 10, 2026">
      <p>
        Thank you for visiting and shopping at our store. Following are the terms and conditions that constitute 
        our Shipping Policy.
      </p>

      <h2>1. Domestic Shipping Policy</h2>
      <h3>Shipment processing time</h3>
      <p>
        All orders are processed within 1-2 business days. Orders are not shipped or delivered on weekends or holidays.
        If we are experiencing a high volume of orders, shipments may be delayed by a few days. Please allow additional 
        days in transit for delivery.
      </p>

      <h3>Shipping rates & delivery estimates</h3>
      <p>
        Shipping charges for your order will be calculated and displayed at checkout.
      </p>
      <ul>
        <li><strong>Standard Shipping:</strong> 3-5 business days (Free for orders over $50)</li>
        <li><strong>Two-Day Shipping:</strong> 2 business days ($12.95)</li>
        <li><strong>Overnight Shipping:</strong> 1-2 business days ($24.95)</li>
      </ul>

      <h2>2. International Shipping Policy</h2>
      <p>
        We currently ship to over 50 countries worldwide. International shipping rates are calculated at checkout 
        based on your location and the weight of your order.
      </p>
      <p>
        Please note that you, the buyer, are responsible for any VAT, tariff, duty, taxes, handling fees, customs 
        clearance charges, etc. required by your country for importing consumer goods. We do not collect this 
        beforehand, and cannot give you an estimate of the cost.
      </p>

      <h2>3. Shipment confirmation & Order tracking</h2>
      <p>
        You will receive a Shipment Confirmation email once your order has shipped containing your tracking number(s). 
        The tracking number will be active within 24 hours.
      </p>
    </ProseLayout>
  );
}
