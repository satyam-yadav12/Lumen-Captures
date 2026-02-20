const SkeletonLoader = () => {
  const randomHeights = [250, 270, 320, 400, 420, 300];
  const boxes = Array.from({ length: 9 }, (_, i) => `box${i + 1}`);

  const getRandomHeight = () => {
    const idx = Math.floor(Math.random() * randomHeights.length);
    return randomHeights[idx];
  };

  return (
    <div className="coulumns-1 sm:columns-2 lg:columns-3 max-screen overflow-hidden gap-4 px-4">
      {boxes.map((val) => {
        const height = getRandomHeight();
        return (
          <div
            key={val}
            className="group animate-pulse bg-gray-300 rounded-xl mb-6 break-inside-avoid w-[90vw] sm:w-[45vw] lg:w-[30vw] h-max"
            style={{ height: `${height}px` }}
          ></div>
        );
      })}
    </div>
  );
};

export default SkeletonLoader;
