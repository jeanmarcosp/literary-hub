import React, {
  forwardRef,
  useRef,
  useState,
  useEffect,
  useCallback,
} from "react";
import { View, TextInput, FlatList, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import getUserId from "../hooks/getUserId";
import { useNavigation } from "@react-navigation/native";
import getUserId from "../hooks/getUserId";
import { poemToPage } from '../hooks/poemActions';



const SearchResult = ({data, type}) => {
  const [likedPoems, setUserLikedPoems] = useState([]);
  const [user, setUser] = useState({});
  userId = getUserId();
  useEffect(() => {
    const fetchData = async () => {
      if (userId) {
        await getUser();
      }
    };
  
    fetchData();
  }, [userId]);
  const getUser = async () => {
    try {
      const response = await axios.get(`${ROOT_URL}/getuser`, {
        params: { id: userId },
      });
      setUser(response.data);
    } catch (error) {
      console.log("Error fetching user:", error);
    }
  };
  const handleFollow = async () => {
    try {
      await axios.post(`${ROOT_URL}/follow-user`, {
        loggedInUser: userId,
        otherUser: data._id,
      });
  
      setIsFollowing(true);
      console.log("Successfully followed user");
    } catch (error) {
      console.error("Error following user:", error);
    }
  };
  
  const handleUnfollow = async () => {
    try {
      await axios.post(`${ROOT_URL}/unfollow-user`, {
        loggedInUser: userId,
        otherUser: data._id,
      });
  
      setIsFollowing(false);
      console.log("Successfully unfollowed user");
    } catch (error) {
      console.error("Error unfollowing user:", error);
    }
  };
  const navigation = useNavigation();
  const userId = getUserId();
  const openItem = () => {
    if (type === 'poem') {
      //console.log(data);
      const poemData = data.poem ? data.poem : data;
      poemToPage([poemData], 15);
      axios.get(`${ROOT_URL}/users/${userId}/likedPoems`)
      .then((response) => {
        setUserLikedPoems(response.data);
      })
      .catch((error) => {
        console.error("Error finding poem:", error);
      });
      navigation.navigate('SinglePoem', { poem: poemData, poemId: poemData._id, userLikedPoems: likedPoems, fromHome:false });
    } else {
      const otherUser = data._id
      navigation.navigate("UserDetailScreen", {
        otherUserId: otherUser,
        isFollowing: user.following.includes(otherUser),
        callbacks: {
          handleFollow: handleFollow,
          handleUnfollow: handleUnfollow,
        },
      });
    }

  }; 
  
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={openItem}>
          {type === 'poem' && data && data.title? (
            <View style={styles.poemResult}>
              <Ionicons name="book-outline" size={20} color="#658049" />
              <View>
                <Text style={styles.title}>{data.title}</Text>
                <Text style={styles.author}>by {data.author}</Text>
              </View>
            </View>
          ) : type === 'user' && data ? (
            // Render user-specific content
            <View style={styles.userResult}>
              <Image
                source={data.profilePicture ? { uri: data.profilePicture } : require('../assets/collection-images/defaultCover.jpeg')}
                style={styles.image}
              />
              <View style={styles.names}>
                <Text style={styles.name}>{data.name}</Text>
                <Text style={styles.username}>@{data.username}</Text>
              </View>
            </View>
          ) : (
            // Add more conditions for other types
            <Text></Text>
          )}
        </TouchableOpacity>
      </View>
    );
  };
  


const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#F6F5F8',
  },

  poemResult: {
    flexDirection: 'row',
    columnGap: 10,
  },

  userResult:{
    flexDirection: 'row',
    columnGap: 10,
  },

  title: {
    fontFamily: 'Sarabun-Bold',
    fontSize: 16,
    color: '#3D3D3D',
    marginRight: 10,
  },

  author:{
    fontFamily: 'Sarabun-Regular',
    fontSize: 14,
    color: '#898B96',
  },

  image:{
    alignItems: 'center',
    height: 40,
    width: 40,
    marginRight: 5,
    borderRadius: 100,
  },

  names: {
    flexDirection: 'column',
  },

  name: {
    fontFamily: 'Sarabun-Bold',
    fontSize: 16,
    color: '#3D3D3D',
  },

  username: {
    fontFamily: 'Sarabun-Regular',
    fontSize: 14,
    color: '#898B96',
  },

  icon: {
    marginRight: 10,
  },

  input: {
    flex: 1,
    height: 40,
    padding: 0,
  },
});

export default SearchResult;