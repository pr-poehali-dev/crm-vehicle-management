import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

interface SidebarProps {
  userRole: 'admin' | 'manager';
  userName: string;
  userPosition: string;
  activeTab: string;
  onTabChange: (tab: string) => void;
  onLogout: () => void;
  theme: 'dark' | 'light';
  onThemeChange: (theme: 'dark' | 'light') => void;
}

const Sidebar = ({ userRole, userName, userPosition, activeTab, onTabChange, onLogout, theme, onThemeChange }: SidebarProps) => {
  return (
    <aside className="w-64 min-h-screen bg-sidebar text-sidebar-foreground border-r border-sidebar-border flex flex-col">
      {userName !== 'Главный администратор' && (
        <div className="p-6 border-b border-sidebar-border">
          <div>
            <h1 className="text-xl font-bold">{userName || 'Пользователь'}</h1>
            <Badge variant="outline" className="mt-1 text-xs border-sidebar-accent text-sidebar-foreground">
              {userPosition || 'Менеджер'}
            </Badge>
          </div>
        </div>
      )}
      
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
          onClick={() => onTabChange('employees')}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
            activeTab === 'employees' 
              ? 'bg-sidebar-accent text-sidebar-accent-foreground' 
              : 'hover:bg-sidebar-accent/50'
          }`}
        >
          <Icon name="Briefcase" size={20} />
          <span className="font-medium">Сотрудники</span>
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

      <div className="p-4 mt-auto space-y-2">
        <Button 
          variant="outline" 
          className="w-full"
          onClick={() => onThemeChange(theme === 'dark' ? 'light' : 'dark')}
        >
          <Icon name={theme === 'dark' ? 'Sun' : 'Moon'} size={18} className="mr-2" />
          {theme === 'dark' ? 'Светлая' : 'Тёмная'}
        </Button>
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