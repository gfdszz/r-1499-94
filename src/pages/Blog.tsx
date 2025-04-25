
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const blogPosts = [
  {
    id: 1,
    title: "10 Tips for First-Time Home Buyers",
    excerpt: "Buying your first home can be overwhelming. Here are essential tips to make the process smoother.",
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=800&h=500",
    category: "Buying",
    date: "April 18, 2025",
    readTime: "8 min read",
    author: {
      name: "Sarah Johnson",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=100&h=100",
    }
  },
  {
    id: 2,
    title: "How to Increase Your Home's Value Before Selling",
    excerpt: "Strategic improvements that can significantly boost your property's market value.",
    image: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=800&h=500",
    category: "Selling",
    date: "April 15, 2025",
    readTime: "6 min read",
    author: {
      name: "Michael Chen",
      image: "https://images.unsplash.com/photo-1566492031773-4f4e44671857?auto=format&fit=crop&w=100&h=100",
    }
  },
  {
    id: 3,
    title: "Essential Home Maintenance Tasks for Every Season",
    excerpt: "Keep your home in top condition year-round with this seasonal maintenance checklist.",
    image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&h=500",
    category: "Maintenance",
    date: "April 10, 2025",
    readTime: "5 min read",
    author: {
      name: "Amanda Torres",
      image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=100&h=100",
    }
  },
  {
    id: 4,
    title: "5 Modern Interior Design Trends for 2025",
    excerpt: "The latest interior design trends that are transforming homes this year.",
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&h=500",
    category: "Interior",
    date: "April 5, 2025",
    readTime: "4 min read",
    author: {
      name: "Robert Johnson",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=100&h=100",
    }
  },
  {
    id: 5,
    title: "Smart Home Technology Worth Investing In",
    excerpt: "Guide to the best smart home technologies that offer convenience, security, and energy efficiency.",
    image: "https://images.unsplash.com/photo-1558002038-2f6f809ad5fb?auto=format&fit=crop&w=800&h=500",
    category: "Technology",
    date: "April 1, 2025",
    readTime: "7 min read",
    author: {
      name: "Emily Rodriguez",
      image: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=100&h=100",
    }
  },
  {
    id: 6,
    title: "Understanding Property Taxes and How They Affect Homeowners",
    excerpt: "A comprehensive guide to property taxes, exemptions, and strategies for homeowners.",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff58f7?auto=format&fit=crop&w=800&h=500",
    category: "Finance",
    date: "March 28, 2025",
    readTime: "9 min read",
    author: {
      name: "David Kim",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&h=100",
    }
  }
];

