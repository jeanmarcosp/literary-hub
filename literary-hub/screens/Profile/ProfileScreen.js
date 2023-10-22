import { StyleSheet, Text, View, SafeAreaView, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { Ionicons } from "@expo/vector-icons";
import SegmentedControl from '@react-native-segmented-control/segmented-control';



const ProfileScreen = () => {
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
    }
  });