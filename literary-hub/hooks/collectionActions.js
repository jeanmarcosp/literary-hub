import axios from "axios";


export const handleLikeCollection = async (userId, collectionId, handleRefresh) => {
    try {
      const response = await axios.put(
        `${ROOT_URL}/collections/${collectionId}/${userId}/like`
      );
    //   handleRefresh();
    } catch (error) {
      console.error("Error liking collection:", error);
      // Handle errors or perform any other action
    }
  };

  export const handleUnlikeCollection = async (userId, collectionId) => {
    try {
      const response = await axios.put(
        `${ROOT_URL}/collections/${collectionId}/${userId}/unlike`
      );

    //   handleRefresh();
    } catch (error) {
      console.error("Error unliking collection:", error);
      // Handle errors or perform any other action
    }
  };