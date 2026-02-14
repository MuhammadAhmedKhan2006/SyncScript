import { useState } from "react";
import { Plus, Users, Clock, MoreHorizontal, Star, Trash2 } from "lucide-react";
import SketchyCard from "@/components/SketchyCard";
import BackButton from "@/components/BackButton";
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

export default function Favorites() {
  const navigate = useNavigate();
  const [vaults, setVaults] = useState<Vault[]>(initialVaults);
  const [openMenuId, setOpenMenuId] = useState<number | null>(null);

  const favoriteVaults = vaults.filter(v => v.isFavorite);

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
      <BackButton label="Back to Dashboard" />
      
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-sketch text-foreground">Favorites ⭐</h1>
        <p className="text-muted-foreground font-sketch">
          Your starred vaults for quick access
        </p>
      </div>

      {favoriteVaults.length === 0 ? (
        <div className="sketchy-border bg-card p-12 text-center">
          <Star size={48} className="mx-auto text-muted-foreground/40 mb-4" strokeWidth={1.5} />
          <p className="text-xl font-sketch text-muted-foreground mb-2">
            No favorites yet
          </p>
          <p className="text-sm font-sketch text-muted-foreground/60">
            Click the three dots on any vault and select "Favorite" to add it here
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {favoriteVaults.map((vault, i) => (
            <div key={vault.id} className="relative">
              <SketchyCard
                variant={i % 2 === 0 ? "default" : "alt"}
                className="cursor-pointer hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-sketch-hover transition-all group ring-2 ring-marker-yellow"
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
                        className="fill-marker-yellow text-marker-yellow"
                      />
                      Unfavorite
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
                <Star 
                  size={16} 
                  className="absolute top-6 left-4 fill-marker-yellow text-marker-yellow"
                  strokeWidth={2.5}
                />

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
        </div>
      )}
    </div>
  );
}
