export default function RecapTab() {
  return (
    <div>
      <h2 className="text-lg font-semibold mb-2">Recap</h2>
      <div className="space-y-2">
        <p className="p-2 bg-gray-100 dark:bg-gray-800 rounded">
          <span className="font-medium">[10:02] Professor:</span> Today we will discuss...
        </p>
        <p className="p-2 bg-gray-100 dark:bg-gray-800 rounded">
          <span className="font-medium">[10:05] Student:</span> I have a question about...
        </p>
      </div>
    </div>
  );
}