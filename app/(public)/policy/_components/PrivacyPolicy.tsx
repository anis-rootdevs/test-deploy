"use client";

interface TermsData {
  terms: string;
  policy: string;
}

export default function PrivacyPolicy({ policy }: { policy: TermsData }) {
  return (
    <div className="min-h-screen max-w-[1320px] mx-auto px-4">
      {/* Header */}
      <div className="border-b border-gray-200 dark:border-gray-700">
        <div className="py-8">
          <div className="flex flex-col items-start gap-1.5 mb-2">
            <h1 className="text-lg md:text-xl font-jost font-bold text-gray-900 dark:text-gray-100">
              Privacy Policy
            </h1>
            <p className="text-gray-600 dark:text-gray-400 text-base">
              Please read our privacy policy carefully
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="py-8">
        {/* Content Card */}
        <div className="rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 mb-6 bg-white dark:bg-gray-800">
          {/* Content Area */}
          <div className="p-3 md:p-4 lg:p-6">
            <div
              className="prose prose-gray dark:prose-invert max-w-none
                prose-headings:font-bold prose-headings:text-gray-900 dark:prose-headings:text-gray-100
                prose-h4:text-base prose-h4:leading-relaxed
                prose-p:text-gray-700 dark:prose-p:text-gray-300 prose-p:leading-relaxed
                prose-a:text-primary hover:prose-a:text-primary/80 prose-a:no-underline hover:prose-a:underline
                prose-strong:text-gray-900 dark:prose-strong:text-gray-100 prose-strong:font-semibold
                prose-em:text-gray-800 dark:prose-em:text-gray-200
                prose-ul:text-gray-700 dark:prose-ul:text-gray-300 prose-ul:list-disc prose-ul:pl-6
                prose-ol:text-gray-700 dark:prose-ol:text-gray-300 prose-ol:list-decimal prose-ol:pl-6
                prose-li:text-gray-700 dark:prose-li:text-gray-300 prose-li:my-1 prose-li:leading-relaxed
                marker:text-gray-500 dark:marker:text-gray-400"
              dangerouslySetInnerHTML={{
                __html: policy?.policy || "",
              }}
            />
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
