import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getCurrentUser } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, Save, User, Scale, Ruler, Calendar, Utensils, AlertCircle, Heart } from "lucide-react";

const ProfileEdit = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    height: "",
    weight: "",
    allergies: "",
    diseases: "",
    dietType: "veg",
    email: "",
  });

  useEffect(() => {
    const user = getCurrentUser();
    if (!user) {
      navigate("/login");
    } else {
      setFormData({
        name: user.name || "",
        age: user.age || "",
        height: user.height || "",
        weight: user.weight || "",
        allergies: user.allergies || "",
        diseases: user.diseases || "",
        dietType: user.dietType || "veg",
        email: user.email || "",
      });
    }
  }, [navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Get current users from localStorage
    const users = JSON.parse(localStorage.getItem("seasoserve_users") || "[]");
    const currentUser = getCurrentUser();
    
    // Find and update user
    const updatedUsers = users.map((user: any) => 
      user.email === currentUser.email ? { ...user, ...formData } : user
    );
    
    // Save to localStorage
    localStorage.setItem("seasoserve_users", JSON.stringify(updatedUsers));
    localStorage.setItem("seasoserve_current_user", JSON.stringify({ ...currentUser, ...formData }));
    
    toast({
      title: "Profile Updated!",
      description: "Your changes have been saved successfully.",
    });
    
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 via-yellow-50 to-white">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-border py-3 sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 flex items-center gap-4">
          <Button onClick={() => navigate("/dashboard")} variant="ghost" size="sm">
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <div className="flex items-center gap-2">
            <img src="/favicon.png" alt="SeasoServe" className="w-6 h-6" />
            <h1 className="text-xl font-bold text-foreground">Edit Profile</h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="py-8">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Profile Header */}
          <div className="bg-gradient-to-r from-orange-100 via-yellow-50 to-green-50 rounded-2xl p-6 mb-6 shadow-sm">
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 rounded-full bg-white shadow-md flex items-center justify-center">
                <User className="w-10 h-10 text-orange-500" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-foreground">{formData.name || "Your Profile"}</h2>
                <p className="text-muted-foreground">{formData.email}</p>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Personal Information */}
            <Card className="shadow-md">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="w-5 h-5 text-orange-500" />
                  Personal Information
                </CardTitle>
                <CardDescription>Update your basic details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name" className="flex items-center gap-2">
                      <User className="w-4 h-4 text-muted-foreground" />
                      Full Name
                    </Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="mt-1.5"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email" className="flex items-center gap-2">
                      <User className="w-4 h-4 text-muted-foreground" />
                      Email
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      disabled
                      className="bg-muted mt-1.5"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Physical Stats */}
            <Card className="shadow-md">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Scale className="w-5 h-5 text-green-500" />
                  Physical Stats
                </CardTitle>
                <CardDescription>Help us personalize your nutrition</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid sm:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="age" className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-muted-foreground" />
                      Age
                    </Label>
                    <Input
                      id="age"
                      name="age"
                      type="number"
                      value={formData.age}
                      onChange={handleChange}
                      required
                      className="mt-1.5"
                      placeholder="25"
                    />
                  </div>
                  <div>
                    <Label htmlFor="height" className="flex items-center gap-2">
                      <Ruler className="w-4 h-4 text-muted-foreground" />
                      Height (cm)
                    </Label>
                    <Input
                      id="height"
                      name="height"
                      type="number"
                      value={formData.height}
                      onChange={handleChange}
                      required
                      className="mt-1.5"
                      placeholder="170"
                    />
                  </div>
                  <div>
                    <Label htmlFor="weight" className="flex items-center gap-2">
                      <Scale className="w-4 h-4 text-muted-foreground" />
                      Weight (kg)
                    </Label>
                    <Input
                      id="weight"
                      name="weight"
                      type="number"
                      value={formData.weight}
                      onChange={handleChange}
                      required
                      className="mt-1.5"
                      placeholder="70"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Dietary Preferences */}
            <Card className="shadow-md">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Utensils className="w-5 h-5 text-yellow-500" />
                  Dietary Preferences
                </CardTitle>
                <CardDescription>Choose your diet type</CardDescription>
              </CardHeader>
              <CardContent>
                <Label htmlFor="dietType" className="flex items-center gap-2 mb-2">
                  <Utensils className="w-4 h-4 text-muted-foreground" />
                  Diet Type
                </Label>
                <select
                  id="dietType"
                  name="dietType"
                  value={formData.dietType}
                  onChange={handleChange}
                  className="w-full h-10 px-3 rounded-md border border-input bg-background"
                  required
                >
                  <option value="veg">🥗 Vegetarian</option>
                  <option value="nonveg">🍗 Non-Vegetarian</option>
                  <option value="vegan">🌱 Vegan</option>
                </select>
              </CardContent>
            </Card>

            {/* Health Information */}
            <Card className="shadow-md">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Heart className="w-5 h-5 text-red-500" />
                  Health Information
                </CardTitle>
                <CardDescription>Optional but helps us serve you better</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="allergies" className="flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-muted-foreground" />
                    Allergies
                  </Label>
                  <Input
                    id="allergies"
                    name="allergies"
                    value={formData.allergies}
                    onChange={handleChange}
                    placeholder="e.g., Peanuts, Dairy, Gluten"
                    className="mt-1.5"
                  />
                </div>
                <div>
                  <Label htmlFor="diseases" className="flex items-center gap-2">
                    <Heart className="w-4 h-4 text-muted-foreground" />
                    Health Conditions
                  </Label>
                  <Input
                    id="diseases"
                    name="diseases"
                    value={formData.diseases}
                    onChange={handleChange}
                    placeholder="e.g., Diabetes, Hypertension, Thyroid"
                    className="mt-1.5"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Save Button */}
            <Button type="submit" className="w-full gap-2 h-12 text-base shadow-md hover:shadow-lg transition-all">
              <Save className="w-5 h-5" />
              Save Changes
            </Button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default ProfileEdit;
