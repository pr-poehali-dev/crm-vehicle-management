import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import Icon from '@/components/ui/icon';
import { Employee, EmployeePermissions } from '@/types/crm';
import { toast } from '@/hooks/use-toast';

interface EditEmployeeDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  editingEmployee: Employee | null;
  onEmployeeChange: (employee: Employee) => void;
  onUpdateClick: () => void;
}

const EditEmployeeDialog = ({ 
  isOpen, 
  onOpenChange, 
  editingEmployee, 
  onEmployeeChange, 
  onUpdateClick 
}: EditEmployeeDialogProps) => {
  const [showEditPassword, setShowEditPassword] = useState(false);

  const permissions: EmployeePermissions = editingEmployee?.permissions || {};

  const updatePermission = (key: keyof EmployeePermissions, value: boolean) => {
    if (editingEmployee) {
      onEmployeeChange({
        ...editingEmployee,
        permissions: { ...permissions, [key]: value }
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Редактировать сотрудника</DialogTitle>
        </DialogHeader>
        {editingEmployee && (
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="edit-lastName">Фамилия</Label>
                <Input
                  id="edit-lastName"
                  value={editingEmployee.lastName}
                  onChange={(e) => onEmployeeChange({ ...editingEmployee, lastName: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-firstName">Имя</Label>
                <Input
                  id="edit-firstName"
                  value={editingEmployee.firstName}
                  onChange={(e) => onEmployeeChange({ ...editingEmployee, firstName: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-middleName">Отчество</Label>
                <Input
                  id="edit-middleName"
                  value={editingEmployee.middleName}
                  onChange={(e) => onEmployeeChange({ ...editingEmployee, middleName: e.target.value })}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="edit-birthDate">Дата рождения</Label>
                <Input
                  id="edit-birthDate"
                  type="date"
                  value={editingEmployee.birthDate}
                  onChange={(e) => onEmployeeChange({ ...editingEmployee, birthDate: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-position">Должность</Label>
                <Input
                  id="edit-position"
                  value={editingEmployee.position}
                  onChange={(e) => onEmployeeChange({ ...editingEmployee, position: e.target.value })}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="edit-username">Логин</Label>
                <div className="flex gap-2">
                  <Input
                    id="edit-username"
                    value={editingEmployee.username || ''}
                    onChange={(e) => onEmployeeChange({ ...editingEmployee, username: e.target.value })}
                    placeholder="i.ivanov"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      if (editingEmployee.firstName && editingEmployee.lastName) {
                        const username = `${editingEmployee.firstName[0].toLowerCase()}.${editingEmployee.lastName.toLowerCase()}`;
                        onEmployeeChange({ ...editingEmployee, username });
                      }
                    }}
                  >
                    <Icon name="Sparkles" size={18} />
                  </Button>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-password">Пароль</Label>
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Input
                      id="edit-password"
                      type={showEditPassword ? "text" : "password"}
                      value={editingEmployee.password || ''}
                      onChange={(e) => onEmployeeChange({ ...editingEmployee, password: e.target.value })}
                      placeholder="Новый пароль"
                      className="pr-10"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                      onClick={() => setShowEditPassword(!showEditPassword)}
                    >
                      <Icon name={showEditPassword ? "EyeOff" : "Eye"} size={18} className="text-muted-foreground" />
                    </Button>
                  </div>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      const password = Math.random().toString(36).slice(-8);
                      onEmployeeChange({ ...editingEmployee, password });
                    }}
                  >
                    <Icon name="Sparkles" size={18} />
                  </Button>
                </div>
              </div>
            </div>

            {editingEmployee.username && editingEmployee.password && (
              <Button 
                type="button"
                variant="secondary" 
                onClick={() => {
                  const text = `Логин: ${editingEmployee.username}\nПароль: ${editingEmployee.password}`;
                  navigator.clipboard.writeText(text);
                  toast({
                    title: "Скопировано!",
                    description: "Логин и пароль скопированы в буфер обмена",
                  });
                }} 
                className="w-full gap-2"
              >
                <Icon name="Copy" size={18} />
                Скопировать логин и пароль
              </Button>
            )}

            <div className="space-y-4 pt-4 border-t">
              <Label className="text-base font-semibold">Права доступа</Label>
              
              <div className="space-y-3">
                <div className="font-medium">Автомобили</div>
                <div className="grid grid-cols-2 gap-3 pl-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="edit-vehicles_add" 
                      checked={permissions.vehicles_add}
                      onCheckedChange={(checked) => updatePermission('vehicles_add', checked as boolean)}
                    />
                    <label htmlFor="edit-vehicles_add" className="text-sm cursor-pointer">Добавлять</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="edit-vehicles_edit" 
                      checked={permissions.vehicles_edit}
                      onCheckedChange={(checked) => updatePermission('vehicles_edit', checked as boolean)}
                    />
                    <label htmlFor="edit-vehicles_edit" className="text-sm cursor-pointer">Редактировать</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="edit-vehicles_delete" 
                      checked={permissions.vehicles_delete}
                      onCheckedChange={(checked) => updatePermission('vehicles_delete', checked as boolean)}
                    />
                    <label htmlFor="edit-vehicles_delete" className="text-sm cursor-pointer">Удалять</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="edit-vehicles_hide" 
                      checked={permissions.vehicles_hide}
                      onCheckedChange={(checked) => updatePermission('vehicles_hide', checked as boolean)}
                    />
                    <label htmlFor="edit-vehicles_hide" className="text-sm cursor-pointer">Скрыть вкладку</label>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <div className="font-medium">Клиенты</div>
                <div className="grid grid-cols-2 gap-3 pl-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="edit-clients_add" 
                      checked={permissions.clients_add}
                      onCheckedChange={(checked) => updatePermission('clients_add', checked as boolean)}
                    />
                    <label htmlFor="edit-clients_add" className="text-sm cursor-pointer">Добавлять</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="edit-clients_edit" 
                      checked={permissions.clients_edit}
                      onCheckedChange={(checked) => updatePermission('clients_edit', checked as boolean)}
                    />
                    <label htmlFor="edit-clients_edit" className="text-sm cursor-pointer">Редактировать</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="edit-clients_delete" 
                      checked={permissions.clients_delete}
                      onCheckedChange={(checked) => updatePermission('clients_delete', checked as boolean)}
                    />
                    <label htmlFor="edit-clients_delete" className="text-sm cursor-pointer">Удалять</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="edit-clients_hide" 
                      checked={permissions.clients_hide}
                      onCheckedChange={(checked) => updatePermission('clients_hide', checked as boolean)}
                    />
                    <label htmlFor="edit-clients_hide" className="text-sm cursor-pointer">Скрыть вкладку</label>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <div className="font-medium">Сотрудники</div>
                <div className="grid grid-cols-2 gap-3 pl-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="edit-employees_add" 
                      checked={permissions.employees_add}
                      onCheckedChange={(checked) => updatePermission('employees_add', checked as boolean)}
                    />
                    <label htmlFor="edit-employees_add" className="text-sm cursor-pointer">Добавлять</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="edit-employees_edit" 
                      checked={permissions.employees_edit}
                      onCheckedChange={(checked) => updatePermission('employees_edit', checked as boolean)}
                    />
                    <label htmlFor="edit-employees_edit" className="text-sm cursor-pointer">Редактировать</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="edit-employees_delete" 
                      checked={permissions.employees_delete}
                      onCheckedChange={(checked) => updatePermission('employees_delete', checked as boolean)}
                    />
                    <label htmlFor="edit-employees_delete" className="text-sm cursor-pointer">Удалять</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="edit-employees_hide" 
                      checked={permissions.employees_hide}
                      onCheckedChange={(checked) => updatePermission('employees_hide', checked as boolean)}
                    />
                    <label htmlFor="edit-employees_hide" className="text-sm cursor-pointer">Скрыть вкладку</label>
                  </div>
                </div>
              </div>
            </div>

            <Button onClick={onUpdateClick} className="w-full">
              Сохранить изменения
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default EditEmployeeDialog;