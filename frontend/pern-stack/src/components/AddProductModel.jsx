import React,{useState} from 'react';
import { useProductStore } from '../store/useProductstore';

const AddProductModel = ({setOpen}) => {
  const { addProduct, formData, setFormData } = useProductStore();
  const {value,setValue}=useState(true);
  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
      {/* Modal Container */}
      <div className="bg-white p-8 rounded-lg shadow-xl relative w-11/12 max-w-lg">
        {/* Close Button */}
        <button
          className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          onClick={() => setOpen(false) } // Close the modal by setting open to false
          disabled={!formData.name && !formData.price && formData.image}
        >
          X
        </button>
        
        {/* Modal Content */}
        <h3 className="font-bold text-xl mb-8">Add a new Course</h3>
        <form onSubmit={addProduct} className="space-y-6">
          <div className="grid gap-6">
            {/* Product Name Input */}
            <div className="form-control">
              <label className="label">
                <span className="label-text text-base font-medium">Add course Name</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Enter course Name"
                  className="input input-bordered w-full pl-10 py-3 focus:input-primary transition-colors duration-200"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
            </div>
            {/* Product Price */}
            <div className="form-control">
              <label className="label">
                <span className="label-text text-base font-medium">Price</span>
              </label>
              <div className="relative">
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  placeholder="0.00"
                  className="input input-bordered w-full pl-10 py-3 focus:input-primary transition-colors duration-200"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                />
              </div>
            </div>
            {/* Product Image */}
            <div className="form-control">
              <label className="label">
                <span className="label-text text-base font-medium">Product Image</span>
              </label>
              <div className="relative">
                <input
                  type="file"
                  accept="image/*"
                  // type='text'
                  // placeholder='Enter image link'
                  className="input input-bordered w-full pl-10 py-3 focus:input-primary transition-colors duration-200"
                  onChange={(e) => setFormData({ ...formData, image: e.target.files[0] })}
                />
              </div>
            </div>
          </div>
           <button type="submit" className="btn btn-primary mt-4"  >
            Add Product
          </button>
        

        </form>
      </div>
    </div>
  );
};

export default AddProductModel;
