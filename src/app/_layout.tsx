import { Stack } from 'expo-router';
import { Image } from 'react-native';

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: '#0B132B',
        },
        headerTintColor: '#ffffff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        headerRight: () => (
          <Image
            source={require('../../assets/images/netstatus-icon.png')}
            style={{ width: 28, height: 28, marginRight: 8 }}
            resizeMode="contain"
          />
        ),
      }}
    >
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="forecast" options={{ title: 'Previsão de Qualidade' }} />
      <Stack.Screen name="activity" options={{ title: 'Verificar Atividade' }} />
    </Stack>
  );
}
