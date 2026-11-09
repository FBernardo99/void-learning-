
import { Navigate, Route, Routes } from "react-router";

import Layout from "./components/Layout";
import Calendar from "./pages/Calendar";
import Courses from "./pages/Courses";
import Dashboard from "./pages/Dashboard";
import Grades from "./pages/Grades";
import NotFound from "./pages/NotFound";
import Profile from "./pages/Profile";
import Schedule from "./pages/Schedule";
import Finance from "./pages/FinancePage";
import Activities from "./pages/ActivitiesPage";
import Materials from "./pages/Materials";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Navigate to="/dashboard" replace />} />

        <Route path="dashboard" element={<Dashboard />} />
        <Route path="cursos" element={<Courses />} />
        <Route path="disciplinas" element={<Courses />} />
        <Route path="atividades" element={<Activities />} />
        <Route path="materiais" element={<Materials />} />
        <Route path="notas" element={<Grades />} />
        <Route path="calendario" element={<Calendar />} />
        <Route path="horarios" element={<Schedule />} />
        <Route path="financeiro" element={<Finance />} />
        <Route path="perfil" element={<Profile />} />

        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;

