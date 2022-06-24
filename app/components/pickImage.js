import { Button, Image, View } from "react-native";
import * as ImgPicker from 'expo-image-picker';

const PickImage = props => {
    const handleImgPick = async () => {
        try {
            let result = await ImgPicker.launchImageLibraryAsync({
                mediaTypes: ImgPicker.MediaTypeOptions.All,
                allowsEditing: true,
                aspect: [16, 9],
                quality: 1,
                base64: true,
            })
            if (!result.cancelled) {
                props.setImg(`data:image/jpg;base64,${result.base64}`);
            }
        }
        catch (e) {
            console.log(e);
            debugger
        }
    }

    let showImage = null;
    if (props.img) showImage = <Image source={{ uri: props.img }} style={{ width: "100%", height: 200 }} />;
    return (
        <View style={{ marginTop: 50, marginHorizontal: 30 }}>
            {showImage}
            <Button title="Add image" onPress={handleImgPick} />
        </View>
    );
}

export default PickImage;