import React from "react";

export const products = [
  {
    categories: {
      casualWear: [
        {
          title: "Plaid Flannel Shirt",
          price: 25.0,
          description:
            "Classic plaid flannel shirt for a comfortable, casual look.",
          image: require("../assets/Casual/asset 12.jpeg"),
        },
        {
          title: "Basic White T-Shirt",
          price: 15.0,
          description:
            "Soft cotton t-shirt, perfect for layering or wearing alone.",
          image: require("../assets/Casual/asset 13.jpeg"),
        },
        {
          title: "Denim Jeans",
          price: 40.0,
          description:
            "Durable denim jeans with a straight-leg fit, ideal for everyday wear.",
          image: require("../assets/Casual/asset 14.jpeg"),
        },
        {
          title: "Cotton Polo Shirt",
          price: 30.0,
          description:
            "Versatile cotton polo shirt with a relaxed fit and soft texture.",
          image: require("../assets/Casual/asset 19.jpeg"),
        },
        {
          title: "Hooded Sweatshirt",
          price: 35.0,
          description:
            "Cozy hooded sweatshirt, great for a laid-back weekend style.",
          image: require("../assets/Casual/asset 20.jpeg"),
        },
        {
          title: "Graphic Tee",
          price: 20.0,
          description:
            "Trendy graphic t-shirt that adds personality to any casual outfit.",
          image: require("../assets/Casual/asset 22.jpeg"),
        },
        {
          title: "Chino Pants",
          price: 45.0,
          description:
            "Stylish chino pants with a tailored fit, perfect for casual Fridays.",
          image: require("../assets/Casual/asset 21.jpeg"),
        },
        {
          title: "Crewneck Sweater",
          price: 50.0,
          description:
            "Comfortable crewneck sweater, a versatile piece for cooler days.",
          image: require("../assets/Casual/asset 23.jpeg"),
        },
        {
          title: "Canvas Sneakers",
          price: 60.0,
          description:
            "Lightweight canvas sneakers that complement any casual look.",
          image: require("../assets/Casual/asset 27.jpeg"),
        },
        {
          title: "Casual Shorts",
          price: 25.0,
          description:
            "Relaxed-fit shorts with side pockets, ideal for warm-weather days.",
          image: require("../assets/Casual/asset 28.jpeg"),
        },
      ],
      westernWear: [
        {
          title: "Cowboy Hat",
          price: 50.0,
          description:
            "Traditional cowboy hat with a wide brim and classic design.",
          image: require("../assets/Western/asset 10.jpeg"),
        },
        {
          title: "Western Denim Jacket",
          price: 70.0,
          description:
            "Rugged denim jacket with western-style stitching and button-up front.",
          image: require("../assets/Western/asset 34.jpeg"),
        },
        {
          title: "Plaid Western Shirt",
          price: 40.0,
          description:
            "Authentic plaid shirt with snap buttons and a Western flair.",
          image: require("../assets/Western/asset 11.jpeg"),
        },
        {
          title: "Leather Cowboy Boots",
          price: 150.0,
          description:
            "Premium leather cowboy boots with intricate stitching and durable soles.",
          image: require("../assets/Western/asset 12.jpeg"),
        },
        {
          title: "Fringe Suede Vest",
          price: 60.0,
          description:
            "Soft suede vest with fringe details, perfect for layering over a shirt.",
          image: require("../assets/Western/asset 13.jpeg"),
        },
        {
          title: "Bootcut Jeans",
          price: 55.0,
          description:
            "Classic bootcut jeans with a slight flare, ideal for wearing with boots.",
          image: require("../assets/Western/asset 14.jpeg"),
        },
        {
          title: "Western Belt with Buckle",
          price: 35.0,
          description:
            "Leather belt with an ornate western-style buckle for a bold statement.",
          image: require("../assets/Western/asset 15.jpeg"),
        },
        {
          title: "Bandana Scarf",
          price: 15.0,
          description:
            "Classic bandana scarf that adds a Western touch to any outfit.",
          image: require("../assets/Western/asset 16.jpeg"),
        },
        {
          title: "Rodeo Shirt",
          price: 45.0,
          description:
            "Embroidered rodeo shirt with a bold design and snap closures.",
          image: require("../assets/Western/asset 17.jpeg"),
        },
        {
          title: "Western Skirt",
          price: 50.0,
          description:
            "Flowing Western skirt with a high waist and detailed stitching.",
          image: require("../assets/Western/asset 9.jpeg"),
        },
      ],
      kidsWear: [
        {
          title: "Graphic T-Shirt",
          price: 12.0,
          description:
            "Fun and colorful graphic t-shirt made from soft, breathable cotton.",
          image: require("../assets/Kids/asset 11.jpeg"),
        },
        {
          title: "Denim Overalls",
          price: 25.0,
          description:
            "Classic denim overalls with adjustable straps, perfect for playtime.",
          image: require("../assets/Kids/asset 12.jpeg"),
        },
        {
          title: "Kids Hoodie",
          price: 20.0,
          description:
            "Cozy hoodie with a fun print, keeping kids warm and stylish.",
          image: require("../assets/Kids/asset 23.jpeg"),
        },
        {
          title: "Cartoon Pajamas",
          price: 18.0,
          description:
            "Comfortable pajamas featuring their favorite cartoon characters.",
          image: require("../assets/Kids/asset 24.jpeg"),
        },
        {
          title: "Floral Dress",
          price: 30.0,
          description:
            "Adorable floral dress with a twirl-worthy skirt, ideal for special occasions.",
          image: require("../assets/Kids/asset 25.jpeg"),
        },
        {
          title: "Cargo Shorts",
          price: 15.0,
          description:
            "Durable cargo shorts with plenty of pockets for all their treasures.",
          image: require("../assets/Kids/asset 26.jpeg"),
        },
        {
          title: "Rain Jacket",
          price: 35.0,
          description:
            "Waterproof rain jacket with a hood, keeping kids dry during rainy days.",
          image: require("../assets/Kids/asset 27.jpeg"),
        },
        {
          title: "Striped Polo",
          price: 18.0,
          description:
            "Classic striped polo shirt, perfect for casual or semi-formal wear.",
          image: require("../assets/Kids/asset 28.jpeg"),
        },
        {
          title: "Kids Sneakers",
          price: 30.0,
          description:
            "Lightweight and durable sneakers designed for active kids.",
          image: require("../assets/Kids/asset 29.jpeg"),
        },
        {
          title: "Sun Hat",
          price: 10.0,
          description:
            "Wide-brim sun hat providing UV protection during outdoor adventures.",
          image: require("../assets/Kids/asset 43.jpeg"),
        },
      ],
      ethnicWear: [
        {
          title: "Embroidered Kurta",
          price: 40.0,
          description:
            "Elegant kurta with intricate embroidery, perfect for festive occasions.",
          image: require("../assets/Ethenic/asset 15.jpeg"),
        },
        {
          title: "Saree with Blouse",
          price: 70.0,
          description:
            "Beautiful saree paired with a matching blouse, a timeless ethnic piece.",
          image: require("../assets/Ethenic/asset 16.jpeg"),
        },
        {
          title: "Anarkali Dress",
          price: 80.0,
          description:
            "Flared Anarkali dress with detailed work, ideal for celebrations.",
          image: require("../assets/Ethenic/asset 17.jpeg"),
        },
        {
          title: "Silk Dhoti",
          price: 50.0,
          description:
            "Traditional silk dhoti with a contemporary twist, comfortable and stylish.",
          image: require("../assets/Ethenic/asset 18.jpeg"),
        },
        {
          title: "Lehenga Choli",
          price: 90.0,
          description:
            "Stunning lehenga choli with intricate patterns, perfect for weddings.",
          image: require("../assets/Ethenic/asset 19.jpeg"),
        },
        {
          title: "Pathani Suit",
          price: 60.0,
          description:
            "Classic Pathani suit with a modern cut, suitable for cultural events.",
          image: require("../assets/Ethenic/asset 28.jpeg"),
        },
        {
          title: "Men’s Sherwani",
          price: 120.0,
          description:
            "Royal sherwani with detailed embroidery, perfect for grand celebrations.",
          image: require("../assets/Ethenic/asset 29.jpeg"),
        },
        {
          title: "Churidar Leggings",
          price: 25.0,
          description:
            "Comfortable churidar leggings, essential for pairing with kurtas.",
          image: require("../assets/Ethenic/asset 30.jpeg"),
        },
        {
          title: "Embroidered Dupatta",
          price: 30.0,
          description:
            "Gorgeous embroidered dupatta, adding grace to any ethnic outfit.",
          image: require("../assets/Ethenic/asset 31.jpeg"),
        },
        {
          title: "Jutti Shoes",
          price: 35.0,
          description:
            "Traditional jutti shoes with intricate beadwork, perfect for ethnic attire.",
          image: require("../assets/Ethenic/asset 32.jpeg"),
        },
      ],
    },
  },
];
