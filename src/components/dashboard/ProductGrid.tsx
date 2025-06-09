import React, { useState } from "react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, ChevronRight, Search, Filter } from "lucide-react";
import ProductCard from "./ProductCard";

interface Product {
  id: string;
  name: string;
  image: string;
  price: number;
  priceUnit: "hour" | "day";
  rating: number;
  location: string;
  distance: string;
  available: boolean;
  category: string;
  brand: string;
}

interface ProductGridProps {
  location?: string;
  products?: Product[];
}

const ProductGrid = ({
  location = "New York, NY",
  products = defaultProducts,
}: ProductGridProps) => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [brandFilter, setBrandFilter] = useState("all");
  const [ratingFilter, setRatingFilter] = useState([0]);
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

  // Filter products based on selected filters
  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      activeCategory === "all" || product.category === activeCategory;
    const matchesBrand = brandFilter === "all" || product.brand === brandFilter;
    const matchesRating = product.rating >= ratingFilter[0];
    const matchesSearch =
      searchQuery === "" ||
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.brand.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesBrand && matchesRating && matchesSearch;
  });

  // Get unique categories and brands for filters
  const categories = ["all", ...new Set(products.map((p) => p.category))];
  const brands = ["all", ...new Set(products.map((p) => p.brand))];

  // Group products by category for sections
  const getProductsByCategory = (category: string) => {
    if (category === "all") return filteredProducts;
    return filteredProducts.filter((p) => p.category === category);
  };

  // Get trending products (highest rated)
  const trendingProducts = filteredProducts.sort((a, b) => b.rating - a.rating);

  // Get newly added products (simulated)
  const newProducts = filteredProducts;

  const CategorySection = ({
    title,
    products,
    categoryKey,
  }: {
    title: string;
    products: Product[];
    categoryKey: string;
  }) => {
    const isExpanded = expandedCategory === categoryKey;
    const displayProducts = isExpanded ? products : products.slice(0, 6);

    if (products.length === 0) return null;

    return (
      <div className="mb-10">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
          {products.length > 6 && (
            <Button
              variant="ghost"
              className="text-blue-600 hover:text-blue-800 p-0 h-auto font-semibold text-base"
              onClick={() =>
                setExpandedCategory(isExpanded ? null : categoryKey)
              }
            >
              {isExpanded ? "View Less" : `View All (${products.length})`}
              <ChevronRight
                className={`h-5 w-5 ml-1 transition-transform ${isExpanded ? "rotate-90" : ""}`}
              />
            </Button>
          )}
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {displayProducts.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
        {!isExpanded && products.length > 6 && (
          <div className="mt-6 text-center">
            <Button
              variant="outline"
              className="text-blue-600 border-2 border-blue-600 hover:bg-blue-50 px-8 py-3 rounded-lg font-semibold text-base"
              onClick={() => setExpandedCategory(categoryKey)}
            >
              View More Products
            </Button>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="w-full bg-white min-h-screen">
      {/* Header with search and location */}
      <div className="bg-white shadow-sm border-b sticky top-0 z-10">
        <div className="px-4 py-4">
          {/* Search bar */}
          <div className="flex items-center gap-3 mb-4">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                placeholder="Find Cars, Mobile Phones and more..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 h-12 border-2 border-gray-200 focus:border-blue-500 rounded-lg text-base"
              />
            </div>
            <Button
              variant="outline"
              size="icon"
              className="h-12 w-12 border-2 border-gray-200 rounded-lg"
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter className="h-5 w-5" />
            </Button>
          </div>

          {/* Location */}
          <div className="flex items-center text-sm text-gray-700 mb-4">
            <MapPin className="h-4 w-4 mr-2 text-blue-600" />
            <span className="font-medium">{location}</span>
            <Button
              variant="ghost"
              size="sm"
              className="ml-2 text-blue-600 p-1 h-auto font-medium hover:bg-blue-50"
            >
              Change
            </Button>
          </div>
        </div>

        {/* Category scroll */}
        <div className="px-4 pb-4">
          <div className="flex gap-3 overflow-x-auto scrollbar-hide">
            {categories.map((category) => (
              <Badge
                key={category}
                variant={activeCategory === category ? "default" : "outline"}
                className={`cursor-pointer whitespace-nowrap px-6 py-3 text-sm font-semibold transition-all rounded-full ${
                  activeCategory === category
                    ? "bg-blue-600 text-white hover:bg-blue-700 shadow-md"
                    : "bg-gray-100 text-gray-700 border-0 hover:bg-gray-200"
                }`}
                onClick={() => setActiveCategory(category)}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </Badge>
            ))}
          </div>
        </div>
      </div>

      {/* Filters panel */}
      {showFilters && (
        <div className="bg-gray-50 border-b px-4 py-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="text-base font-semibold text-gray-800 mb-3 block">
                Brand
              </label>
              <Select value={brandFilter} onValueChange={setBrandFilter}>
                <SelectTrigger className="h-12 border-2 border-gray-200 rounded-lg">
                  <SelectValue placeholder="All Brands" />
                </SelectTrigger>
                <SelectContent>
                  {brands.map((brand) => (
                    <SelectItem key={brand} value={brand}>
                      {brand.charAt(0).toUpperCase() + brand.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="md:col-span-2">
              <label className="text-base font-semibold text-gray-800 mb-3 block">
                Minimum Rating: {ratingFilter[0]}
              </label>
              <Slider
                value={ratingFilter}
                onValueChange={setRatingFilter}
                max={5}
                step={0.5}
                className="w-full mt-2"
              />
            </div>
          </div>
        </div>
      )}

      {/* Main content */}
      <div className="px-4 py-6 bg-gray-50">
        {activeCategory === "all" ? (
          <>
            <CategorySection
              title="Trending Now"
              products={trendingProducts}
              categoryKey="trending"
            />
            <CategorySection
              title="Newly Added"
              products={newProducts}
              categoryKey="new"
            />
            {categories
              .filter((cat) => cat !== "all")
              .map((category) => (
                <CategorySection
                  key={category}
                  title={category.charAt(0).toUpperCase() + category.slice(1)}
                  products={getProductsByCategory(category)}
                  categoryKey={category}
                />
              ))}
          </>
        ) : (
          <CategorySection
            title={
              activeCategory.charAt(0).toUpperCase() + activeCategory.slice(1)
            }
            products={getProductsByCategory(activeCategory)}
            categoryKey={activeCategory}
          />
        )}

        {filteredProducts.length === 0 && (
          <div className="text-center py-20 bg-white rounded-lg mx-4">
            <div className="text-gray-400 mb-6">
              <Search className="h-20 w-20 mx-auto" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              No products found
            </h3>
            <p className="text-gray-600 text-base">
              Try adjusting your search or filters
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

// Mock data for default products
const defaultProducts: Product[] = [
  {
    id: "1",
    name: "Professional DSLR Camera",
    image:
      "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400&q=80",
    price: 35,
    priceUnit: "day",
    rating: 4.8,
    location: "New York, NY",
    distance: "0.8 miles away",
    available: true,
    category: "electronics",
    brand: "canon",
  },
  {
    id: "2",
    name: "Mountain Bike",
    image:
      "https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=400&q=80",
    price: 25,
    priceUnit: "day",
    rating: 4.5,
    location: "New York, NY",
    distance: "1.2 miles away",
    available: true,
    category: "sports",
    brand: "trek",
  },
  {
    id: "3",
    name: "Portable Projector",
    image:
      "https://images.unsplash.com/photo-1626379953822-baec19c3accd?w=400&q=80",
    price: 20,
    priceUnit: "day",
    rating: 4.2,
    location: "New York, NY",
    distance: "0.5 miles away",
    available: false,
    category: "electronics",
    brand: "epson",
  },
  {
    id: "4",
    name: "Camping Tent (4-Person)",
    image:
      "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=400&q=80",
    price: 30,
    priceUnit: "day",
    rating: 4.7,
    location: "New York, NY",
    distance: "2.1 miles away",
    available: true,
    category: "outdoors",
    brand: "coleman",
  },
  {
    id: "5",
    name: "Electric Drill",
    image:
      "https://images.unsplash.com/photo-1572981779307-38b8cabb2407?w=400&q=80",
    price: 15,
    priceUnit: "day",
    rating: 4.0,
    location: "New York, NY",
    distance: "1.5 miles away",
    available: true,
    category: "tools",
    brand: "dewalt",
  },
  {
    id: "6",
    name: "DJ Equipment Set",
    image:
      "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400&q=80",
    price: 75,
    priceUnit: "day",
    rating: 4.9,
    location: "New York, NY",
    distance: "3.2 miles away",
    available: true,
    category: "music",
    brand: "pioneer",
  },
  {
    id: "7",
    name: "Road Bicycle",
    image:
      "https://images.unsplash.com/photo-1532298229144-0ec0c57515c7?w=400&q=80",
    price: 28,
    priceUnit: "day",
    rating: 4.6,
    location: "New York, NY",
    distance: "0.9 miles away",
    available: true,
    category: "sports",
    brand: "specialized",
  },
  {
    id: "8",
    name: "Drone with Camera",
    image:
      "https://images.unsplash.com/photo-1579829366248-204fe8413f31?w=400&q=80",
    price: 45,
    priceUnit: "day",
    rating: 4.4,
    location: "New York, NY",
    distance: "1.7 miles away",
    available: true,
    category: "electronics",
    brand: "dji",
  },
];

export default ProductGrid;
