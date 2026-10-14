// Client for /api/*. In preview builds (PUBLIC_PREVIEW=1) the same logic
// runs in the browser with localStorage, and emails are captured, not sent.
import { SITE } from '../config';
import { makeCore, Fail } from './ami-core.js';

type Body = Record<string, unknown>;
export type Sent = { to: string; subject: string; text: string };
export const previewOutbox: Sent[] = [];

let mock: ReturnType<typeof makeCore> | null = null;
function previewCore() {
  if (mock) return mock;
  const mem: Record<string, unknown> = {};
  const read = (): Record<string, unknown> => { try { return JSON.parse(localStorage.getItem('ami-preview') || '{}'); } catch { return mem; } };
  const write = (o: Record<string, unknown>) => { try { localStorage.setItem('ami-preview', JSON.stringify(o)); } catch { Object.assign(mem, o); } };
  mock = makeCore({
    store: {
      get: async (k: string) => (read()[k] as object) ?? null,
      set: async (k: string, v: unknown) => { const o = read(); o[k] = v; write(o); },
    },
    mail: async (m: Sent) => { previewOutbox.push(m); },
    notifyTo: 'anuraag@getsynos.ai',
    siteUrl: '',
  });
  return mock;
}

export async function api<T = Body>(route: 'register' | 'score' | 'invite', body: Body): Promise<T> {
  if (SITE.preview) {
    try { return (await previewCore()[route](body)) as T; }
    catch (e) { throw new Error(e instanceof Fail ? e.message : 'Something went wrong.'); }
  }
  let res: Response;
  try {
    res = await fetch(`${SITE.api}/${route}`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
  } catch { throw new Error('We could not reach the server. Check your connection and try again.'); }
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error((data as Body).error as string || 'Something went wrong. Try again.');
  return data as T;
}
