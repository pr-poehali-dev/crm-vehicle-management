import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import Icon from '@/components/ui/icon';
import { Vehicle } from '@/types/crm';

interface VehiclesTabProps {
  vehicles: Vehicle[];
  newVehicle: Partial<Vehicle>;
  userRole: 'admin' | 'manager';
  onVehicleChange: (vehicle: Partial<Vehicle>) => void;
  onAddVehicle: () => void;
  onDeleteVehicle: (id: string) => void;
  onUpdateVehicle: (id: string, vehicle: Vehicle) => void;
}

const VehiclesTab = ({ vehicles, newVehicle, userRole, onVehicleChange, onAddVehicle, onDeleteVehicle, onUpdateVehicle }: VehiclesTabProps) => {
  const [editingVehicle, setEditingVehicle] = useState<Vehicle | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  const handleEditClick = (vehicle: Vehicle) => {
    setEditingVehicle({ ...vehicle });
    setIsEditDialogOpen(true);
  };

  const handleUpdateClick = () => {
    if (editingVehicle) {
      onUpdateVehicle(editingVehicle.id, editingVehicle);
      setIsEditDialogOpen(false);
      setEditingVehicle(null);
    }
  };
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Автомобили</h2>
          <p className="text-muted-foreground">Управление парком транспортных средств</p>
        </div>
        
        <Dialog>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Icon name="Plus" size={18} />
              Добавить автомобиль
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Новый автомобиль</DialogTitle>
              <DialogDescription>Заполните информацию о транспортном средстве</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Марка ТС</Label>
                  <Input
                    value={newVehicle.brand || ''}
                    onChange={(e) => onVehicleChange({...newVehicle, brand: e.target.value})}
                    placeholder="Toyota"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Модель ТС</Label>
                  <Input
                    value={newVehicle.model || ''}
                    onChange={(e) => onVehicleChange({...newVehicle, model: e.target.value})}
                    placeholder="Camry"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Наименование ТС</Label>
                <Input
                  value={newVehicle.name || ''}
                  onChange={(e) => onVehicleChange({...newVehicle, name: e.target.value})}
                  placeholder="Toyota Camry 2023"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Категория ТС</Label>
                  <Select onValueChange={(value) => onVehicleChange({...newVehicle, category: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Выберите категорию" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Легковой">Легковой</SelectItem>
                      <SelectItem value="Грузовой">Грузовой</SelectItem>
                      <SelectItem value="Специальный">Специальный</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Год выпуска</Label>
                  <Input
                    type="number"
                    value={newVehicle.year || ''}
                    onChange={(e) => onVehicleChange({...newVehicle, year: parseInt(e.target.value)})}
                    placeholder="2023"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>№ Двигателя</Label>
                  <Input
                    value={newVehicle.engineNumber || ''}
                    onChange={(e) => onVehicleChange({...newVehicle, engineNumber: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Шасси (Рама) №</Label>
                  <Input
                    value={newVehicle.chassis || ''}
                    onChange={(e) => onVehicleChange({...newVehicle, chassis: e.target.value})}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Кузов №</Label>
                  <Input
                    value={newVehicle.bodyNumber || ''}
                    onChange={(e) => onVehicleChange({...newVehicle, bodyNumber: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Цвет кузова</Label>
                  <Input
                    value={newVehicle.color || ''}
                    onChange={(e) => onVehicleChange({...newVehicle, color: e.target.value})}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Мощность, л.с. (кВт)</Label>
                  <Input
                    value={newVehicle.power || ''}
                    onChange={(e) => onVehicleChange({...newVehicle, power: e.target.value})}
                    placeholder="249 (184)"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Объем двигателя, куб.см</Label>
                  <Input
                    value={newVehicle.displacement || ''}
                    onChange={(e) => onVehicleChange({...newVehicle, displacement: e.target.value})}
                    placeholder="2487"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Тип двигателя</Label>
                  <Select onValueChange={(value) => onVehicleChange({...newVehicle, engineType: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Выберите тип" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Бензиновый">Бензиновый</SelectItem>
                      <SelectItem value="Дизельный">Дизельный</SelectItem>
                      <SelectItem value="Электрический">Электрический</SelectItem>
                      <SelectItem value="Гибридный">Гибридный</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Экологический класс</Label>
                  <Select onValueChange={(value) => onVehicleChange({...newVehicle, ecoClass: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Выберите класс" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Евро-3">Евро-3</SelectItem>
                      <SelectItem value="Евро-4">Евро-4</SelectItem>
                      <SelectItem value="Евро-5">Евро-5</SelectItem>
                      <SelectItem value="Евро-6">Евро-6</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label>Технически допустимая макс. масса, кг</Label>
                <Input
                  value={newVehicle.maxWeight || ''}
                  onChange={(e) => onVehicleChange({...newVehicle, maxWeight: e.target.value})}
                  placeholder="2100"
                />
              </div>
            </div>
            <DialogFooter>
              <Button onClick={onAddVehicle}>Добавить автомобиль</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Марка</TableHead>
                <TableHead>Модель</TableHead>
                <TableHead>Год</TableHead>
                <TableHead>Категория</TableHead>
                <TableHead>Цвет</TableHead>
                <TableHead>Тип двигателя</TableHead>
                {userRole === 'admin' && <TableHead>Действия</TableHead>}
              </TableRow>
            </TableHeader>
            <TableBody>
              {vehicles.map((vehicle) => (
                <TableRow key={vehicle.id}>
                  <TableCell className="font-medium">{vehicle.brand}</TableCell>
                  <TableCell>{vehicle.model}</TableCell>
                  <TableCell>{vehicle.year}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{vehicle.category}</Badge>
                  </TableCell>
                  <TableCell>{vehicle.color}</TableCell>
                  <TableCell>{vehicle.engineType}</TableCell>
                  {userRole === 'admin' && (
                    <TableCell>
                      <div className="flex gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEditClick(vehicle)}
                        >
                          <Icon name="Pencil" size={16} />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => onDeleteVehicle(vehicle.id)}
                        >
                          <Icon name="Trash2" size={16} className="text-destructive" />
                        </Button>
                      </div>
                    </TableCell>
                  )}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Редактировать автомобиль</DialogTitle>
            <DialogDescription>Измените информацию о транспортном средстве</DialogDescription>
          </DialogHeader>
          {editingVehicle && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Марка ТС</Label>
                  <Input
                    value={editingVehicle.brand}
                    onChange={(e) => setEditingVehicle({...editingVehicle, brand: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Модель ТС</Label>
                  <Input
                    value={editingVehicle.model}
                    onChange={(e) => setEditingVehicle({...editingVehicle, model: e.target.value})}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Наименование ТС</Label>
                <Input
                  value={editingVehicle.name}
                  onChange={(e) => setEditingVehicle({...editingVehicle, name: e.target.value})}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Категория ТС</Label>
                  <Select value={editingVehicle.category} onValueChange={(value) => setEditingVehicle({...editingVehicle, category: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Легковой">Легковой</SelectItem>
                      <SelectItem value="Грузовой">Грузовой</SelectItem>
                      <SelectItem value="Специальный">Специальный</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Год выпуска</Label>
                  <Input
                    type="number"
                    value={editingVehicle.year}
                    onChange={(e) => setEditingVehicle({...editingVehicle, year: parseInt(e.target.value)})}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>№ Двигателя</Label>
                  <Input
                    value={editingVehicle.engineNumber}
                    onChange={(e) => setEditingVehicle({...editingVehicle, engineNumber: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Шасси (Рама) №</Label>
                  <Input
                    value={editingVehicle.chassis}
                    onChange={(e) => setEditingVehicle({...editingVehicle, chassis: e.target.value})}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Кузов №</Label>
                  <Input
                    value={editingVehicle.bodyNumber}
                    onChange={(e) => setEditingVehicle({...editingVehicle, bodyNumber: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Цвет кузова</Label>
                  <Input
                    value={editingVehicle.color}
                    onChange={(e) => setEditingVehicle({...editingVehicle, color: e.target.value})}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Мощность, л.с. (кВт)</Label>
                  <Input
                    value={editingVehicle.power}
                    onChange={(e) => setEditingVehicle({...editingVehicle, power: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Объем двигателя, куб.см</Label>
                  <Input
                    value={editingVehicle.displacement}
                    onChange={(e) => setEditingVehicle({...editingVehicle, displacement: e.target.value})}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Тип двигателя</Label>
                  <Select value={editingVehicle.engineType} onValueChange={(value) => setEditingVehicle({...editingVehicle, engineType: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Бензиновый">Бензиновый</SelectItem>
                      <SelectItem value="Дизельный">Дизельный</SelectItem>
                      <SelectItem value="Электрический">Электрический</SelectItem>
                      <SelectItem value="Гибридный">Гибридный</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Экологический класс</Label>
                  <Select value={editingVehicle.ecoClass} onValueChange={(value) => setEditingVehicle({...editingVehicle, ecoClass: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Евро-3">Евро-3</SelectItem>
                      <SelectItem value="Евро-4">Евро-4</SelectItem>
                      <SelectItem value="Евро-5">Евро-5</SelectItem>
                      <SelectItem value="Евро-6">Евро-6</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label>Технически допустимая макс. масса, кг</Label>
                <Input
                  value={editingVehicle.maxWeight}
                  onChange={(e) => setEditingVehicle({...editingVehicle, maxWeight: e.target.value})}
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button onClick={handleUpdateClick}>Сохранить изменения</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default VehiclesTab;