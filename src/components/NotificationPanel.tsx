
import { useState } from "react";
import { Bell, X, CheckCircle2, Clock, BookOpen } from "lucide-react";

const notifications = [
  {
    id: 1,
    title: "Nova atividade disponível",
    description: "Uma nova atividade foi adicionada em Front-end.",
    time: "Há 10 minutos",
    icon: <BookOpen size={20} />,
  },
  {
    id: 2,
    title: "Prazo se aproximando",
    description: "Seu projeto de Banco de Dados vence amanhã.",
    time: "Há 1 hora",
    icon: <Clock size={20} />,
  },
  {
    id: 3,
    title: "Nota publicada",
    description: "Sua nota de UX/UI Design já está disponível.",
    time: "Ontem",
    icon: <CheckCircle2 size={20} />,
  },
];

function NotificationPanel() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="notification-panel">
      <button
        className="notification-panel__toggle"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Abrir notificações"
      >
        <Bell size={22} />
        <span className="notification-panel__badge">3</span>
      </button>

      {isOpen && (
        <div className="notification-panel__dropdown">
          <header className="notification-panel__header">
            <h2>Notificações</h2>

            <button
              onClick={() => setIsOpen(false)}
              aria-label="Fechar notificações"
            >
              <X size={20} />
            </button>
          </header>

          <div className="notification-panel__list">
            {notifications.map((notification) => (
              <article
                className="notification-panel__item"
                key={notification.id}
              >
                <div className="notification-panel__icon">
                  {notification.icon}
                </div>

                <div>
                  <strong>{notification.title}</strong>
                  <p>{notification.description}</p>
                  <small>{notification.time}</small>
                </div>
              </article>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default NotificationPanel;
