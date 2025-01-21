const startBtn = document.querySelector('.start-quiz-btn')
const startPage = document.querySelector('.start-page')
const quizPage = document.querySelector('.quiz-page')
const volumeBtn = document.querySelector('.volume')
const muteBtn = document.querySelector('.mute')
const qusArray = ['What is the basic unit of life?', `Which organelle is known as the powerhouse of the cell?
`, 'What is the process by which plants make their food?', 'Which of the following is a component of the DNA molecule?', 'What is the function of hemoglobin?', 'Which organ produces insulin?', `Which type of organism produces its own food?
`, 'What is the primary function of xylem in plants?', 'What is the full form of DNA?', 'What is the largest organ in the human body?', 'What is the role of the liver?', 'Which hormone regulates blood sugar levels?', 'Which disease is caused by the deficiency of insulin?', 'Which process divides the nucleus during cell division?', 'Which vitamin is produced in the skin in response to sunlight?', 'Which part of the plant contains the reproductive organs?', 'What is the smallest bone in the human body?', 'Which part of the flower develops into a fruit?', 'What is the main component of the plant cell wall?', 'Which blood group is known as the universal donor?']
const opt1 = ['Atom', 'Nucleus', 'Respiration', 'Glucose', 'Carry nutrients', 'Liver', 'Heterotroph', 'Transport food', 'Deoxyribonucleic Acid', 'Liver', 'Produce insulin', 'Thyroxine', 'Anemia', 'Cytokinesis', 'Vitamin A', 'Stem', 'Stapes', 'Ovary', 'Cellulose', 'A']
const opt2 = ['Molecule', 'Mitochondria', 'Photosynthesis', 'Ribose', 'Carry oxygen', 'Kidney', 'Autotroph', 'Transport water', 'Deoxyribose Acid', 'Skin', 'Detoxify chemicals', 'Insulin', 'Diabetes', 'Mitosis', 'Vitamin C', 'Leaves', 'Femur', 'Stamen', 'Chitin', 'B']
const opt3 = ['Cell', 'Ribosome', 'Transpiration', 'Phosphate', 'Digest food', 'Pancreas', 'Saprophyte', 'Store nutrients', 'Dioxyribose Acid', 'Heart', 'Store oxygen', 'Adrenaline', 'Scurvy', 'Meiosis', 'Vitamin D', 'Flowers', 'Tibia', 'Petal', 'Protein', 'AB']
const opt4 = ['Tissue', 'Golgi apparatus', 'Digestion', 'Fructose', 'Protect against disease', 'Heart', 'Parasite', 'Photosynthesis', 'Deoxynucleic Acid', 'Lungs', 'Pump blood', 'Estrogen', 'Rickets', 'Apoptosis', 'Vitamin B12', 'Roots', 'Humerus', 'Sepal', 'Lipids', 'O']
const correctAns = [2, 1, 1, 2, 1, 2, 1, 1, 0, 1, 1, 1, 1, 1, 2, 2, 0, 0, 0, 3];
const qusNo = document.querySelector('.qus-no span')
let qustion = document.querySelector('.question span')
const nextBtn = document.querySelector('.next')
const optionArray = document.querySelectorAll('.option')
const tick = document.querySelectorAll('.tick')
const cross = document.querySelectorAll('.cross')
const submitBtn = document.querySelector('.submit')
const timer = document.querySelector('.timer')
const optionContainer = document.querySelector('.option-container')
const qustionPage = document.querySelector('.quiz-page ')
const resultPage = document.querySelector('.result-page')
const retryBtn = document.querySelector('.retry')
const totalAnsGiven = document.querySelector('.total-ans')
const progressLine = document.querySelector('.progress-line')
const music = document.querySelector('#music')
const rightTune = document.querySelector('#right-tune')
const wrongTune = document.querySelector('#wrong-tune')



startBtn.addEventListener('click', () => {
    startPage.classList.add('hide')
    quizPage.classList.toggle('hide')
    music.play()
})

volumeBtn.addEventListener('click', () => {
    volumeBtn.classList.toggle('hide')
    muteBtn.classList.toggle('hide')
    music.muted = true
    rightTune.muted = true
    wrongTune.muted = true
})



muteBtn.addEventListener('click', () => {
    volumeBtn.classList.toggle('hide')
    muteBtn.classList.toggle('hide')
    music.muted = false
    wrongTune.muted = false
    rightTune.muted = false
})

