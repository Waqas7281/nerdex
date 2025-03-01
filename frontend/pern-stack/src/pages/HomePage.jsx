import React, { useState, useEffect } from 'react';
import { useProductStore } from '../store/useProductstore';
import ProductCard from '../pages/ProductCard';
import Footer from '../components/Footer';
// import AddProductModel from '../components/AddProductModel';

function HomePage() {
  const { product, loading, error, fetchProducts } = useProductStore();
  const [open, setOpen] = useState(false); // Initial state is false to keep the modal closed by default

  // Fetch products on component mount
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  // Loading state
  const renderLoadingState = () => (
    <div className="flex justify-center items-center h-64">
      <div className="loading loading-spinner loading-lg"></div>
    </div>
  );

  // Error state
  const renderErrorState = () => (
    <div className="alert alert-error mb-8">
      <span>{error}</span> {/* Displaying the error message */}
    </div>
  );

  // Empty product state
  const renderEmptyProducts = () => (
    <h1 className="flex items-center justify-center">Product not found</h1>
  );

  // Render products
  const renderProductList = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {product.map((pro) => (
        <ProductCard key={pro.id} pro={pro} />
      ))}
    </div>
  );

  // Handle the "Add a Product" button click to open the modal
  const handleAddProductClick = () => {
    setOpen(true); // This will set the modal to open
  };

  return (
    <main className="mx-auto px-4 py-8 max-w-6xl">
      <div className="flex justify-between items-center mb-8">
        {/* <button className="btn btn-primary" onClick={handleAddProductClick}>
          Add a Product
        </button> */}
        
        {/* Render the AddProductModel when open is true */}
        {/* {open && <AddProductModel setOpen={setOpen} />}  */}

        <button className="btn btn-primary" onClick={fetchProducts}>
          Refresh
        </button>
      </div>

      {error && renderErrorState()}

      {loading ? renderLoadingState() : product.length === 0 ? renderEmptyProducts() : renderProductList()}
      <Footer />
    </main>
  );
}

export default HomePage;
