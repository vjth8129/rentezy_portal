import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import AuthFlow from "./auth/AuthFlow";
import ProductGrid from "./dashboard/ProductGrid";
import { Button } from "./ui/button";
import { Plus } from "lucide-react";

interface HomeProps {
  initialLocation?: string;
}

const Home = ({ initialLocation = "New York, NY" }: HomeProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentLocation, setCurrentLocation] = useState(initialLocation);
  const navigate = useNavigate();

  // Handle successful authentication
  const handleAuthSuccess = () => {
    setIsAuthenticated(true);
  };

  // Handle skip login
  const handleSkipLogin = () => {
    setIsAuthenticated(true);
  };

  // Handle location change
  const handleLocationChange = (location: string) => {
    setCurrentLocation(location);
  };

  return (
    <div className="min-h-screen bg-background">
      {!isAuthenticated ? (
        <div className="flex justify-center items-center min-h-screen p-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-lg"
          >
            <AuthFlow onComplete={handleAuthSuccess} onSkip={handleSkipLogin} />
          </motion.div>
        </div>
      ) : (
        <div className="relative">
          {/* Floating Add Product Button */}
          <Button
            className="fixed bottom-6 right-6 rounded-full h-14 w-14 shadow-lg z-50 bg-blue-600 hover:bg-blue-700"
            size="icon"
            onClick={() => navigate("/add-product")}
          >
            <Plus className="h-6 w-6" />
          </Button>

          {/* Main content */}
          <main>
            <ProductGrid location={currentLocation} />
          </main>
        </div>
      )}
    </div>
  );
};

export default Home;
