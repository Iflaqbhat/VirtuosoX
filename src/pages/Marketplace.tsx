
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useWallet } from "@solana/wallet-adapter-react";
import { Coins, Image, Search } from "lucide-react";

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
            <Input placeholder="Search collections or NFTs..." className="pl-10" />
          </div>
          
          <div className="flex gap-2">
            <Button variant="outline">Collections</Button>
            <Button variant="outline">Trending</Button>
            <Button variant="outline">New</Button>
            <Button>Create NFT</Button>
          </div>
        </div>
        
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
          {MOCK_NFTS.map((nft) => (
            <Card key={nft.id} className="overflow-hidden transition-all hover:-translate-y-1 hover:shadow-md border-border/50">
              <div className="aspect-square relative overflow-hidden">
                <img src={nft.image} alt={nft.name} className="w-full h-full object-cover" />
              </div>
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
                <Button className="w-full" disabled={!connected}>
                  {connected ? 'Buy Now' : 'Connect Wallet to Buy'}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
        
        {/* Empty state (visible when filter returns no results) */}
        {false && (
          <div className="text-center py-16">
            <Image className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-lg font-medium mb-2">No NFTs found</h3>
            <p className="text-muted-foreground mb-4">
              Try adjusting your search or filters
            </p>
            <Button variant="outline">Clear Filters</Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Marketplace;
