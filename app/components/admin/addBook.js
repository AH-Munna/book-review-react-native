import { Button, StyleSheet, TextInput, View } from "react-native";
import { connect } from 'react-redux';
import { useState } from "react";
import { addBook } from "../../redux/ActionCreator";
import PickImage from "../pickImage";
import { Picker } from '@react-native-picker/picker';

const mapStateToProps = state => {
    return {
        books: state.state.books,
    }
}
const mapDispatchToProps = dispatchEvent => {
    return {
        addBook: book => dispatchEvent(addBook(book)),
    }
}

const AddBooks = props => {
    const [book, setBook] = useState("");
    const [selectedB, setSelectedB] = useState(null);
    const [bImage, setBImage] = useState("");
    const [desc, setDesc] = useState("");
    const [author, setAuthor] = useState("");
    const [category, setCategory] = useState("");

    const handleAddingBook = () => {
        if (!book || !bImage || !desc || !author) return alert("Enter all field");

        const newBook = { name: book, image: bImage, description: desc, author: author, category: category };
        props.addBook(newBook);
        setBook("");
        setBImage("");
        setDesc("");
        setAuthor("");
        setCategory("");
    }

    // let placeModal = null;
    // if (selectedB) {
    //     placeModal = <PlaceDetail place={selectedB} delete={handleDelete} />
    // }
    return (
        <View>
            <PickImage img={bImage} setImg={setBImage} />
            <View style={styles.inputView}>
                <TextInput value={book} onChangeText={text => setBook(text)} style={styles.input} placeholder="book name..." />
                <TextInput value={author} onChangeText={text => setAuthor(text)} style={styles.input} placeholder="author..." />
                <TextInput
                    multiline={true}
                    numberOfLines={4}
                    value={desc}
                    onChangeText={text => setDesc(text)}
                    style={styles.input}
                    placeholder="description..." />
                <Picker
                    selectedValue={category}
                    onValueChange={itemValue =>
                        setCategory(itemValue)
                    }>
                    <Picker.Item label="Drama" value="dra" />
                    <Picker.Item label="Romance" value="rom" />
                    <Picker.Item label="Comedy" value="com" />
                    <Picker.Item label="Thriller" value="thr" />
                </Picker>
                <Button onPress={() => handleAddingBook()} title="add" />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    input: {
        width: "80%",
        margin: 0,
        // backgroundColor: "rgba(0, 250, 0, 0.3)",
        borderBottomWidth: 1,
        borderBottomColor: "green",
        marginBottom: 20,
        // padding: 10,
    },
    inputView: {
        marginTop: 10,
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "column",
    },
    listItem: {
        width: "100%",
        padding: 10,
        backgroundColor: "#eee",
        margin: 5
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(AddBooks);