import { Routes, Route } from 'react-router';
import Landing from './pages/Landing';
import Login from './pages/Login';
import AppLayout from './components/AppLayout';
import AuthGuard from './components/AuthGuard';
import Dashboard from './pages/Dashboard';
import Lessons from './pages/Lessons';
import LessonDetail from './pages/LessonDetail';
import Vocabulary from './pages/Vocabulary';
import Writing from './pages/Writing';
import Exams from './pages/Exams';
import Menarini from './pages/Menarini';

export default function App() {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />

      {/* Protected app pages - con sidebar funcional */}
      <Route element={<AuthGuard><AppLayout /></AuthGuard>}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/lecciones" element={<Lessons />} />
        <Route path="/leccion/:id" element={<LessonDetail />} />
        <Route path="/vocabulario" element={<Vocabulary />} />
        <Route path="/escritura" element={<Writing />} />
        <Route path="/examenes" element={<Exams />} />
        <Route path="/menarini" element={<Menarini />} />
      </Route>
    </Routes>
  );
}
