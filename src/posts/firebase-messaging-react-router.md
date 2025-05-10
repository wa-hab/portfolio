---
title: Implementing Firebase Cloud Messaging in React Router 7
description: A practical guide to implementing FCM in React Router 7 applications.
date: 2025-05-11
category: web
tags:
 - firebase
 - react
 - react router
 - typescript
 - web
 - frontend
 - backend
 - database
published: true

---

Most tutorials implemented FCM in a React application in less than 15 minutes. So a lethal dose of imposter syndrome was injected into our veins when it took us alot longer than that. The tutorial space for this problem is a bit outdated, and this blog post is intended to serve as a guide for the poor souls who will inevitably stumble across this problem.

### The Problem

Let's first understand what we're dealing with. The standard way of implementing FCM in React applications, as shown in many tutorials, looks something like this:

```typescript
// The standard approach
import { initializeApp } from "firebase/app";
import { getMessaging } from "firebase/messaging";

const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);
```

This works fine in when we're not using React Router 7. But inheriting some of that Remix DNA, React Router 7 uses Server-Side Rendering (SSR) by default. And Firebase's messaging service is very much a browser-only thing. 

Even if you're using it in SPA mode by setting `ssr: false`, where you application IS functionally a client side rendered application, there is an intermediate build step where the routes are server rendered to generate the `index.html` file. This is explained in the [React Router documentation](https://reactrouter.com/how-to/spa#1-disable-runtime-server-rendering):

> It's important to note that setting `ssr: false` only disables runtime server rendering. React Router will still server render your root route at build time to generate the `index.html` file. This is why your project still needs a dependency on `@react-router/node` and your routes need to be SSR-safe. That means you can't call `window` or other browser-only APIs during the initial render, even when server rendering is disabled.

### The Solution

Let's look at how we can solve this. The key is to think about this in terms of "when" and "where" our Firebase code runs. We need a way to:

1. Initialize Firebase only on the client side
2. Handle the initialization state properly
3. Make the FCM functionality available throughout the app
4. Deal with permissions and tokens in a clean way

Here's how we do it:

#### 1. The Provider Pattern

We'll use a provider pattern, which is a common React pattern for sharing state and functionality. But we'll make it smarter about when it initializes Firebase:

```typescript
interface FirebaseContextType {
  messaging: ReturnType<typeof getMessaging> | null;
  requestNotificationPermission: () => Promise<string>;
  onMessageListener: () => Promise<MessagePayload>;
  isInitialized: boolean;
}
```

This interface tells us exactly what we're working with. The `messaging` can be null (when we're on the server or before initialization), and we have some helper functions to work with notifications.

#### 2. The Initialization Dance

The magic happens in the provider's initialization:

```typescript
export function FirebaseProvider({ children }: { children: React.ReactNode }) {
  const [messaging, setMessaging] = useState<ReturnType<typeof getMessaging> | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const initializeFirebase = async () => {
      try {
        const app = initializeApp(firebaseConfig);
        const messagingInstance = getMessaging(app);
        setMessaging(messagingInstance);
        // ... permission and token handling
        setIsInitialized(true);
      } catch (error) {
        console.error("Failed to initialize Firebase:", error);
      }
    };

    initializeFirebase();
  }, []);
}
```

The `useEffect` is crucial - it ensures our Firebase initialization only happens on the client side. The server will render the provider, but the actual Firebase setup happens after the component mounts in the browser.

#### 3. Using It in Your App

Now, using this in your components is straightforward:

```typescript
function NotificationComponent() {
  const { requestNotificationPermission } = useFirebase();

  useEffect(() => {
    const setupNotifications = async () => {
      try {
        const token = await requestNotificationPermission();
        console.log('Got our FCM token:', token); // this is just for debugging, do better
      } catch (error) {
        console.error('Oops, something went wrong:', error);
      }
    };

    setupNotifications();
  }, []);
}
```

### Why This Works

This approach works because:

1. **Timing**: We only initialize Firebase after the component mounts in the browser
2. **State Management**: We track initialization state, so components know when Firebase is ready
3. **Error Handling**: We handle errors gracefully at each step

### The Gotchas

There are a few things to watch out for:

1. **Environment Variables**: Make sure your Firebase config is properly set up in your environment variables
2. **Service Worker**: You still need to set up your service worker for background notifications. Weirdly, the foreground notifications won't work without it.
3. **Token Management**: Remember to send the FCM token to your backend when you get it.

### Setting Up the Service Worker

To enable background notifications, you need to set up a service worker. In React Router 7, you'll need to:

1. Create a `firebase-messaging-sw.js` file in your public directory and add the service worker code.

2. Add the service worker to your root route's `links` export:

```typescript
// app/root.tsx
export const links: LinksFunction = () => [
  // ... other links
  {
    rel: "import",
    href: "/firebase-messaging-sw.js"
  }
];
```

This setup ensures that your service worker is properly registered and can handle background notifications even when your app is not in focus.

### Wrapping Up

This solution gives you a clean way to use FCM in a React Router 7 application. It handles the SSR complications gracefully, and provides a nice API for working with notifications throughout your app.

The key takeaway here is that sometimes the standard approach needs to be adapted to work with modern frameworks. By understanding how React Router 7 and Firebase work together (or don't work together), we can create a solution that bridges the gap.

### References

- [Firebase Cloud Messaging Documentation](https://firebase.google.com/docs/cloud-messaging)
- [React Router 7 Documentation](https://reactrouter.com/)
- [Firebase Web SDK Documentation](https://firebase.google.com/docs/web/setup)
