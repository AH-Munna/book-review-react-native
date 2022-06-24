import { SafeAreaView, Text, View, Platform, StyleSheet, TouchableOpacity } from "react-native";
import Constants from 'expo-constants';

const Home = props => {
    return (
        <SafeAreaView style={{ marginTop: Platform.OS === 'ios' ? 0 : Constants.statusBarHeight }}>
            <View style={{ alignItems: "center" }}>
                <Text style={styles.homeText}>The Home page is yet to be</Text>
                <Text style={styles.homeText}>designed</Text>
            </View>
            <View style={{ alignItems: 'center', marginTop: 200 }}>
                <TouchableOpacity style={styles.btnContainer} onPress={() => props.navigation.navigate('Library')}>
                    <Text style={styles.btnStyle}>Let's go to the Library instead</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    btnStyle: {
        fontSize: 16,
        color: "#fff",
        alignSelf: "center"
    },
    btnContainer: {
        flexDirection: "row",
        width: "80%",
        height: 50,
        paddingVertical: 5,
        backgroundColor: "rgb(37, 178, 91)",
        borderRadius: 5,
        marginTop: 10,
        justifyContent: "center",
        alignItems: "center"
    },
    homeText: {
        color: 'green',
        fontSize: 30,
    }
})

export default Home;