
import { useRef, useState } from "react";
import {
  Wallet,
  CalendarDays,
  CheckCircle2,
  Clock,
  FileText,
  CreditCard,
  ChevronRight,
} from "lucide-react";
import { usePageAnimation } from "../hooks/usePageAnimation";

const payments = [
  {
    month: "Outubro 2026",
    date: "10/10/2026",
    value: "R$ 684,13",
    status: "Pago",
  },
  {
    month: "Novembro 2026",
    date: "10/11/2026",
    value: "R$ 684,13",
    status: "Pendente",
  },
  {
    month: "Dezembro 2026",
    date: "10/12/2026",
    value: "R$ 684,13",
    status: "Em aberto",
  },
];

function Finance() {
  const pageRef = useRef<HTMLElement>(null);
  usePageAnimation(pageRef);

  const [showDetails, setShowDetails] = useState(false);

  return (
    <section className="page-section finance-page" ref={pageRef}>
      <div className="finance-heading">
        <div>
          <h1>Financeiro</h1>
          <p>Consulte suas mensalidades e acompanhe seus pagamentos.</p>
        </div>
        <Wallet size={34} />
      </div>

      <div className="finance-summary" data-animate>
        <div className="finance-summary__icon">
          <CreditCard size={25} />
        </div>
        <div>
          <span>Mensalidade atual</span>
          <strong>R$ 684,13</strong>
          <small>Valor mensal do curso</small>
        </div>
      </div>

      <div className="finance-cards">
        <article className="finance-card" data-animate>
          <div className="finance-card__icon">
            <CalendarDays size={21} />
          </div>
          <span>Próximo vencimento</span>
          <strong>10/11/2026</strong>
          <small>Mensalidade de novembro</small>
        </article>

        <article className="finance-card" data-animate>
          <div className="finance-card__icon">
            <CheckCircle2 size={21} />
          </div>
          <span>Situação atual</span>
          <strong className="finance-status">Em dia</strong>
          <small>Nenhuma mensalidade atrasada</small>
        </article>
      </div>

      <div className="finance-history" data-animate>
        <div className="finance-history__heading">
          <div>
            <h2>Histórico de mensalidades</h2>
            <p>Acompanhe os lançamentos do semestre.</p>
          </div>
          <FileText size={25} />
        </div>

        <div className="finance-payment-list">
          {payments.map((payment) => (
            <article className="finance-payment" key={payment.month}>
              <div className="finance-payment__icon">
                <FileText size={20} />
              </div>

              <div className="finance-payment__info">
                <strong>{payment.month}</strong>
                <span>Vencimento: {payment.date}</span>
              </div>

              <div className="finance-payment__value">
                <strong>{payment.value}</strong>
                <span className={`payment-status payment-status--${payment.status.toLowerCase().replace(" ", "-")}`}>
                  {payment.status}
                </span>
              </div>
            </article>
          ))}
        </div>

        <button
          className="finance-details-button"
          type="button"
          onClick={() => setShowDetails(!showDetails)}
        >
          {showDetails ? "Ocultar detalhes" : "Ver detalhes"}
          <ChevronRight size={18} />
        </button>

        {showDetails && (
          <div className="finance-details">
            <Clock size={20} />
            <p>
              Os valores e datas apresentados são demonstrativos e podem ser
              alterados conforme o calendário financeiro da instituição.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

export default Finance;
