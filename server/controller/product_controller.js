const Product = require("../db/productdb");
const cloudinary = require("cloudinary").v2;

// ---------------- CLOUDINARY SETUP ----------------
cloudinary.config({
  cloud_name: "cvhskhisl",
  api_key: "546846535879187",
  api_secret: "vGHDJASUHLI565365SFDGSDFG",
});

module.exports = {
  // --------------------------------------------------
  // ADD PRODUCT (CREATE)
  // --------------------------------------------------
  async addproduct(req, res) {
    try {
      let imageURL = "";

      // FIX 1: Check for the file using the frontend key 'pimage'
      if (req.files && req.files.pimage) {
        const file = req.files.pimage;

        // Upload to Cloudinary
        const upload = await cloudinary.uploader.upload(file.tempFilePath, {
          folder: "products",
        });

        imageURL = upload.secure_url;
      }

      // Create product entry
      const newProduct = await Product.create({
        pname: req.body.pname,
        pprice: req.body.pprice,
        // FIX 2: Save description to the correct schema field
        description: req.body.description, 
        // FIX 3: Save image URL to the correct schema field
        pimage: imageURL, 
        stock: req.body.stock ?? 10,
        category: req.body.category ?? "General",
      });

      res.json({ msg: "Product Added", product: newProduct });
    } catch (error) {
      console.error("Error adding product:", error);
      res.status(500).json({ msg: "Failed to add product" });
    }
  },

  // --------------------------------------------------
  // GET SINGLE PRODUCT BY ID (READ ONE)
  // --------------------------------------------------
  async getproductbyid(req, res) {
    try {
        const id = req.params.id;
        const product = await Product.findById(id);
        if (!product) return res.status(404).json({ msg: "Product not found" });

        // FIX 4: Fields now match schema/frontend directly (no manual mapping needed if schema is fixed)
        res.json(product);
    } catch (error) {
        console.error("Error fetching product by ID:", error);
        res.status(500).json({ msg: "Failed to fetch product" });
    }
  },

  // --------------------------------------------------
  // GET ALL PRODUCTS (READ ALL)
  // --------------------------------------------------
  async selproduct(req, res) {
    try {
      let products = await Product.find();

      // Seed demo products if DB empty (Keep the old naming in demoProducts for seeding)
      if (products.length === 0) {
        const demoProducts = [
          {
            pname: "Traditional Dokra Art", pprice: 1299.99,
            // NOTE: The fields here must match your current (or fixed) SCHEMA!
            description: "Handcrafted Dokra metal art from local artisans of Jhargram", 
            pimage: "https://images.unsplash.com/photo-1702570912952-c115426533d2?q=80&w=1075&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            category: "Handicrafts", stock: 8,
          },

          {
            pname: "Tribal Painting",
            pprice: 899.99,
            description: "Authentic tribal artwork showcasing local culture",
            pimage: "https://images.unsplash.com/photo-1739997699581-6c0f4eccb257?q=80&w=1091&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            category: "Art",
            stock: 12,
          },

          {
            pname: "Terracotta Pottery",
            pprice: 599.99,
            description: "Traditional terracotta pottery handmade by local craftsmen",
            pimage: "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=500",
            category: "Pottery",
            stock: 15,
          },

          {

            pname: "Bamboo Handicraft",
            pprice: 449.99,
            description: "Eco-friendly bamboo products crafted with traditional techniques",
            pimage: "https://images.unsplash.com/photo-1679958854536-a1bb774ef8ab?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            category: "Handicrafts",
            stock: 20,
          },

          {
            pname: "Handwoven Saree",
            pprice: 2499.99,
            description: "Beautiful handwoven saree with traditional Jhargram designs",
            pimage: "https://images.unsplash.com/photo-1610030468706-9a6dbad49b0a?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            category: "Textiles",
            stock: 5,
          },

          {
            pname: "Stone Sculpture",
            pprice: 1799.99,
            description: "Intricately carved stone sculpture by local artists",
            pimage: "https://images.unsplash.com/photo-1672600954433-6c499d6483b1?q=80&w=735&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            category: "Sculpture",
            stock: 7,
          },

          {
            pname: "Dhokra Metal Art",
            pprice: 900.00,
            description: "Intricate metal work, centuries-old lost-wax casting technique.",
            pimage: "https://images.unsplash.com/photo-1652164726284-2e82259cddfc?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            category: "Art",
            stock: 7,
          },

          {
            pname:"Handmade Jewellery",
            pprice:350.00,
            description: "Finely crafted tribal and traditional jewellery made with beads and thread.",
            pimage:"https://images.unsplash.com/photo-1757140448109-2f9c9f59ab7a?q=80&w=764&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            category: "Jewellery",
            stock: 25,
          },

          {
            pname:"Slate and Stone Art",
            pprice: 500.00,
            description: "Intricately carved slate showpieces and functional items, reflecting local artistry.",
            pimage:"https://images.unsplash.com/photo-1611188513835-f4b58670d580?q=80&w=1173&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            category: "Art",
            stock: 10,
          },

          {
            pname: "Jute Basketry",
            pprice: 250.00,
            description: "Durable, eco-friendly storage baskets and containers hand-woven from natural jute fibers.",
            pimage:"https://images.unsplash.com/photo-1622153093514-4dd0078ac132?q=80&w=1167&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            category: "Handicrafts",
            stock: 18,
          },

          {
            pname:"Sabai Grass Bags",
            pprice: 400.00,
            description: "Stylish, hand-braided bags and mats made from sustainable Sabai grass.",
            pimage:"https://images.unsplash.com/photo-1668500330126-a6653b14dc5f?q=80&w=685&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            category: "Handicrafts",
            stock: 12,
          },

          {
            pname: "Beaded Hanging Lamps",
            pprice: 450.00,
            description:"Colorful thread and beads crafted into unique hanging lamps for ambient lighting.",
            pimage:"https://images.unsplash.com/photo-1629729489307-acd67dcc63d6?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            category: "Handicrafts",
            stock: 8,
          },

          {
            pname:"Handcrafted Wooden Furniture",
            pprice: 1500.00,
            description:"Solid, traditionally designed wooden dining sets and home furnishings.",
            pimage:"https://images.unsplash.com/photo-1760774714635-9e9d3e953300?q=80&w=1331&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            category: "Furniture",
            stock: 4,
          },

          {
            pname:"Decorative Showpieces",
            pprice: 600.00,
            description: "Artisan-crafted decorative items for home décor, showcasing local culture.",
            pimage:"https://images.unsplash.com/photo-1739173495297-52271c775484?q=80&w=628&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            category: "Art",
            stock: 14,

          },
        ];

        await Product.insertMany(demoProducts);
        products = await Product.find();
      }

      // FIX 5: Simply return the products; Mongoose models already have the correct keys.
      res.json(products);
    } catch (error) {
      console.error("Error fetching products:", error);
      res.status(500).json({ error: "Failed to fetch products" });
    }
  },

  // --------------------------------------------------
  // DELETE PRODUCT
  // --------------------------------------------------
  async delproduct(req, res) {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ msg: "Product deleted" });
  },

  // --------------------------------------------------
  // UPDATE PRODUCT (Supports Cloudinary)
  // --------------------------------------------------
  async updproduct(req, res) {
    try {
      const id = req.body.id;
      let updatedData = {
        pname: req.body.pname,
        pprice: req.body.pprice,
        // FIX 6: Use correct key
        description: req.body.description, 
        stock: req.body.stock,
        category: req.body.category,
      };

      // FIX 7: Check for file using the frontend key 'pimage'
      if (req.files && req.files.pimage) {
        const file = req.files.pimage;
        const upload = await cloudinary.uploader.upload(file.tempFilePath, {
          folder: "products",
        });
        updatedData.pimage = upload.secure_url; // Save to pimage field
      }

      await Product.findByIdAndUpdate(id, updatedData);
      res.json({ msg: "Product Updated" });
    } catch (err) {
      console.error("Update error:", err);
      res.status(500).json({ msg: "Failed to update product" });
    }
  },
};