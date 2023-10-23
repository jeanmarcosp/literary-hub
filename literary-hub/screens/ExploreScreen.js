import { StyleSheet, Text, View, SafeAreaView, ScrollView  } from 'react-native'
import React from 'react'
import AuthorList from '../components/AuthorList'
import SearchBar from '../components/SearchBar.js'
import TrendingList from '../components/TrendingList'

const ExploreScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Text>Explore</Text>
        <SearchBar />
        <AuthorList />
        <TrendingList />
      </ScrollView>

    </SafeAreaView>
  )
}

export default ExploreScreen

const styles = StyleSheet.create({
    container: {
      backgroundColor: '#FFFFFF',
      flex: 1,
    },
  });