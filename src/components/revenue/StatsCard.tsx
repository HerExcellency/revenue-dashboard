'use client';

import { Box, Text, Flex } from '@chakra-ui/react';
import { Info } from 'lucide-react';

interface StatsCardProps {
  label: string;
  value: string;
  showInfo?: boolean;
  horizontal?: boolean;
}

export function StatsCard({ label, value, showInfo = true, horizontal = false }: StatsCardProps) {
  if (horizontal) {
    return (
      <Flex align="center" gap={4}>
        <Text fontSize="sm" color="gray.600" fontWeight="normal">
          {label}
        </Text>
        <Text fontSize="3xl" fontWeight="bold" letterSpacing="-0.02em">
          {value}
        </Text>
      </Flex>
    );
  }

  return (
    <Box>
      <Flex align="center" gap={2} mb={2}>
        <Text fontSize="sm" color="gray.600" fontWeight="normal">
          {label}
        </Text>
        {showInfo && <Info size={14} color="#9CA3AF" />}
      </Flex>
      <Text fontSize="3xl" fontWeight="bold" letterSpacing="-0.02em">
        {value}
      </Text>
    </Box>
  );
}
