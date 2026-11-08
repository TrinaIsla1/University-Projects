import { SafeAreaView } from 'react-native-safe-area-context'

import DiscoverScreen from '@/components/ui/DiscoverScreen'

export default function HomeScreen() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#1C2321' }}>
      <DiscoverScreen />
    </SafeAreaView>
  )
}
