import mongoose from "mongoose";

export const connectDatabase = () => {
    mongoose
        .connect(process.env.DATABASE)
        .then((c) => {
            console.log(`connected to database`)
        })
        .catch((e) => {
            console.log(`error in connection ${e}`);
        });

};