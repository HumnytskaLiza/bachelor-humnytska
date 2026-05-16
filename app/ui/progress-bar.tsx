type progressbarprops = {
  progress: number;
};

export default function ProgressBar({ progress }: progressbarprops) {
  return (
    <div className="w-full flex flex-col p-4 border border-gray-300 rounded-2xl">
      <div className="mb-2 flex justify-between text-sm font-semibold">
        <span>Progress</span>
        <span>{progress}%</span>
      </div>

      <div className="h-3 w-full rounded bg-gray-200">
        <div
          className="h-3 rounded bg-[#808bc5] transition-all"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
