'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';

export async function getStoreBySlug(slug: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('stores')
    .select('*')
    .eq('slug', slug)
    .single();

  if (error) {
    console.error('Error fetching store:', error);
    return null;
  }
  return data;
}

export async function getProductsByStoreId(storeId: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('store_id', storeId)
    .eq('is_active', true)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching products:', error);
    return [];
  }
  return data;
}

export async function createProduct(formData: {
  storeId: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  category: string;
}) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('products')
    .insert({
      store_id: formData.storeId,
      name: formData.name,
      description: formData.description,
      price: formData.price,
      stock_quantity: formData.stock,
      category: formData.category,
    })
    .select()
    .single();

  if (error) {
    console.error('Error creating product:', error);
    throw new Error(error.message);
  }

  revalidatePath('/dashboard/products');
  return data;
}

export async function createOrder(orderData: {
  storeId: string;
  customerName: string;
  customerEmail: string;
  shippingAddress: any;
  totalAmount: number;
  items: Array<{
    productId: string;
    productName: string;
    quantity: number;
    unitPrice: number;
    selectedColor?: string;
    selectedSize?: string;
  }>;
}) {
  const supabase = await createClient();
  const orderId = `#ORD-${Math.floor(1000 + Math.random() * 9000)}`;

  const { data: order, error: orderError } = await supabase
    .from('orders')
    .insert({
      id: orderId,
      store_id: orderData.storeId,
      customer_name: orderData.customerName,
      customer_email: orderData.customerEmail,
      shipping_address: orderData.shippingAddress,
      total_amount: orderData.totalAmount,
      status: 'Pending',
    })
    .select()
    .single();

  if (orderError) {
    console.error('Error creating order:', orderError);
    throw new Error(orderError.message);
  }

  const orderItems = orderData.items.map((item) => ({
    order_id: orderId,
    product_id: item.productId,
    product_name: item.productName,
    quantity: item.quantity,
    unit_price: item.unitPrice,
    selected_color: item.selectedColor,
    selected_size: item.selectedSize,
  }));

  const { error: itemsError } = await supabase
    .from('order_items')
    .insert(orderItems);

  if (itemsError) {
    console.error('Error inserting order items:', itemsError);
  }

  revalidatePath('/dashboard/orders');
  return order;
}
