import { useState } from "react";
import { Plus, TrendingUp, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Meal {
  id: string;
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
  time: string;
}

interface DayData {
  date: string;
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
}

const NutritionAnalytics = () => {
  const [meals, setMeals] = useState<Meal[]>([
    { id: '1', name: 'Oatmeal with Berries', calories: 320, protein: 12, carbs: 58, fats: 6, time: '08:00' },
    { id: '2', name: 'Grilled Chicken Salad', calories: 450, protein: 35, carbs: 15, fats: 28, time: '13:00' }
  ]);

  const [showAddMeal, setShowAddMeal] = useState(false);
  const [newMeal, setNewMeal] = useState({ name: '', calories: '', protein: '', carbs: '', fats: '' });

  // Mock weekly data
  const weeklyData: DayData[] = [
    { date: 'Mon', calories: 1850, protein: 95, carbs: 220, fats: 65 },
    { date: 'Tue', calories: 2100, protein: 110, carbs: 250, fats: 75 },
    { date: 'Wed', calories: 1950, protein: 100, carbs: 230, fats: 70 },
    { date: 'Thu', calories: 2200, protein: 120, carbs: 260, fats: 80 },
    { date: 'Fri', calories: 1800, protein: 90, carbs: 210, fats: 60 },
    { date: 'Sat', calories: 2300, protein: 125, carbs: 280, fats: 85 },
    { date: 'Sun', calories: 770, protein: 47, carbs: 73, fats: 34 } // Today's data
  ];

  const todayStats = meals.reduce((acc, meal) => ({
    calories: acc.calories + meal.calories,
    protein: acc.protein + meal.protein,
    carbs: acc.carbs + meal.carbs,
    fats: acc.fats + meal.fats
  }), { calories: 0, protein: 0, carbs: 0, fats: 0 });

  const targets = { calories: 2000, protein: 150, carbs: 250, fats: 67 };

  const addMeal = () => {
    if (!newMeal.name || !newMeal.calories) return;
    
    const meal: Meal = {
      id: Date.now().toString(),
      name: newMeal.name,
      calories: parseInt(newMeal.calories),
      protein: parseInt(newMeal.protein) || 0,
      carbs: parseInt(newMeal.carbs) || 0,
      fats: parseInt(newMeal.fats) || 0,
      time: new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' })
    };
    
    setMeals([...meals, meal]);
    setNewMeal({ name: '', calories: '', protein: '', carbs: '', fats: '' });
    setShowAddMeal(false);
  };

  const StatCard = ({ title, value, target, unit, color }: { 
    title: string; value: number; target: number; unit: string; color: string; 
  }) => {
    const percentage = Math.min((value / target) * 100, 100);
    return (
      <Card>
        <CardContent className="p-4">
          <div className="flex justify-between items-start mb-2">
            <h4 className="text-sm font-medium text-muted-foreground">{title}</h4>
            <span className="text-xs text-muted-foreground">{Math.round(percentage)}%</span>
          </div>
          <div className="space-y-2">
            <p className="text-2xl font-bold">{value}{unit}</p>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className={`h-2 rounded-full transition-all ${color}`}
                style={{ width: `${percentage}%` }}
              />
            </div>
            <p className="text-xs text-muted-foreground">Target: {target}{unit}</p>
          </div>
        </CardContent>
      </Card>
    );
  };

  const SimpleChart = ({ data, dataKey, color }: { data: DayData[]; dataKey: keyof DayData; color: string }) => {
    const maxValue = Math.max(...data.map(d => d[dataKey] as number));
    return (
      <div className="flex items-end justify-between h-32 gap-1">
        {data.map((day, index) => {
          const height = ((day[dataKey] as number) / maxValue) * 100;
          return (
            <div key={day.date} className="flex flex-col items-center flex-1">
              <div 
                className={`w-full ${color} rounded-t transition-all hover:opacity-80`}
                style={{ height: `${height}%` }}
                title={`${day.date}: ${day[dataKey]}`}
              />
              <span className="text-xs mt-1 text-muted-foreground">{day.date}</span>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-xl font-bold flex items-center gap-2">
            📊 Nutrition Analytics
          </h3>
          <p className="text-sm text-muted-foreground">Track your daily nutrition goals</p>
        </div>
        <Button onClick={() => setShowAddMeal(true)} size="sm" className="gap-2">
          <Plus className="w-4 h-4" />
          Add Meal
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard 
          title="Calories" 
          value={todayStats.calories} 
          target={targets.calories} 
          unit="" 
          color="bg-gradient-to-r from-orange-400 to-red-500" 
        />
        <StatCard 
          title="Protein" 
          value={todayStats.protein} 
          target={targets.protein} 
          unit="g" 
          color="bg-gradient-to-r from-blue-400 to-blue-600" 
        />
        <StatCard 
          title="Carbs" 
          value={todayStats.carbs} 
          target={targets.carbs} 
          unit="g" 
          color="bg-gradient-to-r from-green-400 to-green-600" 
        />
        <StatCard 
          title="Fats" 
          value={todayStats.fats} 
          target={targets.fats} 
          unit="g" 
          color="bg-gradient-to-r from-purple-400 to-purple-600" 
        />
      </div>

      {/* Charts */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              Weekly Calories
            </CardTitle>
          </CardHeader>
          <CardContent>
            <SimpleChart data={weeklyData} dataKey="calories" color="bg-orange-500" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              Protein Intake
            </CardTitle>
          </CardHeader>
          <CardContent>
            <SimpleChart data={weeklyData} dataKey="protein" color="bg-blue-500" />
          </CardContent>
        </Card>
      </div>

      {/* Today's Meals */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Today's Meals</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {meals.map((meal) => (
              <div key={meal.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium">{meal.name}</p>
                  <p className="text-sm text-muted-foreground">{meal.time}</p>
                </div>
                <div className="text-right">
                  <p className="font-medium">{meal.calories} cal</p>
                  <p className="text-xs text-muted-foreground">
                    P: {meal.protein}g • C: {meal.carbs}g • F: {meal.fats}g
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Add Meal Modal */}
      {showAddMeal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                Add New Meal
                <Button variant="ghost" size="sm" onClick={() => setShowAddMeal(false)}>✕</Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <input
                type="text"
                placeholder="Meal name"
                value={newMeal.name}
                onChange={(e) => setNewMeal({...newMeal, name: e.target.value})}
                className="w-full p-2 border rounded-lg"
              />
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="number"
                  placeholder="Calories"
                  value={newMeal.calories}
                  onChange={(e) => setNewMeal({...newMeal, calories: e.target.value})}
                  className="p-2 border rounded-lg"
                />
                <input
                  type="number"
                  placeholder="Protein (g)"
                  value={newMeal.protein}
                  onChange={(e) => setNewMeal({...newMeal, protein: e.target.value})}
                  className="p-2 border rounded-lg"
                />
                <input
                  type="number"
                  placeholder="Carbs (g)"
                  value={newMeal.carbs}
                  onChange={(e) => setNewMeal({...newMeal, carbs: e.target.value})}
                  className="p-2 border rounded-lg"
                />
                <input
                  type="number"
                  placeholder="Fats (g)"
                  value={newMeal.fats}
                  onChange={(e) => setNewMeal({...newMeal, fats: e.target.value})}
                  className="p-2 border rounded-lg"
                />
              </div>
              <Button onClick={addMeal} className="w-full">Add Meal</Button>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default NutritionAnalytics;