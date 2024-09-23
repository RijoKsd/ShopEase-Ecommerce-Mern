import { Button } from "@/components/ui/button";
import bannerOne from "../../assets/banner-1.webp";
import bannerTwo from "../../assets/banner-2.webp";
import bannerThree from "../../assets/banner-3.webp";
import {
  User,
  UserCircle,
  Baby,
  Glasses,
  Footprints,
  ChevronLeftIcon,
  ChevronRightIcon,
  Shirt,
  Cat,
  Scissors,
  ShoppingBag,
  Store,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
export default function ShoppingHome() {
  const slides = [bannerTwo, bannerThree, bannerOne];

  const categories = [
    { id: "men", label: "Men", icon: User },
    { id: "women", label: "Women", icon: UserCircle },
    { id: "kids", label: "Kids", icon: Baby },
    { id: "accessories", label: "Accessories", icon: Glasses },
    { id: "footwear", label: "Footwear", icon: Footprints },
  ];

  const brands = [
    { id: "nike", label: "Nike", icon: Footprints },
    { id: "adidas", label: "Adidas", icon: Shirt },
    { id: "puma", label: "Puma", icon: Cat },
    { id: "levi", label: "Levi's", icon: Scissors },
    { id: "zara", label: "Zara", icon: ShoppingBag },
    { id: "h&m", label: "H&M", icon: Store },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Home banners */}
      <div className="relative w-full h-[600px] overflow-hidden">
        {slides.map((slide, index) => (
          <img
            src={slide}
            alt="banner"
            key={index}
            className="absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000"
          />
        ))}
        <Button
          variant="outline"
          size="icon"
          className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white/80"
        >
          <ChevronLeftIcon className="w-4 h-4" />
        </Button>

        <Button
          variant="outline"
          size="icon"
          className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white/80"
        >
          <ChevronRightIcon className="w-4 h-4" />
        </Button>
      </div>
      {/* Categories */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">
            Shop by category
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {categories.map((category) => (
              <Card
                className="cursor-pointer hover:shadow-lg transition-shadow"
                key={category.id}
              >
                <CardContent className="flex flex-col items-center  justify-center p-6">
                  <category.icon className="w-12 h-12 mb-4 text-primary" />
                  <span className="font-bold">{category.label}</span>
                </CardContent>
              </Card>
            ))}
          </div>

          <h2 className="text-3xl font-bold text-center mb-8">Shop by brand</h2>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {brands.map((brand) => (
              <Card
                className="cursor-pointer hover:shadow-lg transition-shadow"
                key={brand.id}
              >
                <CardContent className="flex flex-col items-center  justify-center p-6">
                  <brand.icon className="w-12 h-12 mb-4 text-primary" />
                  <span className="font-bold">{brand.label}</span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
