import { useState } from "react";
import { X, ChevronDown, UserPlus } from "lucide-react";
import SketchyButton from "@/components/SketchyButton";

interface ManageAccessModalProps {
  onClose: () => void;
}

const roles = ["Owner", "Contributor", "Viewer"] as const;

const mockMembers = [
  { name: "Dr. Sarah", email: "sarah@uni.edu", role: "Owner" as const, initials: "DS" },
  { name: "Prof. Kim", email: "kim@uni.edu", role: "Contributor" as const, initials: "PK" },
  { name: "Alex R.", email: "alex@uni.edu", role: "Viewer" as const, initials: "AR" },
];

export default function ManageAccessModal({ onClose }: ManageAccessModalProps) {
  const [members, setMembers] = useState(mockMembers);
  const [inviteEmail, setInviteEmail] = useState("");

  const roleColors = {
    Owner: "bg-marker-red/15 text-foreground",
    Contributor: "bg-marker-blue/15 text-foreground",
    Viewer: "bg-muted text-muted-foreground",
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/30 p-4">
      <div
        className="sketchy-border bg-card w-full max-w-lg p-6 animate-sketch-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-sketch text-foreground">Manage Team 📋</h2>
          <button
            onClick={onClose}
            className="text-muted-foreground hover:text-destructive transition-colors"
          >
            <X size={24} strokeWidth={3} />
          </button>
        </div>

        {/* Members list */}
        <div className="space-y-3 mb-6">
          {members.map((member, i) => (
            <div
              key={i}
              className="flex items-center gap-3 px-3 py-2 border-b-2 border-dashed border-ink/15"
            >
              <div className="w-9 h-9 rounded-full border-2 border-ink bg-paper-dark flex items-center justify-center text-sm font-sketch shrink-0">
                {member.initials}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-sketch text-foreground truncate">{member.name}</p>
                <p className="text-xs font-sketch text-muted-foreground truncate">{member.email}</p>
              </div>
              <select
                value={member.role}
                onChange={(e) => {
                  const updated = [...members];
                  updated[i] = { ...updated[i], role: e.target.value as typeof roles[number] };
                  setMembers(updated);
                }}
                className={`font-sketch text-sm px-3 py-1 border-2 border-ink rounded-[155px_10px_145px_10px/10px_145px_10px_155px] cursor-pointer ${roleColors[member.role]}`}
              >
                {roles.map((r) => (
                  <option key={r} value={r}>
                    {r}
                  </option>
                ))}
              </select>
            </div>
          ))}
        </div>

        {/* Invite section */}
        <div className="border-2 border-dashed border-ink/30 rounded-[255px_15px_225px_15px/15px_225px_15px_255px] p-4">
          <div className="flex items-center gap-2 mb-3">
            <UserPlus size={18} strokeWidth={2.5} />
            <span className="font-sketch text-foreground">Invite New Researcher</span>
          </div>
          <div className="flex gap-2">
            <input
              type="email"
              value={inviteEmail}
              onChange={(e) => setInviteEmail(e.target.value)}
              placeholder="researcher@university.edu"
              className="input-underline flex-1 text-sm"
            />
            <SketchyButton variant="primary" size="sm">
              Invite
            </SketchyButton>
          </div>
        </div>

        {/* Permissions note */}
        <p className="text-xs font-sketch text-muted-foreground mt-4 text-center italic">
          ✏️ Owners can delete • Contributors can edit • Viewers can read only
        </p>
      </div>
    </div>
  );
}
