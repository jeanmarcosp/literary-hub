import { StyleSheet, Text, View, SafeAreaView, Image, TouchableOpacity, FlatList, TextInput } from 'react-native'
import { React, useState }from 'react'
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from '@react-navigation/native';

const CreateCollection = () => {

    const navigation = useNavigation();
    const [name, setName] = useState('');

    return (
        <SafeAreaView style={styles.mainContainer}>
            <View style={styles.container}>
                <View style={styles.main}>
                    <Text style={styles.title}>Create new collection</Text>
                    <TouchableOpacity onPress={() => {navigation.goBack()}}>
                        <Ionicons name="close" size={30} color="black" />
                    </TouchableOpacity>
                </View>

                <View style={styles.coverPhotoSection}>
                    <Text style={styles.header}>Cover photo</Text>
                    <View style={styles.emptyCoverPhoto}>
                        <View style={styles.addCoverPhotoCTA}>
                            <Ionicons name="add" size={30} color="#6C7476" />
                        </View>
                    </View>
                    <TouchableOpacity>
                        <View style={styles.editPhotoCTA}>
                            <Text style={styles.editPhotoText}>Edit photo</Text>
                        </View>
                    </TouchableOpacity>
                </View>

                <View style={styles.nameSection}>
                    <View style={styles.nameInfo}>
                        <Text style={styles.header}>Name</Text>
                        <Text style={styles.headerDescription}>50 characters max</Text>
                    </View>
                    
                    <TextInput
                        style={styles.nameInput}
                        onChangeText={setName}
                        value={name}
                        placeholder="Enter a collection name"
                        maxLength={50}
                    />
                </View>

                <TouchableOpacity>
                    <View style={styles.createCTA}>
                        <Text style={styles.createText}>Create</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

export default CreateCollection;

const styles = StyleSheet.create({

    mainContainer: {
        flex: 1,
        backgroundColor: 'white',
    },

    container: {
        paddingHorizontal: 25,
        paddingTop: 10,
    },

    main: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },

    title: {
        fontSize: 20,
    },

    coverPhotoSection: {
        rowGap: 10,
        marginTop: 30,
    },

    header: {
        fontSize: 17,
    },

    headerDescription: {
        color: '#9CB5BB'
    },

    emptyCoverPhoto: {
        width: 200,
        height: 200,
        backgroundColor: '#F4F5F4',
        borderRadius: 10,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },

    addCoverPhotoCTA: {
        borderRadius: 100,
        padding: 3,
        alignSelf: 'baseline',
        backgroundColor: '#E2E5E6',
    },

    editPhotoCTA: {
        alignSelf: 'baseline',
        paddingHorizontal: 5,
        paddingVertical: 5,
        borderWidth: 1,
        borderRadius: 3,
        borderColor: '#E2E5E6',
        backgroundColor: '#F4F5F4'
    },

    editPhotoText: {
        color: '#6C7476',
    },

    nameSection: {
        rowGap: 10,
        marginTop: 30,
    },

    nameInfo: {
        rowGap: 3,
    },

    nameInput: {
        borderWidth: 1,
        borderRadius: 4,
        padding: 10,
    },

    createCTA: {
        borderRadius: 200,
        alignSelf: 'baseline',
        paddingVertical: 10,
        paddingHorizontal: 30,
        backgroundColor: '#373F41',
        marginTop: 40,
        alignSelf: 'center'
    },

    createText: {
        fontSize: 18,
        color: 'white'
    }
})