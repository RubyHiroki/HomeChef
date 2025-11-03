import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  // 基本レイアウト
  container: {
    flex: 1,
    backgroundColor: "#FFFBF5", // brand-light
  },
  
  // ヘッダー部分（料理名と説明）
  headerContainer: {
    backgroundColor: "#FFF7E9", // brand-cream
    position: "relative",
    overflow: "hidden",
    paddingTop: 80,
    paddingHorizontal: 24,
    paddingBottom: 32,
  },
  
  // 装飾要素
  yellowCircle: {
    position: "absolute",
    top: -64,
    right: -80,
    width: 192,
    height: 192,
    borderRadius: 96,
    backgroundColor: "rgba(255, 199, 44, 0.5)", // brand-yellow with opacity
  },
  orangeCircle: {
    position: "absolute",
    top: 96,
    left: -48,
    width: 128,
    height: 128,
    borderRadius: 64,
    backgroundColor: "rgba(255, 127, 80, 0.3)", // brand-orange with opacity
  },
  
  // 戻るボタン
  backButtonContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    height: 64,
    paddingHorizontal: 16,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  
  // タイトルと説明
  titleContainer: {
    paddingVertical: 32,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    lineHeight: 36,
    letterSpacing: -0.5,
    color: "#4F4F4F", // brand-dark
  },
  description: {
    fontSize: 16,
    color: "rgba(79, 79, 79, 0.7)", // brand-dark with opacity
    lineHeight: 24,
    marginTop: 16,
    maxWidth: 320,
  },
  
  // メインコンテンツ
  contentContainer: {
    backgroundColor: "#FFFBF5", // brand-light
    padding: 24,
  },
  
  // 材料セクション
  ingredientsCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    padding: 24,
    marginBottom: 32,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
    flexDirection: "row",
    alignItems: "center",
    color: "#4F4F4F", // brand-dark
  },
  sectionIcon: {
    marginRight: 8,
    color: "#FF7F50", // brand-orange
  },
  
  // 材料アイテム
  ingredientRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
    marginBottom: 16,
  },
  ingredientRowLast: {
    borderBottomWidth: 0,
    marginBottom: 0,
    paddingTop: 4,
    paddingBottom: 0,
  },
  ingredientName: {
    fontSize: 16,
    color: "#4F4F4F", // brand-dark
  },
  ingredientAmount: {
    fontSize: 14,
    color: "rgba(79, 79, 79, 0.8)", // brand-dark with opacity
  },
  
  // 作り方セクション
  stepsSection: {
    marginBottom: 32,
  },
  
  // 手順アイテム
  stepContainer: {
    flexDirection: "row",
    marginBottom: 32,
  },
  stepNumber: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#FFC72C", // brand-yellow
    alignItems: "center",
    justifyContent: "center",
    marginRight: 16,
    marginTop: 4,
    zIndex: 10,
  },
  stepNumberText: {
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  stepContentContainer: {
    flex: 1,
  },
  stepTitle: {
    fontSize: 16,
    fontWeight: "500",
    color: "#4F4F4F", // brand-dark
    lineHeight: 24,
  },
  stepText: {
    fontSize: 14,
    color: "rgba(79, 79, 79, 0.8)", // brand-dark with opacity
    lineHeight: 22,
    marginTop: 4,
  },
});