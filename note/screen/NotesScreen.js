import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Modal,
  TextInput,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

const colors = ["#FF99CC", "#FF6666", "#99FF99", "#FFFF99", "#99CCFF", "#CC99FF"];

export default function NotesScreen() {
  const route = useRoute();
  const { category } = route.params;
  
  // State để lưu danh sách ghi chú
  const [notes, setNotes] = useState([
    { id: "1", title: "UI concepts worth existing", color: "#FF99CC" },
    { id: "2", title: "Book Review: The Design of Everyday Things", color: "#FF6666" },
  ]);
  
  // State cho modal thêm ghi chú
  const [modalVisible, setModalVisible] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [selectedColor, setSelectedColor] = useState(colors[0]);

  // Hàm thêm ghi chú mới
  const addNote = () => {
    if (newTitle.trim() === "") return;

    const newNote = {
      id: Math.random().toString(),
      title: newTitle,
      color: selectedColor,
    };

    setNotes([...notes, newNote]);
    setNewTitle("");
    setModalVisible(false);
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#1E1E1E", padding: 20 }}>
      <Text style={{ color: "white", fontSize: 20, marginBottom: 10 }}>
        {category.name} Notes
      </Text>

      <FlatList
        data={notes}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View
            style={{
              backgroundColor: item.color,
              padding: 15,
              borderRadius: 10,
              marginBottom: 10,
            }}
          >
            <Text style={{ fontSize: 16, color: "black" }}>{item.title}</Text>
          </View>
        )}
      />

      {/* Nút thêm ghi chú */}
      <TouchableOpacity
        onPress={() => setModalVisible(true)}
        style={{
          position: "absolute",
          bottom: 20,
          right: 20,
          backgroundColor: "black",
          padding: 15,
          borderRadius: 50,
        }}
      >
        <Ionicons name="add" size={30} color="white" />
      </TouchableOpacity>

      {/* Modal thêm ghi chú */}
      <Modal visible={modalVisible} transparent animationType="slide">
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(0,0,0,0.5)",
          }}
        >
          <View
            style={{
              backgroundColor: "white",
              padding: 20,
              borderRadius: 10,
              width: "80%",
            }}
          >
            <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 10 }}>
              Thêm mới
            </Text>

            <TextInput
              placeholder="thêm ghi chú...."
              value={newTitle}
              onChangeText={setNewTitle}
              style={{
                borderWidth: 1,
                borderColor: "#ccc",
                padding: 10,
                borderRadius: 5,
                marginBottom: 15,
              }}
            />

            <Text style={{ fontSize: 16, marginBottom: 5 }}>Chọn color:</Text>
            <View style={{ flexDirection: "row", marginBottom: 15 }}>
              {colors.map((color) => (
                <TouchableOpacity
                  key={color}
                  onPress={() => setSelectedColor(color)}
                  style={{
                    width: 30,
                    height: 30,
                    backgroundColor: color,
                    borderRadius: 15,
                    marginHorizontal: 5,
                    borderWidth: selectedColor === color ? 2 : 0,
                    borderColor: "black",
                  }}
                />
              ))}
            </View>

            <TouchableOpacity
              onPress={addNote}
              style={{
                backgroundColor: "#7A7AFF",
                padding: 10,
                borderRadius: 5,
                alignItems: "center",
              }}
            >
              <Text style={{ color: "white", fontSize: 16 }}>Thêm</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}
