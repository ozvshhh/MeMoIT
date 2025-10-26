import { Text, View } from "react-native";

import WebviewContainer from "@/components/webview";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <WebviewContainer></WebviewContainer>
    </View>
  );
}
