import mongoose from "mongoose";

export const connectDB = () => {
  mongoose
    //database connection
    .connect(
      "mongodb+srv://Rakibbb:z00NXAvacaUxRFCY@cluster0.kyfxv.mongodb.net/?retryWrites=true&w=majority",
      {
        dbName: "gearify",
      }
    )
    .then((c) => console.log(`Db Connected to ${c.connection.host}`))
    .catch((e) => console.log(e));
};
