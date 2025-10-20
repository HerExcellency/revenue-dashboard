'use client';

import { Box, Flex, Button, IconButton, Text, VStack } from '@chakra-ui/react';
import { Home, BarChart2, DollarSign, Users, Grid3x3, Bell, MessageSquare, Menu, Settings, ShoppingBag, Gift, Link2, Bug, RefreshCw, LogOut, ChevronDown, Link as LinkIcon, Store, FileText, Calendar, Image } from 'lucide-react';
import { useState } from 'react';

const navItems = [
  { name: 'Home', icon: Home, href: '/', active: false },
  { name: 'Analytics', icon: BarChart2, href: '/analytics', active: false },
  { name: 'Revenue', icon: DollarSign, href: '/revenue', active: true },
  { name: 'CRM', icon: Users, href: '/crm', active: false },
  { name: 'Apps', icon: Grid3x3, href: '/apps', active: false },
];

const menuItems = [
  { name: 'Settings', icon: Settings },
  { name: 'Purchase History', icon: ShoppingBag },
  { name: 'Refer and Earn', icon: Gift },
  { name: 'Integrations', icon: Link2 },
  { name: 'Report Bug', icon: Bug },
  { name: 'Switch Account', icon: RefreshCw },
  { name: 'Sign Out', icon: LogOut },
];

