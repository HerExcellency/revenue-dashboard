'use client';

import { Box, VStack, IconButton } from '@chakra-ui/react';
import { Link2, Briefcase, FolderOpen, BookOpen } from 'lucide-react';

const sidebarItems = [
  { icon: Link2, label: 'Link', href: '#' },
  { icon: Briefcase, label: 'Briefcase', href: '#' },
  { icon: FolderOpen, label: 'Folder', href: '#' },
  { icon: BookOpen, label: 'Book', href: '#' },
];

export function Sidebar() {
  return (
    <Box
      as="aside"
      position="fixed"
      left={0}
      top="65px"
      h="calc(100vh - 65px)"
      w="60px"
      bg="white"
      borderRight="1px"
      borderColor="gray.200"
      py={6}
      display={{ base: 'none', lg: 'block' }}
    >
      <VStack gap={4}>
        {sidebarItems.map((item, index) => {
          const Icon = item.icon;
          return (
            <IconButton
              key={index}
              aria-label={item.label}
              variant="ghost"
              size="sm"
              color="gray.500"
              _hover={{ color: 'gray.700', bg: 'gray.100' }}
            >
              <Icon size={20} />
            </IconButton>
          );
        })}
      </VStack>
    </Box>
  );
}
