import "server-only";

const MAX_ATTEMPTS = 5;
const WINDOW_MS = 15 * 60 * 1000; // 15 minutes

type Entry = { count: number; resetAt: number };

// In-memory, single-instance limiter — matches the app's existing
// single-persistent-process deployment assumption (see media/upload storage).
const attempts = new Map<string, Entry>();

export function assertNotRateLimited(key: string) {
  const now = Date.now();
  const entry = attempts.get(key);

  if (!entry || now > entry.resetAt) {
    attempts.set(key, { count: 1, resetAt: now + WINDOW_MS });
    return;
  }

  entry.count += 1;

  if (entry.count > MAX_ATTEMPTS) {
    const waitMinutes = Math.ceil((entry.resetAt - now) / 60000);
    throw new Error(
      `Too many attempts. Please try again in ${waitMinutes} minute(s).`,
    );
  }
}

export function clearRateLimit(key: string) {
  attempts.delete(key);
}
