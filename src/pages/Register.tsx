import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft } from "lucide-react";
import { registerUser } from "@/lib/auth";

const Register = () => {
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
    password: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const result = registerUser(formData);
    
    if (result.success) {
      toast({
        title: "Account Created!",
        description: "Welcome to SeasoServe. Please login to continue.",
      });
      navigate("/login");
    } else {
      toast({
        title: "Registration Failed",
        description: result.message,
        variant: "destructive",
      });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section className="min-h-screen w-full relative flex items-center justify-center">
      {/* Video Background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover"
        style={{ zIndex: 0 }}
      >
        <source src="/oranges.mp4" type="video/mp4" />
      </video>

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/50" style={{ zIndex: 1 }}></div>

      <div className="container mx-auto px-4 py-8 relative" style={{ zIndex: 10 }}>
        <div className="max-w-2xl mx-auto">
          {/* Back Button */}
          <Button
            variant="ghost"
            className="mb-6 text-white hover:text-white/80"
            onClick={() => navigate("/")}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>

          {/* Form Card */}
          <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-8 shadow-2xl">
            <div className="text-center mb-8">
              <h1 className="text-4xl md:text-5xl font-extrabold text-foreground mb-3">
                Create Account
              </h1>
              <p className="text-muted-foreground">
                Join SeasoServe for personalized food recommendations
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Personal Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground">Personal Information</h3>
                
                <div>
                  <Label htmlFor="name">Full Name *</Label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="mt-1"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="age">Age *</Label>
                    <Input
                      id="age"
                      name="age"
                      type="number"
                      placeholder="25"
                      value={formData.age}
                      onChange={handleChange}
                      required
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="height">Height (cm) *</Label>
                    <Input
                      id="height"
                      name="height"
                      type="number"
                      placeholder="170"
                      value={formData.height}
                      onChange={handleChange}
                      required
                      className="mt-1"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="weight">Weight (kg) *</Label>
                  <Input
                    id="weight"
                    name="weight"
                    type="number"
                    placeholder="70"
                    value={formData.weight}
                    onChange={handleChange}
                    required
                    className="mt-1"
                  />
                </div>
              </div>

              {/* Health Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground">Health Information</h3>
                
                <div>
                  <Label htmlFor="allergies">Food Allergies</Label>
                  <Input
                    id="allergies"
                    name="allergies"
                    type="text"
                    placeholder="e.g., Peanuts, Dairy (leave blank if none)"
                    value={formData.allergies}
                    onChange={handleChange}
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="diseases">Medical Conditions</Label>
                  <Input
                    id="diseases"
                    name="diseases"
                    type="text"
                    placeholder="e.g., Diabetes, Hypertension (leave blank if none)"
                    value={formData.diseases}
                    onChange={handleChange}
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label>Diet Preference *</Label>
                  <div className="flex gap-3 mt-2">
                    {["veg", "nonveg", "vegan"].map((type) => (
                      <label
                        key={type}
                        className={`flex-1 cursor-pointer rounded-xl border-2 p-4 text-center transition-all ${
                          formData.dietType === type
                            ? "border-leaf-green bg-leaf-green/10"
                            : "border-border hover:border-leaf-green/50"
                        }`}
                      >
                        <input
                          type="radio"
                          name="dietType"
                          value={type}
                          checked={formData.dietType === type}
                          onChange={handleChange}
                          className="sr-only"
                        />
                        <span className="font-medium capitalize">{type === "nonveg" ? "Non-Veg" : type}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              {/* Account Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground">Account Information</h3>
                
                <div>
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="your@email.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="password">Password *</Label>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="Create a strong password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    className="mt-1"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                variant="hero"
                size="lg"
                className="w-full"
              >
                Create Account
              </Button>

              <p className="text-center text-sm text-muted-foreground">
                Already have an account?{" "}
                <button
                  type="button"
                  onClick={() => navigate("/")}
                  className="text-leaf-green font-medium hover:underline"
                >
                  Login
                </button>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;