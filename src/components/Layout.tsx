import { Outlet } from 'react-router';
import Sidebar from './Sidebar';

export default function Layout() {
  return (
    <div className="min-h-screen bg-[#F8F7F5]">
      <Sidebar />
      <main className="lg:ml-[240px] min-h-screen">
        <div className="max-w-[900px] mx-auto px-4 sm:px-6 py-6 lg:py-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
