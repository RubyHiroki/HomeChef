import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import {
    Image,
    ScrollView,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { styles } from "./RecipeDetailScreen.styles";

interface RecipeDetailScreenProps {
  recipe: {
    name: string;
    description?: string;
    imageUrl: string;
    ingredients: string[];
    steps: string[];
  };
  onBack: () => void;
}

export default function RecipeDetailScreen({ recipe, onBack }: RecipeDetailScreenProps) {
  // 材料を名前と量に分割する関数
  const parseIngredient = (ingredient: string) => {
    // "材料: 量" または "材料 量" の形式を想定
    const match = ingredient.match(/(.*?)[:：]?\s*(.*)$/);
    if (match && match[2]) {
      return { name: match[1].trim(), amount: match[2].trim() };
    }
    return { name: ingredient, amount: "" };
  };

  return (
    <View style={styles.container}>
      {/* ヘッダー */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={onBack}>
          <MaterialIcons name="arrow-back" size={24} color="#333333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle} numberOfLines={1}>
          {recipe.name}
        </Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content}>
        {/* 料理画像 */}
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: recipe.imageUrl }}
            style={styles.recipeImage}
            resizeMode="cover"
          />
        </View>

        {/* 材料 */}
        <View style={styles.ingredientsSection}>
          <Text style={styles.sectionTitle}>材料</Text>
          {recipe.ingredients.map((ingredient, index) => {
            const { name, amount } = parseIngredient(ingredient);
            return (
              <View key={index} style={styles.ingredientRow}>
                <Text style={styles.ingredientName}>{name}</Text>
                <Text style={styles.ingredientAmount}>{amount}</Text>
              </View>
            );
          })}
        </View>

        {/* 作り方 */}
        <View style={styles.stepsSection}>
          <Text style={styles.sectionTitle}>作り方</Text>
          {recipe.steps.map((step, index) => (
            <View key={index} style={styles.stepContainer}>
              <View style={styles.stepNumber}>
                <Text style={styles.stepNumberText}>{index + 1}</Text>
              </View>
              <Text style={styles.stepText}>{step}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}
