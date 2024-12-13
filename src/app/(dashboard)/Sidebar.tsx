import { Logo } from './logo';
import SidebarRoutes from './SidebarRoutes';

const Sidebar = () => {
  return (
    <aside className="hidden lg:flex fixed flex flex-col left-0 shrink-0 h-full">
      <Logo />
      <SidebarRoutes />
    </aside>
  );
};

export default Sidebar;
