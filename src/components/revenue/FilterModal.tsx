'use client';

import { Box, Flex, Text, Button, VStack } from '@chakra-ui/react';
import { X } from 'lucide-react';
import { useState, useEffect } from 'react';

interface FilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApply: (filters: FilterState) => void;
}

export interface FilterState {
  dateRange: 'today' | 'last7days' | 'thisMonth' | 'last3months' | 'custom';
  startDate: string;
  endDate: string;
  transactionTypes: string[];
  transactionStatus: string[];
}

const transactionTypes = [
  'Store Transactions',
  'Get Tipped',
  'Withdrawals',
  'Chargebacks',
  'Cashbacks',
  'Refer & Earn',
];

const transactionStatuses = ['Successful', 'Pending', 'Failed'];

export function FilterModal({ isOpen, onClose, onApply }: FilterModalProps) {
  const [selectedPeriod, setSelectedPeriod] = useState<'today' | 'last7days' | 'thisMonth' | 'last3months'>('last7days');
  const [startDate, setStartDate] = useState('2023-07-17');
  const [endDate, setEndDate] = useState('2023-08-17');
  const [selectedTypes, setSelectedTypes] = useState<string[]>(transactionTypes);
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>(['Successful', 'Pending', 'Failed']);
  const [showTypeDropdown, setShowTypeDropdown] = useState(false);
  const [showStatusDropdown, setShowStatusDropdown] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  // Trigger animation when modal opens
  useEffect(() => {
    if (isOpen) {
      setIsAnimating(true);
    } else {
      // Delay unmounting to allow slide-out animation
      const timer = setTimeout(() => setIsAnimating(false), 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!isOpen && !isAnimating) return null;

  const handleTypeToggle = (type: string) => {
    setSelectedTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  const handleStatusToggle = (status: string) => {
    setSelectedStatuses((prev) =>
      prev.includes(status) ? prev.filter((s) => s !== status) : [...prev, status]
    );
  };

  const handleClear = () => {
    setSelectedPeriod('last7days');
    setStartDate('2023-07-17');
    setEndDate('2023-08-17');
    setSelectedTypes(transactionTypes);
    setSelectedStatuses(['Successful', 'Pending', 'Failed']);
  };

  const handleApply = () => {
    onApply({
      dateRange: selectedPeriod,
      startDate,
      endDate,
      transactionTypes: selectedTypes,
      transactionStatus: selectedStatuses,
    });
    onClose();
  };

  return (
    <>
      {/* Overlay */}
      <Box
        position="fixed"
        top={0}
        left={0}
        right={0}
        bottom={0}
        bg="blackAlpha.600"
        zIndex={1000}
        onClick={onClose}
        opacity={isOpen ? 1 : 0}
        transition="opacity 0.3s ease-in-out"
      />

      {/* Drawer */}
      <Box
        position="fixed"
        top={0}
        right={0}
        bottom={0}
        bg="white"
        boxShadow="2xl"
        w={{ base: '100%', md: '450px' }}
        zIndex={1001}
        transform={isOpen ? 'translateX(0)' : 'translateX(100%)'}
        transition="transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)"
        display="flex"
        flexDirection="column"
      >
        {/* Scrollable Content */}
        <Box overflowY="auto" flex="1" p={6}>
          {/* Header */}
          <Flex justify="space-between" align="center" mb={6}>
            <Text fontSize="lg" fontWeight="semibold">
              Filter
            </Text>
            <Box
              as="button"
              onClick={onClose}
              cursor="pointer"
              p={1}
              borderRadius="md"
              _hover={{ bg: 'gray.100' }}
            >
              <X size={20} />
            </Box>
          </Flex>

        {/* Time Period Tabs */}
        <Flex gap={2} mb={6} flexWrap="wrap">
          {[
            { label: 'Today', value: 'today' as const },
            { label: 'Last 7 days', value: 'last7days' as const },
            { label: 'This month', value: 'thisMonth' as const },
            { label: 'Last 3 months', value: 'last3months' as const },
          ].map((period) => (
            <Button
              key={period.value}
              size="sm"
              variant={selectedPeriod === period.value ? 'solid' : 'outline'}
              bg={selectedPeriod === period.value ? 'black' : 'transparent'}
              color={selectedPeriod === period.value ? 'white' : 'gray.700'}
              borderColor="gray.300"
              _hover={{
                bg: selectedPeriod === period.value ? 'black' : 'gray.50',
              }}
              onClick={() => setSelectedPeriod(period.value)}
              borderRadius="md"
              fontWeight="normal"
              fontSize="sm"
            >
              {period.label}
            </Button>
          ))}
        </Flex>

        {/* Date Range */}
        <Box mb={6}>
          <Text fontSize="sm" fontWeight="medium" mb={3}>
            Date Range
          </Text>
          <Flex gap={3}>
            <Box flex={1}>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                style={{
                  width: '100%',
                  padding: '8px 12px',
                  borderRadius: '6px',
                  border: '1px solid #E2E8F0',
                  fontSize: '14px',
                }}
              />
            </Box>
            <Box flex={1}>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                style={{
                  width: '100%',
                  padding: '8px 12px',
                  borderRadius: '6px',
                  border: '1px solid #E2E8F0',
                  fontSize: '14px',
                }}
              />
            </Box>
          </Flex>
        </Box>

        {/* Transaction Type */}
        <Box mb={6}>
          <Text fontSize="sm" fontWeight="medium" mb={3}>
            Transaction Type
          </Text>
          <Box position="relative">
            <Box
              as="button"
              w="100%"
              px={4}
              py={3}
              border="1px solid"
              borderColor="gray.300"
              borderRadius="md"
              textAlign="left"
              fontSize="sm"
              color="gray.700"
              onClick={() => setShowTypeDropdown(!showTypeDropdown)}
              _hover={{ borderColor: 'gray.400' }}
            >
              {selectedTypes.length === transactionTypes.length
                ? 'All transaction types'
                : `${selectedTypes.length} selected`}
            </Box>

            {showTypeDropdown && (
              <Box
                position="absolute"
                top="calc(100% + 4px)"
                left={0}
                right={0}
                bg="white"
                border="1px solid"
                borderColor="gray.300"
                borderRadius="md"
                boxShadow="lg"
                zIndex={10}
                maxH="250px"
                overflowY="auto"
              >
                <VStack align="stretch" gap={0}>
                  {transactionTypes.map((type) => (
                    <Flex
                      key={type}
                      align="center"
                      gap={3}
                      px={4}
                      py={3}
                      cursor="pointer"
                      _hover={{ bg: 'gray.50' }}
                      onClick={() => handleTypeToggle(type)}
                    >
                      <input
                        type="checkbox"
                        checked={selectedTypes.includes(type)}
                        onChange={() => {}}
                        style={{ width: '16px', height: '16px', cursor: 'pointer' }}
                      />
                      <Text fontSize="sm">{type}</Text>
                    </Flex>
                  ))}
                </VStack>
              </Box>
            )}
          </Box>
        </Box>

        {/* Transaction Status */}
        <Box mb={6}>
          <Text fontSize="sm" fontWeight="medium" mb={3}>
            Transaction Status
          </Text>
          <Box position="relative">
            <Box
              as="button"
              w="100%"
              px={4}
              py={3}
              border="1px solid"
              borderColor="gray.300"
              borderRadius="md"
              textAlign="left"
              fontSize="sm"
              color="gray.700"
              onClick={() => setShowStatusDropdown(!showStatusDropdown)}
              _hover={{ borderColor: 'gray.400' }}
            >
              {selectedStatuses.length === transactionStatuses.length
                ? 'All statuses'
                : selectedStatuses.join(', ')}
            </Box>

            {showStatusDropdown && (
              <Box
                position="absolute"
                top="calc(100% + 4px)"
                left={0}
                right={0}
                bg="white"
                border="1px solid"
                borderColor="gray.300"
                borderRadius="md"
                boxShadow="lg"
                zIndex={10}
              >
                <VStack align="stretch" gap={0}>
                  {transactionStatuses.map((status) => (
                    <Flex
                      key={status}
                      align="center"
                      gap={3}
                      px={4}
                      py={3}
                      cursor="pointer"
                      _hover={{ bg: 'gray.50' }}
                      onClick={() => handleStatusToggle(status)}
                    >
                      <input
                        type="checkbox"
                        checked={selectedStatuses.includes(status)}
                        onChange={() => {}}
                        style={{ width: '16px', height: '16px', cursor: 'pointer' }}
                      />
                      <Text fontSize="sm">{status}</Text>
                    </Flex>
                  ))}
                </VStack>
              </Box>
            )}
          </Box>
        </Box>
        </Box>

        {/* Action Buttons - Footer */}
        <Box
          p={6}
          borderTop="1px solid"
          borderColor="gray.200"
          bg="white"
        >
          <Flex gap={3}>
            <Button
              flex={1}
              variant="ghost"
              bg="#EFF1F6"
              fontWeight="medium"
              borderRadius="100px"
              px="20px"
              py="12px"
              _hover={{ bg: '#E5E7EC' }}
              onClick={handleClear}
            >
              Clear
            </Button>
            <Button
              flex={1}
              bg="black"
              color="white"
              fontWeight="medium"
              borderRadius="100px"
              px="20px"
              py="12px"
              _hover={{ bg: 'gray.800' }}
              onClick={handleApply}
            >
              Apply
            </Button>
          </Flex>
        </Box>
      </Box>
    </>
  );
}
