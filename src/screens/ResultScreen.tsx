import { MaterialIcons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import {
    ActivityIndicator,
    ScrollView,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { MealSuggestion, suggestMeals } from "../services/geminiService";
import { styles } from "./ResultScreen.styles";

interface ResultScreenProps {
  ingredients: string[];
  onBack: () => void;
}

export default function ResultScreen({ ingredients, onBack }: ResultScreenProps) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [mealSuggestion, setMealSuggestion] = useState<MealSuggestion | null>(null);

  const fetchMealSuggestions = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const result = await suggestMeals(ingredients);
      setMealSuggestion(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : "献立の提案に失敗しました");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMealSuggestions();
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={onBack}>
            <MaterialIcons name="arrow-back" size={24} color="#0d1b0d" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>献立を提案中</Text>
          <View style={{ width: 24 }} />
        </View>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#13ec13" />
          <Text style={{ marginTop: 16, color: "#3a4a3a" }}>
            あなたの食材から最適な献立を考えています...
          </Text>
        </View>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={onBack}>
            <MaterialIcons name="arrow-back" size={24} color="#0d1b0d" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>エラー</Text>
          <View style={{ width: 24 }} />
        </View>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
          <TouchableOpacity style={styles.retryButton} onPress={fetchMealSuggestions}>
            <Text style={styles.retryButtonText}>再試行する</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={onBack}>
          <MaterialIcons name="arrow-back" size={24} color="#0d1b0d" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>献立の提案</Text>
        <View style={{ width: 24 }} />
      </View>
      
      <ScrollView style={styles.content}>
        {mealSuggestion?.meals.map((meal, index) => (
          <View key={index} style={styles.mealCard}>
            <Text style={styles.mealTitle}>{meal.name}</Text>
            
            <Text style={styles.sectionTitle}>材料</Text>
            {meal.ingredients.map((ingredient, i) => (
              <View key={i} style={styles.ingredientItem}>
                <View style={styles.bulletPoint} />
                <Text style={styles.ingredientText}>{ingredient}</Text>
              </View>
            ))}
            
            <Text style={styles.sectionTitle}>調理手順</Text>
            {meal.steps.map((step, i) => (
              <View key={i} style={styles.stepItem}>
                <Text style={styles.stepNumber}>{i + 1}.</Text>
                <Text style={styles.stepText}>{step}</Text>
              </View>
            ))}
          </View>
        ))}
      </ScrollView>
    </View>
  );
}
