import { Link } from 'react-router-dom';

const ProductCard = ({ pro }) => {
  return (
    <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow duration-300 bottom-4">
      <figure className="relative pt-[56.25%]">
        <img 
          src={pro.image} 
          alt={pro.name} 
          className="absolute top-0 left-0 w-full h-full object-cover" 
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title text-lg font-semibold">{pro.name}</h2>
        <p className="text-2xl font-bold text-primary">${Number(pro.price).toFixed(2)}</p>

        <div className="card-action justify-end mt-4">
        <Link to={`/product/${pro.id}`
        } className="btn btn-sm btn-info btn-outline">
  View Details
</Link>

        </div>
      </div>
    </div>
  );
};

export default ProductCard;
