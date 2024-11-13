const express = require("express");
const router = express.Router();
const {
  getAllProductLists,
  getProductListByPos,
  updateProduct,
  addProduct,
  deleteProduct,
} = require("../controllers/productList");

/**
 * @swagger
 * /getAllProductLists:
 *   get:
 *     summary: ดึงข้อมูล ProductList ทั้งหมด
 *     tags: [ProductList]
 *     responses:
 *       200:
 *         description: รายการ ProductList ทั้งหมด
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/ProductList'
 *       500:
 *         description: เกิดข้อผิดพลาดในการดึงข้อมูล
 *
 * components:
 *   schemas:
 *     ProductList:
 *       type: object
 *       required:
 *         - position
 *         - code
 *         - product
 *         - quantity
 *       properties:
 *         position:
 *           type: number
 *           description: ตำแหน่งของสินค้าในรายการ
 *         code:
 *           type: string
 *           description: รหัสสินค้า
 *         product:
 *           type: string
 *           description: ชื่อสินค้า
 *         quantity:
 *           type: number
 *           description: จำนวนสินค้า
 */
router.get("/getAllProductLists", getAllProductLists);

/**
 * @swagger
 * /getProductListByPos:
 *   post:
 *     summary: Get product list by position
 *     tags: [Products]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - pos
 *             properties:
 *               pos:
 *                 type: string
 *                 description: Position of the product
 *     responses:
 *       200:
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 position:
 *                   type: string
 *                 code:
 *                   type: string
 *                 product_list:
 *                   type: string
 *                 quantity:
 *                   type: number
 *                 pos:
 *                   type: string
 *       400:
 *         description: Bad request
 *       404:
 *         description: Product not found
 *       500:
 *         description: Server error
 */

router.post("/getProductListByPos", getProductListByPos);

/**
 * @swagger
 * /api/updateProduct:
 *   post:
 *     summary: อัพเดทข้อมูลสินค้า
 *     tags: [ProductList]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id
 *               - position
 *               - code
 *               - product
 *               - quantity
 *             properties:
 *               id:
 *                 type: string
 *                 description: ID ของสินค้าที่ต้องการอัพเดท
 *               position:
 *                 type: number
 *                 description: ตำแหน่งของสินค้า
 *               code:
 *                 type: string
 *                 description: รหัสสินค้า
 *               product:
 *                 type: string
 *                 description: ชื่อสินค้า
 *               quantity:
 *                 type: number
 *                 description: จำนวนสินค้า
 *     responses:
 *       200:
 *         description: อัพเดทข้อมูลสำเร็จ
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/ProductList'
 *                 message:
 *                   type: string
 *                   example: อัพเดทข้อมูลสำเร็จ
 *       400:
 *         description: ข้อมูลไม่ถูกต้อง
 *       500:
 *         description: เกิดข้อผิดพลาดในการอัพเดทข้อมูล
 */
router.post("/updateProduct", updateProduct);

/**
 * @swagger
 * /api/addProduct:
 *   post:
 *     summary: เพิ่มข้อมูลสินค้าใหม่
 *     tags: [ProductList]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - product_list
 *               - code
 *               - quantity
 *               - pos
 *             properties:
 *               product_list:
 *                 type: string
 *                 description: ชื่อสินค้า
 *                 example: "สินค้าทดสอบ"
 *               code:
 *                 type: string
 *                 description: รหัสสินค้า
 *                 example: "PRD001"
 *               quantity:
 *                 type: number
 *                 description: จำนวนสินค้า
 *                 minimum: 0
 *                 example: 10
 *               pos:
 *                 type: string
 *                 description: ตำแหน่งที่เก็บสินค้า
 *                 example: "C7-A4"
 *     responses:
 *       201:
 *         description: เพิ่มข้อมูลสำเร็จ
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: เพิ่มข้อมูลสำเร็จ
 *                 data:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: "507f1f77bcf86cd799439011"
 *                     product_list:
 *                       type: string
 *                       example: "สินค้าทดสอบ"
 *                     code:
 *                       type: string
 *                       example: "PRD001"
 *                     quantity:
 *                       type: number
 *                       example: 10
 *                     pos:
 *                       type: string
 *                       example: "C7-A4"
 *       400:
 *         description: ข้อมูลไม่ถูกต้อง
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: กรุณากรอกข้อมูลให้ครบถ้วน
 */
router.post("/addProduct", addProduct);

/**
 * @swagger
 * /api/deleteProduct/{id}:
 *   delete:
 *     summary: ลบข้อมูลสินค้า
 *     tags: [ProductList]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID ของสินค้าที่ต้องการลบ
 *     responses:
 *       200:
 *         description: ลบข้อมูลสำเร็จ
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: ลบข้อมูลสำเร็จ
 *       404:
 *         description: ไม่พบข้อมูลสินค้า
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: ไม่พบข้อมูลสินค้า
 *       500:
 *         description: เกิดข้อผิดพลาดภายในเซิร์ฟเวอร์
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: เกิดข้อผิดพลาดในการลบข้อมูล
 */
router.delete("/deleteProduct/:id", deleteProduct);

module.exports = router;
