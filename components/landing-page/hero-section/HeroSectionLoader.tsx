export default function HeroSectionLoader() {
  return (
    <div className="flex flex-col items-center justify-center animate-pulse space-y-4 py-10">
      <div className="h-6 w-40 bg-gray-300 rounded"></div>
      <div className="h-6 w-80 bg-gray-300 rounded"></div>
      <div className="h-64 w-full max-w-4xl bg-gray-200 rounded"></div>
      <div className="h-4 w-1/2 bg-gray-300 rounded"></div>
    </div>
  );
}
