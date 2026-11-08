import React from 'react';
import { ScrollView, View, Text, Pressable, StyleSheet } from 'react-native';
import { globalStyles, colors } from './globalStyles';
import { getCategory } from './recipes';

export default function RecipeDetailsScreen({ navigation, route }) {
  // Receive the full recipe object passed from RecipeListScreen
  const { recipe } = route.params;
  const cat = getCategory(recipe.category);

  return (
    <ScrollView style={globalStyles.screen} contentContainerStyle={globalStyles.content}>
      {/* Hero */}
      <View style={[styles.hero, { backgroundColor: cat.tint }]}>
        <Text style={styles.heroEmoji}>{recipe.emoji}</Text>
        <Text style={[styles.title, { color: cat.color }]}>{recipe.name}</Text>
        <Text style={styles.desc}>{recipe.description}</Text>
      </View>

      {/* Quick info */}
      <View style={styles.infoRow}>
        <View style={styles.infoBox}>
          <Text style={styles.infoIcon}>⏱</Text>
          <Text style={styles.infoValue}>{recipe.time}</Text>
          <Text style={styles.infoLabel}>Time</Text>
        </View>
        <View style={styles.infoBox}>
          <Text style={styles.infoIcon}>📊</Text>
          <Text style={styles.infoValue}>{recipe.difficulty}</Text>
          <Text style={styles.infoLabel}>Level</Text>
        </View>
        <View style={styles.infoBox}>
          <Text style={styles.infoIcon}>🍽</Text>
          <Text style={styles.infoValue}>{recipe.servings}</Text>
          <Text style={styles.infoLabel}>Servings</Text>
        </View>
      </View>

      {/* Ingredients */}
      <Text style={styles.heading}>Ingredients</Text>
      <View style={styles.card}>
        {recipe.ingredients.map((item, i) => (
          <View key={i} style={styles.ingredientRow}>
            <View style={[styles.dot, { backgroundColor: cat.color }]} />
            <Text style={styles.ingredientText}>{item}</Text>
          </View>
        ))}
      </View>

      {/* Steps */}
      <Text style={styles.heading}>Steps</Text>
      {recipe.steps.map((step, i) => (
        <View key={i} style={[styles.card, styles.stepRow]}>
          <View style={[styles.stepBadge, { backgroundColor: cat.color }]}>
            <Text style={styles.stepNumber}>{i + 1}</Text>
          </View>
          <Text style={styles.stepText}>{step}</Text>
        </View>
      ))}

      {/* Manual reverse navigation */}
      <Pressable
        style={[globalStyles.button, { backgroundColor: cat.color }]}
        onPress={() => navigation.goBack()}
      >
        <Text style={globalStyles.buttonText}>← Back to {recipe.category}</Text>
      </Pressable>

      {/* Forward navigation to a screen earlier in the stack */}
      <Pressable
        style={[globalStyles.button, globalStyles.buttonOutline, { borderColor: cat.color }]}
        onPress={() => navigation.navigate('Home')}
      >
        <Text style={[globalStyles.buttonText, { color: cat.color }]}>Go to Home</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  hero: { alignItems: 'center', padding: 24, borderRadius: 24, marginBottom: 16 },
  heroEmoji: { fontSize: 64, marginBottom: 10 },
  title: { fontSize: 26, fontWeight: '800', textAlign: 'center' },
  desc: { fontSize: 14, color: colors.muted, textAlign: 'center', marginTop: 8, lineHeight: 20 },

  infoRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  infoBox: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: colors.card,
    borderRadius: 16,
    paddingVertical: 14,
    marginHorizontal: 4,
    borderWidth: 1,
    borderColor: colors.border,
  },
  infoIcon: { fontSize: 20 },
  infoValue: { fontSize: 14, fontWeight: '800', color: colors.text, marginTop: 4, textAlign: 'center' },
  infoLabel: { fontSize: 11, color: colors.muted, marginTop: 2 },

  heading: { fontSize: 20, fontWeight: '800', color: colors.text, marginTop: 18, marginBottom: 10 },
  card: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 16,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: colors.border,
  },
  ingredientRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: 5 },
  dot: { width: 8, height: 8, borderRadius: 4, marginRight: 12 },
  ingredientText: { fontSize: 15, color: colors.text, flex: 1 },

  stepRow: { flexDirection: 'row', alignItems: 'flex-start' },
  stepBadge: {
    width: 30,
    height: 30,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  stepNumber: { color: colors.white, fontWeight: '800', fontSize: 14 },
  stepText: { flex: 1, fontSize: 15, color: colors.text, lineHeight: 22 },
});
