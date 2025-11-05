import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

interface SidebarProps {
  userRole: 'admin' | 'manager';
  activeTab: string;
  onTabChange: (tab: string) => void;
  onLogout: () => void;
}

const Sidebar = ({ userRole, activeTab, onTabChange, onLogout }: SidebarProps) => {
  return (
    <aside className="w-64 min-h-screen bg-sidebar text-sidebar-foreground border-r border-sidebar-border flex flex-col">
      <div className="p-6 border-b border-sidebar-border">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-sidebar-primary rounded-lg">
            <Icon name="Car" size={24} className="text-sidebar-primary-foreground" />
          </div>
          <div>
            <h1 className="text-xl font-bold">CRM Автопарк</h1>
            <Badge variant="outline" className="mt-1 text-xs border-sidebar-accent text-sidebar-foreground">
              {userRole === 'admin' ? 'Администратор' : 'Менеджер'}
            </Badge>
          </div>
        </div>
      </div>
      
      <nav className="p-4 space-y-2 flex-1">
        <button
          onClick={() => onTabChange('dashboard')}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
            activeTab === 'dashboard' 
              ? 'bg-sidebar-accent text-sidebar-accent-foreground' 
              : 'hover:bg-sidebar-accent/50'
          }`}
        >
          <Icon name="LayoutDashboard" size={20} />
          <span className="font-medium">Дашборд</span>
        </button>
        
        <button
          onClick={() => onTabChange('vehicles')}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
            activeTab === 'vehicles' 
              ? 'bg-sidebar-accent text-sidebar-accent-foreground' 
              : 'hover:bg-sidebar-accent/50'
          }`}
        >
          <Icon name="Car" size={20} />
          <span className="font-medium">Автомобили</span>
        </button>
        
        <button
          onClick={() => onTabChange('clients')}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
            activeTab === 'clients' 
              ? 'bg-sidebar-accent text-sidebar-accent-foreground' 
              : 'hover:bg-sidebar-accent/50'
          }`}
        >
          <Icon name="Users" size={20} />
          <span className="font-medium">Клиенты</span>
        </button>
        
        <button
          onClick={() => onTabChange('contracts')}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
            activeTab === 'contracts' 
              ? 'bg-sidebar-accent text-sidebar-accent-foreground' 
              : 'hover:bg-sidebar-accent/50'
          }`}
        >
          <Icon name="FileText" size={20} />
          <span className="font-medium">Договора</span>
        </button>

        {userRole === 'admin' && (
          <button
            onClick={() => onTabChange('users')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
              activeTab === 'users' 
                ? 'bg-sidebar-accent text-sidebar-accent-foreground' 
                : 'hover:bg-sidebar-accent/50'
            }`}
          >
            <Icon name="Settings" size={20} />
            <span className="font-medium">Пользователи</span>
          </button>
        )}
      </nav>

      <div className="p-4 mt-auto">
        <Button 
          variant="outline" 
          className="w-full"
          onClick={onLogout}
        >
          <Icon name="LogOut" size={18} className="mr-2" />
          Выйти
        </Button>
      </div>
    </aside>
  );
};

export default Sidebar;