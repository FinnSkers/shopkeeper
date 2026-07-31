import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { name, category } = await request.json();

    if (!name) {
      return NextResponse.json({ error: 'Product name is required' }, { status: 400 });
    }

    // Mock AI generator logic tailored to e-commerce and spatial 3D products
    const templates = [
      `Engineered for spatial immersion, the ${name} combines precision craftsmanship with ultra-durable materials. Features real-time ergonomics, low latency, and customizable RGB accents.`,
      `Experience unmatched performance with the ${name}. Crafted from aerospace-grade alloy, it delivers peak durability, 3D spatial fidelity, and intuitive touch controls.`,
      `Upgrade your setup with the ${name}. Designed for high-efficiency workflows, offering seamless wireless connectivity, noise isolation, and a sleek matte finish.`
    ];

    const description = templates[Math.floor(Math.random() * templates.length)];
    const suggestedPrice = Math.floor(49 + Math.random() * 250) + 0.99;
    const suggestedStock = Math.floor(10 + Math.random() * 40);

    return NextResponse.json({
      name,
      description,
      price: suggestedPrice,
      stock: suggestedStock,
      category: category || 'Electronics',
      seoTags: [`${name.toLowerCase()}`, 'spatial 3d', 'premium tech', 'ecommerce']
    });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to generate product details' }, { status: 500 });
  }
}
