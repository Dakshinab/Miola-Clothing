import express from 'express';
import multer from 'multer';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Ensure uploads directory exists
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Multer configuration for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const section = req.body.section || 'women';
    cb(null, `${section}-${uniqueSuffix}${path.extname(file.originalname)}`);
  }
});

const upload = multer({ 
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed!'), false);
    }
  },
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  }
});
// Data persistence file
const dataFile = path.join(__dirname, 'data.json');

// Function to load data from file
function loadData() {
  try {
    if (fs.existsSync(dataFile)) {
      const data = fs.readFileSync(dataFile, 'utf8');
      return JSON.parse(data);
    }
  } catch (error) {
    console.error('Error loading data:', error);
  }
  return null;
}

// Function to save data to file
function saveData(data) {
  try {
    fs.writeFileSync(dataFile, JSON.stringify(data, null, 2));
  } catch (error) {
    console.error('Error saving data:', error);
  }
}

// In-memory storage (replace with real database in production)
let mainSectionData = {
  title: "Home Page",
  description: "Main page collection",
  images: [],
  categories: {
    "featured": { 
      name: "Featured",
      images: [],
      types: {
        "t-shirts": { name: "T-shirts", images: [] },
        "dresses": { name: "Dresses", images: [] },
        "crop-tops": { name: "Crop Tops", images: [] },
        "pants": { name: "Pants", images: [] },
        "jeans": { name: "Jeans", images: [] },
        "skirts": { name: "Skirts", images: [] },
        "shorts": { name: "Shorts", images: [] },
        "caps": { name: "Caps", images: [] }
      }
    },
    "trending": { 
      name: "Trending",
      images: [],
      types: {
        "t-shirts": { name: "T-shirts", images: [] },
        "dresses": { name: "Dresses", images: [] },
        "crop-tops": { name: "Crop Tops", images: [] },
        "pants": { name: "Pants", images: [] },
        "jeans": { name: "Jeans", images: [] },
        "skirts": { name: "Skirts", images: [] },
        "shorts": { name: "Shorts", images: [] },
        "caps": { name: "Caps", images: [] }
      }
    },
    "sale": { 
      name: "Sale",
      images: [],
      types: {
        "t-shirts": { name: "T-shirts", images: [] },
        "dresses": { name: "Dresses", images: [] },
        "crop-tops": { name: "Crop Tops", images: [] },
        "pants": { name: "Pants", images: [] },
        "jeans": { name: "Jeans", images: [] },
        "skirts": { name: "Skirts", images: [] },
        "shorts": { name: "Shorts", images: [] },
        "caps": { name: "Caps", images: [] }
      }
    }
  }
};

let womenSectionData = {
  title: "Women's Collection",
  description: "Discover the latest trends in women's fashion",
  images: [],
  exploreLink: "/women",
  categories: {
    "crop-tops": { name: "Crop Tops", images: [] },
    "t-shirts": { name: "T-shirts", images: [] },
    "dresses": { name: "Dresses", images: [] },
    "jeans": { name: "Jeans", images: [] },
    "skirts": { name: "Skirts", images: [] },
    "ethical-clothing": { name: "Ethical Clothing", images: [] }
  }
};

let menSectionData = {
  title: "Men's Collection",
  description: "Modern fashion for the contemporary man",
  images: [],
  exploreLink: "/men",
  categories: {
    "t-shirts": { name: "T-shirts", images: [] },
    "shirts": { name: "Shirts", images: [] },
    "jeans": { name: "Jeans", images: [] },
    "pants": { name: "Pants", images: [] },
    "caps": { name: "Caps", images: [] }
  }
};

let kidsSectionData = {
  title: "Kids' Collection",
  description: "Adorable outfits for your little ones",
  images: [],
  exploreLink: "/kids",
  categories: {
    "t-shirts": { name: "T-shirts", images: [] },
    "tops": { name: "Tops", images: [] },
    "pants": { name: "Pants", images: [] },
    "shorts": { name: "Shorts", images: [] },
    "dresses": { name: "Dresses", images: [] },
    "caps": { name: "Caps", images: [] }
  }
};

// Routes

// Root route
app.get('/', (req, res) => {
  res.json({ 
    message: 'Miola Backend Server is running!',
    endpoints: {
      womenSection: '/api/women-section',
      menSection: '/api/men-section',
      kidsSection: '/api/kids-section',
      uploadImage: '/api/upload-image',
      deleteImage: '/api/delete-image/:id',
      updateSection: '/api/women-section',
      updateImage: '/api/update-image/:id'
    }
  });
});

// Get main section data
app.get('/api/main-section', (req, res) => {
  res.json(mainSectionData);
});

// Get women's section data
app.get('/api/women-section', (req, res) => {
  res.json(womenSectionData);
});

// Get men's section data
app.get('/api/men-section', (req, res) => {
  res.json(menSectionData);
});

// Get kids' section data
app.get('/api/kids-section', (req, res) => {
  res.json(kidsSectionData);
});

