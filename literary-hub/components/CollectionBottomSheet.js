import React, { forwardRef, useRef, useState, useEffect } from 'react';
import { View, StyleSheet, Text, Button, TouchableOpacity, Alert, Dimensions } from 'react-native';
import BottomSheet, { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import axios from "axios";
import DialogInput from 'react-native-dialog-input';

const CollectionBottomSheet = forwardRef((props, ref) => {
  const sheetRef = useRef(null);
  const [collections, setCollections] = useState([]);
  const [isDialogVisible, setDialogVisible] = useState(false);
  const [inCollection, handleInCollection] = useState(false);

  const showDialog = () => {
    setDialogVisible(true);
  };

  const closeDialog = () => {
    setDialogVisible(false);
  };

  useEffect(() => {
    if (props.userData) {
      getCollections(props.userData._id);
    }
  }, [props.userData]);

  const getCollections = () => {
    axios
      .get("http://localhost:3000/getcollections", { params: { id: props.userData._id } })
      .then((response) => {
        setCollections(response.data);
      })
      .catch((error) => {
        console.log("Error fetching collections");
      });
  };


  const isPoeminCollection = (poemId, poems) => {
    const isPoemInCollection = poems?.includes(poemId);
  return isPoemInCollection ?? false;

  }
  const handleSubmitNewCollection = (inputText) => {
    const newCollection = {
      user: props.userData,
      title: inputText,
    };

    axios
      .post('http://localhost:3000/collection/new', newCollection)
      .then((response) => {
        console.log(response);
        closeDialog();
      })
      .catch((error) => {
        if (error.response && error.response.data) {
          Alert.alert("Collection Creation Error", error.response.data.message);
        } else {
          Alert.alert("Collection Creation Error", "An error occurred while creating the collection.");
        }
        console.log("error", error);
      });

  };

  const addPoemToCollection = (poemId, collectionId) => {
    axios
      .post('http://localhost:3000/addpoemtocollection', {
        poemId: poemId,
        collectionId: collectionId,
      })
      .then((response) => {
        console.log('Poem added to collection:', response.data);
      })
      .catch((error) => {
        console.log('Error adding poem to collection:', error);
      });
  };


  return (
    <BottomSheet

      ref={(bottomSheet) => {
        sheetRef.current = bottomSheet;
        if (ref) {
          ref.current = bottomSheet;
        }
      }}
      index={-1}
      snapPoints={['25%', '50%', '50%']}
      enablePanDownToClose={true}
      handleIndicatorStyle={{ backgroundColor: '#fff' }}
      backgroundStyle={{ backgroundColor: '#222' }}
    >
      <View style={styles.contentContainer}>
        <Text style={styles.containerHeadline}>{props.title}</Text>
        <BottomSheetScrollView style={{ backgroundColor: 'white', width: Dimensions.get('screen').width }}>
          <TouchableOpacity style={styles.button} onPress={showDialog}>
            <Text style={styles.buttonText}>Add to New Collection</Text>
          </TouchableOpacity>

          <DialogInput
            isDialogVisible={isDialogVisible}
            title={'Add to New Collection'}
            hintInput={'Enter collection title'}
            submitInput={(inputText) => handleSubmitNewCollection(inputText)}
            closeDialog={closeDialog}
          />

          {collections.map((collection) => (
            
            <View key={collection._id} style={styles.collectionRow}>
              <Text style={{}}>Image Placeholder </Text>
              <View style={{ justifyContent: 'flex-start', gap: 10 }}>
                
                <Text style={styles.collectionTitle}>{collection.title}</Text>

              </View>
              <TouchableOpacity
                style={styles.collectionButton}
                onPress={() => {
                  addPoemToCollection(props.poem._id, collection._id);

                }}
              >

                <Text style={styles.buttonText}>
                  {isPoeminCollection(props.poem._id, collection.poemsInCollection)? 'Added':'Add'}
                </Text>
              </TouchableOpacity>

            </View>

          ))}
        </BottomSheetScrollView>
      </View>

    </BottomSheet >
  );
});

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    alignItems: 'center',
  },
  containerHeadline: {
    fontSize: 24,
    fontWeight: '600',
    padding: 20,
    color: '#fff',
  },
  button: {
    backgroundColor: '#644980',
    padding: 10,
    borderRadius: 5,
    margin: 10,
    width: Dimensions.get('window').width * 0.5,
    alignSelf: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  collectionRow: {
    flexDirection: 'row',
    width: Dimensions.get('window').width * 0.7,
    justifyContent: 'space-between',
    alignItems: 'center',
    alignSelf:'center',
    padding: 10,
    margin: 3,
    backgroundColor: '#f6f5f5',
    borderRadius: 5,

  },
  collectionInfo: {
    flexDirection: 'column',
  },
  collectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    padding: 10,
  },
  collectionPoems: {
    fontSize: 10,
  },
  collectionButton: {
    backgroundColor: '#644980',
    padding: 10,
    borderRadius: 5,
  },
});

export default CollectionBottomSheet;
