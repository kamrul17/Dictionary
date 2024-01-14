/*const form = document.querySelector("form");
const resultDiv = document.querySelector(".result");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  //   console.log(form.elements[0].value);
  getWordDetails(form.elements[0].value);
});

const getWordDetails = async (word) => {
  const response = await fetch(
    `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
  );
  const data = await response.json();
  //   console.log(data);

  const synonymsExist =
    data[0].meanings[0].synonyms && data[0].meanings[0].synonyms.length > 0;
  const synonymsExist1 =
    data[0].meanings[0].synonyms && data[0].meanings[1].synonyms.length > 0;
  const example =
    data[0].meanings[0].definitions[0].example &&
    data[0].meanings[0].definitions[0].example.length > 0;
  const example1 =
    data[0].meanings[1].definitions[0].example &&
    data[0].meanings[1].definitions[0].example.length > 0;

  resultDiv.innerHTML = `
<h4 style="font-weight: bold;">${data[0].word}</h4>
<div>
<p style="font-weight: bold;">${data[0].meanings[0].partOfSpeech}</p>
<p style="font-weight: bold;">1.${
    data[0].meanings[0].definitions[0].definition
  }</p>

${
  example
    ? `<pstyle="font-weight: bold;">Example: ${data[0].meanings[0].definitions[0].example}</pstyle=>`
    : "Not Available"
}
<br>
${
  synonymsExist
    ? `<p>Synonyms: ${data[0].meanings[0].synonyms.join(", ")}</p>`
    : "Not Available"
}
</div>
<div>
<p style="font-weight: bold;">${data[0].meanings[1].partOfSpeech}</p>
<p style="font-weight: bold;">2.${
    data[0].meanings[1].definitions[0].definition
  }</p>
${
  example1
    ? `<p style="font-weight: bold;">Example: ${data[0].meanings[1].definitions[0].example}</p>`
    : "Not Available"
}
<br>
${
  synonymsExist1
    ? `<p style="font-weight: bold;">Synonyms: ${data[0].meanings[1].synonyms.join(
        ", "
      )}</p>`
    : "Not Available"
}
</div>


`;
};
*/
const form = document.querySelector("form");
const resultDiv = document.querySelector(".result");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const word = form.elements[0].value;
  if (word.trim() !== "") {
    try {
      await getWordDetails(word);
    } catch (error) {
      console.error("Error fetching data:", error);
      resultDiv.innerHTML = "<p>Error fetching data. Please try again.</p>";
    }
  } else {
    resultDiv.innerHTML = "<p>Please enter a valid word.</p>";
  }
});

const getWordDetails = async (word) => {
  const response = await fetch(
    `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
  );

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }

  const data = await response.json();

  if (data && data.length > 0) {
    // Check if the response has the expected structure
    const meanings = data[0].meanings;

    if (meanings && meanings.length > 0) {
      // Update the HTML content based on the response
      const synonymsExist =
        data[0].meanings[0].synonyms && data[0].meanings[0].synonyms.length > 0;
      const synonymsExist1 =
        data[0].meanings[0].synonyms && data[0].meanings[1].synonyms.length > 0;
      const example =
        data[0].meanings[0].definitions[0].example &&
        data[0].meanings[0].definitions[0].example.length > 0;
      const example1 =
        data[0].meanings[1].definitions[0].example &&
        data[0].meanings[1].definitions[0].example.length > 0;
      resultDiv.innerHTML = `
      <h4 style="font-weight: bold;">${data[0].word}</h4>
      <div>
      <p style="font-weight: bold;">${data[0].meanings[0].partOfSpeech}</p>
      <p style="font-weight: bold;">1.${
        data[0].meanings[0].definitions[0].definition
      }</p>
      
      ${
        example
          ? `<pstyle="font-weight: bold;">Example: ${data[0].meanings[0].definitions[0].example}</pstyle=>`
          : "Not Available"
      }
      <br>
      ${
        synonymsExist
          ? `<p>Synonyms: ${data[0].meanings[0].synonyms.join(", ")}</p>`
          : "Not Available"
      }
      </div>
      <div>
      <p style="font-weight: bold;">${data[0].meanings[1].partOfSpeech}</p>
      <p style="font-weight: bold;">2.${
        data[0].meanings[1].definitions[0].definition
      }</p>
      ${
        example1
          ? `<p style="font-weight: bold;">Example: ${data[0].meanings[1].definitions[0].example}</p>`
          : "Not Available"
      }
      <br>
      ${
        synonymsExist1
          ? `<p style="font-weight: bold;">Synonyms: ${data[0].meanings[1].synonyms.join(
              ", "
            )}</p>`
          : "Not Available"
      }
      </div>
      
      `;
    } else {
      resultDiv.innerHTML = "<p>No meanings found for the given word.</p>";
    }
  } else {
    resultDiv.innerHTML = "<p>No data found for the given word.</p>";
  }
};
