import mongoose from 'mongoose';
export default async (): Promise<any> => {

    try {
        const db = await mongoose.connect(process.env.DATABASE_URL as string, { useUnifiedTopology: true, useNewUrlParser: true })
        return db.connection;
    } catch (error) {
        console.log('Error: ', error);
    }

};