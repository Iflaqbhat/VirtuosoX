
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useWallet } from "@solana/wallet-adapter-react";
import { Coins, Image, Search } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { AspectRatio } from "@/components/ui/aspect-ratio";

const MOCK_NFTS = [
  {
    id: "nft1",
    name: "Cosmic Explorer #142",
    creator: "SpaceArtist",
    price: 1.2,
    image: "https://placehold.co/300x300/5039B2/FFFFFF?text=Cosmic+Explorer"
  },
  {
    id: "nft2",
    name: "Digital Dreamscape",
    creator: "PixelMaster",
    price: 0.8,
    image: "https://placehold.co/300x300/00C2FF/FFFFFF?text=Digital+Dreamscape"
  },
  {
    id: "nft3",
    name: "Solana Sunset",
    creator: "BlockchainVisuals",
    price: 2.5,
    image: "https://placehold.co/300x300/14F195/121212?text=Solana+Sunset"
  },
  {
    id: "nft4",
    name: "Crypto Punk #3049",
    creator: "NFTLegend",
    price: 4.2,
    image: "https://placehold.co/300x300/9945FF/FFFFFF?text=Crypto+Punk"
  },
  {
    id: "nft5",
    name: "Abstract Algorithm",
    creator: "DataArtist",
    price: 1.5,
    image: "https://placehold.co/300x300/14F195/121212?text=Abstract+Algorithm"
  },
  {
    id: "nft6",
    name: "Virtual Reality",
    creator: "MetaCreator",
    price: 3.7,
    image: "https://placehold.co/300x300/00C2FF/FFFFFF?text=Virtual+Reality"
  }
];

const Marketplace = () => {
  const { connected } = useWallet();
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredNFTs, setFilteredNFTs] = useState(MOCK_NFTS);
  const [activeFilter, setActiveFilter] = useState("all");
  
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    
    if (query.trim() === "") {
      setFilteredNFTs(MOCK_NFTS);
    } else {
      const filtered = MOCK_NFTS.filter(
        nft => 
          nft.name.toLowerCase().includes(query) || 
          nft.creator.toLowerCase().includes(query)
      );
      setFilteredNFTs(filtered);
    }
  };
  
  const handleFilter = (filter: string) => {
    setActiveFilter(filter);
    let filtered = MOCK_NFTS;
    
    if (filter === "trending") {
      filtered = MOCK_NFTS.filter(nft => nft.price > 2.0);
    } else if (filter === "new") {
      filtered = MOCK_NFTS.slice(0, 3);
    }
    
    setFilteredNFTs(filtered);
  };
  
  const handleBuy = (nft: typeof MOCK_NFTS[0]) => {
    toast.success("Purchase initiated", {
      description: `You're buying ${nft.name} for ${nft.price} SOL`,
    });
  };
  
  const clearFilters = () => {
    setSearchQuery("");
    setFilteredNFTs(MOCK_NFTS);
    setActiveFilter("all");
  };
  
  return (
    <div className="min-h-screen pt-16">
      <div className="container py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">NFT Marketplace</h1>
          <p className="text-muted-foreground">
            Browse, collect, and trade unique NFTs on Solana
          </p>
        </div>
        
        <div className="flex flex-col md:flex-row justify-between gap-4 mb-8">
          <div className="relative max-w-md w-full">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input 
              placeholder="Search collections or NFTs..." 
              className="pl-10" 
              value={searchQuery}
              onChange={handleSearch}
            />
          </div>
          
          <div className="flex gap-2">
            <Button 
              variant={activeFilter === "all" ? "default" : "outline"}
              onClick={() => handleFilter("all")}
            >
              All
            </Button>
            <Button 
              variant={activeFilter === "collections" ? "default" : "outline"}
              onClick={() => handleFilter("collections")}
            >
              Collections
            </Button>
            <Button 
              variant={activeFilter === "trending" ? "default" : "outline"}
              onClick={() => handleFilter("trending")}
            >
              Trending
            </Button>
            <Button 
              variant={activeFilter === "new" ? "default" : "outline"}
              onClick={() => handleFilter("new")}
            >
              New
            </Button>
            <Button onClick={() => toast.info("Create NFT feature coming soon")}>
              Create NFT
            </Button>
          </div>
        </div>
        
        {filteredNFTs.length > 0 ? (
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
            {filteredNFTs.map((nft) => (
              <Card key={nft.id} className="overflow-hidden transition-all hover:-translate-y-1 hover:shadow-md border-border/50">
                <AspectRatio ratio={1/1} className="overflow-hidden">
                  <img src={nft.image} alt={nft.name} className="w-full h-full object-cover" />
                </AspectRatio>
                <CardHeader className="pb-2">
                  <h3 className="font-semibold text-lg">{nft.name}</h3>
                  <p className="text-sm text-muted-foreground">By {nft.creator}</p>
                </CardHeader>
                <CardContent className="pb-4">
                  <div className="flex items-center">
                    <Coins className="h-4 w-4 mr-1 text-primary" />
                    <span className="font-medium">{nft.price} SOL</span>
                  </div>
                </CardContent>
                <CardFooter className="pt-0">
                  <Button 
                    className="w-full" 
                    disabled={!connected}
                    onClick={() => connected && handleBuy(nft)}
                  >
                    {connected ? 'Buy Now' : 'Connect Wallet to Buy'}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <Image className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-lg font-medium mb-2">No NFTs found</h3>
            <p className="text-muted-foreground mb-4">
              Try adjusting your search or filters
            </p>
            <Button variant="outline" onClick={clearFilters}>Clear Filters</Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Marketplace;