let currentQuestionIndex = 0
function displayQuestion() {
    if (currentQuestionIndex <= qusArray.length - 1) {
        qustion.textContent = qusArray[currentQuestionIndex];
        document.querySelector('#opt1').textContent = opt1[currentQuestionIndex];
        document.querySelector('#opt2').textContent = opt2[currentQuestionIndex];
        document.querySelector('#opt3').textContent = opt3[currentQuestionIndex];
        document.querySelector('#opt4').textContent = opt4[currentQuestionIndex];
        qusNo.textContent = `${currentQuestionIndex + 1}/${qusArray.length}`;
    }
    else if (currentQuestionIndex > qusArray.length-1) {         
        alert('quiz completed')
        music.pause()
        resultPage.classList.remove('hide')
        qustionPage.classList.add('hide')
        clearInterval(intervalId)
        localStorage.setItem('total', totalCorrectAns)
    }
}

let totalCorrectAns = 0
let valueOfProgress = 0
optionArray.forEach((curr, index) => {
    // checking correct ans
    curr.addEventListener('click', () => {
        if(index === correctAns[currentQuestionIndex]){
            curr.classList.add('right')
            tick[index].classList.remove('hide')
            ++totalCorrectAns
            totalAnsGiven.textContent = `${totalCorrectAns}/20`
            valueOfProgress += 5
            progressLine.style.width = `${valueOfProgress}%`
            rightTune.play()

            if (totalCorrectAns <= 10) {
                document.querySelector('.result-quote').textContent = 'Keep learning, You need to improve!'
            } else {
                document.querySelector('.result-quote').textContent = 'Keep learning, you have a good score!'
            }
        }
        else{
            curr.classList.toggle('wrong')
            cross[index].classList.remove('hide')
            wrongTune.play()
        }
        
        optionContainer.style.pointerEvents = 'none'

        if (currentQuestionIndex < qusArray.length - 1) {         
            nextBtn.classList.remove('hide')
        } 
        else {
            submitBtn.classList.remove('hide')
        }
    })
})

function resetOption() {
    optionArray.forEach((curr, index) => {
        curr.classList.remove('right')
        curr.classList.remove('wrong')
        tick[index].classList.add('hide')
        cross[index].classList.add('hide')
    })
}

nextBtn.addEventListener('click', () => {
    ++currentQuestionIndex
    displayQuestion()
    resetOption()
    nextBtn.classList.toggle('hide')
    resetTime()
    optionContainer.style.pointerEvents = 'all'
    qustionPage.style.backgroundColor = 'rgba(204, 226, 194, 1)'
    timer.style.backgroundColor = 'rgb(12, 164, 9)'
    nextBtn.style.color = 'rgb(12, 164, 9)'
})

submitBtn.addEventListener('click', () => {
    alert('quiz completed')
    submitBtn.classList.add('hide')
    resultPage.classList.remove('hide')
    qustionPage.classList.add('hide')
    music.pause()
    clearInterval(intervalId)
    localStorage.setItem('total', totalCorrectAns)
})

// displaying qus first time
displayQuestion()


// timer
let a = 30
let intervalId
startBtn.addEventListener('click', startTime)

function startTime()  {
    intervalId = window.setInterval(() => {
        document.querySelector('.timer span').textContent = `00:${a--}`

        if (a < 0) {
            currentQuestionIndex++
            displayQuestion()
            // document.querySelector('.timer span').textContent = '00.00'
            resetTime()
            resetOption()
            qustionPage.style.backgroundColor = 'rgba(204, 226, 194, 1)'
            timer.style.backgroundColor = 'rgb(12, 164, 9)'
            nextBtn.style.color = 'rgb(12, 164, 9)'
            optionContainer.style.pointerEvents = 'all'
            nextBtn.classList.add('hide')
        }

        if(a <20 && a > 11) {
            qustionPage.style.backgroundColor = 'rgba(212, 214, 159, 0.55)'
            timer.style.backgroundColor = 'rgb(197, 177, 0)'
            nextBtn.style.color = 'rgb(197, 177, 0)'
        }
        else if (a < 10) {
            qustionPage.style.backgroundColor = 'rgba(219, 173, 173, 1)'
            timer.style.backgroundColor = 'rgb(255, 0, 0)'
            nextBtn.style.color = 'rgb(255, 0, 0)'
        }
    }, 1000);
}

function resetTime() {
    a = 30
}

retryBtn.addEventListener('click', () => {
    currentQuestionIndex = 0
    resetOption()
    resetTime()
    displayQuestion()
    qustionPage.classList.remove('hide')
    resultPage.classList.add('hide')
    optionContainer.style.pointerEvents = 'all'
    totalCorrectAns = 0
    qustionPage.style.backgroundColor = 'rgba(204, 226, 194, 1)'
    timer.style.backgroundColor = 'rgb(12, 164, 9)'
    nextBtn.style.color = 'rgb(12, 164, 9)'
    valueOfProgress = 0
    music.play()
    startTime()
})