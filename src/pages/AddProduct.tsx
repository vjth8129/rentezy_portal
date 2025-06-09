import React from "react";
import { useNavigate } from "react-router-dom";
import AddProductForm from "@/components/dashboard/AddProductForm";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const AddProduct = () => {
  const navigate = useNavigate();

  const handleSuccess = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b sticky top-0 z-10">
        <div className="px-4 py-4 flex items-center">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate("/")}
            className="mr-3"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-xl font-semibold">Add Product for Rent</h1>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 py-6">
        <AddProductForm onSuccess={handleSuccess} />
      </div>
    </div>
  );
};

export default AddProduct;
