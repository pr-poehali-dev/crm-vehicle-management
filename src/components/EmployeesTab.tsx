import { useState } from 'react';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { Employee } from '@/types/crm';
import AddEmployeeDialog from './employees/AddEmployeeDialog';
import EditEmployeeDialog from './employees/EditEmployeeDialog';
import EmployeesTable from './employees/EmployeesTable';

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
        <AddEmployeeDialog 
          newEmployee={newEmployee}
          onEmployeeChange={onEmployeeChange}
          onAddEmployee={onAddEmployee}
        />
      </div>

      <EmployeesTable 
        employees={employees}
        onEditClick={handleEditClick}
        onDeleteClick={setDeleteEmployeeId}
      />

      <EditEmployeeDialog 
        isOpen={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
        editingEmployee={editingEmployee}
        onEmployeeChange={setEditingEmployee}
        onUpdateClick={handleUpdateClick}
      />

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
