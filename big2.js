//Deck Code

var Deck = [];
var cardNum = 2;  
var Suit = 'D'; 

for (var i = 0; i < 52; i++) 
{
	setSuit(i); 
	
	Deck.push({
		number: cardNum, 
		suit: Suit
	}); 
	
	if( ((i + 1) % 4) === 0) 
		cardNum = setCardNum(i); 	
}

function setSuit(i) 
{
	switch (((i + 1) % 4)) 
	{
		case 1: 
			Suit = 'D'; 
			break; 
		
		case 2: 
			Suit = 'C'; 
			break; 
			
		case 3: 
			Suit = 'H'; 
			break; 
		
		case 0: 
			Suit = 'S'; 
			break; 
	}
}
	

function setCardNum(i) 
{
	if (i > 34) 
	{
		switch(i)
		{
			case 35: 
				cardNum = 'J'; 
				break; 
			
			case 39:
				cardNum = 'Q'; 
				break; 
				
			case 43: 
				cardNum = 'K'; 
				break; 
				
			case 47: 
				cardNum = 'A'; 
				break; 
		}		
	}			

	else 
		cardNum++; 
		
	return cardNum; 	
}



//Player Code

var player1 = []
var player2 = [];
var player3 = []; 
var player4 = [];


 
var max = 51;
var index; 


for (var i = 0; i < 13; i++)
{
		player1.push(
		{
			number: 0,
			suit: 0 
		}); 
		
		player2.push(
		{
			number: 0,
			suit: 0 
		}); 
		
		player3.push(
		{
			number: 0,
			suit: 0 
		}); 
		
		player4.push(
		{
			number: 0,
			suit: 0 
		}); 
}

var lastHandPlayed = 
{
	number: 0, 
	suit: 0
};

setHand(player1); 
setHand(player2); 
setHand(player3); 
setHand(player4);

 
var x, j; 
var currentPlayer; 


player1.sort(function(a, b){
		return parseInt(a.number) - parseInt(b.number); 
	});
	
	
function randomNum(min,max)
{
    return Math.floor(Math.random()*(max-min+1)+min);
}

function setHand(player)
{
	for (var i = 0; i < 13; i++) 
	{
		index = randomNum(0, max);
		player[i].number = Deck[index].number; 
		player[i].suit = Deck[index].suit; 
		Deck.splice(index, 1); 
		max--; 
	}
}


/*function selectOneCard(player, )
{
	for (var i = 0; i < 13; i++) 
	{
	*/	

//Display Hand Code

function setSuitClip(i)
{
	switch(player1[i].suit)
	{
		case 'S':
			suitXClip = 0; 
			suitYClip = 0; 
			break; 
			
		case 'H': 
			suitXClip = 15; 
			suitYClip = 0; 
			break; 
			
		case 'D':
			suitXClip = 0; 
			suitYClip = 15; 
			break; 
		
		case 'C': 
			suitXClip = 15; 
			suitYClip = 15;
			break;
	}
}



var suitXClip = 0; 
var suitYClip = 0; 
var destinationX = 0;
var cards = []; 
var suits = []; 
var number = []; 
var selected; 

var paper = Raphael(10, 400, 1000, 1000);
var imgSrcs = ["blankCard.png", "cardSuits2.png", "blankCard2.png"];

renderHand(); 

	

function selectCard(){

	if (this.node.getAttribute('class') === "selected")
	{
		this.selected.remove();
		this.node.setAttribute('class', 'unselected'); 
		return; 
	}
		
	this.node.setAttribute('class', 'selected'); 
	this.selected = this.glow().attr('stroke', 'black'); 
	
}

function renderHand()
{
	cards.length = 0; 
	suits.length = 0; 
	number.length = 0; 
	
	for (var i = 0; i < player1.length; i++) 
	{
		setSuitClip(i); 
			
		destinationX = i * 51; 
			
		cards[i] = paper.image(imgSrcs[0], destinationX, 0, 61, 100); 
		number[i] = paper.text(destinationX + 11, 10, player1[i].number); 
		suits[i] = paper.image(imgSrcs[1], destinationX + 10 - suitXClip, 20 - suitYClip , 30, 30);
		suits[i].attr({"clip-rect": [destinationX + 10, 20, 15, 15]}); 
		cards[i].click(selectCard);


	}
}



//Function to find player with 3 of Diamonds
function firstPlayer()
{
	var exit = false; 
	for (var i = 0; i < 4; i++) 
	{
		var player; 
		
		switch(i) 
		{
			case 0:
				player = player1; 
				break; 
				
			case 1: 
				player = player2; 
				break;
				
			case 2: 
				player = player3; 
				break;

			case 3: 
				player = player4; 
				break; 
		}
		
		for (var j = 0; j < 13; j++)
			if (player[j].number === 3 && player[j].suit === 'D')
			{
				exit = true; 
				break; 
			}
		
		if (exit === true)
			break;
	}
	
	return player; 
}







//Test Code
$('div').append("<p>");
for (var i = 0; i < 13; i++) 
{
	$('div').append("<span>" + player1[i].number + player1[i].suit + " </span>"); 
}
$('div').append("</p>");

$('div').append("<p>");
for (var i = 0; i < 13; i++) 
{
	$('div').append("<span>" + player2[i].number + player2[i].suit + " </span>"); 
}
$('div').append("</p>"); 

$('div').append("<p>");
for (var i = 0; i < 13; i++) 
{
	$('div').append("<span>" + player3[i].number + player3[i].suit + " </span>"); 
}
$('div').append("</p>"); 

$('div').append("<p>");
for (var i = 0; i < 13; i++) 
{
	$('div').append("<span>" + player4[i].number + player4[i].suit + " </span>"); 
}
$('div').append("</p>"); 
 
		
		
	
	