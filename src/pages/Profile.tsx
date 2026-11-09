
import { useRef, useState } from "react";
import { gsap } from "gsap";
import { usePageAnimation } from "../hooks/usePageAnimation";

function Profile() {
  const pageRef = useRef(null);
  const feedbackRef = useRef<HTMLParagraphElement>(null);

  usePageAnimation(pageRef);

  const [name, setName] = useState("Maria Silva");
  const [email, setEmail] = useState("maria@exemplo.com");
  const [course, setCourse] = useState("Tecnologia da Informação");
  const [saved, setSaved] = useState(false);

  function saveProfile(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaved(true);

    requestAnimationFrame(() => {
      if (feedbackRef.current) {
        gsap.fromTo(
          feedbackRef.current,
          { opacity: 0, y: -10 },
          { opacity: 1, y: 0, duration: 0.35 }
        );
      }
    });
  }

  return (
    <section className="page-section" ref={pageRef}>
      <h1>Perfil</h1>
      <p>Atualize suas informações pessoais.</p>

      <form className="profile-form" onSubmit={saveProfile}>
        <label htmlFor="name">Nome</label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(event) => {
            setName(event.target.value);
            setSaved(false);
          }}
          required
        />

        <label htmlFor="email">E-mail</label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(event) => {
            setEmail(event.target.value);
            setSaved(false);
          }}
          required
        />

        <label htmlFor="course">Curso</label>
        <input
          id="course"
          type="text"
          value={course}
          onChange={(event) => {
            setCourse(event.target.value);
            setSaved(false);
          }}
          required
        />

        <button type="submit">Salvar alterações</button>

        {saved && (
          <p ref={feedbackRef} role="status">
            Informações atualizadas com sucesso!
          </p>
        )}
      </form>
    </section>
  );
}

export default Profile;
