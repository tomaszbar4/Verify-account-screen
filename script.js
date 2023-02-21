const codes = document.querySelectorAll('.code')
const container = document.querySelector('.container')

codes[0].focus()

codes.forEach((code, index) => {
    code.addEventListener('keydown', (e) => {
        if (e.key >= 0 && e.key <= 9) {
            codes[index].value = ''
            if (index < codes.length - 1)
                setTimeout(() => codes[index + 1].focus(), 10)
        }
        else if (e.key === 'Backspace') {
            if (index > 0) {
                setTimeout(() => codes[index - 1].focus(), 10)
            }
        }
    })
})

codes[5].addEventListener('keyup', () => {
    validate()
})


function validate() {

    let emptyFields = 0;
    const emptyArray = []
    const correctCode = '1,2,3,4,5,6'

    codes.forEach(code => {
        if (code.value === '')
            emptyFields++;
        else {
            emptyArray.push(code.value)
        }
    })
    if (emptyFields === 0 && emptyArray.toString() === correctCode) {
        clearInterval(int)
        container.innerHTML = '<strong>Good job! Verification code is correct.<br> You are about to be redirected to your account.</strong>'
    }
    else {
        return
    }
}

const timer = document.getElementById('timer')

const startingMinutes = 5
let time = startingMinutes * 60

const int = setInterval(updateCountdown, 1000)

function updateCountdown() {

    const minutes = Math.floor(time / 60)
    let seconds = time % 60;

    seconds = seconds < 10 ? '0' + seconds : seconds;

    timer.innerHTML = `${minutes}:${seconds}`
    time--
    if (time === 0) {
        clearInterval(int)
        container.innerHTML = '<p style="color: red"><strong>Sorry, we were unable to verify your account. Please try again.</strong></p>'
    }
}
