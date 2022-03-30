const RANDOM_WORD_API_URL = "https://random-word-api.herokuapp.com/word?number=10&swear=0"

async function getRandomWord() {

    return fetch(RANDOM_WORD_API_URL)
        .then(response => response.json()
        .then(data => data))
  }
export async function getNextQuote(){
    const quote = await getRandomWord()
    console.log(quote[0])
    return quote[0]
}


