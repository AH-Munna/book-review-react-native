import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './app/screens/AppNavigator';
import { navigationRef } from './app/components/myNavigationRoot';
import Store from './app/redux/Store';
import { Provider } from 'react-redux';

export default function App() {
  return (
    <NavigationContainer ref={navigationRef}>
      <Provider store={Store}>
        <AppNavigator />
      </Provider>
    </NavigationContainer >

  );
}