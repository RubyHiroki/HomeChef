import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  // 基本レイアウト
  container: {
    flex: 1,
    backgroundColor: "#FFF8F2", // background-light
  },
  
  // ヘッダー
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingTop: 52, // ステータスバー分の余白を追加
    paddingBottom: 12,
    backgroundColor: "rgba(255, 248, 242, 0.8)", // background-light with opacity
    backdropFilter: "blur(8px)",
  },
  backButton: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    flex: 1,
    color: "rgba(66, 66, 66, 0.9)", // text-light with opacity
  },
  emptyView: {
    width: 40,
    height: 40,
  },
  
  // メインコンテンツ
  content: {
    flex: 1,
    paddingHorizontal: 16,
    paddingBottom: 48,
    paddingTop: 16,
  },
  introText: {
    fontSize: 14,
    color: "#757575", // subtext-light
    textAlign: "center",
    paddingHorizontal: 8,
    paddingBottom: 32,
    lineHeight: 20,
  },
  
  // カードリスト
  cardList: {
    gap: 24,
    paddingBottom: 20,
  },
  
  // カードスタイル
  mealCard: {
    backgroundColor: "#FFFFFF", // card-light
    borderRadius: 24,
    padding: 24,
    shadowColor: "#FFA726", // primary
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 14,
    elevation: 4,
    position: "relative",
    overflow: "hidden",
    height: 140,
  },
  cardContent: {
    zIndex: 10,
    flex: 1,
    justifyContent: "space-between",
  },
  mealTitle: {
    fontSize: 20,
    fontWeight: "900", // extra bold
    color: "#424242", // text-light
    marginBottom: 48,
    lineHeight: 28,
  },
  viewMoreContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  viewMoreText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#F57C00", // primary-dark
  },
  
  // デコレーション要素
  circleDecoration: {
    position: "absolute",
    width: 144,
    height: 144,
    borderRadius: 72,
    backgroundColor: "rgba(255, 183, 77, 0.3)", // primary-light with opacity
    top: -48,
    right: -48,
  },
  svgDecoration: {
    position: "absolute",
    width: 150,
    height: 150,
    bottom: -64,
    left: -64,
    opacity: 0.3,
  },
  dotsContainer: {
    position: "absolute",
    bottom: -16,
    right: -16,
    flexDirection: "row",
    gap: 8,
  },
  dot: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#FFF3E0", // accent
  },
  
  // ローディング
  loadingContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  loadingText: {
    marginTop: 16,
    color: "#757575", // subtext-light
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
    backgroundColor: "#FFA726", // primary
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
  },
  retryButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});