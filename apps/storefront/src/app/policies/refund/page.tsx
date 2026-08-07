import { ProseLayout } from '@/components/static/ProseLayout';

export default function RefundPolicyPage() {
  return (
    <ProseLayout title="Refund Policy" lastUpdated="January 5, 2026">
      <p>
        We want you to be completely satisfied with your purchase. If you are not entirely happy, we're here to help.
      </p>

      <h2>1. Returns</h2>
      <p>
        You have 30 calendar days to return an item from the date you received it. To be eligible for a return, 
        your item must be unused and in the same condition that you received it. Your item must be in the original 
        packaging.
      </p>
      <p>
        Your item needs to have the receipt or proof of purchase.
      </p>

      <h2>2. Refunds</h2>
      <p>
        Once we receive your item, we will inspect it and notify you that we have received your returned item. 
        We will immediately notify you on the status of your refund after inspecting the item.
      </p>
      <p>
        If your return is approved, we will initiate a refund to your credit card (or original method of payment). 
        You will receive the credit within a certain amount of days, depending on your card issuer's policies.
      </p>

      <h2>3. Non-returnable Items</h2>
      <p>
        Certain types of items cannot be returned, like perishable goods, custom products (such as special orders 
        or personalized items), and personal care goods (such as beauty products). Please get in touch if you have 
        questions or concerns about your specific item.
      </p>

      <h2>4. Shipping for Returns</h2>
      <p>
        You will be responsible for paying for your own shipping costs for returning your item. Shipping costs are 
        non-refundable. If you receive a refund, the cost of return shipping will be deducted from your refund.
      </p>
    </ProseLayout>
  );
}
