import { StyleSheet, Text, View, Image, Dimensions, StatusBar, Platform } from 'react-native'
import React, { useEffect }from 'react'
import LottieView from 'lottie-react-native';

const { width, height } = Dimensions.get('window');

const SplashScreen = ({navigation}) => {
    useEffect(() => {
        // Sau 3 giây, chuyển hướng đến màn hình Login
        setTimeout(() => {
            navigation.replace('homescreen'); // Dùng replace để không thể quay lại SplashScreen
        }, 7000); // 3000ms = 3 giây
    }, [navigation]);
    return (
        <View style={styles.safeArea}>
            <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />
            <View style={styles.splash_screen}>
                <View style={styles.img}>
                    <Image source={require('../assets/images/img_logo.png')} style={styles.img_logo}></Image>
                    <Text style={styles.splash_text}>Ghi chú của bạn</Text>
                    <LottieView
                        source={require('../json/Animation - 1742124525770.json')}
                        autoPlay
                        loop
                        style={styles.animation}
                    />
                </View>
            </View>
        </View>
    )
}

export default SplashScreen

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight * 0.35 : 10, // Chừa 50% hoặc 10 pixel
        backgroundColor: '#fff', // Màu nền phù hợp
    },
    splash_screen: { flex: 1, backgroundColor: 'rgba(155, 144, 255, 1)' },
    img: { flex: 1, justifyContent: 'center', alignItems: 'center', marginBottom: height * 0.4 },
    img_logo: { width: width * 0.46, height: height * 0.32, resizeMode: 'center' },
    splash_text: { color: 'white', fontWeight: 'bold', fontSize: width * 0.08, },
    animation: {
        position: 'absolute', // Đặt animation lên trên
        width: width * 0.80, // 40% chiều rộng màn hình
        height: width * 0.46, // Tương ứng để giữ tỉ lệ
        zIndex: 1, // Đảm bảo animation nằm trên hình nền
        top: height * 0.75, // Tùy chỉnh khoảng cách từ đáy (40% chiều cao)
    },
})