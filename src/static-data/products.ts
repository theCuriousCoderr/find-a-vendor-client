const vendorProducts = [
  {
    _id: 31,
    category: "bags",
    vendor_id: 1,
    images: [
      "/products/bags/bag1.jpeg",
      "/products/bags/bag2.jpeg",
      "/products/bags/bag3.jpeg",
    ],
    details: {
      name: "Gucci Leather Tote Bag",
      description:
        "A luxurious full-grain leather tote with an elegant quilted pattern, gold-tone accents, and a spacious interior. Features a secure zip closure and an adjustable shoulder strap for versatility.",
      price: 4000,
      qty: 20,
      status: "In stock",
    },
  },
  {
    _id: 32,
    category: "electronics",
    vendor_id: 2,
    images: [
      "/products/electronics/sony-wh-1000xm4-1.jpeg",
      "/products/electronics/sony-wh-1000xm4-2.jpeg",
      "/products/electronics/sony-wh-1000xm4-3.jpeg",
    ],
    details: {
      name: "Sony WH-1000XM4 Wireless Headphones",
      description:
        "Industry-leading noise canceling wireless headphones with dual noise sensor technology, 30-hour battery life, and touch controls.",
      price: 349.99,
      qty: 50,
      status: "In stock",
    },
  },
  {
    _id: 33,
    category: "furniture",
    vendor_id: 3,
    images: [
      "/products/furniture/sofa-1.jpeg",
      "/products/furniture/sofa-2.jpeg",
      "/products/furniture/sofa-3.jpeg",
      "/products/furniture/sofa-4.jpeg",
    ],
    details: {
      name: "Modern Sectional Sofa",
      description:
        "Contemporary L-shaped sectional sofa with chaise lounge, featuring premium fabric upholstery and chrome legs. Perfect for modern living rooms.",
      price: 1299.99,
      qty: 5,
      status: "Low stock",
    },
  },
  {
    _id: 34,
    category: "clothing",
    vendor_id: 1,
    images: [
      "/products/clothing/jacket-1.jpeg",
      "/products/clothing/jacket-2.jpeg",
    ],
    details: {
      name: "North Face Winter Parka",
      description:
        "Waterproof and insulated winter parka with 550-fill down, adjustable hood, and multiple pockets for storage. Ideal for extreme cold weather.",
      price: 299.99,
      qty: 0,
      status: "Out of stock",
    },
  },
  {
    _id: 35,
    category: "beauty",
    vendor_id: 4,
    images: ["/products/beauty/serum-2.jpeg"],
    details: {
      name: "La Mer Regenerating Serum",
      description:
        "Luxury anti-aging serum with concentrated Miracle Broth™, helping reduce visible signs of aging while lifting and firming the skin.",
      price: 365.0,
      qty: 15,
      status: "In stock",
    },
  },
  {
    _id: 36,
    category: "sports",
    vendor_id: 5,
    images: [
      "/products/sports/yoga1.jpeg",
      "/products/sports/yoga2.jpeg",
      "/products/sports/yoga3.jpeg",
    ],
    details: {
      name: "Premium Yoga Mat Bundle",
      description:
        "Extra thick 6mm eco-friendly yoga mat with alignment lines, carrying strap, and cleaning spray. Includes microfiber towel.",
      price: 89.99,
      qty: 30,
      status: "In stock",
    },
  },
  {
    _id: 37,
    category: "books",
    vendor_id: 2,
    images: ["/products/books/book-1.jpeg"],
    details: {
      name: "The Art of Programming",
      description:
        "Comprehensive guide to modern programming paradigms, covering advanced algorithms, data structures, and software architecture principles.",
      price: 59.99,
      qty: 100,
      status: "In stock",
    },
  },
  {
    _id: 38,
    category: "jewelry",
    vendor_id: 6,
    images: [
      "/products/jewelry/necklace1.jpeg",
      "/products/jewelry/necklace2.jpeg",
    ],
    details: {
      name: "Diamond Tennis Necklace",
      description:
        "18K white gold tennis necklace featuring 5 carats of round brilliant diamonds with VS clarity. Secure box clasp with safety catch.",
      price: 7999.99,
      qty: 3,
      status: "Low stock",
    },
  },
  {
    _id: 39,
    category: "home",
    vendor_id: 3,
    images: ["/products/home/blender1.jpeg", "/products/home/blender2.jpeg"],
    details: {
      name: "Vitamix Professional Blender",
      description:
        "Professional-grade blender with variable speed control, pulse feature, and aircraft-grade stainless steel blades. Perfect for smoothies, hot soups, and more.",
      price: 549.99,
      qty: 25,
      status: "In stock",
    },
  },
  {
    _id: 40,
    category: "toys",
    vendor_id: 4,
    images: [
      "/products/toys/lego-3.jpeg",
      "/products/toys/lego-1.jpeg",
      "/products/toys/lego-2.jpeg",
    ],
    details: {
      name: "LEGO Architecture Skyline Set",
      description:
        "Build and display the iconic New York City skyline with this detailed LEGO Architecture set featuring the Statue of Liberty, Empire State Building, and more.",
      price: 79.99,
      qty: 40,
      status: "In stock",
    },
  },
  {
    _id: 3,
    category: "furniture",
    vendor_id: 3,
    images: [
      "/products/furniture/sofa-2.jpeg",
      "/products/furniture/sofa-3.jpeg",
      "/products/furniture/sofa-1.jpeg",
    ],
    details: {
      name: "Modern Sectional Sofa",
      description:
        "Contemporary L-shaped sectional sofa with chaise lounge, featuring premium fabric upholstery and chrome legs.",
      price: 1299.99,
      qty: 5,
      status: "Low stock",
    },
  },
  {
    _id: 4,
    category: "clothing",
    vendor_id: 4,
    images: [
      "/products/clothing/dress-1.jpeg",
      "/products/clothing/dress-2.jpeg",
    ],
    details: {
      name: "Summer Floral Maxi Dress",
      description:
        "Lightweight floral print maxi dress with adjustable straps and elastic waistband. Perfect for summer occasions.",
      price: 89.99,
      qty: 35,
      status: "In stock",
    },
  },
  {
    _id: 5,
    category: "beauty",
    vendor_id: 5,
    images: [
      "/products/beauty/palette1.jpeg",
      "/products/beauty/palette2.jpeg",
    ],
    details: {
      name: "Urban Decay Naked Palette",
      description:
        "Versatile eyeshadow palette featuring 12 neutral shades in matte and shimmer finishes.",
      price: 54.0,
      qty: 100,
      status: "In stock",
    },
  },
  {
    _id: 6,
    category: "sports",
    vendor_id: 6,
    images: [
      "/products/sports/weights1.jpeg",
      "/products/sports/weights2.jpeg",
    ],
    details: {
      name: "Adjustable Dumbbell Set",
      description:
        "Space-saving adjustable dumbbells with weight range from 5-52.5 lbs each. Quick-change weight selection system.",
      price: 399.99,
      qty: 15,
      status: "Low stock",
    },
  },
  {
    _id: 7,
    category: "books",
    vendor_id: 7,
    images: ["/products/books/cookbook1.jpeg"],
    details: {
      name: "The Joy of Cooking",
      description:
        "Classic cookbook featuring over 4,000 recipes, cooking techniques, and kitchen tips.",
      price: 35.0,
      qty: 75,
      status: "In stock",
    },
  },
  {
    _id: 8,
    category: "jewelry",
    vendor_id: 8,
    images: [
      "/products/jewelry/ring1.jpeg",
      "/products/jewelry/ring2.jpeg",
      "/products/jewelry/ring3.jpeg",
    ],
    details: {
      name: "Sapphire Engagement Ring",
      description:
        "14K white gold ring featuring a 2-carat oval blue sapphire surrounded by diamond halo.",
      price: 2999.99,
      qty: 3,
      status: "Low stock",
    },
  },
  {
    _id: 9,
    category: "home",
    vendor_id: 9,
    images: ["/products/home/vacuum1.jpeg", "/products/home/vacuum2.jpeg"],
    details: {
      name: "Dyson V15 Vacuum",
      description:
        "Cordless vacuum with laser dust detection and HEPA filtration. Up to 60 minutes runtime.",
      price: 699.99,
      qty: 25,
      status: "In stock",
    },
  },
  {
    _id: 10,
    category: "toys",
    vendor_id: 10,
    images: ["/products/toys/drone1.jpeg", "/products/toys/drone2.jpeg"],
    details: {
      name: "DJI Mini Drone",
      description:
        "Lightweight drone with 4K camera, 30-minute flight time, and intelligent flight modes.",
      price: 449.99,
      qty: 20,
      status: "In stock",
    },
  },
  {
    _id: 11,
    category: "electronics",
    vendor_id: 2,
    images: [
      "/products/electronics/laptop-1.jpeg",
      "/products/electronics/laptop-2.jpeg",
    ],
    details: {
      name: "MacBook Pro 16-inch",
      description:
        "Latest M2 Pro chip, 16GB RAM, 512GB SSD, 16-inch Liquid Retina XDR display.",
      price: 2499.99,
      qty: 10,
      status: "In stock",
    },
  },
  {
    _id: 12,
    category: "clothing",
    vendor_id: 4,
    images: [
      "/products/clothing/jacket-3.jpeg",
      "/products/clothing/jacket-4.jpeg",
    ],
    details: {
      name: "Leather Biker Jacket",
      description:
        "Genuine leather motorcycle jacket with quilted lining and multiple pockets.",
      price: 299.99,
      qty: 0,
      status: "Out of stock",
    },
  },
  {
    _id: 13,
    category: "home",
    vendor_id: 9,
    images: ["/products/home/coffeemaker1.jpeg"],
    details: {
      name: "Breville Barista Express",
      description:
        "Semi-automatic espresso machine with built-in grinder and steam wand.",
      price: 699.99,
      qty: 8,
      status: "Low stock",
    },
  },
  {
    _id: 14,
    category: "beauty",
    vendor_id: 5,
    images: [
      "/products/beauty/perfume1.jpeg",
      "/products/beauty/perfume2.jpeg",
    ],
    details: {
      name: "Chanel N°5 Parfum",
      description:
        "Iconic floral aldehyde fragrance in a luxurious 100ml bottle.",
      price: 135.0,
      qty: 45,
      status: "In stock",
    },
  },
  {
    _id: 15,
    category: "sports",
    vendor_id: 6,
    images: [
      "/products/sports/bike1.jpeg",
      "/products/sports/bike2.jpeg",
      "/products/sports/bike3.jpeg",
    ],
    details: {
      name: "Trek Mountain Bike",
      description:
        "Full suspension mountain bike with hydraulic disc brakes and 27.5-inch wheels.",
      price: 1899.99,
      qty: 6,
      status: "Low stock",
    },
  },
  {
    _id: 16,
    category: "furniture",
    vendor_id: 3,
    images: [
      "/products/furniture/desk1.jpeg",
      "/products/furniture/desk2.jpeg",
    ],
    details: {
      name: "Standing Desk",
      description:
        "Electric height-adjustable desk with memory settings and cable management.",
      price: 599.99,
      qty: 30,
      status: "In stock",
    },
  },
  {
    _id: 17,
    category: "bags",
    vendor_id: 1,
    images: ["/products/bags/bag-2.jpeg", "/products/bags/bag-1.jpeg"],
    details: {
      name: "North Face Backpack",
      description:
        "Water-resistant 28L backpack with laptop compartment and ergonomic straps.",
      price: 89.99,
      qty: 50,
      status: "In stock",
    },
  },
  {
    _id: 18,
    category: "jewelry",
    vendor_id: 8,
    images: ["/products/jewelry/watch1.jpeg", "/products/jewelry/watch2.jpeg"],
    details: {
      name: "Omega Seamaster",
      description:
        "Automatic diving watch with co-axial movement and ceramic bezel.",
      price: 5200.0,
      qty: 4,
      status: "Low stock",
    },
  },
  {
    _id: 19,
    category: "toys",
    vendor_id: 10,
    images: ["/products/toys/console1.jpeg"],
    details: {
      name: "PlayStation 5",
      description:
        "Next-gen gaming console with 4K support and DualSense controller.",
      price: 499.99,
      qty: 0,
      status: "Out of stock",
    },
  },
  {
    _id: 20,
    category: "books",
    vendor_id: 7,
    images: ["/products/books/novel1.jpeg"],
    details: {
      name: "Dune Collection",
      description:
        "Complete hardcover collection of Frank Herbert's Dune series.",
      price: 99.99,
      qty: 15,
      status: "In stock",
    },
  },
  {
    _id: 21,
    category: "electronics",
    vendor_id: 2,
    images: [
      "/products/electronics/tv-1.jpeg",
      "/products/electronics/tv-2.jpeg",
    ],
    details: {
      name: "LG OLED 65-inch TV",
      description: "4K OLED TV with HDR, webOS, and AI-powered processing.",
      price: 1999.99,
      qty: 12,
      status: "In stock",
    },
  },
  {
    _id: 22,
    category: "home",
    vendor_id: 9,
    images: ["/products/home/airpurifier1.jpeg"],
    details: {
      name: "Molekule Air Purifier",
      description:
        "PECO technology air purifier with real-time air quality monitoring.",
      price: 799.99,
      qty: 25,
      status: "In stock",
    },
  },
  {
    _id: 23,
    category: "clothing",
    vendor_id: 4,
    images: [
      "/products/clothing/suit-3.jpeg",
      "/products/clothing/suit-2.jpeg",
      "/products/clothing/suit-1.jpeg",
    ],
    details: {
      name: "Italian Wool Suit",
      description: "Two-piece suit in fine Italian wool with modern fit.",
      price: 899.99,
      qty: 8,
      status: "Low stock",
    },
  },
  {
    _id: 24,
    category: "beauty",
    vendor_id: 5,
    images: [
      "/products/beauty/skincare1.jpeg",
      "/products/beauty/skincare2.jpeg",
    ],
    details: {
      name: "SK-II Essence Set",
      description:
        "Luxury skincare set featuring Facial Treatment Essence and supplements.",
      price: 199.99,
      qty: 30,
      status: "In stock",
    },
  },
  {
    _id: 25,
    category: "sports",
    vendor_id: 6,
    images: [
      "/products/sports/treadmill1.jpeg",
      "/products/sports/treadmill2.jpeg",
    ],
    details: {
      name: "Peloton Tread",
      description: "Smart treadmill with HD touchscreen and live classes.",
      price: 2495.0,
      qty: 5,
      status: "Low stock",
    },
  },
  {
    _id: 26,
    category: "furniture",
    vendor_id: 3,
    images: ["/products/furniture/bed1.jpeg", "/products/furniture/bed2.jpeg"],
    details: {
      name: "King Platform Bed",
      description:
        "Modern platform bed with integrated LED lighting and USB ports.",
      price: 1299.99,
      qty: 10,
      status: "In stock",
    },
  },
  {
    _id: 27,
    category: "bags",
    vendor_id: 1,
    images: ["/products/bags/bag-4.jpeg", "/products/bags/bag-3.jpeg"],
    details: {
      name: "Away Carry-On",
      description:
        "Smart luggage with built-in USB charger and TSA-approved lock.",
      price: 225.0,
      qty: 40,
      status: "In stock",
    },
  },
  {
    _id: 28,
    category: "jewelry",
    vendor_id: 8,
    images: ["/products/jewelry/bracelet1.jpeg"],
    details: {
      name: "Cartier Love Bracelet",
      description: "18K rose gold bracelet with signature screw motif.",
      price: 6550.0,
      qty: 3,
      status: "Low stock",
    },
  },
  {
    _id: 29,
    category: "toys",
    vendor_id: 10,
    images: ["/products/toys/robot1.jpeg", "/products/toys/robot2.jpeg"],
    details: {
      name: "Educational Robot Kit",
      description: "Programmable robot kit for STEM learning with app control.",
      price: 159.99,
      qty: 25,
      status: "In stock",
    },
  },
  {
    _id: 30,
    category: "books",
    vendor_id: 7,
    images: ["/products/books/collection1.jpeg"],
    details: {
      name: "Harry Potter Box Set",
      description:
        "Complete collection of Harry Potter books in special edition binding.",
      price: 159.99,
      qty: 20,
      status: "In stock",
    },
  },

  {
    _id: 41,
    category: "bags",
    vendor_id: 11,
    images: [
      "/products/bags/tote1.jpeg",
      "/products/bags/tote2.jpeg",
      "/products/bags/tote3.jpeg",
    ],
    details: {
      name: "Premium Leather Tote",
      description:
        "Handcrafted full-grain leather tote with brass hardware and suede lining",
      price: 299.99,
      qty: 15,
      status: "In stock",
    },
  },
  {
    _id: 42,
    category: "electronics",
    vendor_id: 12,
    images: [
      "/products/electronics/headphones1.jpeg",
      "/products/electronics/headphones2.jpeg",
    ],
    details: {
      name: "Wireless Noise-Cancelling Headphones",
      description:
        "Premium over-ear headphones with 40-hour battery life and adaptive noise cancellation",
      price: 349.99,
      qty: 30,
      status: "In stock",
    },
  },
  {
    _id: 43,
    category: "clothing",
    vendor_id: 13,
    images: [
      "/products/clothing/dress1.jpeg",
      "/products/clothing/dress2.jpeg",
      "/products/clothing/dress3.jpeg",
      "/products/clothing/dress4.jpeg",
    ],
    details: {
      name: "Floral Summer Maxi Dress",
      description:
        "Lightweight cotton blend maxi dress with vintage floral print",
      price: 89.99,
      qty: 25,
      status: "In stock",
    },
  },
  {
    _id: 44,
    category: "home_decor",
    vendor_id: 14,
    images: ["/products/home_decor/lamp1.jpeg"],
    details: {
      name: "Modern Ceramic Table Lamp",
      description:
        "Minimalist ceramic table lamp with linen shade and brass accents",
      price: 129.99,
      qty: 12,
      status: "In stock",
    },
  },
  {
    _id: 45,
    category: "beauty",
    vendor_id: 15,
    images: ["/products/beauty/serum1.jpeg", "/products/beauty/serum2.jpeg"],
    details: {
      name: "Vitamin C Brightening Serum",
      description: "Advanced formula with 20% Vitamin C and hyaluronic acid",
      price: 59.99,
      qty: 40,
      status: "In stock",
    },
  },
  {
    _id: 46,
    category: "jewelry",
    vendor_id: 11,
    images: [
      "/products/jewelry/necklace1.jpeg",
      "/products/jewelry/necklace2.jpeg",
    ],
    details: {
      name: "14K Gold Chain Necklace",
      description: "Delicate 14K gold chain with adjustable length",
      price: 299.99,
      qty: 8,
      status: "Low stock",
    },
  },
  {
    _id: 47,
    category: "sports",
    vendor_id: 16,
    images: [
      "/products/sports/yoga1.jpeg",
      "/products/sports/yoga2.jpeg",
      "/products/sports/yoga3.jpeg",
    ],
    details: {
      name: "Premium Yoga Mat",
      description: "Non-slip eco-friendly yoga mat with carrying strap",
      price: 79.99,
      qty: 35,
      status: "In stock",
    },
  },
  {
    _id: 48,
    category: "books",
    vendor_id: 17,
    images: ["/products/books/cookbook1.jpeg"],
    details: {
      name: "Farm to Table Cookbook",
      description: "200+ seasonal recipes with stunning photography",
      price: 45.99,
      qty: 20,
      status: "In stock",
    },
  },
  {
    _id: 49,
    category: "furniture",
    vendor_id: 18,
    images: [
      "/products/furniture/chair1.jpeg",
      "/products/furniture/chair2.jpeg",
    ],
    details: {
      name: "Mid-Century Accent Chair",
      description: "Upholstered accent chair with solid wood frame",
      price: 499.99,
      qty: 6,
      status: "Low stock",
    },
  },
  {
    _id: 50,
    category: "tech_accessories",
    vendor_id: 12,
    images: ["/products/tech/case1.jpeg", "/products/tech/case2.jpeg"],
    details: {
      name: "Premium Phone Case",
      description:
        "Military-grade protection with wireless charging compatibility",
      price: 39.99,
      qty: 50,
      status: "In stock",
    },
  },
  {
    _id: 51,
    category: "kitchenware",
    vendor_id: 19,
    images: [
      "/products/kitchen/pot1.jpeg",
      "/products/kitchen/pot2.jpeg",
      "/products/kitchen/pot3.jpeg",
    ],
    details: {
      name: "Enameled Dutch Oven",
      description: "6-quart enameled cast iron dutch oven in gradient blue",
      price: 249.99,
      qty: 15,
      status: "In stock",
    },
  },
  {
    _id: 52,
    category: "watches",
    vendor_id: 13,
    images: ["/products/watches/watch1.jpeg"],
    details: {
      name: "Automatic Chronograph Watch",
      description: "Swiss-made automatic movement with sapphire crystal",
      price: 1299.99,
      qty: 5,
      status: "Low stock",
    },
  },
  {
    _id: 53,
    category: "pets",
    vendor_id: 14,
    images: ["/products/pets/bed1.jpeg", "/products/pets/bed2.jpeg"],
    details: {
      name: "Orthopedic Pet Bed",
      description: "Memory foam pet bed with washable cover",
      price: 89.99,
      qty: 25,
      status: "In stock",
    },
  },
  {
    _id: 54,
    category: "art",
    vendor_id: 15,
    images: ["/products/art/print1.jpeg", "/products/art/print2.jpeg"],
    details: {
      name: "Abstract Wall Art Print",
      description: "Limited edition gallery-quality print, signed by artist",
      price: 199.99,
      qty: 10,
      status: "In stock",
    },
  },
  {
    _id: 55,
    category: "outdoor",
    vendor_id: 16,
    images: [
      "/products/outdoor/hammock1.jpeg",
      "/products/outdoor/hammock2.jpeg",
    ],
    details: {
      name: "Double Camping Hammock",
      description: "Portable nylon hammock with tree straps",
      price: 79.99,
      qty: 30,
      status: "In stock",
    },
  },
  {
    _id: 56,
    category: "stationery",
    vendor_id: 17,
    images: [
      "/products/stationery/planner1.jpeg",
      "/products/stationery/planner2.jpeg",
      "/products/stationery/planner3.jpeg",
    ],
    details: {
      name: "Leather-Bound Planner",
      description: "2025 daily planner with gold foil details",
      price: 49.99,
      qty: 40,
      status: "In stock",
    },
  },
  {
    _id: 57,
    category: "shoes",
    vendor_id: 18,
    images: ["/products/shoes/sneaker1.jpeg", "/products/shoes/sneaker2.jpeg"],
    details: {
      name: "Premium Running Shoes",
      description: "Lightweight performance shoes with responsive cushioning",
      price: 159.99,
      qty: 20,
      status: "In stock",
    },
  },
  {
    _id: 58,
    category: "bags",
    vendor_id: 19,
    images: ["/products/bags/backpack1.jpeg", "/products/bags/backpack2.jpeg"],
    details: {
      name: "Travel Backpack",
      description: "Water-resistant backpack with laptop compartment",
      price: 129.99,
      qty: 25,
      status: "In stock",
    },
  },
  {
    _id: 59,
    category: "electronics",
    vendor_id: 11,
    images: [
      "/products/electronics/speaker1.jpeg",
      "/products/electronics/speaker2.jpeg",
    ],
    details: {
      name: "Portable Bluetooth Speaker",
      description: "Waterproof speaker with 24-hour battery life",
      price: 199.99,
      qty: 15,
      status: "In stock",
    },
  },
  {
    _id: 60,
    category: "clothing",
    vendor_id: 12,
    images: [
      "/products/clothing/jacket1.jpeg",
      "/products/clothing/jacket2.jpeg",
      "/products/clothing/jacket3.jpeg",
    ],
    details: {
      name: "Leather Bomber Jacket",
      description: "Classic leather jacket with quilted lining",
      price: 399.99,
      qty: 10,
      status: "In stock",
    },
  },
  {
    _id: 61,
    category: "home_decor",
    vendor_id: 13,
    images: ["/products/home_decor/vase1.jpeg"],
    details: {
      name: "Handcrafted Ceramic Vase",
      description: "Artisanal ceramic vase with unique glaze finish",
      price: 89.99,
      qty: 15,
      status: "In stock",
    },
  },
  {
    _id: 62,
    category: "beauty",
    vendor_id: 14,
    images: [
      "/products/beauty/palette1.jpeg",
      "/products/beauty/palette2.jpeg",
    ],
    details: {
      name: "Luxury Eyeshadow Palette",
      description: "18 highly pigmented matte and shimmer shades",
      price: 65.99,
      qty: 30,
      status: "In stock",
    },
  },
  {
    _id: 63,
    category: "jewelry",
    vendor_id: 15,
    images: [
      "/products/jewelry/earrings1.jpeg",
      "/products/jewelry/earrings2.jpeg",
    ],
    details: {
      name: "Pearl Drop Earrings",
      description: "Freshwater pearl earrings with sterling silver",
      price: 129.99,
      qty: 12,
      status: "In stock",
    },
  },
  {
    _id: 64,
    category: "sports",
    vendor_id: 16,
    images: [
      "/products/sports/weights1.jpeg",
      "/products/sports/weights2.jpeg",
    ],
    details: {
      name: "Adjustable Dumbbell Set",
      description: "5-50 lb adjustable dumbbells with stand",
      price: 399.99,
      qty: 8,
      status: "Low stock",
    },
  },
  {
    _id: 65,
    category: "books",
    vendor_id: 17,
    images: ["/products/books/journal1.jpeg"],
    details: {
      name: "Leather Journal Set",
      description: "Handmade leather journal with premium paper",
      price: 59.99,
      qty: 20,
      status: "In stock",
    },
  },
  {
    _id: 66,
    category: "furniture",
    vendor_id: 18,
    images: [
      "/products/furniture/table1.jpeg",
      "/products/furniture/table2.jpeg",
      "/products/furniture/table3.jpeg",
    ],
    details: {
      name: "Industrial Coffee Table",
      description: "Reclaimed wood and steel coffee table",
      price: 349.99,
      qty: 6,
      status: "Low stock",
    },
  },
  {
    _id: 67,
    category: "tech_accessories",
    vendor_id: 19,
    images: ["/products/tech/charger1.jpeg"],
    details: {
      name: "Wireless Charging Station",
      description: "3-in-1 charging station for phone, watch, and earbuds",
      price: 79.99,
      qty: 40,
      status: "In stock",
    },
  },
  {
    _id: 68,
    category: "kitchenware",
    vendor_id: 11,
    images: ["/products/kitchen/mixer1.jpeg", "/products/kitchen/mixer2.jpeg"],
    details: {
      name: "Professional Stand Mixer",
      description: "500W stand mixer with 5qt stainless steel bowl",
      price: 449.99,
      qty: 10,
      status: "In stock",
    },
  },
  {
    _id: 69,
    category: "watches",
    vendor_id: 12,
    images: ["/products/watches/smart1.jpeg", "/products/watches/smart2.jpeg"],
    details: {
      name: "Smart Fitness Watch",
      description: "Advanced fitness tracking with GPS and heart monitoring",
      price: 299.99,
      qty: 25,
      status: "In stock",
    },
  },
  {
    _id: 70,
    category: "pets",
    vendor_id: 13,
    images: [
      "/products/pets/carrier1.jpeg",
      "/products/pets/carrier2.jpeg",
      "/products/pets/carrier3.jpeg",
    ],
    details: {
      name: "Luxury Pet Carrier",
      description: "Airline-approved pet carrier with memory foam padding",
      price: 149.99,
      qty: 15,
      status: "In stock",
    },
  },
  {
    _id: 71,
    category: "art",
    vendor_id: 14,
    images: ["/products/art/sculpture1.jpeg"],
    details: {
      name: "Modern Metal Sculpture",
      description: "Abstract metal sculpture with marble base",
      price: 299.99,
      qty: 5,
      status: "Low stock",
    },
  },
];

export default vendorProducts;
