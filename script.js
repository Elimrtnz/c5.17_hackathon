
var turn = 'player1';
var array = [];
var classId = '';
var toggleTurn = 0;
var squaresLeft = 59;


function createGame(){
    var temp_array = [];
    for (var i =0; i <= 7; i++){
        for(var j = 0; j <= 7; j++){
            classId = '' + i + j;
            var newSquare = $('<div>').appendTo('#gameBoard');
            $(newSquare).addClass('square');
            $(newSquare).attr('id', classId);
            temp_array.push(newSquare);
        }
        array.push(temp_array);
        temp_array = [];
    }
}
//Assigns the starting positions for each player in the middle of the board
function startConditions(){
    $('#33').addClass('player1');
    $('#33').removeClass('square');
    $('#34').addClass('player2');
    $('#34').removeClass('square');
    $('#44').addClass('player1');
    $('#44').removeClass('square');
    $('#43').addClass('player2');
    $('#43').removeClass('square');
}
function makeMove(){
    toggleTurn = 0;
    var tempI = $(this).attr('id').charAt(0);
    var tempJ = $(this).attr('id').charAt(1);
    var firstLoop = 0;
    if(turn === 'player1')
    //Loops through each square that is touching the square that was clicked.
        for(var i = -1; i < 2; i++) {
            for (var j = -1; j < 2; j++) {
                //Sets temporary id to compare classes against current square
                var temp1 = parseInt($(this).attr('id').charAt(0));
                var temp2 = parseInt($(this).attr('id').charAt(1));
                var tempId = '#' + (temp1 + i) + (temp2 + j);
                if (turn === 'player1') {
                    if ($(tempId).attr('class') === 'player2') {
                        //Increments in the direction of an adjacent enemy square
                        $(tempId).addClass('marked');
                        temp1 = temp1 + i + i;
                        temp2 = temp2 + j + j;
                        var tempId2 = '#' + temp1 + temp2;
                        //Changes classes to reflect current owner of corresponding squares.
                        if ($(tempId2).attr('class') === 'player1') {
                            $(this).removeClass('square');
                            $(this).addClass('player1');
                            $(tempId).removeClass('square');
                            $(tempId).removeClass('player2');
                            $(tempId).addClass('player1');
                            $('.marked').removeClass('marked');
                        }
                        //Continues down the direction of chained enemy squares until it finds a friendly square.
                        else if ($(tempId2).attr('class') === 'player2') {
                            $(tempId2).addClass('marked');
                            for (var k = 0; k < array.length; k++) {
                                $(tempId2).addClass('marked');
                                temp1 = temp1 + i;
                                temp2 = temp2 + j;
                                tempId2 = '#' + temp1 + temp2;
                                if ($(tempId2).attr('class') === 'player2') {
                                    $(tempId2).addClass('marked');
                                }
                                //upon finding a friendly square, all
                                else if ($(tempId2).attr('class') === 'player1') {
                                    $('.marked').removeClass('square');
                                    $('.marked').removeClass('player2');
                                    $('.marked').addClass('player1');
                                    $('.marked').removeClass('marked');
                                    $(tempId2).removeClass('square');
                                    $(tempId2).removeClass('player2');
                                    $(tempId2).addClass('player1');
                                    $(this).removeClass('square');
                                    $(this).addClass('player1');

                                }
                            }
                        }
                    }
                    if(i === 1 && j === 1 && $(this).attr('class') === 'player1') {
                        turn = 'player2';
                        squaresLeft -= 1;
                        scoreCounter();
                        whoseTurn();
                    }
                    $('.marked').removeClass('marked');
                }
            }
        }
    else if(turn === 'player2') {
        for (var i = -1; i < 2; i++) {
            for (var j = -1; j < 2; j++) {
                var temp1 = parseInt($(this).attr('id').charAt(0));
                var temp2 = parseInt($(this).attr('id').charAt(1));
                var tempId = '#' + (temp1 + i) + (temp2 + j);
                if (turn === 'player2') {
                    if ($(tempId).attr('class') === 'player1') {
                        $(tempId).addClass('marked');
                        temp1 = temp1 + i + i;
                        temp2 = temp2 + j + j;
                        tempId2 = '#' + temp1 + temp2;
                        if ($(tempId2).attr('class') === 'player2') {
                            $(this).removeClass('square');
                            $(this).addClass('player2');
                            $(tempId).removeClass('square');
                            $(tempId).removeClass('player1');
                            $(tempId).addClass('player2');
                            $('.marked').removeClass('marked');
                        }
                        else if ($(tempId2).attr('class') === 'player1') {
                            $(tempId2).addClass('marked');
                            for (var l = 0; l < array.length; l++) {
                                temp1 = temp1 + i;
                                temp2 = temp2 + j;
                                tempId2 = '#' + temp1 + temp2;
                                if ($(tempId2).attr('class') === 'player1') {
                                    $(tempId2).addClass('marked');
                                }
                                else if ($(tempId2).attr('class') === 'player2') {
                                    $('.marked').removeClass('square');
                                    $('.marked').removeClass('player1');
                                    $('.marked').addClass('player2');
                                    $('.marked').removeClass('marked');
                                    $(tempId2).removeClass('square');
                                    $(tempId2).removeClass('player1');
                                    $(tempId2).addClass('player2');
                                    $(this).removeClass('square');
                                    $(this).addClass('player2');
                                }
                            }
                        }
                    }
                    if(i === 1 && j === 1 && $(this).attr('class') === 'player2'){
                        turn = 'player1';
                        squaresLeft -= 1;
                        whoseTurn();
                        scoreCounter();
                    }
                    $('.marked').removeClass('marked');
                }
            }

        }
    }
}

