import mongoose from "mongoose";

const connenctToDatabase = async () => {
  try {
    const connenction = await mongoose.connect(
      "mongodb+srv://dbUser:ev69IWIFOHkB2iGd@cluster0.uwskk4m.mongodb.net/apptask?retryWrites=true&w=majority"
    );

    if (connenction) {
      console.log("Connection successful");
    }
  } catch (error) {
    console.log("error in connenctToDatabase", error);
  }
};

export default connenctToDatabase;
