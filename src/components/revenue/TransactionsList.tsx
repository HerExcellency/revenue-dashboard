'use client';

import { Box, Flex, Text, Button } from '@chakra-ui/react';
import { ArrowDownLeft, ArrowUpRight, ChevronDown, Download } from 'lucide-react';
import { Transaction as APITransaction } from '@/services/api';
import { FilterModal, FilterState } from './FilterModal';
import { useState } from 'react';

interface TransactionsListProps {
  transactions: APITransaction[];
  loading?: boolean;
  filters: FilterState | null;
  onFiltersChange: (filters: FilterState) => void;
}

export function TransactionsList({ transactions, loading = false, filters, onFiltersChange }: TransactionsListProps) {
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const formatCurrency = (amount: number) => {
    return `USD ${Math.abs(amount).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' });
  };

  const handleApplyFilters = (newFilters: FilterState) => {
    onFiltersChange(newFilters);
  };

  if (loading) {
    return (
      <Box>
        <Text>Loading transactions...</Text>
      </Box>
    );
  }
  return (
    <Box>
      {/* Header */}
      <Flex justify="space-between" align="center" mb={6}>
        <Box>
          <Text fontSize="xl" fontWeight="bold" mb={1}>
            {transactions.length} Transactions
          </Text>
          <Text fontSize="sm" color="gray.600">
            Your transactions for the last 7 days
          </Text>
        </Box>
        <Flex gap={3}>
          <Button
            variant="ghost"
            bg="#EFF1F6"
            size="sm"
            fontWeight="medium"
            borderRadius="100px"
            px="20px"
            py="12px"
            pl="30px"
            _hover={{ bg: '#E5E7EC' }}
            onClick={() => setIsFilterOpen(true)}
          >
            <Flex align="center" gap={2}>
              <Text>Filter</Text>
              <ChevronDown size={16} />
            </Flex>
          </Button>
          <Button
            variant="ghost"
            bg="#EFF1F6"
            size="sm"
            fontWeight="medium"
            borderRadius="100px"
            px="20px"
            py="12px"
            pl="30px"
            _hover={{ bg: '#E5E7EC' }}
          >
            <Flex align="center" gap={2}>
              <Text>Export list</Text>
              <Download size={16} />
            </Flex>
          </Button>
        </Flex>
      </Flex>

      {/* Filter Modal */}
      <FilterModal
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        onApply={handleApplyFilters}
      />

      {/* Transactions */}
      <Box>
        {transactions.map((transaction, index) => {
          const isCredit = transaction.type === 'deposit';
          const statusColor = transaction.status === 'successful' ? 'green.600' : transaction.status === 'pending' ? 'orange.500' : 'gray.500';

          return (
            <Flex
              key={transaction.payment_reference || index}
              align="center"
              justify="space-between"
              py={4}
              borderBottom="1px"
              borderColor="gray.100"
              _last={{ borderBottom: 'none' }}
            >
              <Flex align="center" gap={4}>
                {/* Icon */}
                <Box
                  w={12}
                  h={12}
                  borderRadius="full"
                  bg={isCredit ? 'green.50' : 'red.50'}
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                >
                  {isCredit ? (
                    <ArrowDownLeft size={20} color="#10B981" />
                  ) : (
                    <ArrowUpRight size={20} color="#EF4444" />
                  )}
                </Box>

                {/* Title and subtitle */}
                <Box>
                  <Text fontWeight="medium" fontSize="sm" mb={1}>
                    {transaction.metadata?.product_name || transaction.metadata?.name || 'Transaction'}
                  </Text>
                  <Text fontSize="sm" color={statusColor}>
                    {transaction.metadata?.name || transaction.status}
                  </Text>
                </Box>
              </Flex>

              {/* Amount and date */}
              <Box textAlign="right">
                <Text fontWeight="semibold" fontSize="sm" mb={1}>
                  {formatCurrency(transaction.amount)}
                </Text>
                <Text fontSize="sm" color="gray.500">
                  {formatDate(transaction.date)}
                </Text>
              </Box>
            </Flex>
          );
        })}
      </Box>
    </Box>
  );
}
