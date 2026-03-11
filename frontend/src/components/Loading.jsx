export default function Loading() {
  return (
    <div className="flex flex-col justify-center items-center h-full min-h-[300px] w-full">
      <div className="relative w-16 h-16">
        <div className="absolute inset-0 border-4 border-indigo-100 rounded-full"></div>
        <div className="absolute inset-0 border-4 border-indigo-600 rounded-full border-t-transparent animate-spin"></div>
      </div>
      <p className="mt-4 text-indigo-600 font-medium animate-pulse">Loading amazing things...</p>
    </div>
  );
}
