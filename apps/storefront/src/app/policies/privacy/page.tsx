import { ProseLayout } from '@/components/static/ProseLayout';

export default function PrivacyPolicyPage() {
  return (
    <ProseLayout title="Privacy Policy" lastUpdated="July 15, 2026">
      <p>
        At our company, we are committed to protecting your personal information and your right to privacy. 
        If you have any questions or concerns about our policy, or our practices with regards to your personal 
        information, please contact us at privacy@example.com.
      </p>

      <h2>1. What Information Do We Collect?</h2>
      <p>
        <strong>Personal information you disclose to us:</strong> We collect personal information that you 
        voluntarily provide to us when registering at the Services expressing an interest in obtaining 
        information about us or our products and services.
      </p>
      <ul>
        <li>Name and Contact Data</li>
        <li>Credentials (Passwords, hints, etc.)</li>
        <li>Payment Data</li>
      </ul>

      <h2>2. How Do We Use Your Information?</h2>
      <p>
        We use personal information collected via our Services for a variety of business purposes described below. 
        We process your personal information for these purposes in reliance on our legitimate business interests.
      </p>
      <ul>
        <li>To facilitate account creation and logon process.</li>
        <li>To send administrative information to you.</li>
        <li>To fulfill and manage your orders.</li>
      </ul>

      <h2>3. Will Your Information Be Shared With Anyone?</h2>
      <p>
        We only share and disclose your information in the following situations:
      </p>
      <ul>
        <li><strong>Compliance with Laws:</strong> We may disclose your information where we are legally required to do so.</li>
        <li><strong>Vital Interests and Legal Rights:</strong> We may disclose your information where we believe it is necessary to investigate, prevent, or take action regarding potential violations of our policies.</li>
      </ul>

      <h2>4. Do We Use Cookies and Other Tracking Technologies?</h2>
      <p>
        We may use cookies and similar tracking technologies (like web beacons and pixels) to access or store information. 
        Specific information about how we use such technologies and how you can refuse certain cookies is set out in our Cookie Policy.
      </p>
    </ProseLayout>
  );
}
