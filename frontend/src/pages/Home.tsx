import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { MapPin, Mountain, TreePine, Building2 } from "lucide-react";
import { Link } from "react-router-dom";
import Autoplay from "embla-carousel-autoplay";

const Home = () => {
  const attractions = [
    {
      id: 1,
      title: "Jhargram Raj Palace",
      description: "Historic royal palace showcasing the rich heritage of Jhargram",
      image: "https://images.unsplash.com/photo-1561575584-22d25324a87e?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: 2,
      title: "Chilkigarh Kanak Durga Temple",
      description: "Ancient temple dedicated to Goddess Kanak Durga",
      image: "https://plus.unsplash.com/premium_photo-1692102550620-35f8716814b4?q=80&w=685&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: 3,
      title: "Kangshabati River",
      description: "Scenic river flowing through the picturesque landscape",
      image: "https://images.unsplash.com/photo-1731693157727-2bf80d3ea6fa?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fEthbmdzaGFiYXRpJTIwUml2ZXJ8ZW58MHx8MHx8fDA%3D",
    },
    {
      id: 4,
      title: "Belpahari Forest",
      description: "Lush green forests rich in biodiversity",
      image: "https://images.unsplash.com/photo-1595108982212-d0461c5c5e4a?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
  ];

  const features = [
    {
      icon: TreePine,
      title: "Natural Beauty",
      description: "Explore the lush forests and scenic landscapes of Jhargram",
    },
    {
      icon: Building2,
      title: "Rich Heritage",
      description: "Discover historic palaces and ancient temples",
    },
    {
      icon: Mountain,
      title: "Local Attractions",
      description: "Experience the unique culture and traditions",
    },
    {
      icon: MapPin,
      title: "Handicrafts",
      description: "Authentic local products and traditional crafts",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Carousel */}
      <section className="relative">
        <Carousel
          opts={{ align: "start", loop: true }}
          plugins={[
            Autoplay({
              delay: 4000,
            }),
          ]}
          className="w-full"
        >
          <CarouselContent>
            {attractions.map((attraction) => (
              <CarouselItem key={attraction.id}>
                <div className="relative h-[500px] md:h-[600px]">
                  <img
                    src={attraction.image}
                    alt={attraction.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/50 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-8 md:p-16">
                    <div className="container mx-auto">
                      <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
                        {attraction.title}
                      </h2>
                      <p className="text-lg md:text-xl text-muted-foreground mb-6 max-w-2xl">
                        {attraction.description}
                      </p>
                      <Link to="/products">
                        <Button size="lg" className="text-lg">
                          Explore Local Products
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-4" />
          <CarouselNext className="right-4" />
        </Carousel>
      </section>

      {/* Welcome Section */}
      <section className="py-16 bg-secondary/20">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Welcome to Jhargram Local Products
            </h2>
            <p className="text-lg text-muted-foreground">
              Discover authentic handicrafts and local products from the beautiful district of Jhargram.
              Each product tells a story of our rich cultural heritage and traditional craftsmanship.
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} className="border-2 hover:border-primary transition-colors">
                  <CardContent className="p-6 text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                      <Icon className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="container">
          <div className="bg-primary/10 rounded-lg p-8 md:p-12 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Browse Our Collection
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Support local artisans and take home a piece of Jhargram's rich cultural heritage.
              Shop authentic handicrafts, traditional items, and locally made products.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/products">
                <Button size="lg" className="text-lg">
                  View All Products
                </Button>
              </Link>
              <Link to="/about">
                <Button size="lg" variant="outline" className="text-lg">
                  Learn More About Us
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
