import { MaterialIcons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import {
    ActivityIndicator,
    Image,
    ScrollView,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { MealSuggestion, suggestMeals } from "../services/geminiService";
import { getDefaultFoodImage } from "../services/imageService";
import { styles } from "./ResultScreen.styles";

interface ResultScreenProps {
  ingredients: string[];
  onBack: () => void;
}

interface MealWithImage {
  name: string;
  ingredients: string[];
  steps: string[];
  imageUrl: string;
}

export default function ResultScreen({ ingredients, onBack }: ResultScreenProps) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [mealSuggestion, setMealSuggestion] = useState<MealSuggestion | null>(null);
  const [mealsWithImages, setMealsWithImages] = useState<MealWithImage[]>([]);

  const fetchMealSuggestions = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // 献立提案を取得
      const result = await suggestMeals(ingredients);
      setMealSuggestion(result);
      
      // 各料理に画像を追加
      const withImages = result.meals.map(meal => ({
        ...meal,
        // 料理名からデフォルト画像を取得
        imageUrl: getDefaultFoodImage(meal.name)
      }));
      
      setMealsWithImages(withImages);
    } catch (err) {
      setError(err instanceof Error ? err.message : "献立の提案に失敗しました");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMealSuggestions();
  }, []);

  // 詳細を表示する処理（今回は実装しない）
  const handleViewDetails = (meal: any) => {
    console.log("詳細を表示:", meal.name);
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={onBack}>
            <MaterialIcons name="arrow-back" size={24} color="#333333" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>AIからの献立提案</Text>
          <View style={styles.emptyView} />
        </View>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#81C784" />
          <Text style={styles.loadingText}>
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
            <MaterialIcons name="arrow-back" size={24} color="#333333" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>エラー</Text>
          <View style={styles.emptyView} />
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
          <MaterialIcons name="arrow-back" size={24} color="#333333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>AIからの献立提案</Text>
        <View style={styles.emptyView} />
      </View>
      
      <ScrollView style={styles.content}>
        <Text style={styles.introText}>入力された食材から、こちらの{mealsWithImages.length}つのレシピを提案します。</Text>
        
        <View style={styles.cardList}>
          {mealsWithImages.map((meal, index) => (
            <TouchableOpacity
              key={index}
              style={styles.mealCard}
              onPress={() => handleViewDetails(meal)}
            >
              <View style={styles.imageContainer}>
                <Image
                  source={{ uri: meal.imageUrl }}
                  style={styles.mealImage}
                  resizeMode="cover"
                />
                <View style={styles.imageFade} />
              </View>
              
              <View style={styles.cardContent}>
                <Text style={styles.mealTitle}>{meal.name}</Text>
                <View style={styles.viewMoreContainer}>
                  <Text style={styles.viewMoreText}>詳細を見る</Text>
                  <MaterialIcons name="arrow-forward" size={18} color="#81C784" style={{ marginLeft: 4 }} />
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}