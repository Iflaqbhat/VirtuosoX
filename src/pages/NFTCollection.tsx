
import { useState, useEffect } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { useNavigate } from 'react-router-dom';
import { DashboardCard } from '@/components/DashboardCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/components/ui/sonner';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { 
  ArrowLeft, 
  ChevronDown, 
  ChevronUp, 
  Filter, 
  Grid2x2, 
  GridIcon, 
  Image, 
  ListFilter, 
  SearchIcon
} from 'lucide-react';

const mockNFTs = [
  { 
    id: 'nft1', 
    name: 'Cyber Samurai #042', 
    image: 'https://via.placeholder.com/300/5f3dc4/ffffff?text=NFT', 
    collection: 'Cyber Samurai', 
    rarity: 'Rare'
  },
  { 
    id: 'nft2', 
    name: 'Pixel Punk #189', 
    image: 'https://via.placeholder.com/300/9945FF/ffffff?text=NFT', 
    collection: 'PixelPunks', 
    rarity: 'Common'
  },
  { 
    id: 'nft3', 
    name: 'Space Explorer #007', 
    image: 'https://via.placeholder.com/300/14F195/000000?text=NFT', 
    collection: 'Space Explorers', 
    rarity: 'Legendary'
  },
  { 
    id: 'nft4', 
    name: 'Crypto Kitty #256', 
    image: 'https://via.placeholder.com/300/00C2FF/ffffff?text=NFT', 
    collection: 'Crypto Kitties', 
    rarity: 'Uncommon'
  },
];

