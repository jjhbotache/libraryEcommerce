// src/hooks/useCart.tsx
import { useState, useEffect } from 'react';
import { CartProductDTO, ProductDTO } from '@/interfaces/productInterface';
import { toast } from 'react-toastify';
import { apiUrl } from '@/constants/constants';
import myFetch from '@/utils/myFetch';

interface ProductStored {
  id: number;
  quantity: number;
}

export default function useCart() {
  const [cart, setCart] = useState<CartProductDTO[]>([]);

  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      const parsedCart = JSON.parse(savedCart) as ProductStored[];
      fetchProducts(parsedCart);
    }
  }, []);

  useEffect(() => {
    
    const cartToSave = cart.map(item => ({ id: item.id, quantity: item.quantity }));
    localStorage.setItem('cart', JSON.stringify(cartToSave));
    
    
  }, [cart]);

  const fetchProducts = async (cartItems : ProductStored[]) => {
    try {
      const response = await myFetch({ url: `${apiUrl}/products/getProducts` });
      const data: ProductDTO[] = await response.json();
      
      const updatedCart = cartItems.map(cartItem => {
        const product = data.find(p => p.id === cartItem.id);
        return product ? { ...product, quantity: cartItem.quantity } : null;
      }) as CartProductDTO[];
      
      setCart(updatedCart);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const addProduct = (product: ProductDTO, quantity: number = 1) => {
    setCart((prevCart) => {
      const existingProductIndex = prevCart.findIndex(
        (item) => item.id === product.id
      );

      if (existingProductIndex !== -1) {
        const updatedCart = [...prevCart];
        updatedCart[existingProductIndex].quantity = (updatedCart[existingProductIndex].quantity || 0) + quantity;
        return updatedCart;
      } else {
        return [...prevCart, { ...product, quantity }];
      }
    });
    
  };

  const removeProduct = (productId: number, quantity: number = 1) => {
    setCart((prevCart) => {
      const existingProductIndex = prevCart.findIndex(
        (item) => item.id === productId
      );

      if (existingProductIndex !== -1) {
        const updatedCart = [...prevCart];
        updatedCart[existingProductIndex].quantity = (updatedCart[existingProductIndex].quantity || 0) - quantity;

        if (updatedCart[existingProductIndex].quantity <= 0) {
          // Remove the product if quantity is less than or equal to 0
          updatedCart.splice(existingProductIndex, 1);
        }

        return updatedCart;
      }
      return prevCart;
    });
  };

  const clearCart = () => {
    setCart([]);
    toast.success('Carrito vaciado');
  }

  return {
    cart,
    addProduct,
    removeProduct,
    clearCart
  };
}