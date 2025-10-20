'use client';

import { Box, Flex, Button, Grid } from '@chakra-ui/react';
import { Header } from '@/components/layout/Header';
import { StatsCard } from '@/components/revenue/StatsCard';
import { RevenueChart } from '@/components/revenue/RevenueChart';
import { TransactionsList } from '@/components/revenue/TransactionsList';
import { FilterState } from '@/components/revenue/FilterModal';
import { useEffect, useState } from 'react';
import { api, Wallet, Transaction } from '@/services/api';

export default function Home() {
  const [wallet, setWallet] = useState<Wallet | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<FilterState | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const [walletData, transactionsData] = await Promise.all([
          api.getWallet(),
          api.getTransactions(),
        ]);
        setWallet(walletData);
        setTransactions(transactionsData);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  const formatCurrency = (amount: number) => {
    return `USD ${amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  // Filter transactions based on selected filters
  const filteredTransactions = transactions.filter((transaction) => {
    if (!filters) return true;

    // Filter by transaction type
    if (filters.transactionTypes.length > 0 && filters.transactionTypes.length < 6) {
      const typeMapping: { [key: string]: string[] } = {
        'Store Transactions': ['store transaction', 'digital_product', 'coffee'],
        'Get Tipped': ['tip', 'donation'],
        'Withdrawals': ['withdrawal'],
        'Chargebacks': ['chargeback'],
        'Cashbacks': ['cashback'],
        'Refer & Earn': ['referral', 'refer'],
      };

      let typeMatch = false;
      for (const filterType of filters.transactionTypes) {
        const allowedTypes = typeMapping[filterType] || [];
        if (filterType === 'Withdrawals' && transaction.type === 'withdrawal') {
          typeMatch = true;
          break;
        }
        if (transaction.metadata?.type) {
          if (allowedTypes.some(t => transaction.metadata.type.toLowerCase().includes(t.toLowerCase()))) {
            typeMatch = true;
            break;
          }
        }
      }
      if (!typeMatch) return false;
    }

    // Filter by status
    if (filters.transactionStatus.length > 0) {
      const statusMatch = filters.transactionStatus.some(
        (status) => transaction.status.toLowerCase() === status.toLowerCase()
      );
      if (!statusMatch) return false;
    }

    // Filter by date range
    const transactionDate = new Date(transaction.date);
    const start = new Date(filters.startDate);
    const end = new Date(filters.endDate);
    if (transactionDate < start || transactionDate > end) {
      return false;
    }

    return true;
  });

  // Aggregate transactions by date for chart visualization
  const aggregateTransactionsForChart = (txns: Transaction[]) => {
    const aggregated: { [key: string]: number } = {};

    txns.forEach((transaction) => {
      const date = transaction.date;
      if (!aggregated[date]) {
        aggregated[date] = 0;
      }
      aggregated[date] += transaction.amount;
    });

    return Object.entries(aggregated)
      .map(([date, value]) => ({
        date,
        value: Math.abs(value),
      }))
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  };

  const chartData = aggregateTransactionsForChart(filteredTransactions);

  return (
    <Box minH="100vh" bg="#F5F6FA">
      <Header />

      <Box pt={8} pb={12} px={{ base: 4, md: 8 }}>
        <Box maxW="1400px" mx="auto">
          {/* Main Content - Chart and Stats */}
          <Flex gap={8} mb={12} flexDirection={{ base: 'column', lg: 'row' }} align="stretch">
            {/* Left side - Available Balance, Withdraw Button, and Chart */}
            <Box flex="1">
              {/* Top Section - Balance and Withdraw */}
              <Flex
                alignItems="center"
                mb={8}
                gap={6}
              >
                {/* Available Balance */}
                <Box>
                  <StatsCard
                    label="Available Balance"
                    value={wallet ? formatCurrency(wallet.balance) : 'Loading...'}
                    showInfo={false}
                  />
                </Box>

                {/* Withdraw Button */}
                <Button
                  bg="black"
                  color="white"
                  size="md"
                  px={8}
                  borderRadius="full"
                  fontWeight="medium"
                  _hover={{ bg: 'gray.800' }}
                >
                  Withdraw
                </Button>
              </Flex>

              {/* Chart */}
              <RevenueChart data={chartData} />
            </Box>

            {/* Right Stats - same height as left container */}
            <Box w={{ base: '100%', lg: '280px' }} flexShrink={0}>
              <Grid templateColumns="1fr" gap={6}>
                <StatsCard
                  label="Ledger Balance"
                  value={wallet ? formatCurrency(wallet.ledger_balance) : 'Loading...'}
                />
                <StatsCard
                  label="Total Payout"
                  value={wallet ? formatCurrency(wallet.total_payout) : 'Loading...'}
                />
                <StatsCard
                  label="Total Revenue"
                  value={wallet ? formatCurrency(wallet.total_revenue) : 'Loading...'}
                />
                <StatsCard
                  label="Pending Payout"
                  value={wallet ? formatCurrency(wallet.pending_payout) : 'Loading...'}
                />
              </Grid>
            </Box>
          </Flex>

          {/* Transactions List */}
          <Box>
            <TransactionsList transactions={filteredTransactions} loading={loading} filters={filters} onFiltersChange={setFilters} />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
