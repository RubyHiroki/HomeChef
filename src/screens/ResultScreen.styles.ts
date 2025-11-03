import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  // 基本レイアウト
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  
  // ヘッダー
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "rgba(245, 245, 245, 0.8)",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    flex: 1,
    color: "#333333",
  },
  backButton: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  emptyView: {
    width: 40,
  },
  
  // コンテンツ
  content: {
    flex: 1,
    paddingHorizontal: 16,
    paddingBottom: 32,
  },
  introText: {
    fontSize: 16,
    color: "#666666",
    paddingHorizontal: 2,
    paddingTop: 16,
    paddingBottom: 24,
  },
  
  // 料理カードリスト
  cardList: {
    gap: 16,
    paddingBottom: 20,
  },
  
  // モダンなカードデザイン
  mealCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
    position: "relative",
    overflow: "hidden",
    height: 120, // 固定高さを設定
  },
  cardContent: {
    zIndex: 10,
    flex: 1,
    justifyContent: "space-between",
  },
  mealTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333333",
    marginBottom: 8,
  },
  viewMoreContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  viewMoreText: {
    fontSize: 14,
    color: "#81C784",
    fontWeight: "500",
  },
  
  // デコレーション要素
  circleDecoration: {
    position: "absolute",
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "rgba(129, 199, 132, 0.2)",
    top: -15,
    right: -15,
  },
  dotsDecoration: {
    position: "absolute",
    bottom: -5,
    right: -5,
    flexDirection: "row",
  },
  dot: {
    width: 15,
    height: 15,
    borderRadius: 8,
    backgroundColor: "rgba(129, 199, 132, 0.2)",
    marginHorizontal: 2,
  },
  svgDecoration: {
    position: "absolute",
    width: 60,
    height: 60,
    bottom: -20,
    left: -20,
    opacity: 0.2,
  },
  
  // ローディング
  loadingContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  loadingText: {
    marginTop: 16,
    color: "#666666",
  },
  
  // エラー
  errorContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  errorText: {
    fontSize: 16,
    color: "#d32f2f",
    textAlign: "center",
    marginBottom: 16,
  },
  retryButton: {
    backgroundColor: "#81C784",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
  },
  retryButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});