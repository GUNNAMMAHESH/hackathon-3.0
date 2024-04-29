

// function search() {

//   let query = document.getElementById("word").value;

//   let search = api + query;
//   fetch(search)
//     .then(function (response) {
//       if (!response.ok) {
//         const error = document.getElementById("errorMessage").innerText = "Cannot found youy word";

//         console.log(error);
//         throw new Error("No definitions found for the word.");

//       }else{
//         return response.json();
//       }

//     })
//     .then(function (data) {

//       if (data.title === "No Definitions Found") {
//         throw new Error(data.message);
//       }

//       let meanings = data[0].meanings[0];
//       if (meanings) {
//         // Handle phonetics
//         let phonetics = data[0].phonetics;
//         if (phonetics && phonetics.length > 0) {
//           let audioUrl = phonetics[0].audio;
//           if (audioUrl) {
//             let audio = new Audio(audioUrl);
//             document
//               .getElementById("audioContainer")
//               .addEventListener("click", function () {
//                 audio.play();
//               });
//             document
//               .getElementById("audioContainer")
//               .addEventListener("keydown", (event) => {
//                 if (event.key === "o" && event.ctrlKey) {
//                   audio.play();
//                   console.log(event);
//                 }
//               });
//           } else {
//             document.getElementById("audioNotFound").innerText = "Not Found";
//           }
//         }

//         // Handle definitions
//         if (meanings.definitions && meanings.definitions.length > 0) {
//           document.getElementById("defination1").innerText =
//             meanings.definitions[0].definition;
//           if (meanings.definitions[1]) {
//             document.getElementById("defination2").innerText =
//               meanings.definitions[1].definition;
//           } else {
//             document.getElementById("defination1").innerText = "Not found";
//             document.getElementById("defination2").innerText = "Not found";
//           }
//         }

//         // Handle images
//         let imageContainer = document.getElementById("imageContainer");
//         imageContainer.innerHTML = ""; // Clear previous images
//         meanings.definitions.forEach(function (definition) {
//           if (definition.image) {
//             let img = document.createElement("img");
//             img.src = definition.image;
//             img.alt = query; // Set alt to the word being searched
//             imageContainer.appendChild(img);
//           }
//         });

//         // Handle part of speech
//         if (meanings.partOfSpeech) {
//           document.getElementById("partOfSpeech").innerText =
//             meanings.partOfSpeech;
//         } else {
//           document.getElementById("partOfSpeech").innerText = "Not found";
//         }

//         // Handle synonyms
//         if (meanings.synonyms && meanings.synonyms.length > 0) {
//           document.getElementById("synonyms").innerText =
//             meanings.synonyms.join(", ");
//         } else {
//           document.getElementById("synonyms").innerText = "Not found";
//         }
//         // Handle antonyms
//         if (meanings.antonyms && meanings.antonyms.length > 0) {
//           document.getElementById("antonyms").innerText =
//             meanings.antonyms.join(", ");
//         } else {
//           document.getElementById("antonyms").innerText = "Not found";
//         }
//       } else {
//         console.log("No meanings found for the word.");
//       }
//     })
//     .catch(function (error) {
//       console.log("Error:", error.message);
//     });
// }

// document.addEventListener("keydown", (event) => {
//   if (event.key === "Enter") {
//     search();
//   }
// });

let api = "https://api.dictionaryapi.dev/api/v2/entries/en/";

async function search() {
  try {
    let query = document.getElementById("word").value;
    let search = api + query;
    const response = await fetch(search);

    if (!response.ok) {
      const errorLog = "Cannot found your word !";
      const error = (document.getElementById("errorMessage").innerText =
      errorLog);
      clearResults();
      throw new Error(errorLog);
      
    } else {
      document.getElementById("errorMessage").innerText = "";
    }

    const data = await response.json();

    if (data.title === "No Definitions Found") {
      throw new Error(data.message);
    }

    let meanings = data[0].meanings[0];

    if (meanings) {
      // Handle phonetics
      let phonetics = data[0].phonetics;
      if (phonetics && phonetics.length > 0) {
        document.getElementById("phonetic").innerText = phonetics[0].text;
        let audioUrl = phonetics[0].audio;
        if (audioUrl) {
          let audio = new Audio(audioUrl);
          document
            .getElementById("audioContainer")
            .addEventListener("click", function () {
              audio.play();
            });
          document
            .addEventListener("keydown", (event) => {
              if (event.key === "q" && event.ctrlKey) {
                audio.play();
                console.log(event);
              }
            });
        } else {
          document.getElementById("audioNotFound").innerText = "Not Found";
        }
      }

      // Handle definitions
      if (meanings.definitions && meanings.definitions.length > 0) {
        document.getElementById("defination1").innerText =
          meanings.definitions[0].definition;
        if (meanings.definitions[1]) {
          document.getElementById("defination2").innerText =
            meanings.definitions[1].definition;
        } else {
          document.getElementById("defination1").innerText = "Not found";
          document.getElementById("defination2").innerText = "Not found";
        }
      }

      // Handle part of speech
      if (meanings.partOfSpeech) {
        document.getElementById("partOfSpeech").innerText =
          meanings.partOfSpeech;
      } else {
        document.getElementById("partOfSpeech").innerText = "Not found";
      }

      // Handle synonyms
      if (meanings.synonyms && meanings.synonyms.length > 0) {
        document.getElementById("synonyms").innerText =
          meanings.synonyms.join(", ");
      } else {
        document.getElementById("synonyms").innerText = "Not found";
      }
      // Handle antonyms
      if (meanings.antonyms && meanings.antonyms.length > 0) {
        document.getElementById("antonyms").innerText =
          meanings.antonyms.join(", ");
      } else {
        document.getElementById("antonyms").innerText = "Not found";
      }
    } else {
      console.log("No meanings found for the word.");
    }
  } catch (error) {
    console.log("Error:", error.message);
  }
}

const clearResults=()=>{
  document.getElementById("defination1").innerText ="";
  document.getElementById("defination2").innerText = "";
  document.getElementById("phonetic").innerText = "";
  document.getElementById("partOfSpeech").innerText = "";
  document.getElementById("synonyms").innerText = "";
  document.getElementById("antonyms").innerText = "";
}

document.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    search();
  }
});
