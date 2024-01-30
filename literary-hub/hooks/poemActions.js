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

// // split the poem into pages
// export const poemToPage = (poems, linesPerPage) => {
//     poems.forEach(poem => {
//         const lines = poem.content.split("\n");
//         const pages = [];
//         let currentPage = "";
//         let linesAdded = 0;
        
//         for (const line of lines) {
            
//             if (linesAdded >= linesPerPage) {
//                 pages.push(currentPage);
//                 currentPage = "";
//                 linesAdded = 0;
//             }
//             currentPage += line + "\n";
//             linesAdded++;
//             }

//             if (currentPage.length > 0) {
//             pages.push(currentPage);
//             }
//             poem.pages = pages; // Add pages to poem object
//             console.log("MY POEM", poem);
//     });
// }

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
                poem.pages = pages; // Add pages to poem object
            });
            resolve(poems); // Resolve the promise with modified poems
        } catch (error) {
            reject(error); // Reject the promise if an error occurs
        }
    });
}

      