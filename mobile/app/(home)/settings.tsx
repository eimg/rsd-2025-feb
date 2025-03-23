import { ThemeButton } from "@/components/theme-button";
import { View } from "react-native";

export default function Settings() {
    return (
        <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <View style={{ gap: 10 }}>
                <ThemeButton />
            </View>
        </View>
    );
}
