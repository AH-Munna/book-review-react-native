import { SafeAreaView, Text, View, Platform, Button, StyleSheet, TouchableOpacity, ImageBackground } from "react-native";
import Constants from 'expo-constants';
import background from '../../assets/images/category.jpg';
// import { useIsFocused } from '@react-navigation/native';

const Library = props => {
    return (
        <ImageBackground source={background} style={{ width: "100%", flex: 1 }}>
            <SafeAreaView style={{ marginTop: Platform.OS === 'ios' ? 0 : Constants.statusBarHeight }}>
                <View style={{ alignItems: 'center', marginBottom: 20 }}>
                    <Text style={{ fontSize: 48, color: 'rgb(53, 255, 144)', fontWeight: 'bold' }}>Book Categories</Text>
                </View>
                <View style={{ alignItems: 'center' }}>
                    <TouchableOpacity style={styles.btnContainer}
                        onPress={() => props.navigation.navigate('Book List', { category: "dra" })}>
                        <Text style={styles.btnStyle}>Drama</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ alignItems: 'center' }}>
                    <TouchableOpacity style={styles.btnContainer}
                        onPress={() => props.navigation.navigate('Book List', { category: "rom" })}>
                        <Text style={styles.btnStyle}>Romance</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ alignItems: 'center' }}>
                    <TouchableOpacity style={styles.btnContainer}
                        onPress={() => props.navigation.navigate('Book List', { category: "thr" })}>
                        <Text style={styles.btnStyle}>Thriller</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ alignItems: 'center' }}>
                    <TouchableOpacity style={styles.btnContainer}
                        onPress={() => props.navigation.navigate('Book List', { category: "com" })}>
                        <Text style={styles.btnStyle}>Comedy</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    btnStyle: {
        fontSize: 22,
        color: "#fff",
        alignSelf: "center"
    },
    btnContainer: {
        width: 200,
        height: 60,
        paddingVertical: 5,
        backgroundColor: "rgb(37, 178, 91)",
        borderRadius: 5,
        marginTop: 20,
        justifyContent: "center",
        alignItems: "center",
        elevation: 5,
    }
})

export default Library;