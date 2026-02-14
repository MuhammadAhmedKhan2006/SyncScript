import { useState } from "react";
import {
  FileText,
  Link2,
  Upload,
  Send,
  Plus,
  Paperclip,
  Share2,
  Sparkles,
} from "lucide-react";
import SketchyButton from "@/components/SketchyButton";
import BackButton from "@/components/BackButton";
import ManageAccessModal from "@/components/ManageAccessModal";
import { useNavigate, useParams } from "react-router-dom";

const mockResources = [
  { id: 1, name: "Biology_Report.pdf", type: "pdf", aiSummary: true },
  { id: 2, name: "Experiment_Data.pdf", type: "pdf", aiSummary: false },
  { id: 3, name: "Research Paper Link", type: "link", aiSummary: true },
  { id: 4, name: "Lab_Notes_v3.pdf", type: "pdf", aiSummary: false },
];

const mockChat = [
  { user: "Dr. Sarah", message: "I've uploaded the latest findings", time: "10:32 AM" },
  { user: "Prof. Kim", message: "The abstract needs revision", time: "10:45 AM" },
  { user: "System", message: "Dr. Sarah updated Biology_Report.pdf — v2", time: "11:02 AM" },
];

const collaborators = [
  { initials: "DS", name: "Dr. Sarah", online: true },
  { initials: "PK", name: "Prof. Kim", online: true },
  { initials: "AR", name: "Alex R.", online: false },
];

