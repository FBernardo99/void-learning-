
import { useRef, useState } from "react";
import {
  Library,
  FileText,
  Video,
  Link as LinkIcon,
  Search,
  BookOpen,
  Download,
  ExternalLink,
} from "lucide-react";
import { usePageAnimation } from "../hooks/usePageAnimation";

const materials = [
  {
    id: 1,
    title: "Introdução ao React",
    subject: "Programação FrontEnd",
    type: "PDF",
    description: "Material introdutório sobre componentes, props e estados.",
    icon: FileText,
  },
  {
    id: 2,
    title: "Fundamentos de UX Design",
    subject: "UX/UI Design",
    type: "PDF",
    description: "Conceitos de experiência do usuário e usabilidade.",
    icon: FileText,
  },
  {
    id: 3,
    title: "Modelagem de Banco de Dados",
    subject: "Banco de Dados",
    type: "Vídeo",
    description: "Aula sobre entidades, relacionamentos e diagramas.",
    icon: Video,
  },
  {
    id: 4,
    title: "Documentação JavaScript",
    subject: "Programação FrontEnd",
    type: "Link",
    description: "Referência para consulta de recursos da linguagem.",
    icon: LinkIcon,
  },
  {
    id: 5,
    title: "Prototipagem de Interfaces",
    subject: "UX/UI Design",
    type: "Vídeo",
    description: "Conteúdo sobre criação e organização de protótipos.",
    icon: Video,
  },
  {
    id: 6,
    title: "SQL para iniciantes",
    subject: "Banco de Dados",
    type: "PDF",
    description: "Apostila com conceitos básicos e comandos SQL.",
    icon: FileText,
  },
];

function Materials() {
  const pageRef = useRef<HTMLElement>(null);
  usePageAnimation(pageRef);

  const [search, setSearch] = useState("");
  const [subjectFilter, setSubjectFilter] = useState("Todas");
  const [typeFilter, setTypeFilter] = useState("Todos");

  const filteredMaterials = materials.filter((material) => {
    const matchesSearch =
      material.title.toLowerCase().includes(search.toLowerCase()) ||
      material.subject.toLowerCase().includes(search.toLowerCase());

    const matchesSubject =
      subjectFilter === "Todas" || material.subject === subjectFilter;

    const matchesType =
      typeFilter === "Todos" || material.type === typeFilter;

    return matchesSearch && matchesSubject && matchesType;
  });

  return (
    <section className="page-section materials-page" ref={pageRef}>
      <div className="materials-heading">
        <div>
          <h1>Materiais de estudo</h1>
          <p>Encontre apostilas, vídeos e conteúdos das suas disciplinas.</p>
        </div>
        <Library size={34} />
      </div>

      <div className="materials-summary" data-animate>
        <div className="materials-summary__icon">
          <BookOpen size={25} />
        </div>
        <div>
          <span>Biblioteca acadêmica</span>
          <strong>{materials.length} materiais disponíveis</strong>
          <small>Conteúdos organizados por disciplina</small>
        </div>
      </div>

      <div className="materials-controls">
        <div className="materials-search">
          <Search size={19} />
          <input
            type="text"
            placeholder="Buscar material..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            aria-label="Buscar material"
          />
        </div>

        <select
          value={subjectFilter}
          onChange={(event) => setSubjectFilter(event.target.value)}
          aria-label="Filtrar por disciplina"
        >
          <option value="Todas">Todas as disciplinas</option>
          <option value="Programação FrontEnd">Programação FrontEnd</option>
          <option value="UX/UI Design">UX/UI Design</option>
          <option value="Banco de Dados">Banco de Dados</option>
        </select>

        <select
          value={typeFilter}
          onChange={(event) => setTypeFilter(event.target.value)}
          aria-label="Filtrar por tipo"
        >
          <option value="Todos">Todos os tipos</option>
          <option value="PDF">PDF</option>
          <option value="Vídeo">Vídeo</option>
          <option value="Link">Link</option>
        </select>
      </div>

      <div className="materials-grid">
        {filteredMaterials.length > 0 ? (
          filteredMaterials.map((material) => {
            const Icon = material.icon;

            return (
              <article
                className="material-card"
                key={material.id}
                data-animate
              >
                <div className="material-card__header">
                  <div className="material-card__icon">
                    <Icon size={23} />
                  </div>
                  <span className="material-card__type">
                    {material.type}
                  </span>
                </div>

                <h2>{material.title}</h2>
                <span className="material-card__subject">
                  {material.subject}
                </span>
                <p>{material.description}</p>

                <button
                  type="button"
                  className="material-card__button"
                  onClick={() =>
                    window.alert(
                      "Este material é demonstrativo. O arquivo ou conteúdo será disponibilizado pela instituição."
                    )
                  }
                >
                  {material.type === "Link" ? (
                    <>
                      Acessar material <ExternalLink size={17} />
                    </>
                  ) : (
                    <>
                      Visualizar material <Download size={17} />
                    </>
                  )}
                </button>
              </article>
            );
          })
        ) : (
          <p className="materials-empty">
            Nenhum material encontrado com esses filtros.
          </p>
        )}
      </div>
    </section>
  );
}

export default Materials;
