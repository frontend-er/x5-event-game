import { AnimatePresence, motion } from "framer-motion";
import React, { useState, useRef } from "react";

const ROW_TYPES = {
  drinks: {
    title: "Напитки",
    bgImage: "/images/product-bg.png",
    productImage: "/images/products/",
    cartImage: "/images/products/",
    products: ["water-1", "water-2", "water-3", "water-4", "water-5"],
  },
  fruits: {
    title: "Овощи и фрукты",
    bgImage: "/images/product-bg.png",
    productImage: "/images/products/",
    cartImage: "/images/products/",
    products: ["fruits-1", "fruits-2", "fruits-3", "fruits-4"],
  },
  snacks: {
    title: "Закуски",
    bgImage: "/images/product-bg.png",
    productImage: "/images/products/",
    cartImage: "/images/products/",
    products: ["snacks-1", "snacks-2", "snacks-3", "snacks-4"],
  },
};

const rowAnimation = {
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export const ProductRow = ({ type, cartRef, handleProductGameClick }) => {
  const rowData = ROW_TYPES[type];

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [productPosition, setProductPosition] = useState({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  });
  const [isAddedToCart, setIsAddedToCart] = useState(false);

  const handleProductClick = (e, productId) => {
    e.preventDefault();
    const rect = e.target.getBoundingClientRect();

    setProductPosition({
      x: rect.x,
      y: rect.y,
      width: rect.width,
      height: rect.height,
    });
    setSelectedProduct(productId);
    setIsAddedToCart(true);
    handleProductGameClick(productId)

    setTimeout(() => setIsAddedToCart(false), 500);
  };

  return (
    <motion.div variants={rowAnimation} initial="hidden" animate="visible">
      <div className="bg-black/50 flex flex-col items-start text-left w-full">
        {/* Header */}
        <div className="bg-gray-500 min-w-screen flex flex-row items-center gap-10 p-2">
          <div className="text-xl font-bold">{rowData.title}</div>
        </div>

        {/* Product Container */}
        <div className="relative w-full h-[100px]">
          <img
            className="w-full h-[85px] z-2"
            src={rowData.bgImage}
            alt="Background"
          />

          {/* Product List */}
          <div className="product-list flex absolute bottom-0 flex-row gap-4 w-full px-5 z-10">
            {rowData.products.map((productId, key) => (
              <div key={productId} className="relative">
                <div className="product relative cursor-pointer">
                  <img
                    onClick={(e) => handleProductClick(e, productId)}
                    className="w-full h-[90px]"
                    src={rowData.productImage + productId + "-all.png"}
                
                    alt=""
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Bar */}
          <img
            className="w-full h-[30px] absolute bottom-0 z-10"
            src="/images/product-bar.png"
            alt="Background"
          />
        </div>
      </div>
      {rowData.products.map((productId, key) => (
        <AnimatePresence>
          {isAddedToCart && selectedProduct === productId && (
            <motion.img
              src={`${rowData.cartImage}${productId}.png`}
              initial={{
                x: productPosition.x - 60,
                y: productPosition.y,
                scale: 0.5,
              }}
              animate={{
                x:
                  cartRef.current?.getBoundingClientRect().x -10,
                y: cartRef.current?.getBoundingClientRect().y - 40,
                scale: 0.5,
              }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="absolute z-30"
              style={{
                left: 20,
                top: 20,
                zIndex: 30,
                scale: 0.5,
              }}
            />
          )}
        </AnimatePresence>
      ))}
    </motion.div>
  );
};
