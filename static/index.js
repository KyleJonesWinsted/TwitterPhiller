

//Determine background color
const colorSchemes = {
    DEFAULT: 'default',
    DIM: 'dim',
    LIGHTS_OUT: 'lights-out',
    AUTO_DIM: 'auto_dim',
    AUTO_LIGHTS_OUT: 'auto_lights_out'
}

var usersPreferredColorScheme = colorSchemes.DEFAULT

updateColorScheme(usersPreferredColorScheme)

function cycleColorSchemes(currentColorScheme) {
    switch(currentColorScheme) {
        case colorSchemes.DEFAULT:
            usersPreferredColorScheme = colorSchemes.DIM
            break
        case colorSchemes.DIM:
            usersPreferredColorScheme = colorSchemes.LIGHTS_OUT
            break
        case colorSchemes.LIGHTS_OUT:
            usersPreferredColorScheme = colorSchemes.AUTO_DIM
            break
        case colorSchemes.AUTO_DIM:
            usersPreferredColorScheme = colorSchemes.AUTO_LIGHTS_OUT
            break
        case colorSchemes.AUTO_LIGHTS_OUT:
            usersPreferredColorScheme = colorSchemes.DEFAULT
            break
    }
    updateColorScheme(usersPreferredColorScheme)
}

function updateColorScheme(currentColorScheme) {
    const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches
    switch(currentColorScheme) {
        case colorSchemes.DEFAULT:
            console.log('default')
            document.body.className = colorSchemes.DEFAULT
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
            document.body.className = isDarkMode ? colorSchemes.DIM : colorSchemes.DEFAULT
            break
        case colorSchemes.AUTO_LIGHTS_OUT:
            console.log(isDarkMode ? 'auto lights out dark' : 'auto lights out light')
            document.body.className = isDarkMode ? colorSchemes.LIGHTS_OUT : colorSchemes.DEFAULT
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
