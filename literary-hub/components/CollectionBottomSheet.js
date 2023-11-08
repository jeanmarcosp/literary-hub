import React, { forwardRef, useRef, useState, useEffect } from 'react';
import { View, StyleSheet, Text, Button, TouchableOpacity, Alert } from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';
import axios from "axios";
import DialogInput from 'react-native-dialog-input';

const CollectionBottomSheet = forwardRef((props, ref) => {
  const sheetRef = useRef(null);
  const [collections, setCollections] = useState([]);
  const [isDialogVisible, setDialogVisible] = useState(false);


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

  const handleExistingCollection = () => {
    console.log("hey");
  };

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
 // Function to determine whether the poem is already in a collection
  const isPoemInCollection = (collection, poemId) => {
    return collection.poems.some((poem) => poem._id === poemId);
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
              <Text style={styles.collectionTitle}>{collection.title}</Text>
            <TouchableOpacity
              style={styles.collectionButton}
              onPress={() => {
                  addPoemToCollection(props.poem._id, collection._id);
                
              }}
            >
              <Text style={styles.buttonText}>
                Add
              </Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>
    </BottomSheet>
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
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  collectionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
    padding:10,
  },
  collectionPoems: {
    fontSize: 12,
  },
  collectionButton: {
    backgroundColor: '#644980',
    padding: 10,
    borderRadius: 5,
  },
});

export default CollectionBottomSheet;
