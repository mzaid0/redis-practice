import prisma from "../database/db.js";
import { redis } from "../libs/redis.js";

export const newProduct = async (req, res) => {
  try {
    const { name, price, category, stock } = req.body;

    const product = await prisma.product.create({
      data: {
        name,
        price,
        category,
        stock,
      },
    });

    redis.set(`product:${id}`, JSON.stringify(product));

    res.status(201).json({ message: "Product created successfully" });
  } catch (error) {
    console.log("Product created failed", error);
  }
};

export const getProducts = async (req, res) => {
  const products = await prisma.product.findMany();

  res.json(products);
};

export const getSingleProduct = async (req, res) => {
  const { id } = req.params;

  const cachedProduct = await redis.get(`product:${id}`);

  if (cachedProduct) {
    return res.json(JSON.parse(cachedProduct));
  }

  const product = await prisma.product.findUnique({
    where: { id: id },
  });

  if (product) {
    await redis.set(`product:${id}`, JSON.stringify(product));
  }

  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }
  res.json(product);
};

export const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, price, category, stock } = req.body;
  const updatedProduct = await prisma.product.update({
    where: { id: id },
    data: { name, price, category, stock },
  });
  if (!updatedProduct) {
    return res.status(404).json({ message: "Product not found" });
  }

  await redis.set(`product:${id}`, JSON.stringify(updatedProduct));

  res.json({ message: "Product updated successfully" });
};
