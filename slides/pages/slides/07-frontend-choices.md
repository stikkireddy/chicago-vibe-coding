---
layout: two-cols
layoutClass: gap-16
---

# Frontend Choices

<v-clicks>

- **Next.js App Router** → our web dashboard (@app directory)
- **React Native + Expo** → mobile device registration (@react-native-expo)
- **Server Actions** → type-safe API calls without REST endpoints

</v-clicks>

<div v-click class="mt-4 p-3 bg-gray-800 text-white rounded">
<strong>Why this stack:</strong> Next.js handles both web UI + API routes, React Native shares TypeScript types, AI generates components across both platforms
</div>

::right::

<div v-click class="mt-8">

```tsx
// From @app/src/app/devices/page.tsx
export default async function DevicesPage() {
  const devices = await getDevices();
  
  return (
    <div className="container mx-auto py-8">
      <DeviceDataTable devices={devices} />
    </div>
  );
}

// Server action in same file
export async function getDevices() {
  return await db.select().from(devices);
}
```

</div>