const BlogPostCard = ({ post }: { post: typeof blogPosts[0] }) => {
  return (
    <Card className="overflow-hidden hover:shadow-md transition-all duration-300 h-full flex flex-col">
      <div className="relative w-full aspect-[16/9] overflow-hidden">
        <img 
          src={post.image} 
          alt={post.title} 
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        />
        <Badge 
          className="absolute top-3 left-3 bg-estate-800/80 hover:bg-estate-800"
        >
          {post.category}
        </Badge>
      </div>
      <CardHeader className="pb-2">
        <CardTitle className="text-xl text-estate-800 line-clamp-2">{post.title}</CardTitle>
      </CardHeader>
      <CardContent className="pb-2 flex-1">
        <CardDescription className="text-estate-600 mb-4 line-clamp-3">
          {post.excerpt}
        </CardDescription>
        <div className="flex items-center gap-2 text-sm text-estate-500">
          <Calendar className="h-3.5 w-3.5" />
          <span>{post.date}</span>
          <span className="mx-1">•</span>
          <Clock className="h-3.5 w-3.5" />
          <span>{post.readTime}</span>
        </div>
      </CardContent>
      <CardFooter className="pt-3 border-t">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-2">
            <img 
              src={post.author.image} 
              alt={post.author.name}
              className="w-7 h-7 rounded-full object-cover"
            />
            <span className="text-sm font-medium">{post.author.name}</span>
          </div>
          <Button variant="ghost" size="sm" className="text-estate-800 p-0 h-auto group">
            Read More
            <ArrowRight className="ml-1 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

const FeaturedPost = () => {
  const featured = blogPosts[0];
  return (
    <div className="bg-gradient-to-r from-estate-50/80 to-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 mb-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="relative h-full min-h-[300px]">
          <img 
            src={featured.image} 
            alt={featured.title} 
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-estate-800/70 to-transparent"></div>
          <div className="absolute top-3 left-3">
            <Badge className="bg-amber-500 hover:bg-amber-600 text-black mb-2">
              Featured
            </Badge>
          </div>
        </div>
        <div className="p-6 flex flex-col justify-center">
          <Badge className="w-fit mb-2 bg-estate-100 text-estate-800 hover:bg-estate-200">
            {featured.category}
          </Badge>
          <h2 className="text-2xl md:text-3xl font-display text-estate-800 mb-2">{featured.title}</h2>
          <p className="text-estate-600 mb-4">{featured.excerpt}</p>
          <div className="flex items-center gap-2 text-sm text-estate-500 mb-6">
            <Calendar className="h-3.5 w-3.5" />
            <span>{featured.date}</span>
            <span className="mx-1">•</span>
            <Clock className="h-3.5 w-3.5" />
            <span>{featured.readTime}</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <img 
                src={featured.author.image} 
                alt={featured.author.name}
                className="w-7 h-7 rounded-full object-cover"
              />
              <span className="text-sm font-medium">{featured.author.name}</span>
            </div>
            <Button className="bg-estate-800 hover:bg-estate-700 group">
              Read Article
              <ArrowRight className="ml-1 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

const Blog = () => {
  const categories = ["All", "Buying", "Selling", "Maintenance", "Interior", "Technology", "Finance"];
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="py-8 mb-4">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-display text-estate-800 mb-4">
              Real Estate & Home Blog
            </h1>
            <p className="text-xl text-estate-600 max-w-3xl">
              Expert advice, insights, and tips for homeowners, buyers, and sellers. Stay updated with the latest trends in real estate and home improvement.
            </p>
          </div>
          
          <FeaturedPost />
          
          <Tabs defaultValue="All" className="w-full mb-8">
            <TabsList className="mb-8 flex flex-wrap justify-center gap-2">
              {categories.map((category) => (
                <TabsTrigger 
                  key={category} 
                  value={category}
                  className="px-4 py-2 data-[state=active]:bg-estate-100"
                >
                  {category}
                </TabsTrigger>
              ))}
            </TabsList>
            
            <TabsContent value="All" className="focus-visible:outline-none focus-visible:ring-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {blogPosts.slice(1).map((post) => (
                  <BlogPostCard key={post.id} post={post} />
                ))}
              </div>
            </TabsContent>
            
            {categories.slice(1).map((category) => (
              <TabsContent 
                key={category} 
                value={category}
                className="focus-visible:outline-none focus-visible:ring-0"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {blogPosts
                    .filter(post => post.category === category)
                    .map((post) => (
                      <BlogPostCard key={post.id} post={post} />
                    ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
          
          <div className="py-10 flex justify-center">
            <Button variant="outline" className="border-estate-200">
              Load More Articles
            </Button>
          </div>
          
          <section className="bg-estate-50/50 rounded-xl p-8 my-12">
            <div className="text-center max-w-2xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-display text-estate-800 mb-4">
                Subscribe to Our Newsletter
              </h2>
              <p className="text-estate-600 mb-6">
                Get the latest articles, tips, and insights delivered directly to your inbox.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <input 
                  type="email" 
                  placeholder="Your email address" 
                  className="px-4 py-2 rounded-md border focus:outline-none focus:ring-2 focus:ring-estate-800 flex-1 max-w-md"
                />
                <Button className="bg-estate-800 hover:bg-estate-700">
                  Subscribe
                </Button>
              </div>
            </div>
          </section>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Blog;
