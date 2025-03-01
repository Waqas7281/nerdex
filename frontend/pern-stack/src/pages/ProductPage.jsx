import { useState, useEffect } from 'react';
import { useParams,useNavigate } from 'react-router-dom';
import { useProductStore } from '../store/useProductstore';

const ProductPage = () => {
  const [enter , setEnter] = useState(false);
  const nevigate=useNavigate();
  const { id } = useParams(); // Capture product ID from URL
  const { fetchProduct, currentProduct, setStudentData, addStudent } = useProductStore(); // Fetch product and store current product
  const [userInput, setUserInput] = useState({
    firstName: '',
    lastName: '',
    idNumber: '',
    phoneNumber: '',
  });
  console.log(userInput);
  const [errors, setErrors] = useState({
    idNumber: '',
    phoneNumber: '',
  });

  // Fetch product details when component mounts or when `id` changes
  useEffect(() => {
    fetchProduct(id); // Fetch product based on the ID in the URL
  }, [fetchProduct, id]);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserInput((prevState) => ({
      ...prevState,
      [name]: value,
      courseName: product.name,
      coursePrice: product.price,
    }));

  };
  const handelBlank=()=>{
   setTimeout(()=> setUserInput({
    firstName: '',
    lastName: '',
    idNumber: '',
    phoneNumber: '',
  }),3000)
  if(enter === true)
  {
    setTimeout(()=>{
      nevigate('/')
    },3000)
  }
  }
  
  // Validate ID card number (Pakistani CNIC)
  const validateID = (id) => {
    const regex = /^[1-9][0-9]{4}-[0-9]{7}-[0-9]$/; // Example CNIC format
    return regex.test(id);
  };

  // Validate phone number (Pakistani phone numbers)
  const validatePhone = (phone) => {
    const regex = /^(\+92|92|0)?3[0-9]{9}$/; // Example Pakistani phone number
    return regex.test(phone);
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate fields
    const idValid = validateID(userInput.idNumber);
    const phoneValid = validatePhone(userInput.phoneNumber);

    if (!idValid) {
      setErrors((prev) => ({ ...prev, idNumber: 'Invalid ID Card number.' }));
    } else {
      setErrors((prev) => ({ ...prev, idNumber: '' }));
    }

    if (!phoneValid) {
      setErrors((prev) => ({ ...prev, phoneNumber: 'Invalid phone number.' }));
    } else {
      setErrors((prev) => ({ ...prev, phoneNumber: '' }));
    }

    // If everything is valid, log the input data
    if (idValid && phoneValid) {
      console.log('User Input:', userInput);

      // First, set the student data in Zustand store
      setStudentData(userInput);

      // Then, add the student data to the store (API call or local storage operation can be done in addStudent)
      addStudent(userInput); // Store the data
      setEnter(true);
    }
  };

  // If product details are still loading, show a loading state
  if (!currentProduct || !currentProduct.product || !currentProduct.product.length) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  // Get the product from the currentProduct data
  const product = currentProduct.product[0];

  // Render product details once data is fetched
  return (
    <div className="container mx-auto p-6">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="md:flex">
          <div className="md:w-1/2">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="md:w-1/2 p-6">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">{product.name}</h1>
            <p className="text-xl text-gray-600 mb-4">Price: {Number(product.price).toFixed(2)}</p>
            <p className="text-gray-700 mb-6">{product.description}</p>

            <div className="user-input-form">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Enter Your Details</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                    First Name
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={userInput.firstName}
                    onChange={handleInputChange}
                    placeholder="Enter your first name"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                    Last Name
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={userInput.lastName}
                    onChange={handleInputChange}
                    placeholder="Enter your last name"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="idNumber" className="block text-sm font-medium text-gray-700">
                    ID Number (CNIC)
                  </label>
                  <input
                    type="text"
                    id="idNumber"
                    name="idNumber"
                    value={userInput.idNumber}
                    onChange={handleInputChange}
                    placeholder="Enter your ID number"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    required
                  />
                  {errors.idNumber && <p className="text-red-500 text-sm mt-1">{errors.idNumber}</p>}
                </div>

                <div>
                  <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">
                    Phone Number
                  </label>
                  <input
                    type="text"
                    id="phoneNumber"
                    name="phoneNumber"
                    value={userInput.phoneNumber}
                    onChange={handleInputChange}
                    placeholder="Enter your phone number"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    required
                  />
                  {errors.phoneNumber && <p className="text-red-500 text-sm mt-1">{errors.phoneNumber}</p>}
                </div>

                <button
                  type="submit"
                  className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  onClick={handelBlank}>
                  Save Details
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
