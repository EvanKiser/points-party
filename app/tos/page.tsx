import Link from "next/link";
import { getSEOTags } from "@/libs/seo";
import config from "@/config";

// CHATGPT PROMPT TO GENERATE YOUR TERMS & SERVICES — replace with your own data 👇

// 1. Go to https://chat.openai.com/
// 2. Copy paste bellow
// 3. Replace the data with your own (if needed)
// 4. Paste the answer from ChatGPT directly in the <pre> tag below

// You are an excellent lawyer.

// I need your help to write a simple Terms & Services for my website. Here is some context:
// - Website: https://shipfa.st
// - Name: ShipFast
// - Contact information: marc@shipfa.st
// - Description: A JavaScript code boilerplate to help entrepreneurs launch their startups faster
// - Ownership: when buying a package, users can download code to create apps. They own the code but they do not have the right to resell it. They can ask for a full refund within 7 day after the purchase.
// - User data collected: name, email and payment information
// - Non-personal data collection: web cookies
// - Link to privacy-policy: https://shipfa.st/privacy-policy
// - Governing Law: France
// - Updates to the Terms: users will be updated by email

// Please write a simple Terms & Services for my site. Add the current date. Do not add or explain your reasoning. Answer:

export const metadata = getSEOTags({
  title: `Terms and Conditions | ${config.appName}`,
  canonicalUrlRelative: "/tos",
});

const TOS = () => {
  return (
    <main className="max-w-xl mx-auto">
      <div className="p-5">
        <Link href="/" className="btn btn-ghost">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="w-5 h-5"
          >
            <path
              fillRule="evenodd"
              d="M15 10a.75.75 0 01-.75.75H7.612l2.158 1.96a.75.75 0 11-1.04 1.08l-3.5-3.25a.75.75 0 010-1.08l3.5-3.25a.75.75 0 111.04 1.08L7.612 9.25h6.638A.75.75 0 0115 10z"
              clipRule="evenodd"
            />
          </svg>
          Back
        </Link>
        <h1 className="text-3xl font-extrabold pb-6">
          Terms and Conditions for {config.appName}
        </h1>

        <pre
          className="leading-relaxed whitespace-pre-wrap"
          style={{ fontFamily: "sans-serif" }}
        >
          {`Last Updated: October 10, 2023

Introduction
Welcome to Points Party. This Privacy Policy governs your use of our website, https://pointsparty.io ("Website"), and outlines how we collect, use, and disclose your personal and non-personal information.

Ownership
By purchasing our service, you have the right to be notified of new notifications as well as access to our database of current deals. You are not permitted to resell this information. You can ask for a full refund within 7 days after the purchase.

Information We Collect
Personal Data
We collect the following personal data:

Name
Email
Payment Information
Non-Personal Data
We also collect non-personal data, which includes but is not limited to:

Web Cookies
How We Use Your Information
We use your personal data to:

Notify you of cheap airline tickets bookable using airline miles and credit card points
Process payments
Communicate with you about updates to our service
Disclosure of Your Information
We do not sell, trade, or otherwise transfer your personal data to third parties.

Governing Law
This Privacy Policy is governed by the laws of the United States of America.

Updates to This Policy
We reserve the right to update this Privacy Policy at any time. Any changes will be posted on this page, and we will notify you by email.

Contact Us
If you have any questions about this Privacy Policy, please contact us at evan@mail.pointsparty.io.`}


        </pre>
      </div>
    </main>
  );
};

export default TOS;
