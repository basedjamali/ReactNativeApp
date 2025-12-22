import { Stack, useRouter } from "expo-router";
import { useEffect, useState } from "react";

export default function RootLayout() {
  const isAuth = false;
  const router = useRouter();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    setIsReady(true);
  }, []);

  useEffect(() => {
    if (isReady && !isAuth) {
      router.replace("/auth");
    }
  }, [isAuth, router, isReady]);

  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="auth" options={{ headerShown: false }} />
    </Stack>
  );
}