import { useMemo, useRef, useState } from "react";
import { usePageAnimation } from "../hooks/usePageAnimation";
import { ChevronLeft, ChevronRight, CalendarDays, BookOpen, ClipboardCheck } from "lucide-react";

const monthNames = [
  "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
  "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
];

type AcademicEvent = { date: string; title: string; subject: string; type: "Aula" | "Prova"; time: string };

const classSchedule = [
  { weekday: 1, subject: "Programação FrontEnd", time: "19:00 – 20:40", topic: "Componentes, HTML, CSS e interfaces" },
  { weekday: 2, subject: "Banco de Dados", time: "19:00 – 20:40", topic: "Modelagem relacional e consultas SQL" },
  { weekday: 3, subject: "UX/UI Design", time: "20:50 – 22:30", topic: "Experiência do usuário e prototipagem" },
  { weekday: 4, subject: "Programação FrontEnd", time: "19:00 – 20:40", topic: "JavaScript, React e projeto de interface" },
  { weekday: 5, subject: "Banco de Dados", time: "19:00 – 20:40", topic: "Relacionamentos, normalização e SQL" },
];

function dateKey(date: Date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}

function buildAcademicEvents(): AcademicEvent[] {
  const events: AcademicEvent[] = [];
  const start = new Date(2026, 7, 3); // 03/08/2026
  const lastClass = new Date(2026, 10, 20); // 20/11/2026

  for (const date = new Date(start); date <= lastClass; date.setDate(date.getDate() + 1)) {
    const weekday = date.getDay();
    const classInfo = classSchedule.find((item) => item.weekday === weekday);
    if (!classInfo) continue;
    events.push({
      date: dateKey(date),
      title: classInfo.subject,
      subject: `${classInfo.topic} • ${classInfo.time}`,
      type: "Aula",
      time: classInfo.time,
    });
  }

  // Semana de avaliações: última semana letiva de novembro (23 a 27/11/2026).
  const exams = [
    { day: 23, subject: "Programação FrontEnd" },
    { day: 24, subject: "Banco de Dados" },
    { day: 25, subject: "UX/UI Design" },
    { day: 26, subject: "Programação FrontEnd" },
    { day: 27, subject: "Banco de Dados" },
  ];
  exams.forEach((exam) => events.push({
    date: dateKey(new Date(2026, 10, exam.day)),
    title: `Prova • ${exam.subject}`,
    subject: "Semana de avaliações do semestre",
    type: "Prova",
    time: "19:00",
  }));

  return events;
}

const events = buildAcademicEvents();

function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date(2026, 10, 1));
  const pageRef = useRef<HTMLElement>(null);
  usePageAnimation(pageRef);

  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();
  const today = new Date();

  function previousMonth() {
    setCurrentDate(new Date(currentYear, currentMonth - 1, 1));
  }

  function nextMonth() {
    setCurrentDate(new Date(currentYear, currentMonth + 1, 1));
  }

  const firstDay = new Date(currentYear, currentMonth, 1).getDay();
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const startingDay = firstDay === 0 ? 6 : firstDay - 1;
  const calendarDays: (number | null)[] = [
    ...Array(startingDay).fill(null),
    ...Array.from({ length: daysInMonth }, (_, index) => index + 1),
  ];

  const monthEvents = useMemo(
    () => events.filter((event) => Number(event.date.slice(5, 7)) - 1 === currentMonth && Number(event.date.slice(0, 4)) === currentYear),
    [currentMonth, currentYear]
  );

  return (
    <section className="page-section calendar-page" ref={pageRef}>
      <div className="calendar-heading">
        <div>
          <h1>Calendário acadêmico</h1>
          <p>Aulas de agosto a novembro de 2026 e avaliações na última semana de novembro.</p>
        </div>
        <CalendarDays size={32} />
      </div>

      <div className="calendar-legend">
        <span><i className="calendar-legend__class" /> Aulas</span>
        <span><i className="calendar-legend__exam" /> Provas</span>
      </div>

      <div className="calendar-container">
        <div className="calendar-top">
          <button onClick={previousMonth} aria-label="Mês anterior"><ChevronLeft /></button>
          <h2>{monthNames[currentMonth]} de {currentYear}</h2>
          <button onClick={nextMonth} aria-label="Próximo mês"><ChevronRight /></button>
        </div>

        <div className="calendar-grid">
          {["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"].map((day) => <strong key={day}>{day}</strong>)}
          {calendarDays.map((day, index) => {
            const key = day ? dateKey(new Date(currentYear, currentMonth, day)) : "";
            const dayEvents = monthEvents.filter((event) => event.date === key);
            const isToday = day === today.getDate() && currentMonth === today.getMonth() && currentYear === today.getFullYear();
            return (
              <div className={`calendar-day ${isToday ? "today" : ""} ${dayEvents.some((event) => event.type === "Prova") ? "has-exam" : ""}`} key={`${key}-${index}`}>
                {day && <>
                  <span>{day}</span>
                  {dayEvents.map((event) => (
                    <small className={`calendar-event ${event.type === "Prova" ? "calendar-event--exam" : ""}`} key={`${event.date}-${event.title}`} title={`${event.title} — ${event.subject}`}>
                      {event.type === "Prova" ? "Prova" : event.title}
                    </small>
                  ))}
                </>}
              </div>
            );
          })}
        </div>
      </div>

      <section className="calendar-agenda" aria-label="Programação do mês">
        <div className="calendar-agenda__heading">
          <div><h2>Programação de {monthNames[currentMonth]}</h2><p>{monthEvents.length} compromissos acadêmicos neste mês</p></div>
          <BookOpen size={25} />
        </div>
        {monthEvents.length ? (
          <div className="calendar-agenda__list">
            {monthEvents.map((event) => (
              <article className={`calendar-agenda__item ${event.type === "Prova" ? "is-exam" : ""}`} key={`${event.date}-${event.title}`}>
                <div className="calendar-agenda__date"><strong>{event.date.slice(8, 10)}</strong><span>{monthNames[currentMonth].slice(0, 3)}</span></div>
                <div className="calendar-agenda__info"><strong>{event.title}</strong><span>{event.subject}</span></div>
                <span className="calendar-agenda__tag">{event.type === "Prova" ? <><ClipboardCheck size={14} /> Avaliação</> : event.time}</span>
              </article>
            ))}
          </div>
        ) : <p className="calendar-agenda__empty">Não há aulas ou avaliações cadastradas para este mês.</p>}
      </section>
    </section>
  );
}

export default Calendar;