// Upload new image with name and price
app.post('/api/upload-image', upload.single('image'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const { name, price, section, category, clothingType } = req.body;
    const selectedSection = section || 'women';
    let targetData;

    // Determine which section to use
    if (selectedSection === 'main') {
      targetData = mainSectionData;
    } else if (selectedSection === 'men') {
      targetData = menSectionData;
    } else if (selectedSection === 'kids') {
      targetData = kidsSectionData;
    } else {
      targetData = womenSectionData;
    }

    const newImage = {
      id: Date.now().toString(),
      filename: req.file.filename,
      url: `http://localhost:${PORT}/uploads/${req.file.filename}`,
      name: name || `Product ${Date.now()}`,
      price: price || "$49.99",
      uploadedAt: new Date().toISOString()
    };

    // For main section with clothing type, add to nested structure
    if (selectedSection === 'main' && category && clothingType && targetData.categories && targetData.categories[category] && targetData.categories[category].types && targetData.categories[category].types[clothingType]) {
      targetData.categories[category].types[clothingType].images.push(newImage);
      // Keep only last 10 images per clothing type
      if (targetData.categories[category].types[clothingType].images.length > 10) {
        targetData.categories[category].types[clothingType].images = targetData.categories[category].types[clothingType].images.slice(-10);
      }
    } else if (category && targetData.categories && targetData.categories[category]) {
      // For women/men/kids sections, add to flat category structure
      targetData.categories[category].images.push(newImage);
      // Keep only last 10 images per category
      if (targetData.categories[category].images.length > 10) {
        targetData.categories[category].images = targetData.categories[category].images.slice(-10);
      }
    } else {
      targetData.images.push(newImage);
      // Keep only last 6 images in main section or other sections
      if (targetData.images.length > 6) {
        targetData.images = targetData.images.slice(-6);
      }
    }

    // Save data to file
    saveData({
      main: mainSectionData,
      women: womenSectionData,
      men: menSectionData,
      kids: kidsSectionData
    });

    res.json({ 
      success: true, 
      image: newImage,
      message: 'Image uploaded successfully' 
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update individual image details (name and price)
app.put('/api/update-image/:id', (req, res) => {
  const imageId = req.params.id;
  const { name, price, section, category } = req.body;
  const selectedSection = section || 'women';
  
  let targetData;
  if (selectedSection === 'men') {
    targetData = menSectionData;
  } else if (selectedSection === 'kids') {
    targetData = kidsSectionData;
  } else {
    targetData = womenSectionData;
  }
  
  let imageIndex = -1;
  let targetArray = targetData.images;
  
  // If category is specified, look in category
  if (category && targetData.categories[category]) {
    targetArray = targetData.categories[category].images;
  }
  
  imageIndex = targetArray.findIndex(img => img.id === imageId);
  
  if (imageIndex === -1) {
    return res.status(404).json({ error: 'Image not found' });
  }

  if (name) targetArray[imageIndex].name = name;
  if (price) targetArray[imageIndex].price = price;

  // Save data to file
  saveData({
    main: mainSectionData,
    women: womenSectionData,
    men: menSectionData,
    kids: kidsSectionData
  });

  res.json({ 
    success: true, 
    image: targetArray[imageIndex],
    message: 'Image updated successfully' 
  });
});

// Delete image
app.delete('/api/delete-image/:id', (req, res) => {
  const imageId = req.params.id;
  const { section, category } = req.query;
  const selectedSection = section || 'women';
  
  let targetData;
  if (selectedSection === 'men') {
    targetData = menSectionData;
  } else if (selectedSection === 'kids') {
    targetData = kidsSectionData;
  } else {
    targetData = womenSectionData;
  }
  
  let imageIndex = -1;
  let targetArray = targetData.images;
  
  // If category is specified, look in category
  if (category && targetData.categories[category]) {
    targetArray = targetData.categories[category].images;
  }
  
  imageIndex = targetArray.findIndex(img => img.id === imageId);
  
  if (imageIndex === -1) {
    return res.status(404).json({ error: 'Image not found' });
  }

  const image = targetArray[imageIndex];
  
  // Delete file from filesystem
  const filePath = path.join(__dirname, 'uploads', image.filename);
  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
  }

  targetArray.splice(imageIndex, 1);
  
  // Save data to file
  saveData({
    main: mainSectionData,
    women: womenSectionData,
    men: menSectionData,
    kids: kidsSectionData
  });
  
  res.json({ success: true, message: 'Image deleted successfully' });
});

// Update section data
app.put('/api/women-section', (req, res) => {
  const { title, description } = req.body;
  
  if (title) womenSectionData.title = title;
  if (description) womenSectionData.description = description;
  
  // Save data to file
  saveData({
    main: mainSectionData,
    women: womenSectionData,
    men: menSectionData,
    kids: kidsSectionData
  });
  
  res.json({ success: true, data: womenSectionData });
});

// Update men's section data
app.put('/api/men-section', (req, res) => {
  const { title, description } = req.body;
  
  if (title) menSectionData.title = title;
  if (description) menSectionData.description = description;
  
  // Save data to file
  saveData({
    main: mainSectionData,
    women: womenSectionData,
    men: menSectionData,
    kids: kidsSectionData
  });
  
  res.json({ success: true, data: menSectionData });
});

// Update kids' section data
app.put('/api/kids-section', (req, res) => {
  const { title, description } = req.body;
  
  if (title) kidsSectionData.title = title;
  if (description) kidsSectionData.description = description;
  
  // Save data to file
  saveData({
    main: mainSectionData,
    women: womenSectionData,
    men: menSectionData,
    kids: kidsSectionData
  });
  
  res.json({ success: true, data: kidsSectionData });
});

app.listen(PORT, () => {
  // Load data from file on startup
  const savedData = loadData();
  if (savedData) {
    mainSectionData = savedData.main || mainSectionData;
    womenSectionData = savedData.women || womenSectionData;
    menSectionData = savedData.men || menSectionData;
    kidsSectionData = savedData.kids || kidsSectionData;
    console.log('Data loaded from file');
  }
  
  console.log(`Server running on http://localhost:${PORT}`);
});