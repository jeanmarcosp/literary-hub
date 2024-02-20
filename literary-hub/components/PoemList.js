// import { FlatList, StyleSheet, TouchableOpacity, View, Text } from "react-native";

// export const PoemName = ({poem, poemId, userLikedPoems, isAuthor}) => {
//     return (
//       <TouchableOpacity onPress={() => navigateToSinglePoem(poem, poemId, userLikedPoems)}>
//         <View style={styles.poem}>
//           <View style={styles.poemInfo}>
//           <Text style={styles.poemName}>{poem.title}</Text>
//           {!isAuthor && (
//             <Text style={styles.poemAuthor}>{poem.author}</Text>
//           )}
//           </View>
//           <Like />
//         </View>
//       </TouchableOpacity>
      
//     )
//   }

// export const PoemList = ({poems, userLikedPoems}) => {
//     return (
//       <FlatList
//         data={poems}
//         renderItem={({ item }) => (
//           <PoemName poem={item} poemId= {item._id} userLikedPoems={userLikedPoems}/>
//         )}
//         keyExtractor={(item) => item.id}
//         style={styles.poemList}
//       />
//     );
//   };

// export default PoemList;


// const styles = StyleSheet.create({
//     poemList: {
//         marginTop: 20,
//       },
// })