import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router";
import { Search, Moon, Sun, User, ArrowRight } from "lucide-react";
import NotificationPanel from "./NotificationPanel";

type HeaderProps = {
  theme: "light" | "dark";
  onToggleTheme: () => void;
};

type SearchItem = {
  title: string;
  detail: string;
  section: string;
  path: string;
  keywords?: string;
};

// Índice dos conteúdos demonstrativos disponíveis nas páginas do portal.
const searchItems: SearchItem[] = [
  { title: "Início", detail: "Página inicial do portal", section: "Menu lateral", path: "/dashboard", keywords: "home painel principal dashboard" },
  { title: "Disciplinas", detail: "Consulte suas disciplinas", section: "Menu lateral", path: "/cursos", keywords: "cursos matérias grade curricular" },
  { title: "Atividades", detail: "Trabalhos e entregas", section: "Menu lateral", path: "/atividades", keywords: "tarefas exercícios projetos pendências" },
  { title: "Materiais", detail: "Arquivos e conteúdos de estudo", section: "Menu lateral", path: "/materiais", keywords: "pdf vídeos documentos arquivos" },
  { title: "Notas", detail: "Notas e desempenho acadêmico", section: "Menu lateral", path: "/notas", keywords: "boletim média avaliações desempenho" },
  { title: "Calendário", detail: "Aulas e avaliações", section: "Menu lateral", path: "/calendario", keywords: "datas semestre provas eventos" },
  { title: "Horários", detail: "Grade semanal de aulas", section: "Menu lateral", path: "/horarios", keywords: "agenda segunda terça quarta quinta sexta" },
  { title: "Financeiro", detail: "Informações financeiras", section: "Menu lateral", path: "/financeiro", keywords: "mensalidade pagamentos cobrança" },
  { title: "Perfil", detail: "Dados do estudante", section: "Menu lateral", path: "/perfil", keywords: "conta usuário estudante cadastro" },
];

function Header({ theme, onToggleTheme }: HeaderProps) {
  const darkMode = theme === "dark";
  const [search, setSearch] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const searchRef = useRef<HTMLInputElement>(null);

  const results = useMemo(() => {
    const normalized = search.trim().toLocaleLowerCase("pt-BR");
    if (!normalized) return [];
    return searchItems.filter((item) =>
      `${item.title} ${item.detail} ${item.section} ${item.keywords ?? ""}`
        .toLocaleLowerCase("pt-BR").includes(normalized)
    ).slice(0, 8);
  }, [search]);

  useEffect(() => {
    function handleShortcut(event: KeyboardEvent) {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        searchRef.current?.focus();
        setIsSearchOpen(true);
      }
      if (event.key === "Escape") setIsSearchOpen(false);
    }
    window.addEventListener("keydown", handleShortcut);
    return () => window.removeEventListener("keydown", handleShortcut);
  }, []);

  return (
    <header className="header">
      <div className="header__search-wrapper">
        <div className="header__search">
          <Search size={20} />
          <input
            ref={searchRef}
            type="search"
            placeholder="Pesquisar disciplinas, atividades, materiais..."
            aria-label="Pesquisar no portal"
            value={search}
            onChange={(event) => { setSearch(event.target.value); setIsSearchOpen(true); }}
            onFocus={() => setIsSearchOpen(true)}
            onBlur={() => window.setTimeout(() => setIsSearchOpen(false), 150)}
          />
          <kbd>Ctrl + K</kbd>
        </div>
        {isSearchOpen && search.trim() && (
          <div className="global-search-results" role="listbox" aria-label="Resultados da pesquisa">
            {results.length > 0 ? results.map((item) => (
              <Link
                to={item.path}
                className="global-search-result"
                key={`${item.section}-${item.title}`}
                onMouseDown={(event) => event.preventDefault()}
                onClick={() => {
                  setSearch("");
                  setIsSearchOpen(false);
                  searchRef.current?.blur();
                }}
              >
                <span className="global-search-result__text">
                  <strong>{item.title}</strong>
                  <small>{item.detail}</small>
                </span>
                <span className="global-search-result__section">{item.section}</span>
                <ArrowRight size={16} />
              </Link>
            )) : (
              <p className="global-search-empty">Nenhum item encontrado para “{search}”.</p>
            )}
          </div>
        )}
      </div>

      <div className="header__actions">
        <NotificationPanel />
        <button
          type="button"
          className={`header__theme-button ${darkMode ? "active" : ""}`}
          onClick={onToggleTheme}
          aria-label={darkMode ? "Ativar tema claro" : "Ativar tema escuro"}
          aria-pressed={darkMode}
          title={darkMode ? "Ativar tema claro" : "Ativar tema escuro"}
        >
          {darkMode ? <Sun size={21} /> : <Moon size={21} />}
        </button>
        <div className="header__profile">
          <div className="header__avatar"><User size={20} /></div>
          <div><strong>Felipe</strong><span>Estudante</span></div>
        </div>
      </div>
    </header>
  );
}

export default Header;
