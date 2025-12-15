import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AuthCallback from "./pages/AuthCallback";
import NotFound from "./pages/NotFound";
import Dashboard from "./pages/Dashboard";
import DashboardHome from "./pages/DashboardHome";
import ProfileEdit from "./pages/ProfileEdit";
import ClimateSuggestions from "./pages/ClimateSuggestions";
import Onboarding from "./pages/Onboarding";
import Location from "./pages/Location";
import Profile from "./pages/Profile";
import Home from "./pages/Home";
import Seasonal from "./pages/Seasonal";
import Recipes from "./pages/Recipes";
import FoodDetail from "./pages/FoodDetail";
import ProgressPage from "./pages/Progress";
import Learn from "./pages/Learn";
import MealPlan from "./pages/MealPlan";
import Chatbot from "./pages/Chatbot";
import TravelMode from "./pages/TravelMode";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/auth/callback" element={<AuthCallback />} />
          <Route path="/dashboard" element={<DashboardHome />} />
          <Route path="/dashboard/climate" element={<ClimateSuggestions />} />
          <Route path="/dashboard/meal-planner" element={<MealPlan />} />
          <Route path="/dashboard/chatbot" element={<Chatbot />} />
          <Route path="/dashboard/travel" element={<TravelMode />} />
          <Route path="/profile-edit" element={<ProfileEdit />} />
          <Route path="/climate-suggestions" element={<ClimateSuggestions />} />
          <Route path="/chatbot" element={<Chatbot />} />
          <Route path="/onboarding" element={<Onboarding />} />
          <Route path="/location" element={<Location />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/home" element={<Home />} />
          <Route path="/seasonal" element={<Seasonal />} />
          <Route path="/recipes" element={<Recipes />} />
          <Route path="/food/:name" element={<FoodDetail />} />
          <Route path="/progress" element={<ProgressPage />} />
          <Route path="/learn" element={<Learn />} />
          <Route path="/meal-plan" element={<MealPlan />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;