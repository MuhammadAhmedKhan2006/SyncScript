import { useState } from "react";
import { Plus, Users, Clock, MoreHorizontal, Star, Trash2 } from "lucide-react";
import SketchyButton from "@/components/SketchyButton";
import SketchyCard from "@/components/SketchyCard";
import { useNavigate } from "react-router-dom";

interface Vault {
  id: number;
  title: string;
  description: string;
  collaborators: string[];
  lastUpdated: string;
  color: string;
  isFavorite?: boolean;
}

const initialVaults: Vault[] = [
  {
    id: 1,
    title: "Biology Research",
    description: "Cellular biology and molecular structures",
    collaborators: ["AS", "BK", "CM"],
    lastUpdated: "2 hours ago",
    color: "bg-marker-blue/10",
    isFavorite: false,
  },
  {
    id: 2,
    title: "Quantum Physics Lab",
    description: "Wave-particle duality experiments",
    collaborators: ["DR", "EF"],
    lastUpdated: "5 hours ago",
    color: "bg-marker-green/10",
    isFavorite: false,
  },
  {
    id: 3,
    title: "AI Ethics Paper",
    description: "Fairness and bias in machine learning",
    collaborators: ["AS", "GH", "IJ", "KL"],
    lastUpdated: "1 day ago",
    color: "bg-marker-red/10",
    isFavorite: false,
  },
  {
    id: 4,
    title: "Climate Data Analysis",
    description: "Historical temperature patterns",
    collaborators: ["BK"],
    lastUpdated: "3 days ago",
    color: "bg-marker-yellow/10",
    isFavorite: false,
  },
];

export default function MyVaults() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [vaults, setVaults] = useState<Vault[]>(initialVaults);
  const [openMenuId, setOpenMenuId] = useState<number | null>(null);

  const filtered = vaults.filter((v) =>
    v.title.toLowerCase().includes(search.toLowerCase())
  );

  const toggleFavorite = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setVaults(vaults.map(v => 
      v.id === id ? { ...v, isFavorite: !v.isFavorite } : v
    ));
    setOpenMenuId(null);
  };

  const deleteVault = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setVaults(vaults.filter(v => v.id !== id));
    setOpenMenuId(null);
  };

  const toggleMenu = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setOpenMenuId(openMenuId === id ? null : id);
  };

  return (
    <div className="animate-sketch-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 sm:mb-8">
        <div className="min-w-0">
          <h1 className="text-2xl sm:text-3xl font-sketch text-foreground truncate">My Vaults 📂</h1>
          <p className="text-muted-foreground font-sketch text-sm sm:text-base">
            Your personal knowledge repositories
          </p>
        </div>
        <SketchyButton variant="primary" className="flex items-center gap-2" onClick={() => navigate("/dashboard/new-vault")}>
          <Plus size={20} strokeWidth={2.5} />
          New Vault
        </SketchyButton>
      </div>

      {/* Search */}
      <div className="mb-6">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search vaults..."
          className="input-underline w-full sm:max-w-sm text-base sm:text-lg"
        />
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {filtered.map((vault, i) => (
          <div key={vault.id} className="relative">
            <SketchyCard
              variant={i % 2 === 0 ? "default" : "alt"}
              className={`cursor-pointer hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-sketch-hover transition-all group ${
                vault.isFavorite ? "ring-2 ring-marker-yellow" : ""
              }`}
              onClick={() => navigate(`/dashboard/vault/${vault.id}`)}
            >
              {/* Color strip */}
              <div className={`h-3 -mx-4 -mt-4 mb-4 ${vault.color} rounded-t-lg`} />

              {/* Three dots menu */}
              <button
                onClick={(e) => toggleMenu(vault.id, e)}
                className="absolute top-6 right-4 p-1 hover:bg-paper-dark rounded-full transition-colors z-10"
              >
                <MoreHorizontal size={18} strokeWidth={2.5} className="text-muted-foreground" />
              </button>

              {/* Dropdown menu */}
              {openMenuId === vault.id && (
                <div className="absolute top-12 right-4 sketchy-border-sm bg-card shadow-sketch z-20 min-w-[140px]">
                  <button
                    onClick={(e) => toggleFavorite(vault.id, e)}
                    className="w-full flex items-center gap-2 px-3 py-2 text-sm font-sketch text-foreground hover:bg-paper-dark transition-colors"
                  >
                    <Star 
                      size={14} 
                      strokeWidth={2.5} 
                      className={vault.isFavorite ? "fill-marker-yellow text-marker-yellow" : "text-muted-foreground"}
                    />
                    {vault.isFavorite ? "Unfavorite" : "Favorite"}
                  </button>
                  <button
                    onClick={(e) => deleteVault(vault.id, e)}
                    className="w-full flex items-center gap-2 px-3 py-2 text-sm font-sketch text-destructive hover:bg-destructive/10 transition-colors"
                  >
                    <Trash2 size={14} strokeWidth={2.5} />
                    Delete
                  </button>
                </div>
              )}

              {/* Favorite star indicator */}
              {vault.isFavorite && (
                <Star 
                  size={16} 
                  className="absolute top-6 left-4 fill-marker-yellow text-marker-yellow"
                  strokeWidth={2.5}
                />
              )}

              <h3 className="text-xl font-sketch text-foreground mb-1 group-hover:text-primary transition-colors">
                {vault.title}
              </h3>
              <p className="text-sm font-sketch text-muted-foreground mb-4">
                {vault.description}
              </p>

              <div className="flex items-center justify-between">
                {/* Avatars */}
                <div className="flex items-center gap-1">
                  <Users size={16} strokeWidth={2.5} className="text-muted-foreground mr-1" />
                  <div className="flex -space-x-2">
                    {vault.collaborators.slice(0, 3).map((initials, j) => (
                      <div
                        key={j}
                        className="w-7 h-7 rounded-full border-2 border-ink bg-paper-dark flex items-center justify-center text-xs font-sketch"
                      >
                        {initials}
                      </div>
                    ))}
                    {vault.collaborators.length > 3 && (
                      <div className="w-7 h-7 rounded-full border-2 border-dashed border-ink bg-paper flex items-center justify-center text-xs font-sketch">
                        +{vault.collaborators.length - 3}
                      </div>
                    )}
                  </div>
                </div>

                {/* Time */}
                <div className="flex items-center gap-1 text-xs font-sketch text-muted-foreground">
                  <Clock size={12} strokeWidth={2.5} />
                  {vault.lastUpdated}
                </div>
              </div>
            </SketchyCard>
          </div>
        ))}

        {/* New vault card */}
        <div
          className="btn-dashed flex flex-col items-center justify-center min-h-[180px] cursor-pointer group"
          onClick={() => navigate("/dashboard/new-vault")}
        >
          <Plus
            size={36}
            strokeWidth={2}
            className="text-muted-foreground group-hover:text-foreground transition-colors mb-2"
          />
          <span className="font-sketch text-muted-foreground group-hover:text-foreground transition-colors">
            Create New Vault
          </span>
        </div>
      </div>
    </div>
  );
}
