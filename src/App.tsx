
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import SymptomChecker from "./pages/SymptomChecker";
import Patients from "./pages/Patients";
import Referrals from "./pages/Referrals";
import Emergency from "./pages/Emergency";
import Settings from "./pages/Settings";
import Education from "./pages/Education";
import OutbreakMonitor from "./pages/OutbreakMonitor";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/symptom-checker" element={<SymptomChecker />} />
          <Route path="/patients" element={<Patients />} />
          <Route path="/referrals" element={<Referrals />} />
          <Route path="/emergency" element={<Emergency />} />
          <Route path="/education" element={<Education />} />
          <Route path="/outbreak-monitor" element={<OutbreakMonitor />} />
          <Route path="/settings" element={<Settings />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
