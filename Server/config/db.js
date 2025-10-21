import mongoose from 'mongoose';

// Try to load dotenv if available (some environments may not have it installed).
try {
  // dynamic import so missing package doesn't throw at module load time
  const dotenv = await import('dotenv');
  dotenv.config();
} catch (e) {
  // dotenv not available — rely on environment variables already set
  // (This is intentional to allow running without installing dotenv.)
}

const connectdb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

export default connectdb;
