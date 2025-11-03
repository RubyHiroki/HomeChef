import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import {
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "./RecipeDetailScreen.styles";

interface RecipeDetailScreenProps {
  recipe: {
    name: string;
    description?: string;
    imageUrl?: string;
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

  // 手順のテキストをそのまま返す
  const getStepText = (step: string) => {
    return step;
  };

  return (
    <SafeAreaView style={styles.container} edges={[]}>
      <StatusBar backgroundColor="#FFF7E9" barStyle="dark-content" translucent />
      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1 }}>
        {/* ヘッダー部分（背景色付き） */}
        <View style={styles.headerContainer}>
          {/* 装飾用の円 */}
          <View style={styles.yellowCircle} />
          <View style={styles.orangeCircle} />
          
          {/* 戻るボタン */}
          <View style={styles.backButtonContainer}>
            <TouchableOpacity style={styles.backButton} onPress={onBack}>
              <MaterialIcons name="arrow-back" size={24} color="#4F4F4F" />
            </TouchableOpacity>
          </View>
          
          {/* タイトルと説明 */}
          <View style={styles.titleContainer}>
            <Text style={styles.title}>
              {recipe.name.includes("\n") ? recipe.name : recipe.name.replace(/(.{10})/, "$1\n")}
            </Text>
          </View>
        </View>
        
        {/* メインコンテンツ */}
        <View style={styles.contentContainer}>
          {/* 材料カード */}
          <View style={styles.ingredientsCard}>
            <View style={styles.sectionTitle}>
              <MaterialIcons name="restaurant-menu" size={24} style={styles.sectionIcon} />
              <Text style={{ fontWeight: "bold" }}>材料 (1人分)</Text>
            </View>
            
            {recipe.ingredients.map((ingredient, index) => {
              const { name, amount } = parseIngredient(ingredient);
              const isLast = index === recipe.ingredients.length - 1;
              
              return (
                <View 
                  key={index} 
                  style={[
                    styles.ingredientRow, 
                    isLast && styles.ingredientRowLast
                  ]}
                >
                  <Text style={styles.ingredientName}>{name}</Text>
                  <Text style={styles.ingredientAmount}>{amount}</Text>
                </View>
              );
            })}
          </View>
          
          {/* 作り方セクション */}
          <View style={styles.stepsSection}>
            <View style={styles.sectionTitle}>
              <MaterialIcons name="soup-kitchen" size={24} style={styles.sectionIcon} />
              <Text style={{ fontWeight: "bold" }}>作り方</Text>
            </View>
            
            {recipe.steps.map((step, index) => {
              const stepText = getStepText(step);
              
              return (
                <View key={index} style={styles.stepContainer}>
                  <View style={styles.stepNumber}>
                    <Text style={styles.stepNumberText}>{index + 1}</Text>
                  </View>
                  
                  <View style={styles.stepContentContainer}>
                    <Text style={styles.stepText}>{stepText}</Text>
                  </View>
                </View>
              );
            })}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}