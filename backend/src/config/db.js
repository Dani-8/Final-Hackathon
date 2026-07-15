import mongoose from 'mongoose';
import dns from 'dns';

// Ensure Node.js prioritizes IPv4 over IPv6 and uses public DNS servers (8.8.8.8, 1.1.1.1)
// to resolve SRV records properly for MongoDB Atlas connection.
try {
    if (dns.setDefaultResultOrder) {
        dns.setDefaultResultOrder('ipv4first');
    }
    dns.setServers(["8.8.8.8", "1.1.1.1"]);
} catch (error) {
    console.warn("⚠️ DNS configuration warning:", error.message);
}

let mongoConnected = false;

export async function connectDB() {
    const uri = process.env.MONGO_URI;
    if (!uri) {
        console.warn('⚠️ MONGO_URI is not defined. Falling back to in-memory/JSON data storage.');
        mongoConnected = false;
        return false;
    }

    try {
        // Set a short timeout (3 seconds) so we don't hang if Mongo is unreachable
        await mongoose.connect(uri, {
            serverSelectionTimeoutMS: 3000,
        });
        console.log('✅ MongoDB connected successfully.');
        mongoConnected = true;
        return true;
    } catch (err) {
        console.error('❌ MongoDB connection failed:', err.message);
        console.warn('⚠️ Falling back to in-memory/JSON data storage.');
        mongoConnected = false;
        return false;
    }
}

export function isMongoConnected() {
    return mongoConnected && mongoose.connection.readyState === 1;
}
