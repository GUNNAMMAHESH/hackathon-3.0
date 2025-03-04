const api = "https://api.dictionaryapi.dev/api/v2/entries/en/";
let audio = null; // Will hold the Audio object

async function search() {
  try {
    clearResults();
    let query = document.getElementById("word").value;
    let url = api + query;
    const response = await fetch(url);

    if (!response.ok) {
      const errorLog = "Cannot find your word!";
      document.getElementById("errorMessage").innerText = errorLog;
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
          audio = new Audio(audioUrl);
        } else {
          document.getElementById("audioContainer").innerText = "Not Found";
        }
      }

      // Handle definitions
      if (meanings.definitions && meanings.definitions.length > 0) {
        document.getElementById("defination1").innerText =
          meanings.definitions[0].definition;
        if (meanings.definitions.length > 1) {
          document.getElementById("defination2").innerText =
            meanings.definitions[1].definition;
        } else {
          document.getElementById("defination2").innerText = "Not found";
        }
      } else {
        document.getElementById("defination1").innerText = "Not found";
        document.getElementById("defination2").innerText = "Not found";
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

const clearResults = () => {
  document.getElementById("defination1").innerText = "";
  document.getElementById("defination2").innerText = "";
  document.getElementById("phonetic").innerText = "";
  document.getElementById("partOfSpeech").innerText = "";
  document.getElementById("synonyms").innerText = "";
  document.getElementById("antonyms").innerText = "";
  // Note: We no longer clear audioContainer's innerHTML so its content remains.
  audio = null;
};

// Attach event listeners only once
document.getElementById("audioContainer").addEventListener("click", function () {
  if (audio && typeof audio.play === "function") {
    audio.play();
  }
});

document.addEventListener("keydown", (event) => {
  // Ctrl+q to play audio if available
  if (event.key === "q" && event.ctrlKey) {
    if (audio && typeof audio.play === "function") {
      audio.play();
    }
  }
  // Enter key to trigger search
  if (event.key === "Enter") {
    search();
  }
});
