import { Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'

export default function RootLayout() {
  return (
    <>
      <StatusBar style="light" />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(auth)" />
        <Stack.Screen name="(tabs)" />
        <Stack.Screen
          name="product/[id]"
          options={{
            headerShown: true,
            title: 'Produto',
            headerStyle: { backgroundColor: '#1A1A1A' },
            headerTintColor: '#fff',
            headerTitleStyle: { fontWeight: '800' },
          }}
        />
        <Stack.Screen
          name="cart/index"
          options={{
            headerShown: true,
            title: 'Carrinho',
            headerStyle: { backgroundColor: '#1A1A1A' },
            headerTintColor: '#fff',
            headerTitleStyle: { fontWeight: '800' },
          }}
        />
        <Stack.Screen
          name="checkout/index"
          options={{
            headerShown: true,
            title: 'Finalizar Pedido',
            headerStyle: { backgroundColor: '#1A1A1A' },
            headerTintColor: '#fff',
            headerTitleStyle: { fontWeight: '800' },
          }}
        />
        <Stack.Screen
          name="tracking/[orderId]"
          options={{
            headerShown: true,
            title: 'Rastreio',
            headerStyle: { backgroundColor: '#1A1A1A' },
            headerTintColor: '#fff',
            headerTitleStyle: { fontWeight: '800' },
          }}
        />
      </Stack>
    </>
  )
}
