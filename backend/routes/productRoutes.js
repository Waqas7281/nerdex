import express from 'express';
import { getProducts,createProduct,getProduct,updateProduct ,deleteProduct, createUser} from '../controller/productController.js';

const router=express.Router();

router.get('/',getProducts
    //get all products
);

router.get(`/:id`,getProduct
    //get all products
);

router.post('/',createProduct
    //create a product  
);

router.post('/user',createUser)

router.put('/:id',updateProduct)

router.delete('/:id',deleteProduct)

export default router;