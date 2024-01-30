import axios from 'axios';

export const markPoemAsRead = async (userId, poemId) => {
  try {
    await axios.put(`${ROOT_URL}/mark-poem-as-read/${userId}/${poemId}`);
  } catch (error) {
    console.error('Error marking poem as read:', error);
  }
};

export const handleLike = async (userId, poemId) => {
  try {
    await axios.put(`${ROOT_URL}/poems/${poemId}/${userId}/like`);
  } catch (error) {
    console.error('Error liking poem:', error);
  }
};

export const handleDislike = async (userId, poemId) => {
  try {
    await axios.put(`${ROOT_URL}/poems/${poemId}/${userId}/unlike`);
  } catch (error) {
    console.error('Error unliking poem:', error);
  }
};

export const poemToPage = (poems, linesPerPage) => {
    return new Promise((resolve, reject) => {
        try {
            poems.forEach(poem => {
                const lines = poem.content.split("\n");
                const pages = [];
                let currentPage = "";
                let linesAdded = 0;
                
                for (const line of lines) {
                    
                    if (linesAdded >= linesPerPage) {
                        pages.push(currentPage);
                        currentPage = "";
                        linesAdded = 0;
                    }
                    currentPage += line + "\n";
                    linesAdded++;
                }

                if (currentPage.length > 0) {
                    pages.push(currentPage);
                }
                poem.pages = pages; 
            });
            resolve(poems); 
        } catch (error) {
            reject(error); 
        }
    });
}

      