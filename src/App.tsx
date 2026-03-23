import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Careers from "./pages/Careers";
import Industries from "./pages/Industries";
import AboutUs from "./pages/AboutUs";
import SoftwareSolution from "./pages/SoftwareSolution";
import ManagedServices from "./pages/ManagedServices";
import FullStackDeveloper from "./pages/careers/FullStackDeveloper";
import AccountsReceivableSpecialist from "./pages/careers/AccountsReceivableSpecialist";
import OpenApplication from "./pages/careers/OpenApplication";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Contact from "./pages/Contact";
import Pricing from "./pages/Pricing";
import Partners from "./pages/Partners";
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
          <Route path="/careers" element={<Careers />} />
          <Route path="/careers/full-stack-developer" element={<FullStackDeveloper />} />
          <Route path="/careers/accounts-receivable-specialist" element={<AccountsReceivableSpecialist />} />
          <Route path="/careers/open-application" element={<OpenApplication />} />
          <Route path="/industries" element={<Industries />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/solutions/software" element={<SoftwareSolution />} />
          <Route path="/solutions/managed-services" element={<ManagedServices />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/partners" element={<Partners />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
