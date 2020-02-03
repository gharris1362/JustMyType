let $upperKeyboard = $('#keyboard-upper-container');
let $lowerKeyboard = $('#keyboard-lower-container');
let $feedback = $('#feedback');
let $keys = $('.key');
let displaySentence = $('#sentence');
let $targetLetter = $('#target-letter')
let sentences = ['ten ate neite ate nee enet ite ate inet ent eate', 'Too ato too nOt enot one totA not anot tOO aNot', 'oat itain oat tain nate eate tea anne inant nean', 'itant eate anot eat nato inate eat anot tain eat', 'nee ene ate ite tent tiet ent ine ene ete ene ate'];
let sentenceIndex = 0;
let letterIndex = 0;
let score = 0;
let misses = 0;
let currentSentence = sentences[sentenceIndex];
let currentLetter = currentSentence[letterIndex];
let $container = $('.container');
let $startButton = $('#start');
let words = 54;


// $('.scorecard').text = score
$targetLetter.text(currentLetter)
displaySentence.text(currentSentence);
$upperKeyboard.hide();
$container.hide();
$('#endGame').hide();
let endGame = $('#endGame');

$startButton.click(() => {
    $('#startGame').hide();
    $container.show();
   startTime = Date.now();
})


$(document).keydown((e) => {
    if (e.keyCode == 16) {
        $lowerKeyboard.hide()
        $upperKeyboard.show()
    }
});
$(document).keyup((e) => {
    $('.highlight').removeClass('highlight');
    if (e.keyCode == 16) {
        $upperKeyboard.hide();
        $lowerKeyboard.show();
    }
});
$(document).keypress((e) => {
    // console.log(letterIndex)
    // console.log(e.key);

    $('#' + e.keyCode).addClass('highlight');
    if (currentSentence.charCodeAt(letterIndex) === e.keyCode) {
        $feedback.append(`<span class ="glyphicon glyphicon-ok"></span>`)
        $('#yellow-block').css('left', '+=17.5')
        letterIndex++
        $('#target-letter').text(currentSentence[letterIndex])
        score++
        let currentScore = $(`<p>Score: ${score}</p>`);
        // $('#scorecard').empty();
        // currentScore.appendTo('#scorecard');
        $('#scorecard').text(`Score: ${score}`)
    } else {
        misses++
        console.log(misses)
        $feedback.append(`<span class ='glyphicon glyphicon-remove'></span>`)
    }
    if (sentenceIndex != 4) {
        if (letterIndex == currentSentence.length) {
            letterIndex = 0;
            sentenceIndex++
            displaySentence.text(sentences[sentenceIndex]);
            currentSentence = sentences[sentenceIndex];
            currentLetter = currentSentence[letterIndex];
            $feedback.text('');
            $('#yellow-block').css('left', '17.5px');
            $targetLetter.text(currentLetter);
        }
    } else if (sentenceIndex == 4) {
        if (letterIndex == currentSentence.length) {
            alert('win!')
            $container.hide();
            $('#endGame').show();
            endTime = Date.now();
            // console.log('start time is ' + startTime);
            // console.log('end time is ' + endTime);
            let finalTime = endTime - startTime
            let seconds = finalTime / 1000;
            function secsToMins(s) {
                var h = Math.floor(s/3600); //Get whole hours
                s -= h*3600;
                var m = Math.floor(s/60); //Get remaining minutes
                s -= m*60;
                return (s < 10 ? '0'+s : s); //zero padding on minutes and seconds
            }
            let wpm = secsToMins(seconds)
            if (misses == 0) {
                $(`<p>You Typed ${Math.floor(wpm)} words per minute! you didnt miss a single time!</p>`).appendTo(endGame)
            }   else if (misses == 1) {
                $(`<p>You Typed ${Math.floor(wpm)} words per minute! you missed ${misses} time!</p>`).appendTo(endGame)
            } else {
                $(`<p>You Typed ${Math.floor(wpm)} words per minute! you missed ${misses} times. </p>`).appendTo(endGame)

            }
        }
    }

}) ;

 $('#restart').click(() => {
     location.reload()
 })