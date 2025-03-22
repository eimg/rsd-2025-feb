import { View, Text } from "react-native";

export default function Search() {
    return (
        <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <View style={{ gap: 10 }}>
                <Text style={{ fontSize: 24, marginBottom: 20 }}>Search</Text>
            </View>
        </View>
    );
}
