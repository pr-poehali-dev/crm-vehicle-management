import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Checkbox } from '@/components/ui/checkbox';
import Icon from '@/components/ui/icon';
import { Employee } from '@/types/crm';
import { toast } from '@/hooks/use-toast';

interface EmployeesTabProps {
  employees: Employee[];
  newEmployee: Partial<Employee>;
  userRole: 'admin' | 'manager';
  onEmployeeChange: (employee: Partial<Employee>) => void;
  onAddEmployee: () => void;
  onDeleteEmployee: (id: string) => void;
  onUpdateEmployee: (id: string, employee: Employee) => void;
}

const EmployeesTab = ({ 
  employees, 
  newEmployee, 
  userRole, 
  onEmployeeChange, 
  onAddEmployee, 
  onDeleteEmployee,
  onUpdateEmployee 
}: EmployeesTabProps) => {
  const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [deleteEmployeeId, setDeleteEmployeeId] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showEditPassword, setShowEditPassword] = useState(false);

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

  const handleEditClick = (employee: Employee) => {
    setEditingEmployee({ ...employee });
    setIsEditDialogOpen(true);
  };

  const handleUpdateClick = () => {
    if (editingEmployee) {
      onUpdateEmployee(editingEmployee.id, editingEmployee);
      setIsEditDialogOpen(false);
      setEditingEmployee(null);
    }
  };

  const handleDeleteConfirm = () => {
    if (deleteEmployeeId) {
      onDeleteEmployee(deleteEmployeeId);
      setDeleteEmployeeId(null);
    }
  };
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Сотрудники</h2>
          <p className="text-muted-foreground">Управление учётными записями сотрудников</p>
        </div>
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

              <div className="space-y-4 pt-4 border-t">
                <h3 className="font-semibold">Права доступа</h3>
                
                <div className="space-y-3">
                  <div>
                    <h4 className="text-sm font-medium mb-2">Автомобили</h4>
                    <div className="space-y-2 pl-4">
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id="vehicles_add" 
                          checked={newEmployee.permissions?.vehicles_add || false}
                          onCheckedChange={(checked) => onEmployeeChange({ 
                            ...newEmployee, 
                            permissions: { ...newEmployee.permissions, vehicles_add: checked as boolean } 
                          })}
                        />
                        <Label htmlFor="vehicles_add" className="text-sm font-normal">Добавлять</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id="vehicles_edit" 
                          checked={newEmployee.permissions?.vehicles_edit || false}
                          onCheckedChange={(checked) => onEmployeeChange({ 
                            ...newEmployee, 
                            permissions: { ...newEmployee.permissions, vehicles_edit: checked as boolean } 
                          })}
                        />
                        <Label htmlFor="vehicles_edit" className="text-sm font-normal">Редактировать</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id="vehicles_delete" 
                          checked={newEmployee.permissions?.vehicles_delete || false}
                          onCheckedChange={(checked) => onEmployeeChange({ 
                            ...newEmployee, 
                            permissions: { ...newEmployee.permissions, vehicles_delete: checked as boolean } 
                          })}
                        />
                        <Label htmlFor="vehicles_delete" className="text-sm font-normal">Удалять</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id="vehicles_hide" 
                          checked={newEmployee.permissions?.vehicles_hide || false}
                          onCheckedChange={(checked) => onEmployeeChange({ 
                            ...newEmployee, 
                            permissions: { ...newEmployee.permissions, vehicles_hide: checked as boolean } 
                          })}
                        />
                        <Label htmlFor="vehicles_hide" className="text-sm font-normal">Скрыть вкладку</Label>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium mb-2">Клиенты</h4>
                    <div className="space-y-2 pl-4">
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id="clients_add" 
                          checked={newEmployee.permissions?.clients_add || false}
                          onCheckedChange={(checked) => onEmployeeChange({ 
                            ...newEmployee, 
                            permissions: { ...newEmployee.permissions, clients_add: checked as boolean } 
                          })}
                        />
                        <Label htmlFor="clients_add" className="text-sm font-normal">Добавлять</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id="clients_edit" 
                          checked={newEmployee.permissions?.clients_edit || false}
                          onCheckedChange={(checked) => onEmployeeChange({ 
                            ...newEmployee, 
                            permissions: { ...newEmployee.permissions, clients_edit: checked as boolean } 
                          })}
                        />
                        <Label htmlFor="clients_edit" className="text-sm font-normal">Редактировать</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id="clients_delete" 
                          checked={newEmployee.permissions?.clients_delete || false}
                          onCheckedChange={(checked) => onEmployeeChange({ 
                            ...newEmployee, 
                            permissions: { ...newEmployee.permissions, clients_delete: checked as boolean } 
                          })}
                        />
                        <Label htmlFor="clients_delete" className="text-sm font-normal">Удалять</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id="clients_hide" 
                          checked={newEmployee.permissions?.clients_hide || false}
                          onCheckedChange={(checked) => onEmployeeChange({ 
                            ...newEmployee, 
                            permissions: { ...newEmployee.permissions, clients_hide: checked as boolean } 
                          })}
                        />
                        <Label htmlFor="clients_hide" className="text-sm font-normal">Скрыть вкладку</Label>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium mb-2">Сотрудники</h4>
                    <div className="space-y-2 pl-4">
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id="employees_add" 
                          checked={newEmployee.permissions?.employees_add || false}
                          onCheckedChange={(checked) => onEmployeeChange({ 
                            ...newEmployee, 
                            permissions: { ...newEmployee.permissions, employees_add: checked as boolean } 
                          })}
                        />
                        <Label htmlFor="employees_add" className="text-sm font-normal">Добавлять</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id="employees_edit" 
                          checked={newEmployee.permissions?.employees_edit || false}
                          onCheckedChange={(checked) => onEmployeeChange({ 
                            ...newEmployee, 
                            permissions: { ...newEmployee.permissions, employees_edit: checked as boolean } 
                          })}
                        />
                        <Label htmlFor="employees_edit" className="text-sm font-normal">Редактировать</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id="employees_delete" 
                          checked={newEmployee.permissions?.employees_delete || false}
                          onCheckedChange={(checked) => onEmployeeChange({ 
                            ...newEmployee, 
                            permissions: { ...newEmployee.permissions, employees_delete: checked as boolean } 
                          })}
                        />
                        <Label htmlFor="employees_delete" className="text-sm font-normal">Удалять</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id="employees_hide" 
                          checked={newEmployee.permissions?.employees_hide || false}
                          onCheckedChange={(checked) => onEmployeeChange({ 
                            ...newEmployee, 
                            permissions: { ...newEmployee.permissions, employees_hide: checked as boolean } 
                          })}
                        />
                        <Label htmlFor="employees_hide" className="text-sm font-normal">Скрыть вкладку</Label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <Button onClick={onAddEmployee} className="w-full">
                Добавить сотрудника
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Список сотрудников</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ФИО</TableHead>
                <TableHead>Дата рождения</TableHead>
                <TableHead>Должность</TableHead>
                <TableHead className="text-right">Действия</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {employees.map((employee) => (
                <TableRow key={employee.id}>
                  <TableCell className="font-medium">
                    {employee.lastName} {employee.firstName} {employee.middleName}
                  </TableCell>
                  <TableCell>{new Date(employee.birthDate).toLocaleDateString('ru-RU')}</TableCell>
                  <TableCell>{employee.position}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleEditClick(employee)}
                      >
                        <Icon name="Pencil" size={18} />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setDeleteEmployeeId(employee.id)}
                      >
                        <Icon name="Trash2" size={18} />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
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
                    onChange={(e) => setEditingEmployee({ ...editingEmployee, lastName: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-firstName">Имя</Label>
                  <Input
                    id="edit-firstName"
                    value={editingEmployee.firstName}
                    onChange={(e) => setEditingEmployee({ ...editingEmployee, firstName: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-middleName">Отчество</Label>
                  <Input
                    id="edit-middleName"
                    value={editingEmployee.middleName}
                    onChange={(e) => setEditingEmployee({ ...editingEmployee, middleName: e.target.value })}
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
                    onChange={(e) => setEditingEmployee({ ...editingEmployee, birthDate: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-position">Должность</Label>
                  <Input
                    id="edit-position"
                    value={editingEmployee.position}
                    onChange={(e) => setEditingEmployee({ ...editingEmployee, position: e.target.value })}
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
                      onChange={(e) => setEditingEmployee({ ...editingEmployee, username: e.target.value })}
                      placeholder="i.ivanov"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => {
                        if (editingEmployee.firstName && editingEmployee.lastName) {
                          const username = `${editingEmployee.firstName[0].toLowerCase()}.${editingEmployee.lastName.toLowerCase()}`;
                          setEditingEmployee({ ...editingEmployee, username });
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
                        onChange={(e) => setEditingEmployee({ ...editingEmployee, password: e.target.value })}
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
                        setEditingEmployee({ ...editingEmployee, password });
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
                <h3 className="font-semibold">Права доступа</h3>
                
                <div className="space-y-3">
                  <div>
                    <h4 className="text-sm font-medium mb-2">Автомобили</h4>
                    <div className="space-y-2 pl-4">
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id="edit_vehicles_add" 
                          checked={editingEmployee.permissions?.vehicles_add || false}
                          onCheckedChange={(checked) => setEditingEmployee({ 
                            ...editingEmployee, 
                            permissions: { ...editingEmployee.permissions, vehicles_add: checked as boolean } 
                          })}
                        />
                        <Label htmlFor="edit_vehicles_add" className="text-sm font-normal">Добавлять</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id="edit_vehicles_edit" 
                          checked={editingEmployee.permissions?.vehicles_edit || false}
                          onCheckedChange={(checked) => setEditingEmployee({ 
                            ...editingEmployee, 
                            permissions: { ...editingEmployee.permissions, vehicles_edit: checked as boolean } 
                          })}
                        />
                        <Label htmlFor="edit_vehicles_edit" className="text-sm font-normal">Редактировать</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id="edit_vehicles_delete" 
                          checked={editingEmployee.permissions?.vehicles_delete || false}
                          onCheckedChange={(checked) => setEditingEmployee({ 
                            ...editingEmployee, 
                            permissions: { ...editingEmployee.permissions, vehicles_delete: checked as boolean } 
                          })}
                        />
                        <Label htmlFor="edit_vehicles_delete" className="text-sm font-normal">Удалять</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id="edit_vehicles_hide" 
                          checked={editingEmployee.permissions?.vehicles_hide || false}
                          onCheckedChange={(checked) => setEditingEmployee({ 
                            ...editingEmployee, 
                            permissions: { ...editingEmployee.permissions, vehicles_hide: checked as boolean } 
                          })}
                        />
                        <Label htmlFor="edit_vehicles_hide" className="text-sm font-normal">Скрыть вкладку</Label>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium mb-2">Клиенты</h4>
                    <div className="space-y-2 pl-4">
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id="edit_clients_add" 
                          checked={editingEmployee.permissions?.clients_add || false}
                          onCheckedChange={(checked) => setEditingEmployee({ 
                            ...editingEmployee, 
                            permissions: { ...editingEmployee.permissions, clients_add: checked as boolean } 
                          })}
                        />
                        <Label htmlFor="edit_clients_add" className="text-sm font-normal">Добавлять</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id="edit_clients_edit" 
                          checked={editingEmployee.permissions?.clients_edit || false}
                          onCheckedChange={(checked) => setEditingEmployee({ 
                            ...editingEmployee, 
                            permissions: { ...editingEmployee.permissions, clients_edit: checked as boolean } 
                          })}
                        />
                        <Label htmlFor="edit_clients_edit" className="text-sm font-normal">Редактировать</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id="edit_clients_delete" 
                          checked={editingEmployee.permissions?.clients_delete || false}
                          onCheckedChange={(checked) => setEditingEmployee({ 
                            ...editingEmployee, 
                            permissions: { ...editingEmployee.permissions, clients_delete: checked as boolean } 
                          })}
                        />
                        <Label htmlFor="edit_clients_delete" className="text-sm font-normal">Удалять</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id="edit_clients_hide" 
                          checked={editingEmployee.permissions?.clients_hide || false}
                          onCheckedChange={(checked) => setEditingEmployee({ 
                            ...editingEmployee, 
                            permissions: { ...editingEmployee.permissions, clients_hide: checked as boolean } 
                          })}
                        />
                        <Label htmlFor="edit_clients_hide" className="text-sm font-normal">Скрыть вкладку</Label>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium mb-2">Сотрудники</h4>
                    <div className="space-y-2 pl-4">
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id="edit_employees_add" 
                          checked={editingEmployee.permissions?.employees_add || false}
                          onCheckedChange={(checked) => setEditingEmployee({ 
                            ...editingEmployee, 
                            permissions: { ...editingEmployee.permissions, employees_add: checked as boolean } 
                          })}
                        />
                        <Label htmlFor="edit_employees_add" className="text-sm font-normal">Добавлять</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id="edit_employees_edit" 
                          checked={editingEmployee.permissions?.employees_edit || false}
                          onCheckedChange={(checked) => setEditingEmployee({ 
                            ...editingEmployee, 
                            permissions: { ...editingEmployee.permissions, employees_edit: checked as boolean } 
                          })}
                        />
                        <Label htmlFor="edit_employees_edit" className="text-sm font-normal">Редактировать</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id="edit_employees_delete" 
                          checked={editingEmployee.permissions?.employees_delete || false}
                          onCheckedChange={(checked) => setEditingEmployee({ 
                            ...editingEmployee, 
                            permissions: { ...editingEmployee.permissions, employees_delete: checked as boolean } 
                          })}
                        />
                        <Label htmlFor="edit_employees_delete" className="text-sm font-normal">Удалять</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id="edit_employees_hide" 
                          checked={editingEmployee.permissions?.employees_hide || false}
                          onCheckedChange={(checked) => setEditingEmployee({ 
                            ...editingEmployee, 
                            permissions: { ...editingEmployee.permissions, employees_hide: checked as boolean } 
                          })}
                        />
                        <Label htmlFor="edit_employees_hide" className="text-sm font-normal">Скрыть вкладку</Label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <Button onClick={handleUpdateClick} className="w-full">
                Сохранить изменения
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <AlertDialog open={!!deleteEmployeeId} onOpenChange={() => setDeleteEmployeeId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Удалить сотрудника?</AlertDialogTitle>
            <AlertDialogDescription>
              Это действие нельзя отменить. Сотрудник будет удалён из системы.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Отмена</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteConfirm}>Удалить</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default EmployeesTab;