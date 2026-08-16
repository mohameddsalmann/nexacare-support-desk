import type { ReactNode } from "react";

export function SessionCard({
  title,
  action,
  children,
}: {
  title: string;
  action?: ReactNode;
  children: ReactNode;
}) {
  return (
    <section className="tp-card p-4">
      <div className="mb-3 flex items-center justify-between gap-2">
        <h3 className="tp-eyebrow">{title}</h3>
        {action}
      </div>
      {children}
    </section>
  );
}
