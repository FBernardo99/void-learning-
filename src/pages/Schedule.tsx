
import { useRef } from "react";
import {
  Clock,
  MapPin,
  UserRound,
  CalendarDays,
  BookOpen,
} from "lucide-react";
import { usePageAnimation } from "../hooks/usePageAnimation";

const schedule = [
  {
    day: "Segunda-feira",
    classes: [
      {
        subject: "Programação FrontEnd",
        teacher: "Profa. Ana",
        time: "19:00 – 20:40",
        building: "Bloco A",
        room: "Sala 12",
      },
    ],
  },
  {
    day: "Terça-feira",
    classes: [
      {
        subject: "Banco de Dados",
        teacher: "Profa. Marina",
        time: "19:00 – 20:40",
        building: "Bloco B",
        room: "Sala 08",
      },
    ],
  },
  {
    day: "Quarta-feira",
    classes: [
      {
        subject: "UX/UI Design",
        teacher: "Prof. Carlos",
        time: "20:50 – 22:30",
        building: "Bloco A",
        room: "Sala 15",
      },
    ],
  },
  {
    day: "Quinta-feira",
    classes: [
      {
        subject: "Programação FrontEnd",
        teacher: "Profa. Ana",
        time: "19:00 – 20:40",
        building: "Bloco A",
        room: "Sala 12",
      },
    ],
  },
  {
    day: "Sexta-feira",
    classes: [
      {
        subject: "Banco de Dados",
        teacher: "Profa. Marina",
        time: "19:00 – 20:40",
        building: "Bloco B",
        room: "Sala 08",
      },
    ],
  },
];

function Schedule() {
  const pageRef = useRef<HTMLElement>(null);
  usePageAnimation(pageRef);

  return (
    <section className="page-section schedule-page" ref={pageRef}>
      <div className="schedule-page__heading">
        <div>
          <h1>Horários das aulas</h1>
          <p>Consulte sua programação semanal de aulas.</p>
        </div>
        <CalendarDays size={34} />
      </div>

      <div className="schedule-page__summary">
        <BookOpen size={24} />
        <div>
          <strong>{schedule.length} dias de aula</strong>
          <span>Programação semanal</span>
        </div>
      </div>

      <div className="schedule-page__list">
        {schedule.map((day) => (
          <section className="schedule-day" key={day.day} data-animate>
            <h2>{day.day}</h2>

            {day.classes.map((item) => (
              <article
                className="schedule-class"
                key={`${item.subject}-${item.time}`}
              >
                <div className="schedule-class__main">
                  <h3>{item.subject}</h3>

                  <div className="schedule-class__details">
                    <span>
                      <Clock size={16} />
                      {item.time}
                    </span>

                    <span>
                      <UserRound size={16} />
                      {item.teacher}
                    </span>

                    <span>
                      <MapPin size={16} />
                      {item.building} • {item.room}
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </section>
        ))}
      </div>
    </section>
  );
}

export default Schedule;
