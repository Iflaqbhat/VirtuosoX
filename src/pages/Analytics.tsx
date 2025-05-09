
import { useState, useEffect } from 'react';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription 
} from '@/components/ui/card';
import { useWallet } from '@solana/wallet-adapter-react';
import { Button } from '@/components/ui/button';
import { 
  BarChart, 
  Bar, 
  LineChart, 
  Line, 
  PieChart, 
  Pie, 
  Cell, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  Legend 
} from 'recharts';
import { 
  ChevronDown, 
  TrendingUp, 
  Wallet, 
  PieChart as PieChartIcon, 
  BarChart3, 
  LineChart as LineChartIcon, 
  Calendar,
  Coins
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

// Sample data for charts
const dailyTransactions = [
  { day: 'Mon', amount: 2.4 },
  { day: 'Tue', amount: 1.7 },
  { day: 'Wed', amount: 3.2 },
  { day: 'Thu', amount: 5.4 },
  { day: 'Fri', amount: 3.8 },
  { day: 'Sat', amount: 2.9 },
  { day: 'Sun', amount: 4.5 }
];

const monthlyStaking = [
  { month: 'Jan', staked: 5 },
  { month: 'Feb', staked: 8 },
  { month: 'Mar', staked: 12 },
  { month: 'Apr', staked: 15 },
  { month: 'May', staked: 18 },
  { month: 'Jun', staked: 24 },
  { month: 'Jul', staked: 28 },
];

const portfolioDistribution = [
  { name: 'SOL', value: 60 },
  { name: 'NFTs', value: 20 },
  { name: 'Staked', value: 15 },
  { name: 'Others', value: 5 },
];

const COLORS = ['#9945FF', '#00C2FF', '#14F195', '#8884d8'];

const timeRanges = ['24h', '7d', '30d', '90d', '1y', 'All'];

const Analytics = () => {
  const { connected } = useWallet();
  const [activeTimeRange, setActiveTimeRange] = useState('7d');
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Simulate data loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  const handleTimeRangeChange = (range: string) => {
    setIsLoading(true);
    setActiveTimeRange(range);
    
    // Simulate data reload
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  };

  // Custom tooltip for charts
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-background p-3 border border-border rounded-md shadow-md">
          <p className="font-medium">{`${label}`}</p>
          <p className="text-primary font-medium">{`${payload[0].value} SOL`}</p>
        </div>
      );
    }
    return null;
  };

  const formatYAxis = (value: number) => {
    return `${value} SOL`;
  };

  return (
    <div className="min-h-screen pt-16">
      <div className="container py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Analytics Dashboard</h1>
          <p className="text-muted-foreground">
            Track your portfolio performance and market trends
          </p>
        </div>

        {/* Time range selector */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-medium">Time Range:</span>
          </div>
          <div className="flex gap-2">
            {timeRanges.map((range) => (
              <Button 
                key={range}
                size="sm"
                variant={activeTimeRange === range ? "default" : "outline"}
                className={activeTimeRange === range ? "bg-primary" : ""}
                onClick={() => handleTimeRangeChange(range)}
              >
                {range}
              </Button>
            ))}
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          {[
            { 
              title: "Total Portfolio", 
              value: "32.45", 
              change: "+5.2%", 
              icon: <Wallet className="h-5 w-5" />,
              positive: true 
            },
            { 
              title: "Staked Assets", 
              value: "18.23", 
              change: "+12.8%", 
              icon: <Coins className="h-5 w-5" />,
              positive: true 
            },
            { 
              title: "30-Day Returns", 
              value: "1.72", 
              change: "-2.3%", 
              icon: <TrendingUp className="h-5 w-5" />,
              positive: false 
            },
            { 
              title: "Total Transactions", 
              value: "142", 
              change: "+8.5%", 
              icon: <BarChart3 className="h-5 w-5" />,
              positive: true 
            }
          ].map((card, index) => (
            <motion.div 
              key={card.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">{card.title}</p>
                      <div className="flex items-end gap-2 mt-1">
                        <h3 className="text-2xl font-bold">{card.value}</h3>
                        <p className={cn(
                          "text-xs font-medium",
                          card.positive ? "text-green-500" : "text-red-500"
                        )}>
                          {card.change}
                        </p>
                      </div>
                    </div>
                    <div className={cn(
                      "p-2 rounded-full",
                      card.positive ? "bg-green-500/10" : "bg-red-500/10"
                    )}>
                      {card.icon}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Transactions Chart */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="col-span-1"
          >
            <Card className="h-full">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5" />
                    Daily Transactions
                  </CardTitle>
                  <Badge variant="outline">This Week</Badge>
                </div>
                <CardDescription>Track your daily transaction volume</CardDescription>
              </CardHeader>
              <CardContent className="pb-6">
                <div className="h-[300px] w-full">
                  {isLoading ? (
                    <div className="h-full w-full flex items-center justify-center">
                      <div className="animate-pulse bg-muted h-4/5 w-full rounded-md"></div>
                    </div>
                  ) : (
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={dailyTransactions} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                        <XAxis dataKey="day" />
                        <YAxis tickFormatter={formatYAxis} />
                        <Tooltip content={<CustomTooltip />} />
                        <Legend />
                        <Bar dataKey="amount" name="SOL Volume" fill="#9945FF" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Staking Trend Chart */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="col-span-1"
          >
            <Card className="h-full">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <LineChartIcon className="h-5 w-5" />
                    Staking Trend
                  </CardTitle>
                  <Badge variant="outline">This Year</Badge>
                </div>
                <CardDescription>Monthly staking volume in SOL</CardDescription>
              </CardHeader>
              <CardContent className="pb-6">
                <div className="h-[300px] w-full">
                  {isLoading ? (
                    <div className="h-full w-full flex items-center justify-center">
                      <div className="animate-pulse bg-muted h-4/5 w-full rounded-md"></div>
                    </div>
                  ) : (
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={monthlyStaking} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                        <XAxis dataKey="month" />
                        <YAxis tickFormatter={formatYAxis} />
                        <Tooltip content={<CustomTooltip />} />
                        <Legend />
                        <Line 
                          type="monotone" 
                          dataKey="staked" 
                          name="SOL Staked" 
                          stroke="#00C2FF" 
                          strokeWidth={2}
                          dot={{ r: 4 }}
                          activeDot={{ r: 8 }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Portfolio Distribution */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mb-8"
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <PieChartIcon className="h-5 w-5" />
                Portfolio Distribution
              </CardTitle>
              <CardDescription>Breakdown of your assets by type</CardDescription>
            </CardHeader>
            <CardContent className="pb-6">
              <div className="h-[300px] w-full flex flex-col md:flex-row items-center justify-center">
                {isLoading ? (
                  <div className="h-full w-full flex items-center justify-center">
                    <div className="animate-pulse bg-muted h-4/5 w-full rounded-md"></div>
                  </div>
                ) : (
                  <>
                    <ResponsiveContainer width="60%" height="100%">
                      <PieChart>
                        <Pie
                          data={portfolioDistribution}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={100}
                          fill="#8884d8"
                          dataKey="value"
                          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        >
                          {portfolioDistribution.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                    
                    <div className="flex flex-col gap-2 mt-4 md:mt-0">
                      {portfolioDistribution.map((entry, index) => (
                        <div key={entry.name} className="flex items-center gap-2">
                          <div 
                            className="w-3 h-3 rounded-full" 
                            style={{ backgroundColor: COLORS[index % COLORS.length] }} 
                          />
                          <span className="text-sm">{entry.name}: {entry.value}%</span>
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Call to Action */}
        <div className="mt-10">
          <Card className="bg-card-gradient border-primary/20">
            <CardContent className="pt-6">
              <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <div>
                  <h3 className="text-xl font-bold mb-2">Boost Your Analytics Experience</h3>
                  <p className="text-muted-foreground mb-4">
                    Connect your wallet to unlock personalized insights and advanced analytics features.
                  </p>
                </div>
                {!connected ? (
                  <Button size="lg" className="bg-gradient-to-r from-primary to-secondary">
                    Connect Wallet
                  </Button>
                ) : (
                  <Button size="lg" variant="outline" className="border-primary">
                    View Advanced Analytics
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
