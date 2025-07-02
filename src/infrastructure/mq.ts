// src/infrastructure/mq.ts
import { Client } from '@upstash/qstash';
import 'dotenv/config';

const qstash = new Client  ({
  token: process.env.QSTASH_TOKEN!,
});

/**
 * Publishes a job to your backend via QStash.
 * @param endpoint Full URL to your API handler (e.g., webhook or internal job route)
 * @param payload JSON body to send with the job
 */
export const publishJob = async (endpoint: string, payload: object): Promise<void> => {
  try {
    await qstash.publishJSON({
      url: endpoint,
      body: payload,
    });

    console.log(`✅ Job published to ${endpoint}`);
  } catch (err) {
    console.error('❌ Failed to publish QStash job:', err);
    throw err;
  }
};
