import React from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";

interface ProductCardProps {
  id?: string;
  name?: string;
  image?: string;
  price?: number;
  priceUnit?: "hour" | "day";
  rating?: number;
  location?: string;
  available?: boolean;
  onClick?: () => void;
  onRequestClick?: () => void;
}

const ProductCard = ({
  id = "1",
  name = "Professional DSLR Camera",
  image = "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400&q=80",
  price = 25,
  priceUnit = "day",
  rating = 4.5,
  location = "San Francisco, CA",
  available = true,
  onClick = () => {},
  onRequestClick = () => {},
}: ProductCardProps) => {
  return (
    <Card
      className="w-full overflow-hidden transition-all hover:shadow-md bg-white border border-gray-200 hover:border-gray-300 cursor-pointer"
      onClick={onClick}
    >
      <div className="relative aspect-square w-full overflow-hidden">
        <img
          src={image}
          alt={name}
          className="h-full w-full object-cover transition-transform hover:scale-105"
        />
        <div className="absolute right-2 top-2">
          <Badge
            variant={available ? "default" : "outline"}
            className={`text-xs px-2 py-1 ${
              available
                ? "bg-green-100 text-green-800 border-green-200"
                : "bg-gray-100 text-gray-600 border-gray-200"
            }`}
          >
            {available ? "Available" : "Unavailable"}
          </Badge>
        </div>
      </div>

      <CardContent className="p-3">
        <h3 className="text-sm font-medium line-clamp-2 text-gray-900 mb-2 leading-tight">
          {name}
        </h3>

        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-1">
            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
            <span className="text-xs font-medium text-gray-700">{rating}</span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <p className="text-lg font-bold text-gray-900">
            ${price}
            <span className="text-xs font-normal text-gray-500">
              /{priceUnit}
            </span>
          </p>
        </div>

        <p className="text-xs text-gray-500 mt-1 truncate">{location}</p>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
