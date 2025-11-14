/* eslint-disable no-irregular-whitespace */
import { Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, Users, Award, Leaf } from "lucide-react";

const About = () => {
  const values = [
    {
      icon: Heart,
      title: "Supporting Local Artisans",
      description: "We work directly with local craftsmen and artisans, ensuring fair compensation and preserving traditional skills.",
    },
    {
      icon: Users,
      title: "Community Empowerment",
      description: "Our platform empowers local communities by providing them with a marketplace to showcase their products to a wider audience.",
    },
    {
      icon: Award,
      title: "Authentic Quality",
      description: "Every product is carefully curated to ensure authenticity and maintain the highest quality standards.",
    },
    {
      icon: Leaf,
      title: "Sustainable Practices",
      description: "We promote eco-friendly and sustainable production methods that respect our environment and heritage.",
    },
  ];

  const featuredCategories = [
        { 
            name: "Dokra Metal Art", 
            description: "Intricate metal work, centuries-old lost-wax casting technique.",
            image: "https://images.unsplash.com/photo-1652164726284-2e82259cddfc?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", 
            link: "/products?category=Dokra", // Placeholder link
        },
        { 
            name: "Terracotta Pottery", 
            description: "Earthy, traditional, and fired pottery by local masters.",
            image: "https://images.unsplash.com/photo-1629206095688-90fe13572c1b?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", 
            link: "/products?category=Terracotta", // Placeholder link
        },
    ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container py-12">
        {/* Hero Section */}
        <div className="text-center max-w-4xl mx-auto mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">About FolkCart</h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Jhargram, located in the western part of West Bengal, is known for its rich cultural heritage,
            natural beauty, and traditional handicrafts. Our mission is to bring the authentic products
            and craftsmanship of Jhargram to customers worldwide.
          </p>
        </div>

        {/* Image Section */}
        <div className="mb-16 rounded-lg overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1613329619494-9b99e6e35a93?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Jhargram local artisans at work"
            className="w-full h-[600px] object-cover"
          />
        </div>

        {/* Story Section */}
        <div className="max-w-4xl mx-auto mb-16">
          <h2 className="text-3xl font-bold mb-6">Our Story</h2>
          <div className="space-y-4 text-muted-foreground">
            <p>
              Jhargram district, known for its scenic beauty, tribal culture, and rich handicraft traditions,
              has been home to skilled artisans for generations. From intricate Dokra metal work to beautiful
              tribal paintings, terracotta pottery to bamboo handicrafts, our region boasts a diverse range
              of traditional art forms.
            </p>
            <p>
              We started this platform to bridge the gap between these talented local artisans and customers
              who appreciate authentic, handmade products. Many of these crafts have been passed down through
              generations, representing centuries of skill, tradition, and cultural heritage.
            </p>
            <p>
              By purchasing from us, you're not just buying a product – you're supporting local families,
              preserving traditional art forms, and taking home a piece of Jhargram's rich cultural tapestry.
            </p>
          </div>
        </div>

        {/* Values Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <Card key={index}>
                  <CardContent className="p-6">
                    <div className="flex gap-4">
                      <div className="flex-shrink-0">
                        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10">
                          <Icon className="h-6 w-6 text-primary" />
                        </div>
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
                        <p className="text-muted-foreground">{value.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        <div className="bg-white rounded-lg p-0 md:p-0">
                <h2 className="text-3xl md:text-4xl font-bold font-serif-display text-center mb-10">
                    Explore Our Featured Crafts
                </h2>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {featuredCategories.map((category, index) => (
                        <Link to={category.link} key={index}>
                            <Card className="group relative h-96 overflow-hidden shadow-xl transition-transform duration-300 hover:scale-[1.01]">
                                <img
                                    src={category.image}
                                    alt={category.name}
                                    className="absolute inset-0 w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-500"
                                />
                                {/* Overlay Gradient */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent/10"></div>
                                
                                {/* Text Content */}
                                <div className="absolute bottom-0 left-0 p-8 text-white">
                                    <h3 className="text-4xl font-bold font-serif-display mb-2 drop-shadow-md">{category.name}</h3>
                                    <p className="text-lg text-gray-200">{category.description}</p>
                                    <span className="mt-4 inline-block text-sm font-semibold border-b-2 border-primary/50 hover:text-primary transition-colors">
                                        Shop Now →
                                    </span>
                                </div>
                            </Card>
                        </Link>
                    ))}
                </div>
            </div>
      </main>
    </div>
  );
};

export default About;
