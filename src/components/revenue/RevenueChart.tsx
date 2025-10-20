'use client';

import { Box, Flex, VStack, IconButton } from '@chakra-ui/react';
import { LineChart, Line, XAxis, ResponsiveContainer } from 'recharts';
import { MessageCircle, Grid2X2, Layers, Folder } from 'lucide-react';

interface ChartData {
  date: string;
  value: number;
}

interface RevenueChartProps {
  data?: ChartData[];
}

export function RevenueChart({ data }: RevenueChartProps) {
  // Use provided data or fallback to empty array
  const chartData = data && data.length > 0 ? data : [];
  return (
    <Flex gap={6} align="center">
      {/* Left sidebar with icons */}
      {/* <VStack gap={3} flexShrink={0}>
        <IconButton
          aria-label="Message"
          icon={<MessageCircle size={18} />}
          variant="ghost"
          size="sm"
          color="gray.400"
          _hover={{ color: 'gray.600', bg: 'gray.50' }}
        />
        <IconButton
          aria-label="Grid"
          icon={<Grid2X2 size={18} />}
          variant="ghost"
          size="sm"
          color="gray.400"
          _hover={{ color: 'gray.600', bg: 'gray.50' }}
        />
        <IconButton
          aria-label="Layers"
          icon={<Layers size={18} />}
          variant="ghost"
          size="sm"
          color="gray.400"
          _hover={{ color: 'gray.600', bg: 'gray.50' }}
        />
        <IconButton
          aria-label="Folder"
          icon={<Folder size={18} />}
          variant="ghost"
          size="sm"
          color="gray.400"
          _hover={{ color: 'gray.600', bg: 'gray.50' }}
        />
      </VStack> */}

      {/* Chart */}
      <Box h="300px" flex="1">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData} margin={{ top: 20, right: 20, left: 0, bottom: 20 }}>
            <defs>
              <linearGradient id="lineGradient" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#FF6B3D" />
                <stop offset="100%" stopColor="#FF8A5B" />
              </linearGradient>
            </defs>
            <XAxis
              dataKey="date"
              tick={{ fill: '#6B7280', fontSize: 12 }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(value) => {
                // Format date string (e.g., "2022-03-03" -> "Mar 3")
                const date = new Date(value);
                return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
              }}
            />
            <Line
              type="natural"
              dataKey="value"
              stroke="url(#lineGradient)"
              strokeWidth={2.5}
              dot={false}
              activeDot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </Box>
    </Flex>
  );
}
