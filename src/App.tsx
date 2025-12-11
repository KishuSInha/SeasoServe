import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Onboarding from "./pages/Onboarding";
import Location from "./pages/Location";
import Profile from "./pages/Profile";
import Home from "./pages/Home";
import Seasonal from "./pages/Seasonal";
import Recipes from "./pages/Recipes";
import FoodDetail from "./pages/FoodDetail";
import ProgressPage from "./pages/Progress";
import Learn from "./pages/Learn";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/onboarding" element={<Onboarding />} />
          <Route path="/location" element={<Location />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/home" element={<Home />} />
          <Route path="/seasonal" element={<Seasonal />} />
          <Route path="/recipes" element={<Recipes />} />
          <Route path="/food/:name" element={<FoodDetail />} />
          <Route path="/progress" element={<ProgressPage />} />
          <Route path="/learn" element={<Learn />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
