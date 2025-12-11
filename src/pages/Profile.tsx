import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { Card } from '@/components/ui/card';
import BottomNav from '@/components/BottomNav';
import AnimatedBackground from '@/components/AnimatedBackground';

export default function Profile() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    age: '',
    gender: '',
    diet: '',
    allergies: [] as string[],
    goals: [] as string[],
  });

  const allergies = ['Dairy', 'Nuts', 'Gluten', 'Soy', 'Shellfish'];
  const goals = ['Weight Loss', 'Immunity', 'Digestion', 'Skin Health', 'Energy'];

  const toggleArray = (arr: string[], item: string) =>
    arr.includes(item) ? arr.filter(i => i !== item) : [...arr, item];

  return (
    <div className="min-h-screen p-6 relative overflow-hidden">
      <AnimatedBackground />
      <div className="max-w-lg mx-auto pt-8 pb-24 relative z-10">
        <h1 className="text-5xl font-black mb-3 text-gray-900 tracking-tight animate-fade-up">Your Profile</h1>
        <p className="text-gray-600 mb-8 text-xl animate-fade-up" style={{animationDelay: '0.1s'}}>Help us personalize your food recommendations</p>

        <div className="space-y-6 animate-fade-up" style={{animationDelay: '0.2s'}}>
          <Card className="p-8 space-y-5 shadow-xl border-0 bg-white/80 backdrop-blur-sm rounded-3xl">
            <div>
              <Label>Age</Label>
              <Input type="number" placeholder="25" value={formData.age} onChange={e => setFormData({...formData, age: e.target.value})} />
            </div>

            <div>
              <Label>Gender (Optional)</Label>
              <RadioGroup value={formData.gender} onValueChange={gender => setFormData({...formData, gender})}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="male" id="male" />
                  <Label htmlFor="male">Male</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="female" id="female" />
                  <Label htmlFor="female">Female</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="other" id="other" />
                  <Label htmlFor="other">Other</Label>
                </div>
              </RadioGroup>
            </div>

            <div>
              <Label>Dietary Preference</Label>
              <RadioGroup value={formData.diet} onValueChange={diet => setFormData({...formData, diet})}>
                {['Vegetarian', 'Vegan', 'Non-Vegetarian'].map(d => (
                  <div key={d} className="flex items-center space-x-2">
                    <RadioGroupItem value={d.toLowerCase()} id={d} />
                    <Label htmlFor={d}>{d}</Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
          </Card>

          <Card className="p-8 shadow-xl border-0 bg-white/80 backdrop-blur-sm rounded-3xl">
            <Label className="mb-4 block text-lg font-semibold">Food Allergies</Label>
            <div className="space-y-2">
              {allergies.map(a => (
                <div key={a} className="flex items-center space-x-2">
                  <Checkbox
                    id={a}
                    checked={formData.allergies.includes(a)}
                    onCheckedChange={() => setFormData({...formData, allergies: toggleArray(formData.allergies, a)})}
                  />
                  <Label htmlFor={a}>{a}</Label>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-8 shadow-xl border-0 bg-white/80 backdrop-blur-sm rounded-3xl">
            <Label className="mb-4 block text-lg font-semibold">Health Goals</Label>
            <div className="space-y-2">
              {goals.map(g => (
                <div key={g} className="flex items-center space-x-2">
                  <Checkbox
                    id={g}
                    checked={formData.goals.includes(g)}
                    onCheckedChange={() => setFormData({...formData, goals: toggleArray(formData.goals, g)})}
                  />
                  <Label htmlFor={g}>{g}</Label>
                </div>
              ))}
            </div>
          </Card>

          <Button onClick={() => navigate('/home')} className="w-full bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white border-0 shadow-lg rounded-2xl h-14 text-lg font-semibold" size="lg">
            Complete Setup
          </Button>
        </div>
      </div>
      <BottomNav />
    </div>
  );
}
