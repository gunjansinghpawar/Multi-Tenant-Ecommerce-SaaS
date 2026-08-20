import { Queue, Job, JobsOptions, Worker, Processor } from 'bullmq';
import { redis } from '@commercex/cache';

export interface JobOptions {
  delay?: number;
  attempts?: number;
  backoff?: {
    type: 'fixed' | 'exponential';
    delay: number;
  };
  jobId?: string; // Idempotency key
}

export class QueueService {
  private static queues: Map<string, Queue> = new Map();
  private static workers: Map<string, Worker> = new Map();

  static getQueue(queueName: string): Queue {
    if (!this.queues.has(queueName)) {
      this.queues.set(queueName, new Queue(queueName, { connection: redis }));
    }
    return this.queues.get(queueName)!;
  }

  /**
   * Enqueues a job to a specific queue with strict defaults for robustness
   */
  static async enqueue(queueName: string, jobName: string, payload: any, options?: JobOptions): Promise<string> {
    const queue = this.getQueue(queueName);
    
    // Default robust job settings
    const bullOptions: JobsOptions = {
      attempts: options?.attempts || 3, // Default to 3 retries
      backoff: options?.backoff || { type: 'exponential', delay: 2000 }, // Exponential backoff by default
      removeOnComplete: true, // Keep Redis clean
      removeOnFail: false, // Keep failed jobs in DLQ for inspection
    };

    if (options?.delay) bullOptions.delay = options.delay;
    if (options?.jobId) bullOptions.jobId = options.jobId; // Enforces Idempotency

    const job = await queue.add(jobName, payload, bullOptions);
    return job.id!;
  }

  /**
   * Cancels a pending or delayed job by ID
   */
  static async cancelJob(queueName: string, jobId: string): Promise<boolean> {
    const queue = this.getQueue(queueName);
    const job = await queue.getJob(jobId);
    if (job && (await job.isActive() || await job.isDelayed() || await job.isWaiting())) {
      await job.remove();
      console.log(`[QueueService] Job ${jobId} cancelled`);
      return true;
    }
    return false;
  }

  /**
   * Fetches failed jobs (Dead-Letter Queue mechanism)
   */
  static async getFailedJobs(queueName: string, limit: number = 100): Promise<Job[]> {
    const queue = this.getQueue(queueName);
    return queue.getFailed(0, limit);
  }

  /**
   * Registers a worker processor for a queue
   */
  static registerWorker(queueName: string, processor: Processor, concurrency: number = 1) {
    if (this.workers.has(queueName)) {
      console.warn(`[QueueService] Worker already registered for queue: ${queueName}`);
      return;
    }

    const worker = new Worker(queueName, processor, { connection: redis, concurrency });
    this.workers.set(queueName, worker);
    
    worker.on('completed', (job: Job) => {
      console.log(`[QueueService] Job ${job.id} completed successfully`);
    });

    worker.on('failed', (job: Job | undefined, err: Error) => {
      console.error(`[QueueService] Job ${job?.id} failed:`, err.message);
      // Jobs stay in the failed set natively (acting as DLQ)
    });
  }
}

