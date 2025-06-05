import { Users } from "lucide-react";

export default function GroupCard({ group, currentUserId, onJoin, onSelect }) {
  console.log(group);
  const isJoined = group.joinees?.map((user) => user._id === currentUserId);

  return (
    <div
      className="bg-white rounded-2xl shadow p-4 hover:shadow-lg transition cursor-pointer"
      onClick={() => onSelect(group)}
    >
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-xl font-semibold">{group.title}</h2>
          <p className="text-gray-600 text-sm">{group.description}</p>
        </div>
        <span
          className={`text-xs px-2 py-1 rounded-full ${
            group.type === "public"
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {group.type}
        </span>
      </div>

      <div className="mt-4 flex items-center justify-between text-sm text-gray-500">
        <div className="flex items-center gap-2">
          <Users size={18} />
          <span>{group.joinees?.length || 0} members</span>
        </div>

        {!isJoined ? (
          <button
            onClick={(e) => {
              e.stopPropagation(); // Prevent triggering onSelect
              onJoin(group);
            }}
            className="text-blue-600 font-medium hover:underline"
          >
            Join
          </button>
        ) : (
          <span className="text-green-600 font-medium">Joined</span>
        )}
      </div>
    </div>
  );
}
