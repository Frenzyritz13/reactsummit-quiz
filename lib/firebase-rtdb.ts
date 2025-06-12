// lib/firebase.ts
import { getDatabase } from 'firebase/database';

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const rtdb = getDatabase(app);
</newLines>

<rationale>
Create a new helper file `lib/firebase-rtdb.ts` with typed functions for reading, writing, patching and subscribing to RTDB paths.
</rationale>
<newLines>
// lib/firebase-rtdb.ts
import { ref, get, set, update, onValue, off, DataSnapshot } from 'firebase/database';
import { rtdb } from './firebase';

export async function readData<T = unknown>(path: string): Promise<T | null> {
  const snap: DataSnapshot = await get(ref(rtdb, path));
  return snap.exists() ? (snap.val() as T) : null;
}

export function writeData<T>(path: string, value: T) {
  return set(ref(rtdb, path), value);
}

export function patchData(path: string, value: Record<string, unknown>) {
  return update(ref(rtdb, path), value);
}

export function subscribe<T>(
  path: string,
  cb: (val: T | null) => void,
): () => void {
  const node = ref(rtdb, path);
  const handler = (snap: DataSnapshot) =>
    cb(snap.exists() ? (snap.val() as T) : null);
  onValue(node, handler);
  return () => off(node, 'value', handler);
}
</newLines>

<rationale>
Add a React hook `useRTDB` in `hooks/useRTDB.ts` for components to read initial data and subscribe to updates.
</rationale>
<newLines>
// hooks/useRTDB.ts
import { useEffect, useState } from 'react';
import { readData, subscribe } from '../lib/firebase-rtdb';

export function useRTDB<T = unknown>(path: string, init: T | null = null) {
  const [data, setData] = useState<T | null>(init);

  useEffect(() => {
    let off = () => {};
    (async () => {
      setData(await readData<T>(path));
      off = subscribe<T>(path, setData);
    })();
    return () => off();
  }, [path]);

  return data;
}
</newLines>

<rationale>
Update `.env.example` to document the optional Realtime Database URL environment variable.
</rationale>
<newLines>
# Firebase Realtime Database
# Leave blank to use the default database URL from your Firebase console
NEXT_PUBLIC_DATABASE_URL=
</newLines>

<rationale>
Add a “Realtime Database” section to `README.md` explaining the helpers and hook, with a minimal usage snippet.
</rationale>
<newLines>
## Realtime Database

We’ve added TypeScript helpers and a React hook for Firebase Realtime Database.

Example usage:

```ts
import { useRTDB } from './hooks/useRTDB';
import { writeData } from './lib/firebase-rtdb';

// Read realtime value in a component
const score = useRTDB<{ score: number }>(`/scores/${user.uid}`);

// Write or update a value
await writeData(`/scores/${user.uid}`, { score: 42, ts: Date.now() });
```
</newLines>

<rationale>
Provide an example React component in `examples/saveScore.tsx` that demonstrates reading with `useRTDB` and writing with `writeData`.
</rationale>
<newLines>
// examples/saveScore.tsx
import React from 'react';
import { useRTDB } from '../hooks/useRTDB';
import { writeData } from '../lib/firebase-rtdb';

type User = { uid: string };

interface SaveScoreProps {
  user: User;
}

export default function SaveScore({ user }: SaveScoreProps) {
  const data = useRTDB<{ score: number }>(`/scores/${user.uid}`, { score: 0 });

  const handleSave = async () => {
    const newScore = (data?.score ?? 0) + 1;
    await writeData(`/scores/${user.uid}`, { score: newScore, ts: Date.now() });
  };

  return (
    <div>
      <p>Current score: {data?.score ?? 'Loading...'}</p>
      <button onClick={handleSave}>Increment Score</button>
    </div>
  );
}