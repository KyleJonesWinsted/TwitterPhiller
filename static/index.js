

//Determine background color
const colorSchemes = {
    LIGHT: 'light',
    DIM: 'dim',
    LIGHTS_OUT: 'lights-out',
    AUTO_DIM: 'auto_dim',
    AUTO_LIGHTS_OUT: 'auto_lights_out'
}

const modeTextValues = {
    AUTO: 'Auto',
    ALWAYS: 'Always',
    LIGHT: 'Light',
    DIM: 'Dim',
    LIGHTS_OUT: 'Lights Out'
}

const colorStorageKey = 'usersPreferredColorScheme'
var usersPreferredColorScheme = localStorage.getItem(colorStorageKey)

const modeFrame = document.getElementById('mode-frame')
const modeTypeText = document.getElementById('mode-type')
const modeColorText = document.getElementById('mode-color')

if (!usersPreferredColorScheme) {
    setUsersPreferredColorScheme(colorSchemes.AUTO_DIM)
}

updateColorScheme(usersPreferredColorScheme)
showModeChangeAlert()

function setUsersPreferredColorScheme(newColorScheme) {
    console.log("changed to: " + newColorScheme)
    localStorage.setItem(colorStorageKey, newColorScheme)
    usersPreferredColorScheme = newColorScheme
}

function cycleColorSchemes(currentColorScheme) {
    switch(currentColorScheme) {
        case colorSchemes.LIGHT:
            setUsersPreferredColorScheme(colorSchemes.DIM)
            break
        case colorSchemes.DIM:
            setUsersPreferredColorScheme(colorSchemes.LIGHTS_OUT)
            break
        case colorSchemes.LIGHTS_OUT:
            setUsersPreferredColorScheme(colorSchemes.AUTO_DIM)
            break
        case colorSchemes.AUTO_DIM:
            setUsersPreferredColorScheme(colorSchemes.AUTO_LIGHTS_OUT)
            break
        case colorSchemes.AUTO_LIGHTS_OUT:
            setUsersPreferredColorScheme(colorSchemes.LIGHT)
            break
    }
    updateColorScheme(usersPreferredColorScheme)
}

function updateColorScheme(currentColorScheme) {
    const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches
    switch(currentColorScheme) {
        case colorSchemes.LIGHT:
            console.log('light')
            document.body.className = colorSchemes.LIGHT
            modeTypeText.innerHTML = modeTextValues.ALWAYS
            modeColorText.innerHTML = modeTextValues.LIGHT
            break
        case colorSchemes.DIM:
            console.log('dim')
            document.body.className = colorSchemes.DIM
            modeTypeText.innerHTML = modeTextValues.ALWAYS
            modeColorText.innerHTML = modeTextValues.DIM
            break
        case colorSchemes.LIGHTS_OUT:
            console.log('lights_out')
            document.body.className = colorSchemes.LIGHTS_OUT
            modeTypeText.innerHTML = modeTextValues.ALWAYS
            modeColorText.innerHTML = modeTextValues.LIGHTS_OUT
            break
        case colorSchemes.AUTO_DIM:
            console.log(isDarkMode ? 'auto dim dark' : 'auto dim light')
            document.body.className = isDarkMode ? colorSchemes.DIM : colorSchemes.LIGHT
            modeTypeText.innerHTML = modeTextValues.AUTO
            modeColorText.innerHTML = modeTextValues.DIM
            break
        case colorSchemes.AUTO_LIGHTS_OUT:
            console.log(isDarkMode ? 'auto lights out dark' : 'auto lights out light')
            document.body.className = isDarkMode ? colorSchemes.LIGHTS_OUT : colorSchemes.LIGHT
            modeTypeText.innerHTML = modeTextValues.AUTO
            modeColorText.innerHTML = modeTextValues.LIGHTS_OUT
            break
    }
}

function showModeChangeAlert() {
    modeFrame.style.opacity = 1.0
    window.setTimeout(() =>{
        var fadeOut = setInterval(() => {
            if (modeFrame.style.opacity < 0.1) {
                clearInterval(fadeOut)
            } else {
                modeFrame.style.opacity -= 0.1
            }
        }, 50)
    }, 500)
}

window.matchMedia('(prefers-color-scheme: dark)').addListener(() => {
    console.log('changed system dark mode')
    updateColorScheme(usersPreferredColorScheme)
})

document.body.addEventListener("dblclick", () => {
    console.log('double clicked')
    cycleColorSchemes(usersPreferredColorScheme)
    showModeChangeAlert()
})


//Handle dragged tweets

const mainDiv = document.getElementById('main')

function insertTweet(tweetUrl) {
    const tweetId = tweetUrl.split('/status/')[1]
    console.log(tweetId)
    twttr.widgets.createTweet(
        tweetId,
        document.getElementById('tweets'),
        {
            theme: 'light'
        }
    ).then(() => {
        console.log('tweet added')
    })
}

document.body.addEventListener('dragover', (e) => {
    e.preventDefault()
})

document.body.addEventListener('dragenter', (e) => {
    e.preventDefault()
    console.log('entered')
})

document.body.addEventListener('drop', (e)=> {
    e.preventDefault()
    const tweetUrl = e.dataTransfer.getData('text/uri-list')
    console.log(tweetUrl || 'Not a valid url')
    insertTweet(tweetUrl)
})