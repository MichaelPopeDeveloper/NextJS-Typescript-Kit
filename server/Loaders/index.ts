import mongoose from 'mongoose';
export default (): any => {
        return mongoose.connect(process.env.DATABASE_URL as string, { useUnifiedTopology: true, useNewUrlParser: true })
};