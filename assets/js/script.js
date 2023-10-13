var keyboard = document.querySelector(".keyboard")
var wordDisplay = document.querySelector('.word-display')
var li = document.getElementsByTagName("li")
var gameModal = document.querySelector('.game-modal')
var counter = 0
var maxGussses = 6
var correctLetters = []
var date = new Date()
var score = localStorage.getItem("score")||0
localStorage.setItem("score", score)
var stored = parseInt(localStorage.getItem("score"))
var seconds = 60



// create the buttons of the keyboard

for(var i = 97; i<= 122; i++){
    var button = document.createElement("button")
    button.classList.add('btn')
    button.innerText = String.fromCharCode(i)
    keyboard.appendChild(button)
}
// hide the keyboard
$('.keyboard').hide()

// generate a random word

function generateRandomWord(){
    var number = Math.floor(Math.random()* wordList.length)
    var word = wordList[number].word
    var hint = wordList[number].hint
    var splittedWord  = word.split("")
    return [splittedWord, hint]
}
var word = generateRandomWord()
function displayLi(){
    $(".hint-text b").html(word[1])
    word[0].forEach(function(e){
        $(".word-display").append(`<li class="letter"></li>`)
    })
}
// display the place holder of the word
displayLi()
console.log(word[0].join(''));


// create the click event function

$(".btn").on("click", function(){
    var value = this.innerHTML
    var index =  word[0].indexOf(value)
    console.log(index);
    console.log(value); 
    if(!word[0].includes(value)){
        this.disabled = true
    }
    if(word[0].includes(value)){
        word[0].forEach(function(e,i){
            if(e === value){
                correctLetters.push(value)
                li[i].innerText = value
                li[i].classList.add("guessed")
            }
        })
    }
    else if(!word[0].includes(value)){
        counter ++ 
        $(".hangman-box img").attr('src',`assets/images/hangman-${counter}.svg`)
        
    }
    $('.guesses-text b').text(`${counter}/${maxGussses}`) 
    

    if (counter === maxGussses) return gameOver(false)
    if (correctLetters.length === word[0].length) return gameOver(true)

})

// display the game over pop up
var gameOver = function(isVictory) {
    
    setTimeout(function(){
        var modalText = isVictory ? `You found the word :` : `The correct word was : `
        if(isVictory){
            localStorage.setItem("score", ++stored);
        }
        $('.game-modal img').attr('src',`assets/images/${isVictory ? 'victory' : 'lost'}.gif`)
        $('.game-modal h4').html(`${isVictory ? 'Congrats !' : 'Game Over !'}`)
        $('.game-modal p').html(`${modalText} <b>${word[0].join('')} </b>`)

        gameModal.classList.add('show')
    },3000000000)
    
}


function refresh(){
    window.location.reload();
}

$("#selectDiffucilty").on("change", function() {
    seconds = parseInt($("#selectDiffucilty").val()) 
    console.log(seconds);
})

console.log(seconds);

// create the game timer 
function startTimer() {
    var timer = setInterval(function () {
    
        seconds--
        $(".timer-container").html(seconds+" sec");
        console.log(seconds);
    
        if(seconds === 0){
    
            clearInterval(timer)
            gameOver(false)
            
        
        }
    
     }, 1000);
}

$('.start-btn').on("click", function(){
    startTimer()
    $('.keyboard').show()


})

// display the score
function displayScore(){
    $("#score").html("your score: " + stored)
}
displayScore()


// reset the score
$("#resetScore").on('click',function(){
    stored = 0
    localStorage.removeItem('score')
    $("#score").html("your score: " + stored)

})


