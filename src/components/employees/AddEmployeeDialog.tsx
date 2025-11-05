import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import Icon from '@/components/ui/icon';
import { Employee } from '@/types/crm';
import { toast } from '@/hooks/use-toast';

interface AddEmployeeDialogProps {
  newEmployee: Partial<Employee>;
  onEmployeeChange: (employee: Partial<Employee>) => void;
  onAddEmployee: () => void;
}

const AddEmployeeDialog = ({ newEmployee, onEmployeeChange, onAddEmployee }: AddEmployeeDialogProps) => {
  const [showPassword, setShowPassword] = useState(false);

  const copyCredentials = () => {
    if (newEmployee.username && newEmployee.password) {
      const text = `Логин: ${newEmployee.username}\nПароль: ${newEmployee.password}`;
      navigator.clipboard.writeText(text);
      toast({
        title: "Скопировано!",
        description: "Логин и пароль скопированы в буфер обмена",
      });
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="gap-2">
          <Icon name="Plus" size={18} />
          Добавить сотрудника
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Новый сотрудник</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="lastName">Фамилия</Label>
              <Input
                id="lastName"
                value={newEmployee.lastName || ''}
                onChange={(e) => onEmployeeChange({ ...newEmployee, lastName: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="firstName">Имя</Label>
              <Input
                id="firstName"
                value={newEmployee.firstName || ''}
                onChange={(e) => onEmployeeChange({ ...newEmployee, firstName: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="middleName">Отчество</Label>
              <Input
                id="middleName"
                value={newEmployee.middleName || ''}
                onChange={(e) => onEmployeeChange({ ...newEmployee, middleName: e.target.value })}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="birthDate">Дата рождения</Label>
              <Input
                id="birthDate"
                type="date"
                value={newEmployee.birthDate || ''}
                onChange={(e) => onEmployeeChange({ ...newEmployee, birthDate: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="position">Должность</Label>
              <Input
                id="position"
                value={newEmployee.position || ''}
                onChange={(e) => onEmployeeChange({ ...newEmployee, position: e.target.value })}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="username">Логин</Label>
              <div className="flex gap-2">
                <Input
                  id="username"
                  value={newEmployee.username || ''}
                  onChange={(e) => onEmployeeChange({ ...newEmployee, username: e.target.value })}
                  placeholder="i.ivanov"
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    if (newEmployee.firstName && newEmployee.lastName) {
                      const username = `${newEmployee.firstName[0].toLowerCase()}.${newEmployee.lastName.toLowerCase()}`;
                      onEmployeeChange({ ...newEmployee, username });
                    }
                  }}
                >
                  <Icon name="Sparkles" size={18} />
                </Button>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Пароль</Label>
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={newEmployee.password || ''}
                    onChange={(e) => onEmployeeChange({ ...newEmployee, password: e.target.value })}
                    placeholder="Пароль для входа"
                    className="pr-10"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    <Icon name={showPassword ? "EyeOff" : "Eye"} size={18} className="text-muted-foreground" />
                  </Button>
                </div>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    const password = Math.random().toString(36).slice(-8);
                    onEmployeeChange({ ...newEmployee, password });
                  }}
                >
                  <Icon name="Sparkles" size={18} />
                </Button>
              </div>
            </div>
          </div>

          {newEmployee.username && newEmployee.password && (
            <Button 
              type="button"
              variant="secondary" 
              onClick={copyCredentials} 
              className="w-full gap-2"
            >
              <Icon name="Copy" size={18} />
              Скопировать логин и пароль
            </Button>
          )}

          <Button onClick={onAddEmployee} className="w-full">
            Добавить сотрудника
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddEmployeeDialog;
