
import { useRef } from "react";
import { usePageAnimation } from "../hooks/usePageAnimation";
import { GraduationCap, TrendingUp } from "lucide-react";

const grades = [
  { subject: "Programação FrontEnd", grade: 9.2 },
  { subject: "UX/UI Design", grade: 8.8 },
  { subject: "Banco de Dados", grade: 8.1 },
];

function Grades() {
  const pageRef = useRef(null);
  usePageAnimation(pageRef);

  const average =
    grades.reduce((total, item) => total + item.grade, 0) / grades.length;

  return (
    <section className="page-section grades-page" ref={pageRef}>
      <div className="grades-heading">
        <div>
          <h1>Notas</h1>
          <p>Acompanhe seu desempenho acadêmico por disciplina.</p>
        </div>
        <GraduationCap size={34} />
      </div>

      <article className="grades-average">
        <div>
          <span>Média geral</span>
          <strong>{average.toFixed(1)}</strong>
          <p>Seu desempenho nas disciplinas</p>
        </div>
        <TrendingUp size={32} />
      </article>

      <div className="grades-list">
        {grades.map((item) => (
          <article className="grade-card" key={item.subject}>
            <div className="grade-card__info">
              <h2>{item.subject}</h2>
              <strong>{item.grade.toFixed(1)} <span>/ 10</span></strong>
            </div>

            <div
              className="grade-progress"
              role="progressbar"
              aria-valuenow={item.grade * 10}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-label={`Desempenho em ${item.subject}`}
            >
              <div
                className="grade-progress__bar"
                style={{ width: `${item.grade * 10}%` }}
              />
            </div>

            <p className="grade-card__status">
              {item.grade >= 7 ? "Bom desempenho" : "Precisa melhorar"}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}

export default Grades;

