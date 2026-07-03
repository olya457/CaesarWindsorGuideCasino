import { StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { VelvetRouteDeck } from './src/navigation/VelvetRouteDeck';
import { palette } from './src/theme/nocturneTokens';

function App() {
  return (
    <SafeAreaProvider>
      <StatusBar barStyle="light-content" backgroundColor={palette.graphite} />
      <VelvetRouteDeck />
    </SafeAreaProvider>
  );
}

export default App;
