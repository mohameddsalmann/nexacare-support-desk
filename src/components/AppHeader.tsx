import tpLogo from "@/assets/TPlogo2025.svg.asset.json";

export function AppHeader() {
  return (
    <header className="sticky top-0 z-30 bg-background">
      <div className="bg-[#000] text-[oklch(0.85_0_0)]">
        <div className="mx-auto flex h-8 max-w-[1400px] items-center justify-between px-4 text-[11px] sm:px-6">
          <span className="tracking-wide">Demo environment · Fictional data</span>
          <span className="hidden sm:inline tracking-wide">NexaCare Telecom · Support</span>
        </div>
      </div>

      <div className="border-b border-line">
        <div className="mx-auto flex min-h-16 max-w-[1400px] items-center justify-between gap-4 px-4 py-3 sm:px-6">
          <div className="flex items-center gap-3 sm:gap-4">
            <img src={tpLogo.url} alt="TP" className="h-8 w-8 shrink-0" />
            <span className="hidden h-6 w-px bg-line sm:block" />
            <div className="leading-tight">
              <h1 className="text-base font-semibold text-foreground sm:text-lg">
                NexaCare AI Support
              </h1>
              <p className="text-xs text-muted-foreground">Conversational AI demo</p>
            </div>
          </div>

          <div className="flex items-center gap-3 sm:gap-5">
            <span className="hidden tp-eyebrow lg:inline">AI customer support</span>
            <span className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-3 py-1.5 text-xs font-medium text-foreground">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full rounded-full bg-ok opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-ok" />
              </span>
              Online
            </span>
          </div>
        </div>
      </div>

      <div className="tp-stripe h-[3px] w-full" aria-hidden="true" />
    </header>
  );
}
