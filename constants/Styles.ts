import Colors from "./Colors";
import { StyleSheet } from "react-native";

const Styles = StyleSheet.create({
    pageContainer: {
        width: '100%',
        paddingHorizontal: 20,
        paddingTop: 20,
        paddingBottom: 100,  
    },
    pageTitle: {
        width:'100%',
        marginBottom: 20,
        fontSize: 26,
        fontWeight: 'bold',
        color: Colors.primary,
        paddingBottom:10,
        borderBottomWidth:1,
        borderColor:Colors.border
      },
      heading1: {
        fontSize: 22,
        fontWeight: '600',
        color: Colors.textPrimary,
        marginBottom: 10
    },
    heading2: {
        fontSize: 20,
        fontWeight: '500',
        color: Colors.textSecondary,
        marginBottom: 8
    },
      
      normalText: {
        fontSize: 18,
        fontWeight: '400',
        color: Colors.textPrimary,
        padding:8
      },
      smallText: {
        fontSize: 14,
        fontWeight: '300',
        color: Colors.textSecondary,
        padding: 4
    },
    inputField: {
        borderBottomWidth: 1,
        borderColor: Colors.primary,
        borderRadius: 8,
        padding: 10,
        fontSize: 16,
        color: Colors.textPrimary,
        marginBottom: 15
    },
    card: {
        backgroundColor: Colors.surface,
        borderRadius: 10,
        padding: 15,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
        marginVertical: 10,
        borderColor: Colors.border,
        borderWidth: 1
    },
    cardTitle: {
        fontSize: 20,
        fontWeight: '600',
        color: Colors.textPrimary,
        marginBottom: 5
    },
    cardText: {
        fontSize: 16,
        color: Colors.textSecondary,

    },
    cardText2: {
        fontSize: 16,
        color: Colors.textPrimary,
        fontWeight:'600'
    }
})

export default Styles