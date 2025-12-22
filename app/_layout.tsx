import { AuthProvider, useAuth } from "@/lib/auth-context";
import { Stack, useRouter, useSegments } from "expo-router";
import { useEffect, useState } from "react";

function RootLayoutContent() {
  const { user, isLoadingUser } = useAuth();
  const router = useRouter();
  const segments = useSegments();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    setIsReady(true);
  }, []);

  useEffect(() => {
    const inAuthGroup = segments[0] === "auth";

    if (isReady && !user && !inAuthGroup && !isLoadingUser) {
      router.replace("/auth");
    } else if (isReady && user && inAuthGroup && !isLoadingUser) {
      router.replace("/");
    }
  }, [user, router, isReady, segments, isLoadingUser]);

  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="auth" options={{ headerShown: false }} />
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <RootLayoutContent />
    </AuthProvider>
  );
}