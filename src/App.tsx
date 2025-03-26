
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { SidebarProvider } from "./contexts/SidebarContext";

import Index from "./pages/Index";
import About from "./pages/About";
import Features from "./pages/Features";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import PlacementData from "./pages/PlacementData";
import EventsData from "./pages/EventsData";
import AdministrationData from "./pages/AdministrationData";
import QueryBuilder from "./pages/QueryBuilder";
import QueryResults from "./pages/QueryResults";
import NotFound from "./pages/NotFound";
// import Dashboard2 from "./pages/Dashboard2";
import PowerBIEmbedComponent from "./pages/PowerBIEmbedComponent";
const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/about" element={<About />} />
            <Route path="/features" element={<Features />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            {/* <Route path="/dashboard2" element={<Dashboard2 />} /> */}
            <Route path="/power-bi-embed" element={<PowerBIEmbedComponent />} />
            <Route path="/dashboard" element={
              <SidebarProvider>
                <Dashboard />
              </SidebarProvider>
            } />
            <Route path="/placement-data" element={
              <SidebarProvider>
                <PlacementData />
              </SidebarProvider>
            } />
            <Route path="/events-data" element={
              <SidebarProvider>
                <EventsData />
              </SidebarProvider>
            } />
            <Route path="/administration-data" element={
              <SidebarProvider>
                <AdministrationData />
              </SidebarProvider>
            } />
            <Route path="/query-builder" element={
              <SidebarProvider>
                <QueryBuilder />
              </SidebarProvider>
            } />
            <Route path="/query-results" element={
              <SidebarProvider>
                <QueryResults />
              </SidebarProvider>
            } />
            
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
