const SkeletonLoader = ({ colCount = 3, refProp }) => {
  const randomHeights = [250, 270, 320, 400, 420, 300];
  const boxes = Array.from({ length: 9 }, (_, i) => `box${i + 1}`);

  const getRandomHeight = () => {
    const idx = Math.floor(Math.random() * randomHeights.length);
    return randomHeights[idx];
  };

  // split boxes into columns
  const columns = Array.from({ length: colCount }, () => []);
  boxes.forEach((box, idx) => {
    columns[idx % colCount].push(box);
  });

  return (
    <div className="flex flex-row gap-4 px-4">
      {columns.map((col, colIndex) => (
        <div key={colIndex} className="flex flex-col">
          {col.map((box, idx) => {
            const height = getRandomHeight();
            // add ref only to first skeleton box
            const isFirst = colIndex === 0 && idx === 0;
            return (
              <div
                key={box}
                className="group animate-pulse bg-gray-300 rounded-xl my-4 break-inside-avoid w-[90vw] sm:w-[45vw] lg:w-[30vw] h-max"
                style={{ height: `${height}px` }}
                ref={isFirst ? refProp : null}
              ></div>
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default SkeletonLoader;
