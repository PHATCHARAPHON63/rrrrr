const ProductList = require("../models/product");

exports.getAllProductLists = async (req, res) => {
  try {
    console.log("Fetching all product lists...");
    const productLists = await ProductList.find().lean();
    console.log(`Found ${productLists.length} product lists`);

    // Log ตัวอย่างข้อมูล 3 รายการแรก
    console.log("Sample data (first 3 items):");
    console.log(JSON.stringify(productLists.slice(0, 3), null, 2));

    // Log ชื่อฟิลด์ทั้งหมดของรายการแรก
    if (productLists.length > 0) {
      console.log("Fields in the first item:");
      console.log(Object.keys(productLists[0]));
    }

    res.status(200).json(productLists);
  } catch (error) {
    console.error("Error fetching product lists:", error);
    res
      .status(500)
      .json({ message: "Error fetching product lists", error: error.message });
  }
};

exports.getProductListByPos = async (req, res) => {
  try {
    console.log(req.body);

    const { id } = req.body;
    console.log(id);

    // const productList = await ProductList.findOne({ pos: id }).lean();
    const productList = await ProductList.findOne({ pos: id }).lean();

    if (!productList) {
      return res.status(201).json({ message: "Product not found", id });
    }
    console.log("data", productList);

    // เพิ่มการตรวจสอบและกำหนดค่าเริ่มต้น
    const result = {
      _id: productList._id,
      position: productList.position,
      pos: productList.pos,
      code: productList.code || "ไม่ระบุ",
      product_list: productList.product_list || "ไม่ระบุ",
      quantity:
        productList.quantity !== undefined ? productList.quantity : "ไม่ระบุ",
    };

    console.log("Data to be sent:", result);
    res.status(200).json(result);
  } catch (error) {
    console.error("Error fetching product list:", error);
    res
      .status(500)
      .json({ message: "Error fetching product list", error: error.message });
  }
};
exports.updateProduct = async (req, res) => {
  try {
    const productData = req.body;

    // Validation
    if (!productData.object_id) {
      return res.status(400).json({
        success: false,
        message: "กรุณาระบุ object_id",
      });
    }
    console.log(productData, req.body);

    // ตรวจสอบว่ามีข้อมูลที่ต้องการอัพเดทหรือไม่
    const existingProduct = await ProductList.findById(productData.object_id);
    if (!existingProduct) {
      return res.status(404).json({
        success: false,
        message: "ไม่พบข้อมูลสินค้าในระบบ",
      });
    }

    // Validate required fields
    const requiredFields = [
      "product_list",
      "code",
      "quantity",
      "position",
      "pos",
    ];
    for (const field of requiredFields) {
      if (!productData[field] && productData[field] !== 0) {
        return res.status(400).json({
          success: false,
          message: `กรุณาระบุ ${field}`,
        });
      }
    }

    // Validate data types
    if (typeof productData.quantity !== "number") {
      return res.status(400).json({
        success: false,
        message: "quantity ต้องเป็นตัวเลข",
      });
    }

    // อัพเดทข้อมูล
    const updatedProduct = await ProductList.findByIdAndUpdate(
      productData.object_id,
      productData,
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "อัพเดทข้อมูลสำเร็จ",
      data: updatedProduct,
    });
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).json({
      success: false,
      message: "เกิดข้อผิดพลาดในการอัพเดทข้อมูล",
      error: error.message,
    });
  }
};

exports.addProduct = async (req, res) => {
  try {
    const { product_list, code, quantity, pos } = req.body;
    console.log(req.body);

    const position = req.body.pos;
    // Validation ข้อมูลพื้นฐาน
    if (!product_list || !code || quantity === undefined || !pos) {
      return res.status(400).json({
        success: false,
        message: "กรุณากรอกข้อมูลให้ครบถ้วน",
      });
    }

    if (typeof quantity !== "number" || quantity < 0) {
      return res.status(400).json({
        success: false,
        message: "จำนวนสินค้าต้องเป็นตัวเลขที่ไม่ติดลบ",
      });
    }

    //สร้างข้อมูลใหม่;
    const newProduct = await ProductList.create({
      product_list,
      code,
      quantity,
      pos: pos,
      position: position,
    });

    // ส่งข้อมูลกลับ
    res.status(201).json({
      success: true,
      message: "เพิ่มข้อมูลสำเร็จ",
      data: newProduct,
    });
  } catch (error) {
    console.error("Error in addProduct:", error);
    res.status(400).json({
      success: false,
      message: "เกิดข้อผิดพลาดในการเพิ่มข้อมูล",
      error: error.message,
    });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    // ลบข้อมูล
    const result = await ProductList.findByIdAndDelete(id);

    if (!result) {
      return res.status(404).json({
        success: false,
        message: "ไม่พบข้อมูลสินค้า",
      });
    }

    res.status(200).json({
      success: true,
      message: "ลบข้อมูลสำเร็จ",
    });
  } catch (error) {
    console.error("Error in deleteProduct:", error);
    res.status(500).json({
      success: false,
      message: "เกิดข้อผิดพลาดในการลบข้อมูล",
      error: error.message,
    });
  }
};
