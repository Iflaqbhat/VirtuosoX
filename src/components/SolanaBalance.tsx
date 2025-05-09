
import { useWallet, useConnection } from '@solana/wallet-adapter-react';
import { useState, useEffect } from 'react';
import { LAMPORTS_PER_SOL } from '@solana/web3.js';
import { ArrowUpDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';

export function SolanaBalance() {
  const { connection } = useConnection();
  const { publicKey } = useWallet();
  const [balance, setBalance] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    
    const fetchBalance = async () => {
      if (!publicKey) return;
      
      try {
        setLoading(true);
        const lamports = await connection.getBalance(publicKey);
        if (isMounted) {
          setBalance(lamports / LAMPORTS_PER_SOL);
          setLoading(false);
        }
      } catch (error) {
        console.error('Error fetching balance:', error);
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    if (publicKey) {
      fetchBalance();
    } else {
      setBalance(null);
      setLoading(false);
    }

    return () => {
      isMounted = false;
    };
  }, [publicKey, connection]);

  if (loading) {
    return (
      <div className="flex flex-col items-center gap-2">
        <Skeleton className="h-10 w-36 mb-2" />
        <Skeleton className="h-5 w-20" />
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center">
      <div className="text-4xl font-bold mb-1">
        {balance !== null ? balance.toFixed(4) : '0.0000'} <span className="text-xl">SOL</span>
      </div>
      <div className="text-sm text-muted-foreground mb-4">
        {balance !== null && publicKey ? 
          `≈ $${(balance * 25.42).toFixed(2)} USD` : 
          'Connect wallet to view balance'}
      </div>
      <div className="flex gap-2">
        <Button variant="outline" size="sm">Send</Button>
        <Button variant="outline" size="sm">Receive</Button>
        <Button size="sm" className="gap-1">
          <ArrowUpDown size={14} /> Swap
        </Button>
      </div>
    </div>
  );
}
