import { useState, useRef } from "react";
import { Camera, Check } from "lucide-react";
import SketchyButton from "@/components/SketchyButton";
import BackButton from "@/components/BackButton";
import { toast } from "@/hooks/use-toast";

const preferences = [
  { id: "notifications", label: "Email Notifications", checked: true },
  { id: "nightowl", label: 'Night Owl Mode 🦉', checked: false },
  { id: "publicProfile", label: "Public Profile", checked: true },
];

export default function SettingsPage() {
  const [prefs, setPrefs] = useState(preferences);
  const [name, setName] = useState("Dr. Researcher");
  const [title, setTitle] = useState("AI & Neuroscience");
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const togglePref = (id: string) => {
    setPrefs((prev) =>
      prev.map((p) => (p.id === id ? { ...p, checked: !p.checked } : p))
    );
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Check file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: "File too large",
          description: "Please select an image under 5MB",
          variant: "destructive",
        });
        return;
      }

      // Check file type
      if (!file.type.startsWith('image/')) {
        toast({
          title: "Invalid file type",
          description: "Please select an image file",
          variant: "destructive",
        });
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarUrl(reader.result as string);
        toast({
          title: "Photo updated",
          description: "Your profile photo has been changed",
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveChanges = () => {
    // Save to localStorage (in a real app, this would be an API call)
    localStorage.setItem('userProfile', JSON.stringify({
      name,
      title,
      avatarUrl,
      preferences: prefs,
    }));

    toast({
      title: "Settings saved",
      description: "Your changes have been saved successfully",
    });
  };

  const handleDeleteAccount = () => {
    if (window.confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
      toast({
        title: "Account deletion requested",
        description: "Your account will be deleted within 24 hours",
        variant: "destructive",
      });
    }
  };

  const getInitials = () => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  return (
    <div className="animate-sketch-in max-w-2xl mx-auto">
      <BackButton label="Back to Dashboard" />
      <div className="mb-8">
        <h1 className="text-3xl font-sketch text-foreground">Settings ⚙️</h1>
        <p className="text-muted-foreground font-sketch">Customize your research station</p>
      </div>

      {/* Profile Card */}
      <div className="sketchy-border bg-card p-6 mb-6">
        <h3 className="text-lg font-sketch text-foreground mb-4 border-b-2 border-dashed border-ink/30 pb-2">
          Your ID Card
        </h3>
        <div className="flex items-start gap-6">
          {/* Avatar */}
          <div className="text-center">
            <div className="w-20 h-20 rounded-full border-2 border-ink bg-paper-dark flex items-center justify-center text-2xl font-sketch mb-2 overflow-hidden">
              {avatarUrl ? (
                <img src={avatarUrl} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                getInitials()
              )}
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handlePhotoChange}
              className="hidden"
            />
            <button 
              onClick={() => fileInputRef.current?.click()}
              className="text-xs font-sketch text-primary hover:underline flex items-center gap-1 mx-auto"
            >
              <Camera size={12} />
              Change
            </button>
          </div>

          {/* Fields */}
          <div className="flex-1 space-y-4">
            <div>
              <label className="text-sm font-sketch text-muted-foreground block mb-1">
                Display Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="input-underline w-full text-lg"
              />
            </div>
            <div>
              <label className="text-sm font-sketch text-muted-foreground block mb-1">
                Research Title
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="input-underline w-full text-lg"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Preferences */}
      <div className="sketchy-border-alt bg-card p-6 mb-6">
        <h3 className="text-lg font-sketch text-foreground mb-4 border-b-2 border-dashed border-ink/30 pb-2">
          Preferences
        </h3>
        <div className="space-y-3">
          {prefs.map((pref) => (
            <button
              key={pref.id}
              onClick={() => togglePref(pref.id)}
              className="w-full flex items-center gap-3 text-left px-2 py-1.5 hover:bg-paper-dark rounded transition-colors"
            >
              <div
                className={`w-6 h-6 border-2 border-ink rounded-sm flex items-center justify-center transition-colors ${
                  pref.checked ? "bg-primary" : "bg-transparent"
                }`}
              >
                {pref.checked && <Check size={14} strokeWidth={3} className="text-primary-foreground" />}
              </div>
              <span className="font-sketch text-foreground">{pref.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between">
        <SketchyButton variant="primary" onClick={handleSaveChanges}>
          Save Changes
        </SketchyButton>
        <SketchyButton 
          variant="danger" 
          size="sm" 
          className="line-through decoration-2"
          onClick={handleDeleteAccount}
        >
          Delete Account
        </SketchyButton>
      </div>
    </div>
  );
}
