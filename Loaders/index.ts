import mongoose from 'mongoose';
export default  (): any => {
        const db = mongoose.connect(process.env.DATABASE_URL as string, { useUnifiedTopology: true, useNewUrlParser: true })
        retur
};