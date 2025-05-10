
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
import { toast } from '@/components/ui/sonner';
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
      toast({
        title: "Wallet not connected",
        description: "Please connect your wallet to access your profile",
        variant: "destructive"
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
    toast({
      title: "Profile Updated",
      description: "Your display name has been updated successfully"
    });
  };
  
  const copyAddress = () => {
    navigator.clipboard.writeText(publicKey.toString());
    toast({
      title: "Address Copied",
      description: "Wallet address copied to clipboard"
    });
  };
  
  const handleLogout = async () => {
    await disconnect();
    toast({
      title: "Wallet Disconnected",
      description: "You have been logged out successfully"
    });
    navigate('/');
  };
  
  return (
    <div className="min-h-screen pt-16">
      <div className="container py-8 animate-fade-in">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="md:w-1/3">
            <DashboardCard
              title="Profile"
              description="Manage your account settings"
              icon={<User size={20} />}
            >
              <div className="flex flex-col items-center justify-center py-6">
                <Avatar className="h-24 w-24 mb-4">
                  <AvatarImage src={`https://api.dicebear.com/7.x/shapes/svg?seed=${truncatedAddress}`} />
                  <AvatarFallback className="text-xl bg-primary text-primary-foreground">
                    {username.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                
                {isEditingName ? (
                  <div className="flex flex-col items-center gap-2">
                    <Input
                      value={editedName}
                      onChange={(e) => setEditedName(e.target.value)}
                      className="max-w-[200px] text-center"
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
                  <div className="flex flex-col items-center">
                    <div className="flex items-center gap-2 mb-1">
                      <h2 className="text-xl font-bold">{username}</h2>
                      <Button 
                        size="icon" 
                        variant="ghost" 
                        className="h-6 w-6"
                        onClick={() => setIsEditingName(true)}
                      >
                        <Edit2 size={14} />
                      </Button>
                    </div>
                    <Badge variant="outline" className="mb-4">Level {level}</Badge>
                    <div className="w-full max-w-xs mb-4">
                      <div className="flex items-center justify-between text-xs mb-1">
                        <span>XP Progress</span>
                        <span>{xp}/100 XP</span>
                      </div>
                      <Progress value={xp} className="h-2" />
                    </div>
                  </div>
                )}
                
                <div className="flex items-center gap-2 p-2 bg-muted/40 rounded-md w-full max-w-xs mb-4">
                  <span className="text-sm font-mono text-muted-foreground flex-1 truncate">
                    {truncatedAddress}
                  </span>
                  <Button size="icon" variant="ghost" onClick={copyAddress} className="h-6 w-6">
                    <Copy size={14} />
                  </Button>
                </div>
                
                <Button 
                  variant="destructive" 
                  size="sm" 
                  className="flex gap-1" 
                  onClick={handleLogout}
                >
                  <LogOut size={16} /> Disconnect Wallet
                </Button>
              </div>
            </DashboardCard>
          </div>
          
          <div className="md:w-2/3">
            <div className="grid gap-6">
              <DashboardCard
                title="Account Settings"
                description="Manage your preferences"
                icon={<Bell size={20} />}
              >
                <div className="space-y-4 py-2">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="notifications">Transaction Notifications</Label>
                      <p className="text-sm text-muted-foreground">
                        Receive alerts for your account activity
                      </p>
                    </div>
                    <Switch
                      id="notifications"
                      checked={notifications}
                      onCheckedChange={setNotifications}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="emails">Marketing Emails</Label>
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
                  
                  <Button className="w-full mt-4">Save Preferences</Button>
                </div>
              </DashboardCard>
              
              <DashboardCard
                title="Achievements"
                description="Your earned rewards and badges"
                icon={<Trophy size={20} />}
              >
                <div className="divide-y">
                  {achievements.map((achievement, index) => (
                    <div key={index} className="flex items-center py-3 first:pt-0 last:pb-0">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                        <achievement.icon size={20} className="text-primary" />
                      </div>
                      <div>
                        <h4 className="font-medium">{achievement.title}</h4>
                        <p className="text-sm text-muted-foreground">
                          {achievement.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-4 text-center">
                  <Button variant="outline" className="w-full" asChild>
                    <a href="/rewards">View All Achievements</a>
                  </Button>
                </div>
              </DashboardCard>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
