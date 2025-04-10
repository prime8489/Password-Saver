'use client';

import { useEffect, useState } from 'react';
import type { VaultItem, Category } from './types';
import { v4 as uuidv4 } from 'uuid';

// Initialize the vault with some sample data
const sampleVaultItems: VaultItem[] = [
  {
    id: '1',
    title: 'Personal GitHub',
    value: 'gh_sample_password123',
    category: 'password',
    service: 'github',
    createdAt: new Date(),
    updatedAt: new Date(),
    favorite: true,
  },
  {
    id: '2',
    title: 'Instagram Account',
    value: 'insta_sample_password456',
    category: 'password',
    service: 'instagram',
    createdAt: new Date(),
    updatedAt: new Date(),
    favorite: false,
  },
  {
    id: '3',
    title: 'Firebase API Key',
    value: 'AIzaSyBxxxxxxxxxxxxxxxxxxxxxxxxxxx',
    category: 'api',
    service: 'firebase',
    createdAt: new Date(),
    updatedAt: new Date(),
    favorite: true,
    note: 'Development project key'
  },
];

// Hook for vault data management
export function useVault() {
  const [items, setItems] = useState<VaultItem[]>([]);
  const [loading, setLoading] = useState(true);

  // Load data from localStorage on component mount
  useEffect(() => {
    const loadVault = () => {
      try {
        const savedVault = localStorage.getItem('passwordVault');
        if (savedVault) {
          const parsedVault = JSON.parse(savedVault);
          // Convert string dates back to Date objects
          const processedVault = parsedVault.map((item: any) => ({
            ...item,
            createdAt: new Date(item.createdAt),
            updatedAt: new Date(item.updatedAt)
          }));
          setItems(processedVault);
        } else {
          // Initialize with sample data if no data exists
          setItems(sampleVaultItems);
          localStorage.setItem('passwordVault', JSON.stringify(sampleVaultItems));
        }
      } catch (error) {
        console.error('Failed to load vault:', error);
        // Fallback to sample data if there's an error
        setItems(sampleVaultItems);
      } finally {
        setLoading(false);
      }
    };

    // Only run in browser environment
    if (typeof window !== 'undefined') {
      loadVault();
    } else {
      setLoading(false);
    }
  }, []);

  // Save items to localStorage whenever they change
  useEffect(() => {
    if (items.length > 0 && !loading && typeof window !== 'undefined') {
      localStorage.setItem('passwordVault', JSON.stringify(items));
    }
  }, [items, loading]);

  // Add a new item to the vault
  const addItem = (item: Omit<VaultItem, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newItem: VaultItem = {
      ...item,
      id: uuidv4(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    setItems([...items, newItem]);
  };

  // Update an existing item
  const updateItem = (id: string, updates: Partial<Omit<VaultItem, 'id' | 'createdAt'>>) => {
    setItems(
      items.map(item =>
        item.id === id
          ? { ...item, ...updates, updatedAt: new Date() }
          : item
      )
    );
  };

  // Delete an item
  const deleteItem = (id: string) => {
    setItems(items.filter(item => item.id !== id));
  };

  // Toggle favorite status
  const toggleFavorite = (id: string) => {
    setItems(
      items.map(item =>
        item.id === id
          ? { ...item, favorite: !item.favorite, updatedAt: new Date() }
          : item
      )
    );
  };

  // Filter items by category
  const getItemsByCategory = (category: Category | 'all') => {
    if (category === 'all') return items;
    return items.filter(item => item.category === category);
  };

  // Get favorite items
  const getFavorites = () => {
    return items.filter(item => item.favorite);
  };

  // Search items
  const searchItems = (query: string) => {
    if (!query.trim()) return items;

    const lowerQuery = query.toLowerCase();
    return items.filter(
      item =>
        item.title.toLowerCase().includes(lowerQuery) ||
        item.service.toLowerCase().includes(lowerQuery) ||
        (item.note && item.note.toLowerCase().includes(lowerQuery))
    );
  };

  return {
    items,
    loading,
    addItem,
    updateItem,
    deleteItem,
    toggleFavorite,
    getItemsByCategory,
    getFavorites,
    searchItems,
  };
}
