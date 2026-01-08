import mongoose from "mongoose";
const connectDB = async() => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connexion a MongoDB à réussit ! ');
  }catch(err) {
    console.log('Erreur de connexion à MongoDB :' , err.message);
    process.exit(1);
  }
};
export default connectDB;
