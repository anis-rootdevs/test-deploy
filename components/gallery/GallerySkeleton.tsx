const GallerySkeleton = () => {
  return (
    <section className="max-w-[1320px] mx-auto py-12 md:py-20 px-4">
      {/* Desktop & Tablet */}
      <div className="hidden md:grid md:grid-cols-3 gap-4">
        {[1, 2, 3].map((col) => (
          <div key={col} className="flex flex-col gap-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className={`rounded-md overflow-hidden bg-gray-200 animate-pulse 
                ${i % 2 === 0 ? "h-[449px]" : "h-[272px]"}`}
              >
                <div className="w-full h-full bg-gradient-to-br from-gray-300 to-gray-200 animate-pulse" />
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* Mobile */}
      <div className="md:hidden grid grid-cols-1 gap-3">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="h-[300px] rounded-md bg-gray-200 animate-pulse overflow-hidden"
          >
            <div className="w-full h-full bg-gradient-to-br from-gray-300 to-gray-200 animate-pulse" />
          </div>
        ))}
      </div>
    </section>
  );
};

export default GallerySkeleton;
