
import { useRef, useState } from "react";
import {
  ClipboardList,
  Clock,
  CheckCircle2,
  AlertCircle,
  CalendarDays,
} from "lucide-react";
import { usePageAnimation } from "../hooks/usePageAnimation";

const activities = [
  {
    id: 1,
    title: "Projeto de interface web",
    subject: "Programação FrontEnd",
    date: "05/11/2026",
    status: "Pendente",
    type: "Projeto",
  },
  {
    id: 2,
    title: "Exercícios de modelagem",
    subject: "Banco de Dados",
    date: "03/11/2026",
    status: "Concluída",
    type: "Exercício",
  },
  {
    id: 3,
    title: "Protótipo de aplicativo",
    subject: "UX/UI Design",
    date: "30/10/2026",
    status: "Atrasada",
    type: "Trabalho",
  },
  {
    id: 4,
    title: "Atividade sobre React",
    subject: "Programação FrontEnd",
    date: "12/11/2026",
    status: "Pendente",
    type: "Exercício",
  },
];

function Activities() {
  const pageRef = useRef<HTMLElement>(null);
  usePageAnimation(pageRef);

  const [filter, setFilter] = useState("Todas");

  const filteredActivities =
    filter === "Todas"
      ? activities
      : activities.filter((activity) => activity.status === filter);

  const completed = activities.filter(
    (activity) => activity.status === "Concluída"
  ).length;

  const pending = activities.filter(
    (activity) => activity.status === "Pendente"
  ).length;

  const overdue = activities.filter(
    (activity) => activity.status === "Atrasada"
  ).length;

  return (
    <section className="page-section activities-page" ref={pageRef}>
      <div className="activities-heading">
        <div>
          <h1>Minhas atividades</h1>
          <p>Organize seus trabalhos, exercícios e entregas acadêmicas.</p>
        </div>
        <ClipboardList size={34} />
      </div>

      <div className="activities-summary">
        <article className="activity-summary-card" data-animate>
          <Clock size={22} />
          <span>Pendentes</span>
          <strong>{pending}</strong>
        </article>

        <article className="activity-summary-card" data-animate>
          <CheckCircle2 size={22} />
          <span>Concluídas</span>
          <strong>{completed}</strong>
        </article>

        <article className="activity-summary-card" data-animate>
          <AlertCircle size={22} />
          <span>Atrasadas</span>
          <strong>{overdue}</strong>
        </article>
      </div>

      <div className="activities-list-container" data-animate>
        <div className="activities-list-heading">
          <div>
            <h2>Lista de atividades</h2>
            <p>Acompanhe os prazos e o andamento das entregas.</p>
          </div>
          <CalendarDays size={25} />
        </div>

        <div className="activities-filters">
          {["Todas", "Pendente", "Concluída", "Atrasada"].map((item) => (
            <button
              key={item}
              type="button"
              className={filter === item ? "active" : ""}
              onClick={() => setFilter(item)}
            >
              {item}
            </button>
          ))}
        </div>

        <div className="activities-list">
          {filteredActivities.length > 0 ? (
            filteredActivities.map((activity) => (
              <article className="activity-item" key={activity.id}>
                <div className="activity-item__icon">
                  <ClipboardList size={21} />
                </div>

                <div className="activity-item__info">
                  <strong>{activity.title}</strong>
                  <span>{activity.subject}</span>
                  <small>{activity.type}</small>
                </div>

                <div className="activity-item__details">
                  <span>Entrega: {activity.date}</span>
                  <strong
                    className={`activity-status activity-status--${activity.status.toLowerCase()}`}
                  >
                    {activity.status}
                  </strong>
                </div>
              </article>
            ))
          ) : (
            <p className="activities-empty">
              Nenhuma atividade encontrada nesse filtro.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}

export default Activities;
