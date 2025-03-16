import React, { useState } from "react";
import { View, Text, FlatList, TouchableOpacity, Modal, TextInput, Alert, StatusBar, Platform } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const initialCategories = [
    { id: "1", name: "Học tập", icon: "folder", password: "" },
    { id: "2", name: "Password", icon: "folder", password: "" },
    { id: "3", name: "Work", icon: "folder", password: "" },
    { id: "4", name: "Others", icon: "folder", password: "" },
];

export default function Homescreen() {
    const navigation = useNavigation();
    const [categories, setCategories] = useState(initialCategories);
    const [modalVisible, setModalVisible] = useState(false);
    const [newCategory, setNewCategory] = useState("");
    const [password, setPassword] = useState("");
    const [passwordModalVisible, setPasswordModalVisible] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [enteredPassword, setEnteredPassword] = useState("");

    // Thêm thư mục mới
    const addCategory = () => {
        if (newCategory.trim() === "") return;

        setCategories([
            ...categories,
            {
                id: Math.random().toString(),
                name: newCategory,
                icon: "folder",
                password: password, // Lưu mật khẩu vào thư mục
            },
        ]);
        setNewCategory("");
        setPassword("");
        setModalVisible(false);
    };

    // Kiểm tra mật khẩu trước khi vào thư mục
    const handleFolderPress = (category) => {
        if (category.password) {
            setSelectedCategory(category);
            setPasswordModalVisible(true);
        } else {
            navigation.navigate("notescreen", { category });
        }
    };

    // Xác thực mật khẩu
    const verifyPassword = () => {
        if (enteredPassword === selectedCategory.password) {
            setPasswordModalVisible(false);
            setEnteredPassword("");
            navigation.navigate("notescreen", { category: selectedCategory });
        } else {
            Alert.alert("Sai mật khẩu", "Vui lòng thử lại!");
        }
    };

    // Xóa thư mục
    const deleteCategory = (categoryId) => {
        Alert.alert("Xác nhận xóa", "Bạn có chắc muốn xóa thư mục này?", [
            {
                text: "Hủy",
                style: "cancel",
            },
            {
                text: "Xóa",
                onPress: () => {
                    setCategories(categories.filter((item) => item.id !== categoryId));
                },
                style: "destructive",
            },
        ]);
    };

    return (
        <View style={{
            flex: 1,
            paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight * 0.35 : 10, // Chừa 50% hoặc 10 pixel
            backgroundColor: '#fff'
        }}>
            <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />
            <View style={{ flex: 1, backgroundColor: "#F5F5FA", padding: 20 }}>
                <FlatList
                    data={categories}
                    numColumns={2}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            style={{
                                flex: 1,
                                backgroundColor: "white",
                                margin: 10,
                                padding: 20,
                                borderRadius: 20,
                                alignItems: "center",
                                elevation: 3,
                            }}
                            onPress={() => handleFolderPress(item)}
                            onLongPress={() => deleteCategory(item.id)} // Nhấn giữ để xóa thư mục
                        >
                            <Ionicons name={item.icon} size={30} color={item.password ? "red" : "#7A7AFF"} />
                            <Text style={{ fontSize: 18, fontWeight: "bold", marginVertical: 5 }}>{item.name}</Text>
                        </TouchableOpacity>
                    )}
                />

                {/* Nút thêm thư mục */}
                <TouchableOpacity
                    style={{
                        position: "absolute",
                        bottom: 20,
                        alignSelf: "center",
                        backgroundColor: "#7A7AFF",
                        padding: 15,
                        borderRadius: 50,
                        elevation: 5,
                    }}
                    onPress={() => setModalVisible(true)}
                >
                    <Ionicons name="add" size={30} color="white" />
                </TouchableOpacity>

                {/* Modal thêm thư mục */}
                <Modal visible={modalVisible} transparent animationType="slide">
                    <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "rgba(0,0,0,0.5)" }}>
                        <View style={{ width: 300, padding: 20, backgroundColor: "white", borderRadius: 10 }}>
                            <Text style={{ fontSize: 18, marginBottom: 10 }}>Thêm folder</Text>
                            <TextInput
                                placeholder="Tên folder"
                                value={newCategory}
                                onChangeText={setNewCategory}
                                style={{
                                    borderWidth: 1,
                                    borderColor: "gray",
                                    padding: 10,
                                    borderRadius: 5,
                                    marginBottom: 10,
                                }}
                            />
                            <TextInput
                                placeholder="Thêm password"
                                value={password}
                                onChangeText={setPassword}
                                secureTextEntry
                                style={{
                                    borderWidth: 1,
                                    borderColor: "gray",
                                    padding: 10,
                                    borderRadius: 5,
                                    marginBottom: 10,
                                }}
                            />
                            <TouchableOpacity
                                onPress={addCategory}
                                style={{
                                    backgroundColor: "#7A7AFF",
                                    padding: 10,
                                    alignItems: "center",
                                    borderRadius: 5,
                                }}
                            >
                                <Text style={{ color: "white", fontSize: 16 }}>Thêm</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>

                {/* Modal nhập mật khẩu */}
                <Modal visible={passwordModalVisible} transparent animationType="slide">
                    <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "rgba(0,0,0,0.5)" }}>
                        <View style={{ width: 300, padding: 20, backgroundColor: "white", borderRadius: 10 }}>
                            <Text style={{ fontSize: 18, marginBottom: 10 }}>Enter Password</Text>
                            <TextInput
                                placeholder="Password"
                                value={enteredPassword}
                                onChangeText={setEnteredPassword}
                                secureTextEntry
                                style={{
                                    borderWidth: 1,
                                    borderColor: "gray",
                                    padding: 10,
                                    borderRadius: 5,
                                    marginBottom: 10,
                                }}
                            />
                            <TouchableOpacity
                                onPress={verifyPassword}
                                style={{
                                    backgroundColor: "#7A7AFF",
                                    padding: 10,
                                    alignItems: "center",
                                    borderRadius: 5,
                                }}
                            >
                                <Text style={{ color: "white", fontSize: 16 }}>Enter</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
            </View>

        </View>
    );
}