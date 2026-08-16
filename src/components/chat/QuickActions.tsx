const ACTIONS = [
  "Check my bill",
  "Internet problem",
  "Change my plan",
  "Speak to an expert",
];

export function QuickActions({
  onSelect,
  disabled,
}: {
  onSelect: (text: string) => void;
  disabled?: boolean;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {ACTIONS.map((a) => (
        <button
          key={a}
          type="button"
          disabled={disabled}
          onClick={() => onSelect(a)}
          className="tp-lift min-h-11 rounded-lg border border-line bg-background px-3.5 py-2 text-sm text-foreground hover:border-tp-pink/50 hover:text-tp-pink disabled:opacity-50"
        >
          {a}
        </button>
      ))}
    </div>
  );
}
