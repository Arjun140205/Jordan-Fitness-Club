import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import userRoutes from "./routes/userRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";

// Load environment variables early
dotenv.config();

// Verify essential environment variables
if (!process.env.MONGO_URI) {
  console.error('ERROR: MONGO_URI is not defined in environment variables');
  process.exit(1);
}

if (!process.env.JWT_SECRET) {
  console.error('ERROR: JWT_SECRET is not defined in environment variables');
  process.exit(1);
}

const app = express();

// Debug middleware to log CORS issues
app.use((req, res, next) => {
  console.log('Origin:', req.headers.origin);
  next();
});

// Middlewares
app.use(cors({
  origin: ['https://jordan-fitness-club.vercel.app', 'http://localhost:5173'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Root route for basic check
app.get('/', (req, res) => {
  res.json({ message: 'Server is running' });
});

// Debug route to see all registered routes
app.get('/debug/routes', (req, res) => {
  const routes = [];
  
  function extractRoutes(stack, basePath = '') {
    stack.forEach(middleware => {
      if (middleware.route) {
        // Direct route
        const methods = Object.keys(middleware.route.methods).join(',');
        routes.push({
          path: basePath + middleware.route.path,
          methods,
          type: 'route'
        });
      } else if (middleware.name === 'router') {
        // Router middleware
        let path = middleware.regexp.toString();
        if (path.includes('^\\')) {
          path = path.split('\\')[1].split('?')[0];
        }
        
        middleware.handle.stack.forEach(handler => {
          if (handler.route) {
            const methods = Object.keys(handler.route.methods).join(',');
            routes.push({
              path: basePath + path + handler.route.path,
              methods,
              type: 'router'
            });
          }
        });
      } else {
        // Other middleware
        routes.push({
          path: basePath,
          name: middleware.name,
          type: 'middleware'
        });
      }
    });
  }
  
  extractRoutes(app._router.stack);
  res.json({ 
    totalRoutes: routes.length,
    routes: routes,
    timestamp: new Date().toISOString()
  });
});

// API Routes with error logging
app.use('/api/auth', (req, res, next) => {
  console.log(`Auth Route accessed: ${req.method} ${req.path}`);
  next();
}, authRoutes);

app.use('/api/user', (req, res, next) => {
  console.log(`User Route accessed: ${req.method} ${req.path}`);
  next();
}, userRoutes);

app.use('/api/admin', (req, res, next) => {
  console.log(`Admin Route accessed: ${req.method} ${req.path}`);
  next();
}, adminRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok',
    mongodb: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected'
  });
});

// Debug catch-all route to log all requests
app.use((req, res, next) => {
  console.log(`[DEBUG] Incoming request: ${req.method} ${req.url}`);
  console.log('[DEBUG] Headers:', req.headers);
  console.log('[DEBUG] Body:', req.body);
  next();
});

// 404 handler
app.use((req, res, next) => {
  console.log(`404 Not Found: ${req.method} ${req.url}`);
  res.status(404).json({
    error: 'Not Found',
    message: `Cannot ${req.method} ${req.url}`,
    timestamp: new Date().toISOString()
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(`Error: ${err.message}`);
  console.error(err.stack);
  res.status(500).json({ 
    error: 'Something went wrong!',
    message: err.message,
    timestamp: new Date().toISOString()
  });
});

// Default port is 5001 (macOS AirPlay uses 5000)
const PORT = process.env.PORT || 5001;

// Connect to MongoDB and start server
console.log('Attempting to connect to MongoDB...');
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('✅ Connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`✅ Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err);
    process.exit(1);
  });
