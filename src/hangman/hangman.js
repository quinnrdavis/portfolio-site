class Hangman {
    constructor(word, remainingGuesses) {
        this.word = word.toLowerCase().split('')
        this.remainingGuesses = remainingGuesses
        this.guesses = []
        this.status = 'playing'
        this.unguessed = 'abcdefghijklmnopqrstuvwxyz'
    }
    showStatus() {
        const wordString = this.word.join('')

        if (this.status === 'playing') {
            return `Guesses remaining: ${this.remainingGuesses}`
        } else if (this.status === 'failed') {
            return `Nice try! The word was ${wordString}`
        } else if (this.status === 'finished') {
            return 'Congratulations, you win'
        }
    }
    getStatus() {
        const finished = this.word.every((letter) => this.guesses.includes(letter) || letter === ' ')

        if (finished) {
            this.status = 'finished'
        }

        if (this.remainingGuesses === 0) {
            this.status = 'failed'
        }
    }
    getPuzzle() {
        let puzzle = ''

        this.word.forEach((letter) => {
            if (this.guesses.includes(letter) || letter === ' ') {
                puzzle += letter
            } else {
                puzzle += '*'
            }
        })

        return puzzle
    }
    makeGuess(guess) {
        if (this.status === 'playing') {
            guess = guess.toLowerCase()
            const isUnique = !this.guesses.includes(guess)
            const isWrong = !this.word.includes(guess)

            if (typeof guess != 'string' || guess.length > 1) {
                throw Error('Please guess a letter')
            }

            if (isUnique) {
                this.guesses.push(guess)
            }

            if (isUnique && isWrong) {
                this.remainingGuesses--
            }

            this.getStatus()
        }
    }
    renderGuesses() {
        const guessesEl = document.querySelector('#guesses')
        guessesEl.textContent = ''

        const unguessedEl = document.createElement('div')

        this.unguessed.split('').forEach((letter) => {
            const unguessEl = document.createElement('span')
            unguessEl.textContent = letter
            if (this.guesses.join('').includes(letter)) {
                unguessEl.classList.add('guessed')
            }
            unguessedEl.appendChild(unguessEl)
        })

        guessesEl.appendChild(unguessedEl)
    }
}

export { Hangman as default }