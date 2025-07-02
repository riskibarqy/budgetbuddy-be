import { Redis } from "@upstash/redis";

if (!process.env.UPSTASH_REDIS_REST_URL || !process.env.UPSTASH_REDIS_REST_TOKEN) {
  throw new Error('Missing Upstash Redis environment variables');
}

const redisClient = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
});

const connectRedis = async (): Promise<void> => {
  try {
    await redisClient.set("redis_status", "connected");
    console.log("✅ Redis (Upstash) is ready.");
  } catch (err) {
    console.error("❌ Redis connection failed:", err);
    throw err;
  }
};

const disconnectRedis = async (): Promise<void> => {
  // No real disconnect needed for Upstash REST client
  console.log('Redis (Upstash) client cleanup done.');
};

export { redisClient, connectRedis, disconnectRedis };
