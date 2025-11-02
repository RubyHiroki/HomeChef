import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  // 基本レイアウト
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  
  // ヘッダー
  header: {
    height: 64,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    backgroundColor: "rgba(255, 255, 255, 0.8)",
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitle: {
    flex: 1,
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginHorizontal: 8,
  },
  placeholder: {
    width: 40,
  },
  
  // メインコンテンツ
  content: {
    paddingBottom: 64,
  },
  
  // 画像セクション
  imageContainer: {
    paddingHorizontal: 16,
    marginBottom: 20,
  },
  recipeImage: {
    width: "100%",
    height: 240,
    borderRadius: 12,
    overflow: "hidden",
  },
  
  // タイトルセクション
  titleSection: {
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    lineHeight: 32,
  },
  description: {
    fontSize: 16,
    color: "rgba(51, 51, 51, 0.8)",
    marginTop: 8,
    lineHeight: 24,
  },
  
  // 材料セクション
  ingredientsSection: {
    paddingHorizontal: 16,
    paddingBottom: 32,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 16,
  },
  ingredientRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
  },
  ingredientName: {
    fontSize: 16,
  },
  ingredientAmount: {
    fontSize: 14,
    color: "#757575",
  },
  
  // 作り方セクション
  stepsSection: {
    paddingHorizontal: 16,
    paddingBottom: 32,
  },
  stepContainer: {
    flexDirection: "row",
    marginBottom: 24,
  },
  stepNumber: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#FFC107",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 16,
    marginTop: 4,
  },
  stepNumberText: {
    fontWeight: "bold",
    color: "#333333",
  },
  stepText: {
    flex: 1,
    fontSize: 16,
    lineHeight: 24,
  },
});
