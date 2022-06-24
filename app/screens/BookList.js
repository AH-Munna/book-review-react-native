import { useEffect } from "react";
import { FlatList, Image, ImageBackground, StyleSheet, Text, TouchableHighlight, TouchableOpacity, View } from "react-native";
import { connect } from "react-redux";
import { loadBooks } from "../redux/ActionCreator";
import background from '../../assets/images/booklist.jpg';

const mapStateToProps = state => { return { books: state.state.books } }
const mapDispatchToProps = dispatchEvent => { return { loadBooks: () => dispatchEvent(loadBooks()) } }

const BookList = props => {
    useEffect(() => {
        props.loadBooks();
    }, [])
    let DATA = [];
    if (props.books) {
        for (let key in props.books) {
            const book = props.books[key]
            if (book.category === props.route.params.category)
                DATA = [...DATA, { ...book, id: key }];
        }
    }
    const renderItem = ({ item }) => {
        return (
            <TouchableOpacity onPress={() => props.navigation.navigate('Book Detail', { item })}>
                <View style={styles.container}>
                    <Image source={{ uri: item.image }} style={styles.img} />
                    <Text style={styles.book}>{item.name}</Text>
                    <Text style={styles.author}>by: {item.author}</Text>
                    {/* <Text numberOfLines={3} style={styles.desc}>by: {item.description}</Text> */}
                </View>
            </TouchableOpacity>
        );
    };
    return (
        <ImageBackground source={background} style={{ width: "100%", flex: 1 }} blurRadius={0}>
            <FlatList
                data={DATA}
                renderItem={renderItem}
                keyExtractor={book => book.id} />
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "column",
        padding: 20,
        alignItems: 'center',
    },
    img: {
        width: 200,
        height: 300,
    },
    book: {
        fontSize: 32,
        color: 'white',
        fontWeight: 'bold'
    },
    author: {
        fontSize: 18,
        color: 'wheat',
    },
    desc: {
        color: 'red',
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(BookList);