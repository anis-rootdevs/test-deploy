"use client";

interface TermsData {
  terms: string;
  policy: string;
}

export default function TermsAndConditions({ terms }: { terms: TermsData }) {
  return (
    <div className="min-h-screen max-w-[1320px] mx-auto px-4">
      {/* Header */}
      <div className="border-b border-gray-200">
        <div className="py-8">
          <div className="flex flex-col items-start gap-1.5 mb-2">
            <h1 className="text-lg md:text-xl font-jost font-bold text-gray-900 dark:text-gray-100">
              Terms & Conditions
            </h1>
            <p className="text-gray-600 dark:text-gray-400  text-base">
              Please read our terms and conditions carefully
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className=" py-8">
        {/* Tabs */}
        <div className=" rounded-lg shadow-sm border border-gray-200  mb-6">
          {/* Content Area */}
          <div className="p-3 md:p-4 lg:p-6">
            <div
              className="prose max-w-none prose-gray dark:prose-invert prose-ul:list-disc prose-ol:list-decimal prose-ul:pl-6 prose-ol:pl-6 prose-li:my-1"
              dangerouslySetInnerHTML={{ __html: terms?.terms || "" }}
            ></div>
          </div>
        </div>

        {/* Footer Note */}
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 md:p-6">
          <h3 className="text-sm font-semibold text-blue-900 dark:text-blue-300 mb-2">
            Questions or Concerns?
          </h3>
          <p className="text-sm text-blue-800 dark:text-blue-400">
            If you have any questions about our terms or privacy policy, please
            contact us at{" "}
            <a
              href="mailto:support@example.com"
              className="underline hover:no-underline"
            >
              rootdevs@example.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
