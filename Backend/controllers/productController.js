import { v2 as cloudinary } from "cloudinary";
import Product from "../models/Product.js";

//addProducts
export const addProduct = async (req, res) => {
  try {
    let productData = JSON.parse(req.body.productData);

    // Ensure description is an array of non-empty strings
    let description = Array.isArray(productData.desc)
      ? productData.desc.filter((d) => d && d.trim())
      : (typeof productData.desc === 'string' && productData.desc.trim() ? [productData.desc.trim()] : []);

    // Ensure category is an array (from select)
    let category = [];
    if (Array.isArray(productData.cat)) {
      category = productData.cat.filter((c) => c && c.trim());
    } else if (typeof productData.cat === 'string' && productData.cat.trim()) {
      category = [productData.cat.trim()];
    }

    // Handle images
    const images = req.files || [];
    let imagesUrl = [];
    if (images.length > 0) {
      imagesUrl = await Promise.all(
        images.map(async (item) => {
          let result = await cloudinary.uploader.upload(item.path, {
            resource_type: "image",
          });
          return result.secure_url;
        })
      );
    }

    await Product.create({
      name: productData.name,
      description,
      price: productData.price,
      offerPrice: productData.offerPrice,
      image: imagesUrl,
      category,
      inStock: true,
    });

    res.json({ success: true, message: "Product Added" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

//getproduct

export const productList = async (req, res) => {
  try {
    const products = await Product.find({});
    res.json({ success: true, products });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

//getProductSingle

export const productById = async (req, res) => {
  try {
    const { id } = req.body;
    const product = await Product.findById(id);
    res.json({ success: true, product });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

//changeStock
export const changeStock = async (req, res) => {
  try {
    const { id, inStock } = req.body;
    await Product.findByIdAndUpdate(id, { inStock });
    res.json({ success: true, message: "Stock Updated" });
  } catch (error) {
    console.log(error.message)
    res.json({success:false,message:error.message})
  }
};