const linkInBioItems = [
  { name: 'Link in Bio', description: 'Manage your Link in Bio', icon: LinkIcon, color: '#FF6B6B' },
  { name: 'Store', description: 'Manage your Store activities', icon: Store, color: '#FFA500' },
  { name: 'Media Kit', description: 'Manage your Media Kit', icon: Image, color: '#4ECDC4' },
  { name: 'Invoicing', description: 'Manage your Invoices', icon: FileText, color: '#FFD93D' },
  { name: 'Bookings', description: 'Manage your Bookings', icon: Calendar, color: '#6BCF7F' },
];

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAppsOpen, setIsAppsOpen] = useState(false);

  return (
    <Box
      as="header"
      bg="#F5F6FA"
      position="sticky"
      top={0}
      zIndex={100}
      px={6}
      py={4}
    >
      <Box
        bg="white"
        borderRadius="full"
        px={6}
        py={3}
        maxW="1400px"
        mx="auto"
        boxShadow="sm"
        position="relative"
      >
        <Flex align="center" justify="space-between">
          {/* Logo - Left */}
          <Box>
            <img
              src="/logo.png"
              alt="Logo"
              style={{ width: '32px', height: '32px', objectFit: 'contain' }}
            />
          </Box>

          {/* Navigation - Center */}
          <Flex
            as="nav"
            gap={1}
            position="absolute"
            left="50%"
            transform="translateX(-50%)"
            display={{ base: 'none', md: 'flex' }}
            align="center"
          >
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Button
                  key={item.name}
                  variant={item.active ? 'solid' : 'ghost'}
                  bg={item.active ? 'black' : 'transparent'}
                  color={item.active ? 'white' : 'gray.600'}
                  _hover={{
                    bg: item.active ? 'black' : 'gray.50',
                  }}
                  size="sm"
                  fontWeight="normal"
                  borderRadius="full"
                  px={4}
                  onClick={() => {
                    if (item.name === 'Apps') {
                      setIsAppsOpen(!isAppsOpen);
                    }
                  }}
                >
                  <Flex align="center" gap={2}>
                    <Icon size={16} />
                    {item.name}
                  </Flex>
                </Button>
              );
            })}

            {/* Link in Bio Button - Appears right next to Apps when clicked */}
            {isAppsOpen && (
              <Box position="relative" ml="-2px">
                <Button
                  variant="ghost"
                  bg="black"
                  color="white"
                  size="sm"
                  fontWeight="medium"
                  borderRadius="full"
                  px={4}
                  _hover={{ bg: 'gray.800' }}
                >
                  <Flex align="center" gap={2}>
                    Link in Bio
                    <ChevronDown size={16} />
                  </Flex>
                </Button>

                {/* Dropdown Menu */}
                <Box
                  position="absolute"
                  top="calc(100% + 12px)"
                  right={0}
                  bg="white"
                  borderRadius="xl"
                  boxShadow="lg"
                  minW="300px"
                  py={2}
                  zIndex={1000}
                >
                  <VStack align="stretch" gap={0}>
                    {linkInBioItems.map((item) => {
                      const Icon = item.icon;
                      return (
                        <Flex
                          key={item.name}
                          align="center"
                          gap={3}
                          px={4}
                          py={3}
                          cursor="pointer"
                          _hover={{ bg: 'gray.50' }}
                          transition="background 0.2s"
                        >
                          <Box
                            w={10}
                            h={10}
                            bg={`${item.color}20`}
                            borderRadius="lg"
                            display="flex"
                            alignItems="center"
                            justifyContent="center"
                          >
                            <Icon size={20} color={item.color} />
                          </Box>
                          <Box flex={1}>
                            <Text fontSize="sm" fontWeight="medium" color="gray.900">
                              {item.name}
                            </Text>
                            <Text fontSize="xs" color="gray.500">
                              {item.description}
                            </Text>
                          </Box>
                        </Flex>
                      );
                    })}
                  </VStack>
                </Box>
              </Box>
            )}
          </Flex>

          {/* Right side actions */}
          <Flex align="center" gap={2}>
            <IconButton
              aria-label="Notifications"
              variant="ghost"
              size="sm"
              borderRadius="full"
              color="gray.600"
            >
              <Bell size={18} />
            </IconButton>
            <IconButton
              aria-label="Messages"
              variant="ghost"
              size="sm"
              borderRadius="full"
              color="gray.600"
            >
              <MessageSquare size={18} />
            </IconButton>
            <Box
              w={8}
              h={8}
              bg="black"
              borderRadius="full"
              display="flex"
              alignItems="center"
              justifyContent="center"
              color="white"
              fontSize="xs"
              fontWeight="bold"
            >
              OJ
            </Box>
            <Box position="relative">
              <Box
                as="button"
                w={8}
                h={8}
                display="flex"
                alignItems="center"
                justifyContent="center"
                borderRadius="full"
                cursor="pointer"
                _hover={{ bg: 'gray.100' }}
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                <Menu size={18} color="#6B7280" />
              </Box>

              {/* Dropdown Menu */}
              {isMenuOpen && (
                <Box
                  position="absolute"
                  top="calc(100% + 12px)"
                  right={0}
                  bg="white"
                  borderRadius="xl"
                  boxShadow="lg"
                  minW="280px"
                  py={4}
                  zIndex={1000}
                >
                  {/* User Profile Section */}
                  <Flex align="center" gap={3} px={4} pb={4} borderBottom="1px" borderColor="gray.200">
                    <Box
                      w={10}
                      h={10}
                      bg="black"
                      borderRadius="full"
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      color="white"
                      fontSize="sm"
                      fontWeight="bold"
                    >
                      OJ
                    </Box>
                    <Box>
                      <Text fontWeight="semibold" fontSize="sm">
                        Olivier Jones
                      </Text>
                      <Text fontSize="xs" color="gray.500">
                        olivierjones@gmail.com
                      </Text>
                    </Box>
                  </Flex>

                  {/* Menu Items */}
                  <VStack align="stretch" gap={0} pt={2}>
                    {menuItems.map((item) => {
                      const Icon = item.icon;
                      return (
                        <Flex
                          key={item.name}
                          align="center"
                          gap={3}
                          px={4}
                          py={3}
                          cursor="pointer"
                          _hover={{ bg: 'gray.50' }}
                          transition="background 0.2s"
                        >
                          <Icon size={18} color="#6B7280" />
                          <Text fontSize="sm" color="gray.700">
                            {item.name}
                          </Text>
                        </Flex>
                      );
                    })}
                  </VStack>
                </Box>
              )}
            </Box>
          </Flex>
        </Flex>
      </Box>

      {/* Overlay to close menu when clicking outside */}
      {isMenuOpen && (
        <Box
          position="fixed"
          top={0}
          left={0}
          right={0}
          bottom={0}
          zIndex={999}
          onClick={() => setIsMenuOpen(false)}
        />
      )}

      {/* Overlay to close Apps dropdown when clicking outside */}
      {isAppsOpen && (
        <Box
          position="fixed"
          top={0}
          left={0}
          right={0}
          bottom={0}
          zIndex={999}
          onClick={() => setIsAppsOpen(false)}
        />
      )}
    </Box>
  );
}
