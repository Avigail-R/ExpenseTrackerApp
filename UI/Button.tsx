import {Pressable, Text, View} from "react-native";
import {GlobalStyles} from "../constants/Styles";

function Button({children, onPress, mode, style}: {children?: string, onPress: () => void, mode?: 'flat', style?: any}) {
  return (
      <View style={style}>
        <Pressable onPress={onPress} style={({pressed}) => pressed && Styles.pressed}>
          <View style={[Styles.button, mode === 'flat' && Styles.flat]}>
            <Text style={[Styles.buttonsText, mode === 'flat' && Styles.flatText]}>
              {children}
            </Text>
          </View>
        </Pressable>
      </View>
  );
}
  
export default Button;

const Styles = {
  button: {
    borderRadius: 4,
    padding: 8,
    backgroundColor: GlobalStyles.colors.primary500
  },
  flat: {
    backgroundColor: "transparent",
  },
  buttonsText:{
    color:'white',
    textAlign:'center',
  },
  flatText:{
    color:GlobalStyles.colors.primary200
  },
  pressed: {
    opacity: 0.75,
    backgroundColor: GlobalStyles.colors.primary100,
    borderRadius: 4
  }
};