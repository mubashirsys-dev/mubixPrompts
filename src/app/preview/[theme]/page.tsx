"use client";

import { useParams } from "next/navigation";
import { designStyles } from "@/lib/design-styles";
import { ThemePreview } from "@/components/builder/theme-preview";
import { useMemo, useState } from "react";

export default function StandalonePreviewPage() {
  const params = useParams();
  const [device, setDevice] = useState<"desktop" | "tablet" | "mobile">("desktop");
  const themeId = params?.theme as string;

  const style = useMemo(() => {
    return designStyles.find(s => s.id === themeId) || designStyles[0];
  }, [themeId]);

  return (
    <main className="w-screen h-screen bg-[#08080a] overflow-hidden flex flex-col">
      {/* We pass isStandalone={true} to let ThemePreview run in native fullscreen workbench directly on page load */}
      <ThemePreview 
        style={style} 
        device={device} 
        setDevice={setDevice} 
        isStandalone={true} 
      />
    </main>
  );
}
