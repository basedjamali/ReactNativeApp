import { AuthProvider, useAuth } from "@/lib/auth-context";
import { Stack, useRouter, useSegments } from "expo-router";
import { useEffect, useState } from "react";

export default function RootLayout() {
  const router = useRouter();
  const { user } = useAuth();
  const segments = useSegments()
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    setIsReady(true);
  }, []);

  useEffect(() => {
    const inAuthGroup = segments[0] === "auth";

    if (isReady && !user && !inAuthGroup) {
      router.replace("/auth");
    } else if( isReady && user && inAuthGroup) {
      router.replace("/");
    }
  }, [user, router, isReady, segments]);

  return (
    <AuthProvider>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="auth" options={{ headerShown: false }} />
      </Stack>
    </AuthProvider>
  );
}