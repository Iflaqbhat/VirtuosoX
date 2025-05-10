
import { useWallet } from '@solana/wallet-adapter-react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { DashboardCard } from '@/components/DashboardCard';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { toast } from 'sonner';
import {
  Bell,
  Copy,
  Edit2,
  LogOut,
  Save,
  Shield,
  Star,
  Trophy,
  User
} from 'lucide-react';

const Profile = () => {
  const { connected, publicKey, disconnect } = useWallet();
  const navigate = useNavigate();

  const [username, setUsername] = useState('Solana User');
  const [isEditingName, setIsEditingName] = useState(false);
  const [editedName, setEditedName] = useState('Solana User');
  const [notifications, setNotifications] = useState(true);
  const [marketingEmails, setMarketingEmails] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  // Level system mock data
  const level = 5;
  const xp = 78;
  const achievements = [
    { title: 'Early Adopter', description: 'Joined during beta phase', icon: Star },
    { title: 'First Transaction', description: 'Completed your first transaction', icon: Trophy },
    { title: 'Security Expert', description: 'Enabled all security features', icon: Shield }
  ];
  
  // Simulate loading data
  useEffect(() => {
    if (connected && publicKey) {
      const timeout = setTimeout(() => {
        setIsLoading(false);
      }, 1000);
      
      return () => clearTimeout(timeout);
    }
  }, [connected, publicKey]);
  
  // Redirect to home if wallet is not connected
  useEffect(() => {
    if (!connected) {
      navigate('/');
      toast("Wallet not connected", {
        description: "Please connect your wallet to access your profile"
      });
    }
  }, [connected, navigate]);
  
  if (!connected || !publicKey) {
    return null;
  }
  
  const truncatedAddress = `${publicKey.toString().slice(0, 6)}...${publicKey.toString().slice(-4)}`;
  
  const handleSaveName = () => {
    setUsername(editedName);
    setIsEditingName(false);
    toast("Profile Updated", {
      description: "Your display name has been updated successfully"
    });
  };
  
  const copyAddress = () => {
    navigator.clipboard.writeText(publicKey.toString());
    toast("Address Copied", {
      description: "Wallet address copied to clipboard"
    });
  };
  
  const handleLogout = async () => {
    await disconnect();
    toast("Wallet Disconnected", {
      description: "You have been logged out successfully"
    });
    navigate('/');
  };
  
  return (
    <div className="min-h-screen pt-16">
      <div className="container py-12 animate-fade-in">
        {/* Profile header */}
        <div className="relative mb-10 pb-6 border-b">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
            <Avatar className="h-24 w-24 border-4 border-background shadow-xl">
              <AvatarImage src={`https://api.dicebear.com/7.x/shapes/svg?seed=${truncatedAddress}`} />
              <AvatarFallback className="text-xl bg-primary text-primary-foreground">
                {username.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            
            <div className="flex flex-col text-center md:text-left">
              {isEditingName ? (
                <div className="flex flex-col items-center md:items-start gap-2">
                  <Input
                    value={editedName}
                    onChange={(e) => setEditedName(e.target.value)}
                    className="max-w-[200px] text-center md:text-left"
                    autoFocus
                  />
                  <div className="flex gap-2">
                    <Button 
                      size="sm" 
                      onClick={handleSaveName}
                      className="flex gap-1"
                    >
                      <Save size={16} /> Save
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      onClick={() => {
                        setIsEditingName(false);
                        setEditedName(username);
                      }}
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="flex items-center gap-2 mb-1">
                    <h1 className="text-2xl md:text-3xl font-bold">{username}</h1>
                    <Button 
                      size="icon" 
                      variant="ghost" 
                      className="h-7 w-7"
                      onClick={() => setIsEditingName(true)}
                    >
                      <Edit2 size={14} />
                    </Button>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <span className="font-mono">{truncatedAddress}</span>
                    <Button size="icon" variant="ghost" onClick={copyAddress} className="h-6 w-6">
                      <Copy size={12} />
                    </Button>
                  </div>
                </>
              )}
              
              <div className="flex flex-wrap gap-2 mt-3">
                <Badge variant="outline" className="bg-primary/5">Level {level}</Badge>
                <Badge variant="outline" className="bg-accent/5">Early Adopter</Badge>
                <Badge variant="outline" className="bg-secondary/5">Power User</Badge>
              </div>
            </div>
            
            <div className="absolute top-0 right-0">
              <Button 
                variant="outline" 
                size="sm" 
                className="flex gap-1 text-destructive hover:text-destructive hover:bg-destructive/10" 
                onClick={handleLogout}
              >
                <LogOut size={16} /> Disconnect
              </Button>
            </div>
          </div>
        </div>
        
        {/* Main content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Left column */}
          <div className="md:col-span-1 space-y-6">
            {/* Status card */}
            <div className="rounded-xl border bg-card p-6 shadow-sm">
              <h3 className="text-lg font-medium mb-4">Experience Progress</h3>
              
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between text-sm mb-1.5">
                    <span>Level {level}</span>
                    <span>{xp}/100 XP</span>
                  </div>
                  <Progress value={xp} className="h-2" />
                </div>
                
                <div className="pt-4 border-t">
                  <h4 className="text-sm font-medium mb-3">Recent Achievements</h4>
                  
                  <div className="space-y-3">
                    {achievements.map((achievement, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                          <achievement.icon size={16} className="text-primary" />
                        </div>
                        <div>
                          <p className="text-sm font-medium">{achievement.title}</p>
                          <p className="text-xs text-muted-foreground">{achievement.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            {/* Quick links */}
            <div className="rounded-xl border bg-card p-6 shadow-sm">
              <h3 className="text-lg font-medium mb-4">Quick Links</h3>
              
              <div className="grid grid-cols-2 gap-3">
                <Button variant="outline" className="justify-start" asChild>
                  <a href="/dashboard">Dashboard</a>
                </Button>
                <Button variant="outline" className="justify-start" asChild>
                  <a href="/nft-collection">NFT Collection</a>
                </Button>
                <Button variant="outline" className="justify-start" asChild>
                  <a href="/rewards">View Rewards</a>
                </Button>
                <Button variant="outline" className="justify-start" asChild>
                  <a href="/staking">Staking</a>
                </Button>
              </div>
            </div>
          </div>
          
          {/* Right column */}
          <div className="md:col-span-2 space-y-6">
            {/* Settings card */}
            <div className="rounded-xl border bg-card p-6 shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <Bell className="h-5 w-5 text-muted-foreground" />
                <h3 className="text-lg font-medium">Notifications & Preferences</h3>
              </div>
              
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="notifications" className="text-base">Transaction Alerts</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive notifications for activity on your account
                    </p>
                  </div>
                  <Switch
                    id="notifications"
                    checked={notifications}
                    onCheckedChange={setNotifications}
                  />
                </div>
                
                <div className="flex items-center justify-between pt-4 border-t">
                  <div className="space-y-0.5">
                    <Label htmlFor="emails" className="text-base">Marketing Communications</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive updates about new features and promotions
                    </p>
                  </div>
                  <Switch
                    id="emails"
                    checked={marketingEmails}
                    onCheckedChange={setMarketingEmails}
                  />
                </div>
                
                <div className="flex items-center justify-between pt-4 border-t">
                  <div className="space-y-0.5">
                    <Label htmlFor="privacy" className="text-base">Enhanced Privacy Mode</Label>
                    <p className="text-sm text-muted-foreground">
                      Hide your activity from public network explorers
                    </p>
                  </div>
                  <Switch
                    id="privacy"
                    checked={false}
                    onCheckedChange={() => {}}
                  />
                </div>
                
                <Button className="w-full mt-2">Save Preferences</Button>
              </div>
            </div>
            
            {/* Security card */}
            <div className="rounded-xl border bg-card p-6 shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <Shield className="h-5 w-5 text-muted-foreground" />
                <h3 className="text-lg font-medium">Security</h3>
              </div>
              
              <div className="space-y-4">
                <div className="p-4 rounded-lg bg-accent/5 border border-accent/10">
                  <div className="flex items-center gap-3 mb-2">
                    <Shield className="h-5 w-5 text-accent" />
                    <h4 className="font-medium">Wallet Security Status</h4>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">
                    Your wallet connection is secure. Remember to never share your seed phrase with anyone.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/20">
                      Secure Connection
                    </Badge>
                    <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/20">
                      Hardware Protection
                    </Badge>
                    <Badge variant="outline" className="bg-amber-500/10 text-amber-500 border-amber-500/20">
                      2FA Recommended
                    </Badge>
                  </div>
                </div>
                
                <div className="grid sm:grid-cols-2 gap-3">
                  <Button variant="outline" className="justify-start">
                    Set Up 2FA Security
                  </Button>
                  <Button variant="outline" className="justify-start">
                    View Recent Activity
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
