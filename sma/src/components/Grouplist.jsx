import { useEffect, useState } from "react";
import axios from "axios";
import GroupCard from "./Groupcard";
import GroupChat from "./GroupChat";

export default function GroupList({ currentUserId }) {
  const [groups, setGroups] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/groups")
      .then((res) => setGroups(res.data || []))
      .catch((err) => console.error("Failed to fetch groups", err));
  }, []);

  const handleJoinGroup = async (group) => {
    const alreadyJoined = group.joinees?.some((j) => j._id === currentUserId);
    if (!alreadyJoined) {
      try {
        await axios.post(`http://localhost:8000/api/groups/${group._id}/join`, {
          userId: currentUserId,
        });

        // Update joinees locally
        setGroups((prev) =>
          prev.map((g) =>
            g._id === group._id
              ? {
                  ...g,
                  joinees: [...(g.joinees || []), { _id: currentUserId }],
                }
              : g
          )
        );
      } catch (err) {
        console.error("Failed to join group:", err);
        alert("Could not join group.");
        return;
      }
    }
    console.log(selectedGroup);
  };

  if (selectedGroup) {
    return (
      <GroupChat
        group={selectedGroup}
        currentUserId={currentUserId}
        onBack={() => setSelectedGroup(null)}
      />
    );
  } else if (!groups || groups.length === 0) {
    return <div className="p-6 text-gray-500">No groups available</div>;
  } else
    return (
      <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {groups.map((group) => (
          <GroupCard
            key={group._id}
            group={group}
            onJoin={handleJoinGroup}
            currentUserId={currentUserId}
            onSelect={setSelectedGroup}
          />
        ))}
      </div>
    );
}