export default function VaultWorkspace() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [chatInput, setChatInput] = useState("");
  const [showAccess, setShowAccess] = useState(false);
  const [selectedResource, setSelectedResource] = useState<number | null>(null);

  return (
    <div className="animate-sketch-in h-[calc(100vh-3rem)]">
      {/* Top bar */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <BackButton label="" />
          <h1 className="text-2xl font-sketch text-foreground">Biology Research</h1>
        </div>
        <SketchyButton
          variant="default"
          size="sm"
          className="flex items-center gap-2"
          onClick={() => setShowAccess(true)}
        >
          <Share2 size={16} strokeWidth={2.5} />
          Share
        </SketchyButton>
      </div>

      {/* 3-Column Layout */}
      <div className="flex gap-4 h-[calc(100%-3.5rem)]">
        {/* Left: Resources */}
        <div className="w-1/5 min-w-[200px] flex flex-col">
          <div className="sketchy-border bg-card p-3 flex-1 flex flex-col">
            <h3 className="text-lg font-sketch text-foreground mb-3 border-b-2 border-dashed border-ink/30 pb-2">
              Project Files
            </h3>
            <input
              type="file"
              className="hidden"
              id="file-upload"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  // Mock upload for now
                  console.log("File selected:", file.name);
                  alert(`File selected: ${file.name}`);
                }
              }}
            />
            <SketchyButton
              variant="dashed"
              size="sm"
              className="w-full flex items-center justify-center gap-2 mb-3"
              onClick={() => document.getElementById("file-upload")?.click()}
            >
              <Upload size={16} strokeWidth={2.5} />
              Upload
            </SketchyButton>

            <div className="flex-1 overflow-y-auto space-y-2">
              {mockResources.map((res) => (
                <button
                  key={res.id}
                  onClick={() => setSelectedResource(res.id)}
                  className={`w-full text-left flex items-center gap-2 px-2 py-2 rounded-[155px_10px_145px_10px/10px_145px_10px_155px] transition-all text-sm font-sketch ${selectedResource === res.id
                      ? "bg-primary/10 border-2 border-ink shadow-sketch-sm"
                      : "hover:bg-paper-dark border-2 border-transparent"
                    }`}
                >
                  {res.type === "pdf" ? (
                    <FileText size={16} strokeWidth={2.5} className="text-marker-red shrink-0" />
                  ) : (
                    <Link2 size={16} strokeWidth={2.5} className="text-marker-blue shrink-0" />
                  )}
                  <span className="truncate">{res.name}</span>
                  {res.aiSummary && (
                    <Sparkles size={12} className="text-marker-yellow shrink-0 ml-auto" />
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Center: Document viewer */}
        <div className="flex-1 flex flex-col">
          <div className="sketchy-border-alt bg-card flex-1 relative flex items-center justify-center">
            {/* Paperclip decoration */}
            <Paperclip
              size={32}
              strokeWidth={2}
              className="absolute -top-4 right-6 text-muted-foreground rotate-45"
            />

            {selectedResource ? (
              <div className="text-center p-8">
                <FileText size={64} strokeWidth={1.5} className="mx-auto text-muted-foreground mb-4" />
                <p className="text-xl font-sketch text-foreground mb-2">
                  {mockResources.find((r) => r.id === selectedResource)?.name}
                </p>
                <p className="text-sm font-sketch text-muted-foreground mb-4">
                  PDF viewer would render here
                </p>
                <div className="sketchy-border-sm inline-block px-4 py-2 bg-marker-yellow/10">
                  <div className="flex items-center gap-2">
                    <Sparkles size={16} className="text-marker-yellow" />
                    <span className="text-sm font-sketch">AI Summary Available</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center p-8">
                <FileText size={64} strokeWidth={1.5} className="mx-auto text-muted-foreground/40 mb-4" />
                <p className="text-xl font-sketch text-muted-foreground">
                  Select a resource to view
                </p>
                <p className="text-sm font-sketch text-muted-foreground/60 mt-1">
                  Click on a PDF or link from the sidebar
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Right: Collaboration */}
        <div className="w-1/4 min-w-[220px] flex flex-col gap-4">
          {/* Researchers */}
          <div className="sketchy-border bg-card p-3">
            <h3 className="text-base font-sketch text-foreground mb-3 border-b-2 border-dashed border-ink/30 pb-2">
              Researchers
            </h3>
            <div className="space-y-2">
              {collaborators.map((c, i) => (
                <div key={i} className="flex items-center gap-2">
                  <div className="relative">
                    <div className="w-8 h-8 rounded-full border-2 border-ink bg-paper-dark flex items-center justify-center text-xs font-sketch">
                      {c.initials}
                    </div>
                    <div
                      className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-card ${c.online ? "bg-marker-green" : "bg-muted-foreground/30"
                        }`}
                    />
                  </div>
                  <span className="text-sm font-sketch">{c.name}</span>
                </div>
              ))}
              {/* Invite button */}
              <button
                onClick={() => setShowAccess(true)}
                className="w-8 h-8 rounded-full border-2 border-dashed border-ink flex items-center justify-center hover:bg-paper-dark transition-colors"
              >
                <Plus size={16} strokeWidth={2.5} />
              </button>
            </div>
          </div>

          {/* Chat / Field Notes */}
          <div className="sketchy-border-alt bg-card p-3 flex-1 flex flex-col">
            <h3 className="text-base font-sketch text-foreground mb-3 border-b-2 border-dashed border-ink/30 pb-2">
              Scribbles 💬
            </h3>
            <div className="flex-1 overflow-y-auto space-y-3 mb-3">
              {mockChat.map((msg, i) => (
                <div
                  key={i}
                  className={`text-sm font-sketch ${msg.user === "System"
                      ? "text-muted-foreground italic text-xs border-l-2 border-dashed border-marker-blue pl-2"
                      : ""
                    }`}
                >
                  {msg.user !== "System" && (
                    <span className="font-bold text-foreground">{msg.user}: </span>
                  )}
                  <span className={msg.user === "System" ? "" : "text-foreground"}>
                    {msg.message}
                  </span>
                  <span className="block text-xs text-muted-foreground/60 mt-0.5">{msg.time}</span>
                </div>
              ))}
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                placeholder="Write a note..."
                className="input-underline flex-1 text-sm"
              />
              <SketchyButton variant="ghost" size="sm">
                <Send size={16} strokeWidth={2.5} />
              </SketchyButton>
            </div>
          </div>
        </div>
      </div>

      {showAccess && <ManageAccessModal onClose={() => setShowAccess(false)} />}
    </div>
  );
}
