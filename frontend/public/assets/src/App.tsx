import { Sidebar } from './components/Sidebar';
import { MainContent } from './components/MainContent';

export default function App() {
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <MainContent />
    </div>
  );
}
