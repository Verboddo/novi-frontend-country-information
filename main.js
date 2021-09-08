// Get the HTML element by ID for search button
const searchButton = document.getElementById('search-button')

// Event listener for the searchbutton on click
searchButton.addEventListener('click', fetchData)

// Get the HTML element by ID for the form
const form = document.querySelector('#my-form')

// Create a function to submit the users input and fetch the data from the fetchData function
form.onsubmit = function (e) {
    e.preventDefault();
    return fetchData()
}

// Get the HTML element by ID for the image
const flag = document.getElementById('flag')

// Get the HTML element by ID for the country name
const countryName = document.getElementById('country-name')

// Get the HTML element by ID for the info
const info = document.getElementById('info')

// Get the HTML element by ID for the capital
const capital = document.getElementById('capital')

// Get the HTML element by ID for the language
const languageInfo = document.getElementById('language')

let searchBar = document.getElementById('search-bar')
function searchValue() {
    return searchBar.value
}

// Create a function to clear the form after user input
function resetForm() {
    return document.getElementById('search-bar').value = ''
}

// Create a function to clear the error message on a new user input
function resetErrorField() {
    const message = document.getElementById('error-message')
    message.innerHTML = ''
}

// Function to get the data from the uri
async function fetchData() {
    try {
        let search = searchValue()
        let country = await axios.get(`https://restcountries.eu/rest/v2/name/${search}`)

        // Display the flag of the country
        flag.innerHTML = ''
        const img = document.createElement("img")
        img.src = country.data[0].flag
        flag.appendChild(img)

        // console.log(country.data)

        // Display the name of the country
        countryName.innerHTML = ''
        const node = document.createTextNode(country.data[0].name)
        countryName.appendChild(node)

        // console.log(`${country.data[0].name} is situated in ${country.data[0].subregion}. It has a population of ${country.data[0].population} people.`)

        // Display the first information text of the country
        info.innerHTML = ''
        const information = document.createTextNode(`${country.data[0].name} is situated in ${country.data[0].subregion}. It has a population of ${country.data[0].population} people.`)
        info.appendChild(information)

        // console.log(`The capital is ${country.data[0].capital}`)
        const currency = currencies(country)
        // console.log(currency)

        // Display the capital and currency of the country
        capital.innerHTML = ''
        const capitalCity = document.createTextNode(`The capital is ${country.data[0].capital} and you pay with ${currency}'s`)
        capital.appendChild(capitalCity)

        const language = languages(country)
        // console.log(language)

        // Display the language function of the country
        languageInfo.innerHTML = ''
        const languageCity = document.createTextNode(language)
        languageInfo.appendChild(languageCity)

        // Resetting the form and the error field
        resetForm()
        resetErrorField()

    // Catch the error and display the error message function
    } catch (error) {
        console.error()
        errorMessage()
        countryName.innerHTML = ''
        info.innerHTML = ''
        capital.innerHTML = ''
        languageInfo.innerHTML = ''
        flag.innerHTML = ''
    }
}

// Create an error message if user's input is not an existing country
function errorMessage() {
    const message = document.getElementById('error-message')
    message.innerHTML = ''
    const errorMessage = document.createTextNode(`${searchBar.value} does not exist`)
    message.appendChild(errorMessage)
}

// Function to display currencies in a string
function currencies(currency) {
    if (currency.data[0].currencies.length === 1) {
        return `and you can pay with ${currency.data[0].currencies[0].name}'s`
    }
    if (currency.data[0].currencies.length === 2) {
        return `and you can pay with ${currency.data[0].currencies[0].name}'s ${currency.data[0].currencies[1].name}'s`
    }

}

// Function to display all languages in a string
function languages(language) {

    let allLanguage = language.data[0].languages
    let languageString = 'They speak '

    for (let i = 0; i < allLanguage.length; i++) {
        let languages = allLanguage[i].name

        if (i === allLanguage.length -1) {
            // At the last language and want to implant the 'and'
            languageString += ` and ${languages}`
            // At the second to last language and no comma
        } else if (i === allLanguage.length -2) {
            languageString += languages
            // add language and comma
        } else {
            languageString += `${languages}, `
        }

    }
    return languageString
}
