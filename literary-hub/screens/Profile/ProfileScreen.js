import { StyleSheet, Text, View, SafeAreaView, Image } from 'react-native'
import React from 'react'

const ProfileScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Image 
        source={{ uri: 'https://davidbruceblog.files.wordpress.com/2014/05/img_9760.jpg' }} 
        style={{width: 100, height: 100, borderRadius: 100/ 2}} 
      />
      <Text style={styles.name}>Ava Robinson</Text>
      <Text style={styles.username}>@dietcokelover89</Text>
      
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
    </SafeAreaView>
  )
}

export default ProfileScreen

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      paddingTop: 50,
    },

    name: {
      fontSize: 20
    },

    username: {
      fontSize: 15
    },

    metrics: {
      flex: 1,
      flexDirection: 'row',
      columnGap: 20,
    },

    metric: {
      alignItems: 'center',
    },

    metricNumber: {
      fontSize: 20,
    },

    metricName: {

    }
  });