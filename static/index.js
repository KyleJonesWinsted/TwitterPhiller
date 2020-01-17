

//Determine background color
const colorSchemes = {
    LIGHT: 'light',
    DIM: 'dim',
    LIGHTS_OUT: 'lights-out',
    AUTO_DIM: 'auto_dim',
    AUTO_LIGHTS_OUT: 'auto_lights_out'
}

const colorStorageKey = 'usersPreferredColorScheme'
var usersPreferredColorScheme = localStorage.getItem(colorStorageKey)

if (!usersPreferredColorScheme) {
    setUsersPreferredColorScheme(colorSchemes.AUTO_DIM)
}

updateColorScheme(usersPreferredColorScheme)

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
            break
        case colorSchemes.DIM:
            console.log('dim')
            document.body.className = colorSchemes.DIM
            break
        case colorSchemes.LIGHTS_OUT:
            console.log('lights_out')
            document.body.className = colorSchemes.LIGHTS_OUT
            break
        case colorSchemes.AUTO_DIM:
            console.log(isDarkMode ? 'auto dim dark' : 'auto dim light')
            document.body.className = isDarkMode ? colorSchemes.DIM : colorSchemes.LIGHT
            break
        case colorSchemes.AUTO_LIGHTS_OUT:
            console.log(isDarkMode ? 'auto lights out dark' : 'auto lights out light')
            document.body.className = isDarkMode ? colorSchemes.LIGHTS_OUT : colorSchemes.LIGHT
            break
    }
}

window.matchMedia('(prefers-color-scheme: dark)').addListener(() => {
    console.log('changed system dark mode')
    updateColorScheme(usersPreferredColorScheme)
})

document.body.addEventListener("dblclick", () => {
    console.log('double clicked')
    cycleColorSchemes(usersPreferredColorScheme)
})
