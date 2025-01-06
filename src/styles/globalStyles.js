import { StyleSheet } from "react-native";
import { appColors } from "../constants/appColors";
import { shadow } from "react-native-paper";
// import { fontFamilies } from "";

export const globalStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: appColors.white,
        alignItems: 'center', 
        justifyContent: 'center', 
        padding: 20
    },
    text:{
        fontSize: 14,
        color: appColors.text,
    },
    button: {
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: appColors.white,
        paddingHorizontal: 16,
        paddingVertical: 16,
        minHeight: 56,
        flexDirection: 'row'
    },
    downloadButton: {
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
        height: 38,
        width: 94,
        flexDirection: 'row',
    },
    section: {
        paddingHorizontal: 16,
        paddingBottom: 10,
        
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    column:{
        flexDirection: 'column',
        justifyContent: 'flex-start',
    },
    shadow: {
        shadowColor: 'rgba(0,0,0,0.5)',
        shadowOffset:{
            width: 0,
            height: 4
        },
        shadowOpacity: 0.25,
        shadowRadius: 8,
        elevation: 6
    },
    divider: {
        height: 1,
        backgroundColor: appColors.white,
        opacity: 0.1,
        width: '100%',
    },
})