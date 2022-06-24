import { SafeAreaView, Text, View, Platform, StyleSheet, ImageBackground, Image, Dimensions, ScrollView, TextInput, TouchableOpacity, FlatList } from "react-native";
import Constants from 'expo-constants';
import background from '../../assets/images/details.jpg';
import { useEffect, useState } from "react";
import { connect } from 'react-redux';
import { loadReview, submitReview } from "../redux/ActionCreator";
import ReviewRender from "../components/reviewRender";

const mapStateToProps = state => {
    return {
        email: state.state.auth.email,
        reviews: state.state.reviews,
    }
}
const mapDispatchToProps = dispatchEvent => {
    return {
        submitReview: reviewObj => dispatchEvent(submitReview(reviewObj)),
        loadReview: () => dispatchEvent(loadReview()),
    }
}

const BookDetail = props => {
    const book = props.route.params.item;
    const [name, setName] = useState("");
    const [review, setReview] = useState("");
    if (!props.email) {
        debugger
        return (<View>
            <Text style={{ fontSize: 20 }}>sorry. You were logged out</Text>
        </View>);
    }

    const onSubmit = () => {
        if (!name.length || !review.length) return alert("All fields required");
        if (name.length && name.length < 3) return alert("name can't be that short");
        if (review.length && review < 3) return alert("write a review");

        // form successful >_<
        const reviewObj = { email: props.email, name: name, review: review, bookId: book.id }
        props.submitReview(reviewObj);
        setName("");
        setReview("");
    }
    let thisBooksReviews = [];
    useEffect(() => {
        props.loadReview();
    }, [])

    if (props.reviews) {
        for (let key in props.reviews) {
            if (props.reviews[key].bookId === book.id) {
                const reviewRender = <ReviewRender review={props.reviews[key]} key={Math.random()} />
                thisBooksReviews = [...thisBooksReviews, reviewRender]
            }
        }
    }
    return (
        <ImageBackground source={background} blurRadius={0}>
            {/* <SafeAreaView style={{ marginTop: Platform.OS === 'ios' ? 0 : Constants.statusBarHeight }}> */}
            <ScrollView>
                <View style={styles.container}>
                    <Text style={styles.name}>{book.name}</Text>
                    <Text style={styles.author}>by: {book.author}</Text>
                    <Image source={{ uri: book.image }} style={styles.img} />
                    <Text style={styles.descName}>About This Book</Text>
                    <Text style={styles.desc}>{book.description}</Text>

                    <View style={{ marginTop: 30 }}>
                        <View style={{ alignItems: 'center' }}>
                            <Text style={{ color: 'wheat', fontSize: 28, marginBottom: 5 }}>Reviews</Text>
                        </View>
                        {thisBooksReviews}
                    </View>

                    <Text style={{ color: 'white', fontSize: 16 }}>your Email: {props.email}</Text>
                    <TextInput
                        textAlignVertical="top"
                        onChangeText={text => setName(text)}
                        style={styles.input}
                        placeholder="name..."
                        value={name}
                    />
                    <TextInput
                        multiline={true}
                        numberOfLines={7}
                        onChangeText={text => setReview(text)}
                        style={styles.input}
                        placeholder="your review..."
                        value={review}
                    />
                    <TouchableOpacity style={styles.btnContainer} onPress={onSubmit}>
                        <Text style={styles.btnStyle}>Post Review</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
            {/* </SafeAreaView> */}
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 15,
        flexDirection: 'column',
        alignItems: 'center'
    },
    img: {
        width: 350,
        height: 525,
        marginBottom: 30,
    },
    name: {
        marginTop: 20,
        fontSize: 40,
        color: 'rgb(0, 255, 255)',
        paddingHorizontal: 20,
    },
    author: {
        fontSize: 22,
        color: 'wheat',
        marginBottom: 20,
    },
    desc: {
        color: 'white',
        fontSize: 20,
    },
    descName: {
        fontSize: 22,
        color: 'white',
        marginVertical: 15,
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

export default connect(mapStateToProps, mapDispatchToProps)(BookDetail);