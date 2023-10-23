import { StyleSheet, Text, View, SafeAreaView, Image, TouchableOpacity, FlatList } from 'react-native'
import { React, useState }from 'react'
import { Ionicons } from "@expo/vector-icons";



const ProfileScreen = () => {

  const [segmentedControlView, setSegmentedControlView] = useState('Collections')

  const username = 'dietcokelover89'

  const collectionData = [
    {
      id: '1',
      title: 'Zen zone',
      poemNumber: 26,
      author: 'dietcokelover89',
      image: 'https://media.istockphoto.com/id/1391404962/photo/pyramid-stones-balance-on-old-mossy-fallen-tree.webp?b=1&s=170667a&w=0&k=20&c=k-eIZWcTHtTvcBCUlckZ4Q6wo5iPJKphu-iPfs_xgjA='
    },
    {
      id: '2',
      title: 'Haiku-palooza',
      poemNumber: 255,
      author: 'someone',
      image: 'https://davidbruceblog.files.wordpress.com/2014/05/img_9760.jpg'
    },
  ]

  const likedPoemData = [
    {
      id: '1',
      title: 'The Road Not Taken',
      author: 'Robert Frost',
      image: 'https://davidbruceblog.files.wordpress.com/2014/05/img_9760.jpg'
    },
    {
      id: '2',
      title: 'Oxymandias',
      author: 'Percy Shelley',
      image: 'https://davidbruceblog.files.wordpress.com/2014/05/img_9760.jpg'
    }
  ]

  const CollectionsView = () => {
    return (
      <FlatList
        data={collectionData}
        renderItem={({item}) => 
          <Collection
            title={item.title}
            poemNumber={item.poemNumber}
            author={item.author}
            image={item.image}
          />
        }
        keyExtractor={item => item.id}
        style={styles.collections}
      />
    )
  }

  const Collection = ({title, poemNumber, author, image}) => {
    return (
      <TouchableOpacity>
        <View style={styles.collection}>
          <View style={styles.collectionMain}>
            <Image
              source={{ uri: `${image}` }}
              style={styles.collectionPic}
            />
            <View style={styles.collectionText}>
              <Text style={styles.collectionName}>{title}</Text>
              <Text style={styles.collectionStat}>{poemNumber} poems</Text>
            </View>
          </View>

          {author === username &&
            <View style={styles.ownershipTag}>
              <Text style={styles.ownershipText}>Self</Text>
            </View>
          }
        </View>
      </TouchableOpacity>
    )
  }

  const LikedPoemsView = () => {
    return (
      <FlatList
        data={likedPoemData}
        renderItem={({item}) => 
          <LikedPoem
            title={item.title}
            author={item.author}
            image={item.image}
          />
        }
        keyExtractor={item => item.id}
        style={styles.collections}
      />
    )
  }

  const LikedPoem = ({title, author, image}) => {

    const [liked, setLiked] = useState(true);

    return (
      <View style={styles.collection}>
        <TouchableOpacity>
          <View style={styles.collectionMain}>
            <Image
              source={{ uri: `${image}` }}
              style={styles.collectionPic}
            />
            <View style={styles.collectionText}>
              <Text style={styles.collectionName}>{title}</Text>
              <Text style={styles.collectionStat}>{author}</Text>
            </View>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setLiked(!liked)}>
          {(liked ? 
            <Ionicons name="heart" size={25} color="red" /> :
            <Ionicons name="heart-outline" size={25} color="red" />
          )}
        </TouchableOpacity>
      </View>
    )
  }

  const SavedQuotesView = () => {
    return (
      <View>
        <Text>Saved Quotes</Text>
      </View>
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.centerAligned}>
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
            <View style={(segmentedControlView === 'Collections' ? styles.segmentedControlSelected : styles.segmentedControlUnselected)}>
              <Text style={(segmentedControlView === 'Collections' ? styles.segmentedControlSelectedText : styles.segmentedControlUnselectedText)}>Collections</Text>
            </View>
          </TouchableOpacity>
          
          <TouchableOpacity onPress={() => setSegmentedControlView('Liked poems')}>
            <View style={(segmentedControlView === 'Liked poems' ? styles.segmentedControlSelected : styles.segmentedControlUnselected)}>
              <Text style={(segmentedControlView === 'Liked poems' ? styles.segmentedControlSelectedText : styles.segmentedControlUnselectedText)}>Liked poems</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => setSegmentedControlView('Saved quotes')}>
            <View style={(segmentedControlView === 'Saved quotes' ? styles.segmentedControlSelected : styles.segmentedControlUnselected)}>
              <Text style={(segmentedControlView === 'Saved quotes' ? styles.segmentedControlSelectedText : styles.segmentedControlUnselectedText)}>Saved quotes</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.leftAligned}>
        {segmentedControlView === 'Collections' &&
          <CollectionsView />
        }
        {segmentedControlView === 'Liked poems' &&
          <LikedPoemsView />
        }
        {segmentedControlView === 'Saved quotes' &&
          <SavedQuotesView />
        }
      </View>
    </SafeAreaView>
  )
}

export default ProfileScreen

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
    },

    centerAligned: {
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

    leftAligned: {
      paddingHorizontal: 17,
    },

    collections: {
      marginTop: 20,
    },

    collection: {
      marginBottom: 10,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },

    collectionMain: {
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

    ownershipTag: {
      borderWidth: 1,
      borderRadius: 100,
      height: 25,
      width: 60,
      justifyContent: 'center',
      alignItems: 'center'
    },

    ownershipText: {
      fontSize: 15,
    }
  });