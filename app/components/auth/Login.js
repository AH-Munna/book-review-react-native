import background from '../../../assets/images/login.jpg';
import { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
import { connect } from 'react-redux';
import { LogoutUser, signUp } from '../../redux/AuthActionCreator';
import { useIsFocused } from '@react-navigation/native';

const mapStateToProps = state => {
    return {
        isAuthed: state.state.auth.isAuth,
    }
}
const mapDispatchToProps = dispatchEvent => {
    return {
        authenti: (email, password, mode) => dispatchEvent(signUp(email, password, mode)),
        logoutUser: () => dispatchEvent(LogoutUser()),
    }
}

const Login = props => {
    const [authStates, setAuthStates] = useState({
        mode: "login",
        inputs: {
            email: "",
            password: "",
            confirmPassword: "",
        }
    })
    const [shouldLogout, setShouldLogout] = useState(true);
    const isFocused = useIsFocused();
    useEffect(() => {
        setAuthStates({
            ...authStates,
            inputs: {
                email: "",
                password: "",
                confirmPassword: "",
            }
        })
    }, [isFocused]);
    if (props.route.params && props.route.params.myProp === true && shouldLogout) {
        setShouldLogout(false);
        // props.logoutUser();
    }

    const updateInputState = (value, name) => {
        setAuthStates({
            ...authStates,
            inputs: {
                ...authStates.inputs,
                [name]: value,
            }
        })
    }
    const onSubmit = () => {
        const email = authStates.inputs.email;
        const password = authStates.inputs.password;
        const confirmPassword = authStates.inputs.confirmPassword;

        if (!email || !password) return alert("All fields required");
        if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(.\w{2,3})+$/.test(email)) return alert("Enter valid email");
        if (authStates.mode === 'sign up' && password.length < 6) return alert("password to short");
        if (authStates.mode === 'sign up' && password !== confirmPassword) return alert("password didn't match");

        // form successful >_<
        if (authStates.mode === 'login') {
            props.authenti(email, password, authStates.mode);
        } else {
            props.authenti(email, password, authStates.mode);
            setAuthStates({
                ...authStates,
                inputs: {
                    email: "",
                    password: "",
                    confirmPassword: "",
                }
            })
        }
    }
    return (
        <ImageBackground source={background} style={{ width: "100%", flex: 1 }} blurRadius={5}>
            <View style={styles.loginView}>
                <TouchableOpacity style={{
                    ...styles.btnContainer,
                    backgroundColor: "rgb(85, 147, 133)",
                    width: "60%",
                    height: 35,
                    marginTop: -100,
                    marginBottom: 50,
                }} onPress={() => {
                    setAuthStates({
                        ...authStates,
                        mode: authStates.mode === "login" ? "sign up" : 'login',
                        inputs: {
                            email: "",
                            password: "",
                            confirmPassword: "",
                        }
                    })
                }}>
                    <Text style={styles.btnStyle}>{authStates.mode === "login" ? "Switch to Sign Up" : "Switch to Login"}</Text>
                </TouchableOpacity>
                <TextInput
                    onChangeText={value => updateInputState(value, "email")}
                    style={styles.input}
                    placeholder="example@mail.com"
                    value={authStates.inputs.email}
                />
                <TextInput
                    onChangeText={value => updateInputState(value, "password")}
                    style={styles.input}
                    placeholder="Password"
                    value={authStates.inputs.password}
                />
                {authStates.mode === 'login' ? null : <TextInput
                    onChangeText={value => updateInputState(value, "confirmPassword")}
                    style={styles.input}
                    placeholder="Confirm Password"
                    value={authStates.inputs.confirmPassword}
                />}
                <TouchableOpacity style={styles.btnContainer} onPress={onSubmit}>
                    <Text style={styles.btnStyle}>{authStates.mode === "login" ? "Login" : "Sign Up"}</Text>
                </TouchableOpacity>
            </View>
        </ImageBackground >
    );
}

const styles = StyleSheet.create({
    loginView: {
        flex: 1,
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center"
    },
    input: {
        width: "85%",
        padding: 5,
        marginTop: 10,
        backgroundColor: "#eee",
        borderBottomWidth: 1,
        borderColor: "#009688",
        borderRadius: 4
    },
    btnStyle: {
        fontSize: 16,
        color: "#fff",
        alignSelf: "center"
    },
    btnContainer: {
        flexDirection: "row",
        width: 150,
        height: 40,
        paddingVertical: 5,
        backgroundColor: "rgb(37, 178, 91)",
        borderRadius: 5,
        marginTop: 10,
        justifyContent: "center",
        alignItems: "center"
    }
})


export default connect(mapStateToProps, mapDispatchToProps)(Login);