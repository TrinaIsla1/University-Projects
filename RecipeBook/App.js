import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from './HomeScreen';
import RecipeListScreen from './RecipeListScreen';
import RecipeDetailsScreen from './RecipeDetailsScreen';
import { colors } from './globalStyles';
import { getCategory } from './recipes';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerTintColor: colors.white,
          headerTitleStyle: { fontWeight: '700' },
          headerShadowVisible: false,
          headerBackTitleVisible: false,
        }}
      >
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            title: 'Recipe Book',
            headerStyle: { backgroundColor: colors.primary },
          }}
        />
        <Stack.Screen
          name="RecipeList"
          component={RecipeListScreen}
          // Title and header color come from the category param sent by HomeScreen
          options={({ route }) => ({
            title: route.params.category,
            headerStyle: { backgroundColor: getCategory(route.params.category).color },
          })}
        />
        <Stack.Screen
          name="RecipeDetails"
          component={RecipeDetailsScreen}
          options={({ route }) => ({
            title: route.params.recipe.name,
            headerStyle: {
              backgroundColor: getCategory(route.params.recipe.category).color,
            },
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
