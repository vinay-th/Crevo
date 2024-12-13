import Navbar from './Navbar';
import Sidebar from './Sidebar';

interface layoutProps {
  children: React.ReactNode;
}

const layout = ({ children }: layoutProps) => {
  return (
    <div className="bg-muted min-h-screen">
      <Sidebar />
      <div className="lg:pl-[300px] flex flex-col h-full">
        <Navbar />
        <main
          className="bg-white flex-1 overflow-auto p-8 lg:rounded-tl-2xl"
          style={{ minHeight: 'calc(100vh - 68px)' }}
        >
          {children}
        </main>
      </div>
    </div>
  );
};

export default layout;
