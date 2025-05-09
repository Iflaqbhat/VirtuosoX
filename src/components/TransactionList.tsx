
import { useWallet } from "@solana/wallet-adapter-react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowDown, ArrowUp, Clock } from "lucide-react";

interface Transaction {
  id: string;
  type: "sent" | "received";
  address: string;
  amount: number;
  date: Date;
  status: "confirmed" | "pending" | "failed";
}

export function TransactionList() {
  const { publicKey } = useWallet();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  // This is a mock function that would be replaced with actual data fetching
  useEffect(() => {
    if (!publicKey) return;
    
    const fetchMockTransactions = () => {
      setTimeout(() => {
        const mockData: Transaction[] = [
          {
            id: "tx1",
            type: "received",
            address: "3Kzh9..zXjV",
            amount: 1.2,
            date: new Date(Date.now() - 3600000),
            status: "confirmed"
          },
          {
            id: "tx2",
            type: "sent",
            address: "8aYVx..pQdM",
            amount: 0.5,
            date: new Date(Date.now() - 86400000),
            status: "confirmed"
          },
          {
            id: "tx3",
            type: "received",
            address: "2xMyB..rKwP",
            amount: 0.75,
            date: new Date(Date.now() - 172800000),
            status: "confirmed"
          },
          {
            id: "tx4",
            type: "sent",
            address: "9zTfs..v3kQ",
            amount: 0.1,
            date: new Date(Date.now() - 259200000),
            status: "pending"
          }
        ];
        
        setTransactions(mockData);
        setLoading(false);
      }, 1500);
    };

    fetchMockTransactions();
  }, [publicKey]);

  const formatDate = (date: Date) => {
    return date.toLocaleDateString(undefined, { 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const truncateAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  if (loading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="flex items-center justify-between py-2">
            <div className="flex items-center gap-3">
              <Skeleton className="h-8 w-8 rounded-full" />
              <div>
                <Skeleton className="h-4 w-32 mb-2" />
                <Skeleton className="h-3 w-24" />
              </div>
            </div>
            <Skeleton className="h-6 w-16" />
          </div>
        ))}
      </div>
    );
  }

  if (!transactions.length) {
    return (
      <div className="text-center py-8">
        <Clock className="mx-auto mb-2 h-12 w-12 text-muted-foreground" />
        <h3 className="text-lg font-medium">No transactions yet</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Your transaction history will appear here
        </p>
        <Button variant="outline" size="sm">
          Send SOL
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-1">
      {transactions.map((tx) => (
        <div 
          key={tx.id} 
          className="flex items-center justify-between py-3 px-2 rounded-lg hover:bg-accent/5 transition-colors"
        >
          <div className="flex items-center gap-3">
            <div className={`rounded-full p-2 ${
              tx.type === "received" ? "bg-accent/10 text-accent" : "bg-secondary/10 text-secondary"
            }`}>
              {tx.type === "received" ? <ArrowDown size={16} /> : <ArrowUp size={16} />}
            </div>
            <div>
              <p className="font-medium text-sm">
                {tx.type === "received" ? "Received" : "Sent"}
              </p>
              <p className="text-xs text-muted-foreground">
                {truncateAddress(tx.address)} • {formatDate(tx.date)}
              </p>
            </div>
          </div>
          <div className={`font-medium ${
            tx.type === "received" ? "text-accent" : "text-secondary"
          }`}>
            {tx.type === "received" ? "+" : "-"}{tx.amount} SOL
            {tx.status === "pending" && (
              <span className="ml-2 text-xs text-muted-foreground inline-flex items-center">
                <Clock size={10} className="mr-1" /> Pending
              </span>
            )}
          </div>
        </div>
      ))}
      <Button variant="ghost" size="sm" className="w-full mt-2 text-muted-foreground text-xs">
        View all transactions
      </Button>
    </div>
  );
}
