import { Box, BoxProps } from '@chakra-ui/react';
import { forwardRef, ReactNode } from 'react';

export interface CardProps extends BoxProps {
  children: ReactNode;
  variant?: 'elevated' | 'outline' | 'filled';
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ children, variant = 'elevated', ...props }, ref) => {
    const getVariantStyles = () => {
      switch (variant) {
        case 'elevated':
          return {
            boxShadow: 'md',
            bg: 'white',
            _dark: { bg: 'gray.800' },
          };
        case 'outline':
          return {
            border: '1px',
            borderColor: 'gray.200',
            _dark: { borderColor: 'gray.700' },
          };
        case 'filled':
          return {
            bg: 'gray.50',
            _dark: { bg: 'gray.900' },
          };
        default:
          return {};
      }
    };

    return (
      <Box
        ref={ref}
        borderRadius="lg"
        p={6}
        {...getVariantStyles()}
        {...props}
      >
        {children}
      </Box>
    );
  }
);

Card.displayName = 'Card';
