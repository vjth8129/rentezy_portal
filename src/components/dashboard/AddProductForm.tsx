import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { CalendarIcon, ImagePlus, MapPin, X, Camera } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const formSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Product name must be at least 2 characters." }),
  description: z
    .string()
    .min(10, { message: "Description must be at least 10 characters." }),
  category: z.string().min(1, { message: "Please select a category." }),
  brand: z.string().min(1, { message: "Please enter a brand name." }),
  price: z.coerce
    .number()
    .positive({ message: "Price must be a positive number." }),
  rentalType: z.enum(["hourly", "daily"]),
  location: z.string().min(5, { message: "Please enter a valid location." }),
  availableFrom: z.date(),
  availableTo: z.date(),
});

type FormValues = z.infer<typeof formSchema>;

interface AddProductFormProps {
  onSuccess?: () => void;
}

const AddProductForm = ({ onSuccess = () => {} }: AddProductFormProps) => {
  const [images, setImages] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      category: "",
      brand: "",
      price: 0,
      rentalType: "daily",
      location: "",
      availableFrom: new Date(),
      availableTo: new Date(new Date().setMonth(new Date().getMonth() + 1)),
    },
  });

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    try {
      // Simulate API call
      console.log("Form data:", { ...data, images });
      await new Promise((resolve) => setTimeout(resolve, 1000));
      alert("Product added successfully!");
      form.reset();
      setImages([]);
      onSuccess();
    } catch (error) {
      console.error("Error adding product:", error);
      alert("Failed to add product. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    // Convert FileList to array and process each file
    Array.from(files).forEach((file) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          setImages((prev) => [...prev, e.target!.result as string]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const useCurrentLocation = () => {
    // Simulate getting current location
    form.setValue("location", "Current Location, City, Country");
  };

  const categories = [
    "Electronics",
    "Home Appliances",
    "Furniture",
    "Sports Equipment",
    "Tools",
    "Clothing",
    "Books",
    "Musical Instruments",
    "Vehicles",
    "Other",
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-6">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-lg border-0 mb-8 p-8">
          <div className="flex items-center gap-4 mb-3">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl flex items-center justify-center shadow-lg">
              <Camera className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900">Post your Ad</h1>
          </div>
          <p className="text-gray-600 text-lg">
            Fill in the details below to list your product for rent
          </p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Product Images */}
            <Card className="border-0 shadow-lg rounded-xl">
              <CardHeader className="pb-6">
                <CardTitle className="text-xl font-bold flex items-center gap-3">
                  <Camera className="w-6 h-6 text-blue-600" />
                  Add Photos
                </CardTitle>
                <p className="text-base text-gray-600">
                  Add up to 5 photos to showcase your product
                </p>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                  {images.map((image, index) => (
                    <div key={index} className="relative aspect-square">
                      <img
                        src={image}
                        alt={`Product image ${index + 1}`}
                        className="w-full h-full object-cover rounded-lg border-2 border-gray-200"
                      />
                      <Button
                        type="button"
                        variant="destructive"
                        size="icon"
                        className="absolute -top-2 -right-2 h-6 w-6 rounded-full shadow-lg"
                        onClick={() => removeImage(index)}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  ))}
                  {images.length < 5 && (
                    <label
                      htmlFor="image-upload"
                      className="aspect-square border-2 border-dashed border-blue-300 rounded-lg cursor-pointer bg-blue-50 hover:bg-blue-100 transition-colors flex flex-col items-center justify-center"
                    >
                      <ImagePlus className="w-8 h-8 text-blue-600 mb-2" />
                      <span className="text-sm font-medium text-blue-600">
                        Add Photo
                      </span>
                      <input
                        id="image-upload"
                        type="file"
                        accept="image/*"
                        multiple
                        className="hidden"
                        onChange={handleImageUpload}
                        disabled={images.length >= 5}
                      />
                    </label>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Product Details */}
            <Card className="border-0 shadow-lg rounded-xl">
              <CardHeader className="pb-6">
                <CardTitle className="text-xl font-bold">
                  Product Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base font-medium">
                        Product Title *
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="e.g. iPhone 13 Pro Max"
                          className="h-12 text-base border-gray-300 focus:border-blue-500"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base font-medium">
                        Description *
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Describe your product - condition, features, what's included..."
                          className="min-h-[120px] text-base border-gray-300 focus:border-blue-500 resize-none"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-base font-medium">
                          Category *
                        </FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="h-12 text-base border-gray-300 focus:border-blue-500">
                              <SelectValue placeholder="Choose category" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {categories.map((category) => (
                              <SelectItem key={category} value={category}>
                                {category}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="brand"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-base font-medium">
                          Brand *
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="e.g. Apple, Samsung"
                            className="h-12 text-base border-gray-300 focus:border-blue-500"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Pricing */}
            <Card className="border-0 shadow-lg rounded-xl">
              <CardHeader className="pb-6">
                <CardTitle className="text-xl font-bold">
                  Set Your Price
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="price"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-base font-medium">
                          Rental Price *
                        </FormLabel>
                        <FormControl>
                          <div className="relative">
                            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 font-medium">
                              $
                            </span>
                            <Input
                              type="number"
                              min="0"
                              step="0.01"
                              className="h-12 text-base border-gray-300 focus:border-blue-500 pl-8"
                              placeholder="0.00"
                              {...field}
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="rentalType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-base font-medium">
                          Rental Period *
                        </FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="h-12 text-base border-gray-300 focus:border-blue-500">
                              <SelectValue placeholder="Select period" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="hourly">Per Hour</SelectItem>
                            <SelectItem value="daily">Per Day</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Location & Availability */}
            <Card className="border-0 shadow-lg rounded-xl">
              <CardHeader className="pb-6">
                <CardTitle className="text-xl font-bold">
                  Location & Availability
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <FormField
                  control={form.control}
                  name="location"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base font-medium">
                        Location *
                      </FormLabel>
                      <div className="flex gap-3">
                        <FormControl>
                          <Input
                            placeholder="Enter your location"
                            className="h-12 text-base border-gray-300 focus:border-blue-500"
                            {...field}
                          />
                        </FormControl>
                        <Button
                          type="button"
                          variant="outline"
                          size="icon"
                          className="h-12 w-12 border-gray-300"
                          onClick={useCurrentLocation}
                        >
                          <MapPin className="h-5 w-5" />
                        </Button>
                      </div>
                      <FormDescription className="text-sm text-gray-600">
                        This helps people find your product nearby
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="availableFrom"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel className="text-base font-medium">
                          Available From *
                        </FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant={"outline"}
                                className="h-12 w-full pl-3 text-left font-normal border-gray-300 focus:border-blue-500"
                              >
                                {field.value ? (
                                  format(field.value, "PPP")
                                ) : (
                                  <span className="text-gray-500">
                                    Pick a date
                                  </span>
                                )}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                              disabled={(date) => date < new Date()}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="availableTo"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel className="text-base font-medium">
                          Available To *
                        </FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant={"outline"}
                                className="h-12 w-full pl-3 text-left font-normal border-gray-300 focus:border-blue-500"
                              >
                                {field.value ? (
                                  format(field.value, "PPP")
                                ) : (
                                  <span className="text-gray-500">
                                    Pick a date
                                  </span>
                                )}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                              disabled={(date) =>
                                date < form.getValues("availableFrom")
                              }
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Submit Button */}
            <div className="sticky bottom-0 bg-white border-t-2 border-gray-200 p-6 -mx-4 shadow-2xl">
              <div className="max-w-4xl mx-auto">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full h-14 text-lg font-bold bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 rounded-xl shadow-lg"
                >
                  {isSubmitting ? "Publishing Your Ad..." : "Post Ad"}
                </Button>
              </div>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default AddProductForm;
