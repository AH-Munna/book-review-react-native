import Home from './Home.js';
import Library from "./Library.js";
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BookDetail from './BookDetail.js';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Text, TouchableOpacity, View } from 'react-native';
import Constants from 'expo-constants';
import addBook from '../components/admin/addBook.js';
import BookList from './BookList.js';
import Login from '../components/auth/Login.js';
import { connect } from 'react-redux';
import { LogoutUser } from '../redux/AuthActionCreator.js';

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

const mapStateToProps = state => {
    return {
        isAuthed: state.state.auth.isAuth,
    }
}

const Menu = props => {
    return (
        <Stack.Navigator>
            <Stack.Screen name='Menu Options' component={Library} options={{
                header: () => (
                    <View>
                        <View style={{
                            flexDirection: "row",
                            marginTop: Constants.statusBarHeight,
                        }}>
                            <TouchableOpacity onPress={() => { props.navigation.toggleDrawer(true) }}>
                                <Icon name="bars" size={20} style={{
                                    padding: 20,
                                }} />
                            </TouchableOpacity>
                            <Text style={{ fontSize: 20, marginStart: 15, marginTop: 15, color: "black" }}>Library</Text>
                        </View>
                        <View
                            style={{
                                borderBottomColor: 'rgba(214, 214, 214, 0.5)',
                                borderBottomWidth: 1,
                                shadowOffset: { width: 1, height: 1 },
                                shadowOpacity: .5,
                                shadowRadius: 3,
                                elevation: 5,
                            }}
                        />
                    </View>
                ),
                headerRight: () => (
                    <TouchableOpacity onPress={() => {
                        return props.navigation.navigate('Login', { myProp: true })
                    }}>
                        <Icon name="sign-out" size={26} />
                    </TouchableOpacity>
                )
            }} />
            <Stack.Screen name='Book Detail' component={BookDetail} options={{
                headerRight: () => (
                    <TouchableOpacity onPress={() => {
                        return props.navigation.navigate('Login', { myProp: true })
                    }}>
                        <Icon name="sign-out" size={26} />
                    </TouchableOpacity>
                )
            }} />
            <Stack.Screen name='Book List' component={BookList} options={{
                headerRight: () => (
                    <TouchableOpacity onPress={() => {
                        return props.navigation.navigate('Login', { myProp: true })
                    }}>
                        <Icon name="sign-out" size={26} />
                    </TouchableOpacity>
                )
            }} />
        </Stack.Navigator>
    );
}

const HomeDrawer = props => {
    return (
        <Drawer.Navigator initialRouteName="Home">
            {/* <Drawer.Screen name="Add Book" component={addBook} /> */}
            <Drawer.Screen name="Home" component={Home} options={{
                headerRight: () => (
                    <TouchableOpacity onPress={() => {
                        return props.navigation.navigate('Login', { myProp: true })
                    }}>
                        <Icon name="sign-out" size={26} style={{ paddingRight: 10 }} />
                    </TouchableOpacity>
                )
            }} />
            <Drawer.Screen name="Library" component={Menu} options={{ headerShown: false }} />
            {/* <Drawer.Screen name={props.isAuthed ? "Logout" : "Login"} component={Login} /> */}
        </Drawer.Navigator>
    );
}

const AppNavigator = props => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="HomeDrawer" component={HomeDrawer} options={{ headerShown: false, title: 'Home' }} />
        </Stack.Navigator>
    );
}

export default connect(mapStateToProps)(AppNavigator);