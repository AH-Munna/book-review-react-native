import { StyleSheet, Text, View } from "react-native";

const ReviewRender = props => {
    if (!props) return (<View></View>);
    // debugger
    return (
        <View style={{ marginBottom: 20 }}>
            <Text style={styles.review}>{props.review.review}</Text>
            <Text style={styles.name}>by: {props.review.name}</Text>
        </View>
    );
}
const styles = StyleSheet.create({
    review: {
        color: 'rgb(0, 238, 255)',
        fontSize: 18
    },
    name: {
        color: 'rgb(255, 20, 118)',
        fontSize: 16
    }
})

export default ReviewRender;