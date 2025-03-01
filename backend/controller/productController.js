import {sql} from "../config/db.js"; // Import the sql variable from the db module
export const getProducts = async(req,res)=>{
    try{
       const products = await sql`SELECT * FROM products
        ORDER BY created_at DESC;
        `;
        console.log( "fetched products",products);
        res.status(200).json({success:true,data:products});
    }
    catch(e){
        console.error('Database connection failed', e);
        res.status(500).json({success:false,message:"internal server error"});
    }
}

export const createProduct = async(req,res)=>{
   const {name,price,image}=req.body;
   if(!name || !price || !image){
    return res.status(400).json({success:false,message:"please provide name,price and image"});
   }
   try {
        const newProduct= await sql`INSERT INTO products (name, price, image) VALUES (${name}, ${price}, ${image})
        RETURNING *`; // Insert the product into the products table
        console.log('Product created successfully',newProduct);
        res.status(201).json({success:true,data:newProduct[0]});
   } catch (error) {
       console.error('error in creation of product', error);
       res.status(500).json({success:false,message:"internal server error"});
   }
}

export const getProduct = async (req, res) => {
    const { id } = req.params;
    try {
        const product = await sql`
            SELECT * FROM products WHERE id = ${id}
        `;

        if (product.length === 0) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }

        res.status(200).json({ success: true, product });
    } catch (error) {
        console.log('Error in fetching product:', error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};


export const updateProduct = async (req, res) => {
    const { id } = req.params;
    const { name, price, image } = req.body;
    try {
        // Execute the update query and get the updated product
        const updateProduct = await sql`
            UPDATE products 
            SET name = ${name}, price = ${price}, image = ${image} 
            WHERE id = ${id}
            RETURNING *`;

        // Check if the product was found and updated
        if (updateProduct.length === 0) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }

        // Send the updated product data in the response
        res.status(200).json({ success: true, data: updateProduct[0] });

    } catch (error) {
        // Log the error and send an internal server error response
        console.log("Error updating product:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};



export const deleteProduct = async (req, res) => {
    const { id } = req.params;
    try {
        const deleteProduct = await sql`
            DELETE FROM products WHERE id = ${id} RETURNING *`;
        
        if (deleteProduct.length === 0) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }
        
        // Since the product is deleted, the result will be in deleteProduct[0]
        res.status(200).json({ success: true, data: deleteProduct[0] });

    } catch (error) {
        console.log("Product is not deleted", error);
        res.status(400).json({ success: false, message: "Internal server error" });
    }
};


export const createUser = async (req, res) => {
    const {courseName,coursePrice, firstName, lastName, idNumber, phoneNumber } = req.body;

    // Check if required fields are present
    if (!courseName|| !coursePrice || !firstName || !lastName || !idNumber || !phoneNumber) {
        return res.status(400).json({ success: false, message: "Please provide all required fields (firstName, lastName, idNumber, phoneNumber)" });
    }

    try {
        // Insert the user into the 'users' table (adjust table name and columns if needed)
        const newUser = await sql`
            INSERT INTO userdata (courseName,coursePrice,firstName, lastName, idNumber, phoneNumber) 
            VALUES (${courseName},${coursePrice},${firstName}, ${lastName}, ${idNumber}, ${phoneNumber}) 
            RETURNING *;
        `;
        
        console.log('User created successfully:', newUser);
        res.status(201).json({ success: true, data: newUser[0] });
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
}
