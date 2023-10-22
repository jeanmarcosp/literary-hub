import { StyleSheet, Text, View, SafeAreaView, Image, TouchableOpacity } from 'react-native'
import { React, useState }from 'react'
import { Ionicons } from "@expo/vector-icons";



const ProfileScreen = () => {

  const [segmentedControlView, setSegmentedControlView] = useState('Collections')

  return (
    <SafeAreaView style={styles.container}>
      <Image 
        source={{ uri: 'https://davidbruceblog.files.wordpress.com/2014/05/img_9760.jpg' }} 
        style={styles.profilePic}
      />
      
      <View style={styles.names}>
        <Text style={styles.name}>Ava Robinson</Text>
        <Text style={styles.username}>@dietcokelover89</Text>
      </View>

      <View style={styles.metrics}>
        <View style={styles.metric}>
          <Text style={styles.metricNumber}>26</Text>
          <Text style={styles.metricName}>Collections</Text>
        </View>

        <View style={styles.metric}>
          <Text style={styles.metricNumber}>244</Text>
          <Text style={styles.metricName}>Followers</Text>
        </View>

        <View style={styles.metric}>
          <Text style={styles.metricNumber}>57</Text>
          <Text style={styles.metricName}>Following</Text>
        </View>
      </View>

      <TouchableOpacity>
        <View style={styles.followButton}>
          <Ionicons name="person-add-outline" size={17} color="white" />
          <Text style={styles.followText}>Follow</Text>
        </View>
      </TouchableOpacity>

      <View style={styles.segmentedControl}>
        <TouchableOpacity onPress={() => setSegmentedControlView('Collections')}>
          <View style={styles.segmentedControlSelected}>
            <Text style={styles.segmentedControlSelectedText}>Collections</Text>
          </View>
        </TouchableOpacity>
        
        <TouchableOpacity onPress={() => setSegmentedControlView('Liked poems')}>
          <View style={styles.segmentedControlUnselected}>
            <Text style={styles.segmentedControlUnselectedText}>Liked poems</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setSegmentedControlView('Saved quotes')}>
          <View style={styles.segmentedControlUnselected}>
            <Text style={styles.segmentedControlUnselectedText}>Saved quotes</Text>
          </View>
        </TouchableOpacity>
      </View>

      <View style={styles.collection}>
        <Image
          source={{ uri: 'https://davidbruceblog.files.wordpress.com/2014/05/img_9760.jpg' }}
          style={styles.collectionPic}
        />
        <View style={styles.collectionText}>
          <Text style={styles.collectionName}>Zen zone</Text>
          <Text style={styles.collectionStat}>26 poems</Text>
        </View>
        
      </View>

    </SafeAreaView>
  )
}

export default ProfileScreen

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
    },

    profilePic: {
      width: 100,
      height: 100,
      borderRadius: 100/ 2,
      marginTop: 20,
    },

    names: {
      marginTop: 10,
    },

    name: {
      fontSize: 20
    },

    username: {
      fontSize: 15
    },

    metrics: {
      flexDirection: 'row',
      columnGap: 20,
      marginTop: 10,
    },

    metric: {
      alignItems: 'center',
    },

    metricNumber: {
      fontSize: 20,
    },

    metricName: {

    },

    followButton: {
      flexDirection: 'row',
      columnGap: 10,
      alignItems: 'center',
      borderWidth: 1,
      borderColor: '#000',
      borderRadius: 100,
      paddingHorizontal: 20,
      paddingVertical: 5,
      backgroundColor: '#000',
      marginTop: 15,
    },

    followText: {
      fontSize: 17,
      color: '#fff'
    },

    segmentedControl: {
      flexDirection: 'row',
      marginTop: 20,
      borderWidth: 1,
      borderRadius: 5,
      borderColor: '#E2E5E6',
      paddingHorizontal: 2,
      paddingVertical: 2,
      backgroundColor: '#F4F5F4',
    },

    segmentedControlSelected: {
      borderRadius: 5,
      width: 118,
      paddingVertical: 10,
      backgroundColor: '#6C7476',
      alignItems: 'center',
    },

    segmentedControlSelectedText: {
      color: 'white',
      fontSize: 15,
    },

    segmentedControlUnselected: {
      borderRadius: 5,
      width: 118,
      paddingVertical: 10,
      alignItems: 'center',
    },

    segmentedControlUnselectedText: {
      fontSize: 15,
    },

    collection: {
      flexDirection: 'row',
      alignItems: 'center',
      columnGap: 20,
    },

    collectionPic: {
      width: 70,
      height: 70,
      borderRadius: 10,
    },

    collectionText: {
      rowGap: 5,
    },

    collectionName: {
      fontSize: 18,
    },

    collectionStat: {
      fontSize: 15,
    },
  });