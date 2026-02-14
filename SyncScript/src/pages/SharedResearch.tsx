import { FolderOpen, Clock, User, X } from "lucide-react";
import BackButton from "@/components/BackButton";

const sharedVaults = [
  { id: 1, name: "Quantum Physics Lab", owner: "Dr. Smith", role: "Viewer", lastActive: "2 mins ago" },
  { id: 2, name: "Machine Learning Notes", owner: "Prof. Chen", role: "Contributor", lastActive: "1 hour ago" },
  { id: 3, name: "Organic Chemistry", owner: "Dr. Lee", role: "Contributor", lastActive: "3 hours ago" },
  { id: 4, name: "Statistics 101", owner: "Prof. Adams", role: "Viewer", lastActive: "2 days ago" },
  { id: 5, name: "Neural Networks", owner: "Dr. Smith", role: "Viewer", lastActive: "5 days ago" },
];

const roleBadge = {
  Owner: "bg-marker-red/15 border-marker-red/40",
  Contributor: "bg-marker-blue/15 border-marker-blue/40",
  Viewer: "bg-muted border-muted-foreground/30",
};

export default function SharedResearch() {
  return (
    <div className="animate-sketch-in">
      <BackButton label="Back to Dashboard" />
      <div className="mb-8">
        <h1 className="text-3xl font-sketch text-foreground">Shared with Me 🤝</h1>
        <p className="text-muted-foreground font-sketch">
          Research vaults others have shared with you
        </p>
      </div>

      <div className="sketchy-border bg-card overflow-hidden">
        {/* Header row */}
        <div className="grid grid-cols-[2fr_1fr_1fr_1fr_auto] gap-4 px-4 py-3 border-b-2 border-ink/20 text-sm font-sketch text-muted-foreground">
          <span>Project</span>
          <span>Owner</span>
          <span>Role</span>
          <span>Last Active</span>
          <span></span>
        </div>

        {sharedVaults.map((vault, i) => (
          <div
            key={vault.id}
            className={`grid grid-cols-[2fr_1fr_1fr_1fr_auto] gap-4 px-4 py-3 items-center hover:bg-paper-dark transition-colors cursor-pointer ${
              i < sharedVaults.length - 1 ? "border-b-2 border-dashed border-ink/10" : ""
            }`}
          >
            <div className="flex items-center gap-2">
              <FolderOpen size={18} strokeWidth={2.5} className="text-marker-blue shrink-0" />
              <span className="font-sketch text-foreground">{vault.name}</span>
            </div>
            <div className="flex items-center gap-1.5 text-sm font-sketch text-muted-foreground">
              <div className="w-6 h-6 rounded-full border-2 border-ink bg-paper-dark flex items-center justify-center text-[10px]">
                {vault.owner.split(" ").map(w => w[0]).join("")}
              </div>
              {vault.owner}
            </div>
            <span
              className={`inline-block text-xs font-sketch px-2 py-0.5 border rounded-[155px_10px_145px_10px/10px_145px_10px_155px] w-fit ${
                roleBadge[vault.role as keyof typeof roleBadge]
              }`}
            >
              {vault.role}
            </span>
            <div className="flex items-center gap-1 text-xs font-sketch text-muted-foreground">
              <Clock size={12} strokeWidth={2.5} />
              {vault.lastActive}
            </div>
            <button className="text-muted-foreground hover:text-destructive transition-colors" title="Leave">
              <X size={16} strokeWidth={3} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
