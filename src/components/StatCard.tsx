import type { ReactNode } from "react";
interface StatCardProps {
  icon: ReactNode;
  value: string;
  label: string;
}
function StatCard({ icon, value, label }: StatCardProps) {
  return (
    <article className="stat-card">
      <div className="stat-card__icon">{icon}</div>
      <strong>{value}</strong>
      <span>{label}</span>
    </article>
  );
}
export default StatCard;
