
const redtries=[];
const green=[];

$(document).keypress(function (e){
   var key = e.key;
   switch(key) {
    case "Enter": 
        if ( document.URL.includes("index.html") ) {
            var selectedWord=$("#chosenWord").val();
            if(selectedWord.length>0){
                localStorage.setItem("savedWord", selectedWord);
                window.location.href = "Main.html"
            }
        } 
        break;
    
    default:
        if(!$("." + key.toUpperCase()).hasClass("btn") && /[a-z]/i.test(key) && !$("." + key.toUpperCase()).hasClass("btn-1")){
            checkWord(key.toUpperCase());
        }
        break;
    }   
});
if (document.URL.includes("Main.html") ) {
    var wordLength=localStorage.getItem("savedWord").length;
            for(var i=0;i<wordLength;i++){
                $(".spaces").append(" <span id='" + [i] + "'>_</span>");
            }
        }

$("button").click(function (e){ 
    var letters = this.innerHTML; 
    if(!$("." + letters).hasClass("btn") && !$("." + letters).hasClass("btn-1")){
        $("." + letters).fadeOut(100).fadeIn(100);
        animatePress(letters);
        checkWord(letters);
    }
});

$("#single, #double").click(function (e){
    var id=this.id;
    $("#" +id).addClass("pressed");
    setTimeout(function(){
        $("#"+ id).removeClass("pressed");
    }, 100);
    
    if(id=="double"){
        $("#chosenWord").toggleClass("hide");
        $("#single").addClass("hide");
        $("#double").addClass("hide");
    }
    if(id=="single"){          
        var selectedWord=(randomWord(dictionary));
        localStorage.setItem("savedWord", selectedWord);
        window.location.href = "Main.html";
    }
});

function randomWord(dict){
    var length = dict.length;
    var randomNumer = Math.floor((Math.random() * (length - 1))+1);
    return dict[randomNumer];
}
$("#restart-btn").click(function(){
    window.location.href = "index.html"
    function autoRefresh() {
        window.location = window.location.href;
    }
    setInterval('autoRefresh()', 0);
});

function checkWord(letter){
    $("." + letter).fadeOut(100).fadeIn(100);
    var audio = new Audio("Sounds/key.mp3");
    audio.play();
    animatePress(letter);
    var numTries=6;
    const list = localStorage.getItem("savedWord").split("");
    if(redtries.length<numTries){
        for(var a=0; a< list.length;a++){
            if(letter==(list[a]).toUpperCase()){
               if(green.length!=list.length){
                    green.push(list[a].toUpperCase());
            }
            if(!$("." + letter).hasClass("btn")){
                $("." + letter).addClass("btn");
            } 
                $("#"+ a).text(letter);
                if(green.length==list.length){
                    $(".hangman-1").text("You Won!");
                }
            }         
            }
            for(var a=0; a< list.length;a++){
                if(!green.includes(letter) && green.length!=list.length && !$("." + letter).hasClass("btn")){
                    if(!$("." + letter).hasClass("btn-1")){
                        $("." + letter).addClass("btn-1");
                        redtries.push("1");    
                        $("img").attr("src","Images/base-"+ (redtries.length) + ".png");  
                        if(redtries.length==numTries){
                            $(".hangman-1").text("You Lost!");
                                        
                        } }         
                    }  
            }
        }  
    var maxLength=0;
    var writtenLen=maxLength + redtries.length;
    $("#remaining").text("Wrong guesses : " + writtenLen + "/6");   
}

function animatePress(current){
    $("."+ current).addClass("pressed");
    setTimeout(function(){
        $("."+ current).removeClass("pressed");
    }, 100);
}


