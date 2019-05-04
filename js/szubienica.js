var word = "Bez pracy nie ma kołaczy";
word = word.toUpperCase();

var wordlength = word.length;

var wordcrypt = "";

var how_many_errors = 0;

var snd_yes = new Audio("snd/yes.wav");
var snd_no = new Audio("snd/no.wav");

for (i=0; i<wordlength; i++)
{
	if (word.charAt(i)==" ") wordcrypt = wordcrypt + " ";
	else wordcrypt = wordcrypt + "-";
}

function show_word()
{
	document.getElementById("board").innerHTML = wordcrypt;
}

window.onload = alphabet_gen;

var letters = new Array(35); // tablica w JS

letters[0]  = "A";
letters[1]  = "Ą";
letters[2]  = "B";
letters[3]  = "C";
letters[4]  = "Ć";
letters[5]  = "D";
letters[6]  = "E";
letters[7]  = "Ę";
letters[8]  = "F";
letters[9]  = "G";
letters[10] = "H";
letters[11] = "I";
letters[12] = "J";
letters[13] = "K";
letters[14] = "L";
letters[15] = "Ł";
letters[16] = "M";
letters[17] = "N";
letters[18] = "Ń";
letters[19] = "O";
letters[20] = "Ó";
letters[21] = "P";
letters[22] = "Q";
letters[23] = "R";
letters[24] = "S";
letters[25] = "Ś";
letters[26] = "T";
letters[27] = "U";
letters[28] = "V";
letters[29] = "W";
letters[30] = "X";
letters[31] = "Y";
letters[32] = "Z";
letters[33] = "Ż";
letters[34] = "Ź";


function alphabet_gen()
{
	var divletter = "";
	
	for (i=0; i<=34; i++)
	{
		var element = "let"+i;
		divletter = divletter + '<div class="letters" onclick="check('+i+')" id="'+element+'">'+letters[i]+'</div>';
		if ((i+1) % 7 == 0) divletter = divletter + '<div style="clear:both;"></div>';
	}
	
	document.getElementById("alphabet").innerHTML = divletter;
	
	show_word();
}

String.prototype.setChar = function(position, character) // nowa funkcja do uzywania po kropce [setChar]
{
	if (position > this.length - 1) return this.toString(); // this - obiekt po lewej stronie kropki
	else return this.substr(0, position) + character + this.substr(position + 1); // zmiana jednego znaku w pozycji position
}

function check(nr)
{
	var lettercorrect = false;
	
	for (i=0; i<wordlength; i++)
	{
		if (word.charAt(i) == letters[nr])
		{
			wordcrypt = wordcrypt.setChar(i,letters[nr]);
			lettercorrect = true;
		}
	}
	
	if (lettercorrect == true)
	{
		snd_yes.play();
		var element = "let"+nr;
		document.getElementById(element).style.background = "#003300";
		document.getElementById(element).style.color = "#00C000";
		document.getElementById(element).style.border = "3px solid #00C000";
		document.getElementById(element).style.cursor = "default";
		
		show_word();
	}
	else
	{
		snd_no.play();
		var element = "let"+nr;
		document.getElementById(element).style.background = "#330000";
		document.getElementById(element).style.color = "#C00000";
		document.getElementById(element).style.border = "3px solid #C00000";
		document.getElementById(element).style.cursor = "default";
		document.getElementById(element).setAttribute("onclick",";");
		
		// how_many_errors
		how_many_errors++;
		var imageName = "img/s"+how_many_errors+".jpg";
		document.getElementById("szubienica").innerHTML = '<img src="'+imageName+'" alt=""/>';
		
	}
	
	// win
	
	if (word == wordcrypt)
	{
		document.getElementById("alphabet").innerHTML =
		"Yay! You guessed the correct password:<br/><br/>"+word+'<br/><br/><span class="reset" onclick="location.reload()">[ Try again ]</span>';
	}
	
	// loss
	
	if (how_many_errors>=9)
	{
		document.getElementById("alphabet").innerHTML =
		"You lost :( Correct password:<br/><br/>"+word+'<br/><br/><span class="reset" onclick="location.reload()">[ Try again ]</span>';
	}
	
}



