const NFTCollection = () => {
  const { connected } = useWallet();
  const navigate = useNavigate();
  
  const [isLoading, setIsLoading] = useState(true);
  const [nfts, setNfts] = useState([]);
  const [filteredNfts, setFilteredNfts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [activeCollection, setActiveCollection] = useState('All');
  
  // Simulate loading data
  useEffect(() => {
    if (connected) {
      const timeout = setTimeout(() => {
        setNfts(mockNFTs);
        setFilteredNfts(mockNFTs);
        setIsLoading(false);
      }, 1200);
      
      return () => clearTimeout(timeout);
    }
  }, [connected]);
  
  // Redirect to home if wallet is not connected
  useEffect(() => {
    if (!connected) {
      navigate('/');
      toast({
        title: "Wallet not connected",
        description: "Please connect your wallet to view your NFTs",
        variant: "destructive"
      });
    }
  }, [connected, navigate]);
  
  // Filter NFTs based on search term
  useEffect(() => {
    if (searchTerm) {
      const filtered = nfts.filter(nft => 
        nft.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        nft.collection.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredNfts(filtered);
    } else {
      if (activeCollection === 'All') {
        setFilteredNfts(nfts);
      } else {
        setFilteredNfts(nfts.filter(nft => nft.collection === activeCollection));
      }
    }
  }, [searchTerm, nfts, activeCollection]);
  
  const collections = ['All', ...new Set(mockNFTs.map(nft => nft.collection))];
  
  const handleFilterCollection = (collection) => {
    setActiveCollection(collection);
    if (collection === 'All') {
      setFilteredNfts(nfts);
    } else {
      setFilteredNfts(nfts.filter(nft => nft.collection === collection));
    }
  };
  
  const getRarityColor = (rarity) => {
    switch (rarity.toLowerCase()) {
      case 'common':
        return 'bg-muted text-muted-foreground';
      case 'uncommon':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'rare':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
      case 'legendary':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };
  
  return (
    <div className="min-h-screen pt-16">
      <div className="container py-8 animate-fade-in">
        <div className="flex items-center gap-2 mb-6">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-3xl font-bold">My NFT Collection</h1>
        </div>
        
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Filters Sidebar */}
          <div className={`lg:w-1/4 lg:block ${isFilterOpen ? 'block' : 'hidden'}`}>
            <DashboardCard
              title="Filters"
              icon={<Filter size={18} />}
            >
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium mb-2">Collections</h3>
                  <div className="space-y-2">
                    {collections.map((collection) => (
                      <Button
                        key={collection}
                        variant={activeCollection === collection ? "default" : "ghost"}
                        className="w-full justify-start"
                        size="sm"
                        onClick={() => handleFilterCollection(collection)}
                      >
                        {collection}
                      </Button>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="font-medium mb-2">Rarity</h3>
                  <div className="space-y-2">
                    {['Common', 'Uncommon', 'Rare', 'Legendary'].map(rarity => (
                      <div key={rarity} className="flex items-center">
                        <input
                          type="checkbox"
                          id={`rarity-${rarity}`}
                          className="mr-2 h-4 w-4"
                        />
                        <label htmlFor={`rarity-${rarity}`} className="text-sm">
                          {rarity}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </DashboardCard>
          </div>
          
          {/* NFT Grid/List */}
          <div className="lg:w-3/4">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
              <div className="w-full md:w-auto flex items-center gap-2">
                <Button 
                  variant="outline" 
                  className="lg:hidden flex items-center gap-2"
                  onClick={() => setIsFilterOpen(!isFilterOpen)}
                >
                  <ListFilter size={16} />
                  <span>Filters</span>
                  {isFilterOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </Button>
              </div>
              
              <div className="w-full md:w-auto relative flex items-center">
                <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input 
                  placeholder="Search by name or collection" 
                  className="pl-10 md:w-80"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <div className="flex items-center gap-2">
                <Button
                  variant={viewMode === 'grid' ? "default" : "outline"}
                  size="icon"
                  onClick={() => setViewMode('grid')}
                  className="h-9 w-9"
                >
                  <Grid2x2 className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? "default" : "outline"}
                  size="icon"
                  onClick={() => setViewMode('list')}
                  className="h-9 w-9"
                >
                  <GridIcon className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array(6).fill(0).map((_, i) => (
                  <div key={i} className="border rounded-md p-4 animate-pulse">
                    <div className="h-48 bg-muted rounded-md mb-4"></div>
                    <div className="h-5 bg-muted rounded-md w-2/3 mb-3"></div>
                    <div className="h-4 bg-muted rounded-md w-1/2"></div>
                  </div>
                ))}
              </div>
            ) : filteredNfts.length > 0 ? (
              viewMode === 'grid' ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredNfts.map((nft) => (
                    <div 
                      key={nft.id} 
                      className="border rounded-md overflow-hidden hover:shadow-md transition-shadow bg-card"
                    >
                      <AspectRatio ratio={1} className="bg-muted">
                        <img 
                          src={nft.image} 
                          alt={nft.name} 
                          className="object-cover w-full h-full"
                          onError={(e) => {
                            e.currentTarget.src = 'https://via.placeholder.com/300/6e59a5/ffffff?text=NFT';
                          }}
                        />
                      </AspectRatio>
                      <div className="p-4">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-medium truncate">{nft.name}</h3>
                          <Badge className={getRarityColor(nft.rarity)}>
                            {nft.rarity}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-4">
                          {nft.collection}
                        </p>
                        <Button size="sm" className="w-full">View Details</Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredNfts.map((nft) => (
                    <div 
                      key={nft.id} 
                      className="border rounded-md overflow-hidden flex hover:shadow-md transition-shadow bg-card"
                    >
                      <div className="w-24 h-24 sm:w-32 sm:h-32">
                        <img 
                          src={nft.image} 
                          alt={nft.name} 
                          className="object-cover w-full h-full"
                          onError={(e) => {
                            e.currentTarget.src = 'https://via.placeholder.com/300/6e59a5/ffffff?text=NFT';
                          }}
                        />
                      </div>
                      <div className="p-4 flex flex-1 flex-col justify-between">
                        <div>
                          <div className="flex justify-between items-start">
                            <h3 className="font-medium">{nft.name}</h3>
                            <Badge className={getRarityColor(nft.rarity)}>
                              {nft.rarity}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {nft.collection}
                          </p>
                        </div>
                        <Button size="sm" className="self-start mt-2">View Details</Button>
                      </div>
                    </div>
                  ))}
                </div>
              )
            ) : (
              <div className="text-center py-16 border rounded-lg">
                <Image className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium">No NFTs Found</h3>
                <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                  {searchTerm ? 
                    "No NFTs match your search criteria. Try different keywords." : 
                    "You don't have any NFTs in your collection yet."}
                </p>
                <Button asChild>
                  <a href="/marketplace">Browse Marketplace</a>
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NFTCollection;