//Loops through every square to check it's class, and increments the corresponding score each time it finds a match.
//If no spaces are available, it checks to see who has more squares, the announces the winner;
function scoreCounter(){
    var score1 = 0;
    var score2 = 0;
    for (var i =0; i <= 7; i++){
        for(var j = 0; j <= 7; j++){
            if($('#' + i + j).hasClass('player1')) {
                score1 +=1;
                $('#value1').text(score1);

            }
            else if($('#' + i + j).hasClass('player2')){
                score2 += 1;
                $('#value2').text(score2);
            }
        }

    }
    if (squaresLeft === 0){
        if(score1 > score2){
            $('#won_message').text('Player 1 Won!!!')
            $('#won_wrapper').css('display', 'block');
            $('#won_background').css('display', 'block');
        }
        else if(score2 > score1){
            $('#won_message').text('Player 1 Won!!!')
            $('#won_wrapper').css('display', 'block');
            $('#won_background').css('display', 'block');
        }
        else
        {

            $('#won_message').text('It\'s a tie!!!')
        }
    }
    console.log(score1, score2);

}
//Pass button function in case no moves are possible
function passMove(){
    if(turn === 'player1'){
        turn = 'player2';
    }
    else if(turn === 'player2'){
        turn = 'player1';
    }
    whoseTurn();
}
function whoseTurn(){
    console.log('whose turn is being called!!');
    if(turn==='player1'){
        $('#playerOne').css({'color':'red',"font-size": "25px"});
        $('#playerTwo').css({'color':'white',"font-size": "15px"});
        $('#value1').css({'color':'yellow',"font-size": "25px"});
        $('#value2').css({'color':'yellow',"font-size": "15px"});
    }
    else if(turn==='player2'){
        $('#playerTwo').css({'color':'red',"font-size": "25px"});
        $('#playerOne').css({'color':'white',"font-size": "15px"});
        $('#value2').css({'color':'yellow',"font-size": "25px"});
        $('#value1').css({'color':'yellow',"font-size": "15px"});
    }
}
$(document).ready(function(){
    createGame();
    startConditions();
    whoseTurn();
    $('.square').on('click', makeMove);
    $('.pass').on('click', passMove);
});