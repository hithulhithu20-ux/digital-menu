export const categories = [
  { id: 'all', name: 'All Items', icon: '🍽️' },
  { id: 'starters', name: 'Starters', icon: '🥗' },
  { id: 'mains', name: 'Main Course', icon: '🍲' },
  { id: 'beverages', name: 'Beverages', icon: '🍹' },
  { id: 'desserts', name: 'Desserts', icon: '🍰' },
];

export const menuItems = [
  {
    id: 'm1',
    name: 'Truffle Mushroom Arancini',
    category: 'starters',
    price: 12.99,
    rating: 4.8,
    isVeg: true,
    prepTime: '15 mins',
    description: 'Crispy risotto balls filled with wild mushrooms and creamy mozzarella, served with garlic aioli.',
    image: 'https://images.unsplash.com/photo-1541529086526-db283c563270?auto=format&fit=crop&w=600&q=80',
    popular: true
  },
  {
    id: 'm2',
    name: 'Smoked BBQ Chicken Wings',
    category: 'starters',
    price: 14.50,
    rating: 4.9,
    isVeg: false,
    prepTime: '20 mins',
    description: 'Hickory-smoked chicken wings tossed in signature spicy honey BBQ sauce with ranch drizzle.',
    image: 'https://images.unsplash.com/photo-1567620832903-9fc6debc209f?auto=format&fit=crop&w=600&q=80',
    popular: true
  },
  {
    id: 'm3',
    name: 'Paneer Tikka Grill',
    category: 'starters',
    price: 11.99,
    rating: 4.7,
    isVeg: true,
    prepTime: '15 mins',
    description: 'Char-grilled cottage cheese cubes marinated in tandoori spices, bell peppers, and mint chutney.',
    image: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'm4',
    name: 'Artisanal Wood-Fired Margherita',
    category: 'mains',
    price: 18.99,
    rating: 4.9,
    isVeg: true,
    prepTime: '20 mins',
    description: 'San Marzano tomato sauce, fresh mozzarella di bufala, basil leaves, and extra virgin olive oil.',
    image: 'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?auto=format&fit=crop&w=600&q=80',
    popular: true
  },
  {
    id: 'm5',
    name: 'Prime Ribeye Steak (10oz)',
    category: 'mains',
    price: 29.99,
    rating: 4.9,
    isVeg: false,
    prepTime: '25 mins',
    description: 'Pan-seared USDA Prime ribeye with rosemary garlic butter, truffle fries, and grilled asparagus.',
    image: 'https://images.unsplash.com/photo-1558030006-450675393462?auto=format&fit=crop&w=600&q=80',
    popular: true
  },
  {
    id: 'm6',
    name: 'Creamy Tuscan Salmon Pasta',
    category: 'mains',
    price: 24.50,
    rating: 4.8,
    isVeg: false,
    prepTime: '20 mins',
    description: 'Fettuccine pasta with pan-roasted salmon, sun-dried tomatoes, spinach in rich parmesan cream sauce.',
    image: 'https://images.unsplash.com/photo-1621996346565-e3d5d6281288?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'm7',
    name: 'Dragon Passionfruit Mojito',
    category: 'beverages',
    price: 7.50,
    rating: 4.8,
    isVeg: true,
    prepTime: '5 mins',
    description: 'Fresh passionfruit pulp, fresh mint leaves, lime juice, and sparkling soda over crushed ice.',
    image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=600&q=80',
    popular: true
  },
  {
    id: 'm8',
    name: 'Iced Caramel Oat Latte',
    category: 'beverages',
    price: 6.25,
    rating: 4.6,
    isVeg: true,
    prepTime: '5 mins',
    description: 'Double espresso shot layered with creamy oat milk, buttery caramel sauce, and vanilla syrup.',
    image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'm9',
    name: 'Warm Lava Molten Chocolate Cake',
    category: 'desserts',
    price: 9.99,
    rating: 4.9,
    isVeg: true,
    prepTime: '12 mins',
    description: 'Rich Belgian chocolate cake with a molten liquid center, served with Madagascar vanilla gelato.',
    image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=600&q=80',
    popular: true
  },
  {
    id: 'm10',
    name: 'Classic New York Cheesecake',
    category: 'desserts',
    price: 8.99,
    rating: 4.7,
    isVeg: true,
    prepTime: '8 mins',
    description: 'Smooth graham cracker crust cheesecake topped with fresh berry compote and mint leaf.',
    image: 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&w=600&q=80'
  }
];
