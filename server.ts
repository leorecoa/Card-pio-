import express from "express";
import { createServer as createViteServer } from "vite";
import Database from "better-sqlite3";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const db = new Database("menupro.db");
const JWT_SECRET = process.env.JWT_SECRET || "menupro-secret-key";

// Initialize Database
db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    role TEXT DEFAULT 'customer'
  );

  CREATE TABLE IF NOT EXISTS categories (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    active INTEGER DEFAULT 1
  );

  CREATE TABLE IF NOT EXISTS products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    description TEXT,
    price REAL NOT NULL,
    image_url TEXT,
    category_id INTEGER,
    active INTEGER DEFAULT 1,
    FOREIGN KEY (category_id) REFERENCES categories (id)
  );

  CREATE TABLE IF NOT EXISTS orders (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER,
    status TEXT DEFAULT 'pending',
    total REAL NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users (id)
  );

  CREATE TABLE IF NOT EXISTS order_items (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    order_id INTEGER,
    product_id INTEGER,
    quantity INTEGER NOT NULL,
    price REAL NOT NULL,
    FOREIGN KEY (order_id) REFERENCES orders (id),
    FOREIGN KEY (product_id) REFERENCES products (id)
  );
`);

// Seed initial data if empty
const userCount = db.prepare("SELECT count(*) as count FROM users").get() as { count: number };
if (userCount.count === 0) {
  const hashedPassword = bcrypt.hashSync("admin123", 10);
  db.prepare("INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)").run(
    "Admin",
    "admin@menupro.com",
    hashedPassword,
    "admin"
  );

  const categories = ["Entradas", "Pratos Principais", "Bebidas", "Sobremesas"];
  const insertCategory = db.prepare("INSERT INTO categories (name) VALUES (?)");
  categories.forEach(cat => insertCategory.run(cat));

  const products = [
    { name: "Hambúrguer Artesanal", description: "Pão brioche, carne 180g, queijo cheddar, bacon e maionese da casa.", price: 35.9, category_id: 2, image_url: "https://picsum.photos/seed/burger/400/300" },
    { name: "Batata Frita Rústica", description: "Batatas cortadas à mão com alecrim e sal grosso.", price: 18.0, category_id: 1, image_url: "https://picsum.photos/seed/fries/400/300" },
    { name: "Suco de Laranja Natural", description: "Suco fresco espremido na hora.", price: 12.0, category_id: 3, image_url: "https://picsum.photos/seed/juice/400/300" },
    { name: "Petit Gâteau", description: "Bolinho quente de chocolate com sorvete de baunilha.", price: 22.0, category_id: 4, image_url: "https://picsum.photos/seed/dessert/400/300" }
  ];
  const insertProduct = db.prepare("INSERT INTO products (name, description, price, category_id, image_url) VALUES (?, ?, ?, ?, ?)");
  products.forEach(p => insertProduct.run(p.name, p.description, p.price, p.category_id, p.image_url));
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Auth Routes
  app.post("/api/auth/login", (req, res) => {
    const { email, password } = req.body;
    const user = db.prepare("SELECT * FROM users WHERE email = ?").get(email) as any;

    if (!user || !bcrypt.compareSync(password, user.password)) {
      return res.status(401).json({ error: "Credenciais inválidas" });
    }

    const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, { expiresIn: "1d" });
    res.json({ token, user: { id: user.id, name: user.name, email: user.email, role: user.role } });
  });

  // Categories Routes
  app.get("/api/categories", (req, res) => {
    const categories = db.prepare("SELECT * FROM categories WHERE active = 1").all();
    res.json(categories);
  });

  // Products Routes
  app.get("/api/products", (req, res) => {
    const products = db.prepare(`
      SELECT p.*, c.name as category_name 
      FROM products p 
      JOIN categories c ON p.category_id = c.id 
      WHERE p.active = 1
    `).all();
    res.json(products);
  });

  // Orders Routes
  app.post("/api/orders", (req, res) => {
    const { items, total, userId } = req.body;
    
    const transaction = db.transaction(() => {
      const info = db.prepare("INSERT INTO orders (user_id, total) VALUES (?, ?)").run(userId || null, total);
      const orderId = info.lastInsertRowid;

      const insertItem = db.prepare("INSERT INTO order_items (order_id, product_id, quantity, price) VALUES (?, ?, ?, ?)");
      for (const item of items) {
        insertItem.run(orderId, item.id, item.quantity, item.price);
      }
      return orderId;
    });

    try {
      const orderId = transaction();
      res.status(201).json({ id: orderId, message: "Pedido realizado com sucesso!" });
    } catch (error) {
      res.status(500).json({ error: "Erro ao processar pedido" });
    }
  });

  // Admin Routes (Simplified for demo)
  app.get("/api/admin/orders", (req, res) => {
    const orders = db.prepare(`
      SELECT o.*, u.name as user_name 
      FROM orders o 
      LEFT JOIN users u ON o.user_id = u.id 
      ORDER BY o.created_at DESC
    `).all();
    res.json(orders);
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, "dist")));
    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "dist", "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
