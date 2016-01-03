//Deck Code

var Deck = [];
var cardNum = 2;  
var Suit = 'D';

//Set the deck
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

//Set the suits for the deck
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
	
//Set the card numbers for the deck
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

var players = [];
var player1 = []; 
var player2 = []; 
var player3 = []; 
var player4 = [];

players.push(player1); 
players.push(player2); 
players.push(player3); 
players.push(player4); 




 
var max = 51;
var index; 


for (var i = 0; i < 4; i++) 
{
	for (var j = 0; j < 13; j++)
	{
			players[i].push(
			{
				number: 0,
				suit: 0 
			}); 
	}
}


var lastHandPlayed = 
{
	number: 0, 
	suit: 0,
	playerNum: null,
	code: null
};

var suitObject = 
{
	D: 0, 
	C: 1, 
	H: 2, 
	S: 3
};


for (var i = 0; i < 4; i++) 
	setHand(players[i]); 

var x, j; 
var currentPlayer; 


/*players[0].sort(function(a, b){
		return parseInt(a.number) - parseInt(b.number); 
	});*/
	
for (var i = 0; i < 4; i++) 
	legitSort(i); 
	
	
function randomNum(min,max)
{
    return Math.floor(Math.random()*(max-min+1)+min);
}

//Generate probability for whether the CPU will play the card or not
function probGen(cardPosition, index)
{
	var randomNum = Math.floor(Math.random() * (10 - 1 + 1)) + 1;
	var play  = true; 
	var found = false; 
	
	for (var i = 0; i < fiveCardHands[index]['straight'].length; i++) 
	{
		for (var j = 0; j < fiveCardHands[index]['straight'][i].length; j++)
		{		
			if (cardPosition == fiveCardHands[index]['straight'][i][j].position)
				found = true; 
		
			if ((cardPosition == fiveCardHands[index]['straight'][i][j].position) && (randomNum > 0 && randomNum < 10)) 
				{
					play = false;
					break; 
				}
				
			else  
				play = true;
		}			
			
		if (play == false) 
			break; 
	}		

	//Only search for card in flush if we didn't find the card in a our straights
	if (play == true) 
	{
		for (var i = 0; i < fiveCardHands[index]['flush'].length; i++) 
		{
			for (var j = 0; j < fiveCardHands[index]['flush'][i].length; j++)
			{		
				if (cardPosition == fiveCardHands[index]['flush'][i][j].position)
					found = true; 
			
				if ((cardPosition == fiveCardHands[index]['flush'][i][j].position) && (randomNum > 0 && randomNum < 10)) 
					{
						play = false;
						break; 
					}
					
				else  
					play = true;
			}			
			
			if (play == false) 
				break; 
		}		
	}		
	
	return play; 
	
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

//Display Hand Code
function setSuitClip(suit)
{
	switch(suit)
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

	
//When user selects a card
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

//Display player's hand
function renderHand()
{
	cards.length = 0; 
	suits.length = 0; 
	number.length = 0; 
	
	for (var i = 0; i < players[0].length; i++) 
	{
		setSuitClip(players[0][i].suit); 
			
		destinationX = i * 51; 
			
		cards[i] = paper.image(imgSrcs[0], destinationX, 0, 61, 100); 
		number[i] = paper.text(destinationX + 11, 10, players[0][i].number); 
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
		for (var j = 0; j < 13; j++)
			if (players[i][j].number === 3 && players[i][j].suit === 'D')
			{
				exit = true; 
				break; 
			}
		
		if (exit === true)
			break;
	}
	
	return i; 
}

/*function playHand (currentPlayer)
{
	if (lastHandPlayed.length === 1) 
		playOneCard(currentPlayer); 
}*/



//Find the five card hand


//5 card hand Object
var doubles = []; 
var playerOne = []; 
var playerTwo = []; 
var playerThree = []; 
var playerFour = [];
var playerDubs = []; 

var fiveCardHands = []; 


playerDubs.push(playerOne); 
playerDubs.push(playerTwo); 
playerDubs.push(playerThree); 
playerDubs.push(playerFour);


//fiveCardHands three dimensional array
//fiveCardHands[playerNum][typeOfFiveCardHand][fiveCardHand][card]

fiveCardHands.push(playerOne); 
fiveCardHands.push(playerTwo); 
fiveCardHands.push(playerThree); 
fiveCardHands.push(playerFour);

//Function to find doubles within a hand
function findDubs(index) 
{
	var num; 
	var dub = []; 

	for (var i = 0; i < players[index].length; i++) 
	{
		if (dub.length === 0) 
		{ 
			num = convert(players[index][i].number); 
			
			dub.push(
			{
				number: players[index][i].number, 
				suit: players[index][i].suit,
				position: i
			});
			
			continue; 
		}
		
		if (convert(players[index][i].number) === num)
		{
			dub.push(
			{
				number: players[index][i].number, 
				suit: players[index][i].suit,
				position: i

			});
			
			playerDubs[index].push(dub); 
			dub = []; 
		}
		
		else 
		{
			dub = []; 
			num = convert(players[index][i].number);
			
			dub.push(
			{
				number: players[index][i].number, 
				suit: players[index][i].suit,
				position: i
			});
		}
		
	}
}


//Function to find a straight within a hand
//Note: This only finds the first straight in the hand!
//This works!
function findStraight(index)
{
	var straights = []; 
	var num; 
	var straight = []; 
	
	for (var i = 0; i < players[index].length; i++) 
	{
		if (straight.length === 5) 
			break;
	
		if (straight.length === 0) 
		{ 
			num = convert(players[index][i].number); 
			
			straight.push(
			{
				number: players[index][i].number, 
				suit: players[index][i].suit,
				position: i
			});
			
			continue; 
		}
		
		if (convert(players[index][i].number) === num + 1) 
		{
			num = convert(players[index][i].number);
			
			straight.push(
			{
				number: players[index][i].number, 
				suit: players[index][i].suit,
				position: i

			});
		}
		
		else if (convert(players[index][i].number) === num)
			continue; 
		
		else 
		{
			straight = [];
			num = convert(players[index][i].number);
			
			straight.push(
			{
				number: players[index][i].number, 
				suit: players[index][i].suit,
				position: i

			});
		}

		
	}
	
	if (straight.length == 5) 
		straights.push(straight); 
	
	//Push the hand for the appropriate player (represented by index) 
	fiveCardHands[index]['straight'] = straights; 
}

//Function to find a flush within a hand
function findFlush(index) 
{
	var flushes = []; 
	var suit; 
	
	for (var j = 0; j < 4; j++)
	{
		var flush = []; 

		switch (j)
		{
			case 0: 
				suit = 'D'; 
				break;
				
			case 1: 
				suit = 'C';
				break; 
				
			case 2: 
				suit = 'H';
				break; 
				
			case 3: 
				suit = 'S';
				break; 
		}
		
	
		for (var i = 0; i < players[index].length; i++) 
		{
			if (flush.length === 5) 
				break;
			
			if (players[index][i].suit == suit) 
			{		
		
				
				flush.push(
				{
					number: players[index][i].number, 
					suit: players[index][i].suit,
					position: i
				});
			}
		}
		
		if (flush.length < 5) 
			continue; 
			
		else 
		{
			//Push each flush into an array
			flushes.push(flush);
		}
			
		
	}
	
	//Push the hand for the appropriate player
	//if(flushes.length > 0) 
		fiveCardHands[index]['flush'] = flushes; 
	

}


for (var i = 0; i < players.length; i++) 
{
	findStraight(i); 
	findFlush(i);
	findDubs(i);
}


//Simple Version of the Game

playFiveCardHand(0, 0, 'flush', 'F');
alert(lastHandPlayed.number); 

//gameStart(); 

function gameStart() 
{
	var index = firstPlayer(); 	
	
	for (var j = 0; j < 13; j++) 
	{
		if (players[index][j].number === 3 && players[index][j].suit === 'D')
			break; 
	}
		
		
	playOneCard(players[index], j, index); 
	
	
	//New Code
	
	setInterval(function() {nextPlayer(++index);}, 3000);	
}

var displayCard; 
var displayNumber; 
var displaySuit; 
var start; 

//Current player plays one card and it's displayed
function playOneCard(currentPlayer, card, index)
{
	var code = '1'; 
	setSuitClip(currentPlayer[card].suit); 
	
	//Blank Card
	displayCard = paper.image(imgSrcs[0], 300, 200, 61, 100); 
	
	//Card number
	displayNumber = paper.text(311, 210, currentPlayer[card].number); 
	
	//Card Suit
	displaySuit = paper.image(imgSrcs[1], 310 - suitXClip, 220 - suitYClip , 30, 30);

	displaySuit.attr({"clip-rect": [310, 220, 15, 15]}); 

	setLastHand(currentPlayer, card, index, code); 
	 
	//Set the card played to 0  
	currentPlayer[card].number = 0;  
	 
	//currentPlayer.splice(card, 1); 	
	
}

//Current player plays a double and it's displayed
function playDouble(card, index)
{
	var code = 'D'; 

	for (var i = 0; i < playerDubs[index][card].length; i++) 
	{
		setSuitClip(playerDubs[index][card][i].suit); 
			
		destinationX = (i * 51) + 280; 
			
		cards[i] = paper.image(imgSrcs[0], destinationX, 200, 61, 100); 
		number[i] = paper.text(destinationX + 11, 210, playerDubs[index][card][i].number); 
		suits[i] = paper.image(imgSrcs[1], destinationX + 10 - suitXClip, 220 - suitYClip , 30, 30);
		suits[i].attr({"clip-rect": [destinationX + 10, 220, 15, 15]}); 
	}
	
	setLastHand(players[index],playerDubs[index][card][i-1].position, index, code); 
	
	for (var i = 0; i < playerDubs[index][card].length; i++) 
		players[index][playerDubs[index][card][i].position].number = 0; 
}

//Current player plays a five card hand and it's displayed
function playFiveCardHand(card, index, type, code)
{ 
	
	for (var i = 0; i < fiveCardHands[index][type][card].length; i++) 
	{
		setSuitClip(fiveCardHands[index][type][card][i].suit); 
			
		destinationX = (i * 51) + 240; 
			
		cards[i] = paper.image(imgSrcs[0], destinationX, 200, 61, 100); 
		number[i] = paper.text(destinationX + 11, 210, fiveCardHands[index][type][card][i].number); 
		suits[i] = paper.image(imgSrcs[1], destinationX + 10 - suitXClip, 220 - suitYClip , 30, 30);
		suits[i].attr({"clip-rect": [destinationX + 10, 220, 15, 15]}); 
		
	}
	
	setLastHand(players[index], fiveCardHands[index][type][card][i - 1].position, index, code); 
	
	for (var i = 0; i < fiveCardHands[index][type][card].length; i++) 
		players[index][fiveCardHands[index][type][card][i].position].number = 0; 
	


}


//Set last hand
function setLastHand(currentPlayer, card, playerNum, code)
{
	lastHandPlayed.number = currentPlayer[card].number; 
	lastHandPlayed.suit = currentPlayer[card].suit; 
	lastHandPlayed.playerNum = playerNum; 
	lastHandPlayed.code = code; 
}

function convert(num)  
{
	if (num >= 3 && num <= 10) 
		return num; 
	
	else
	{
		switch (num) 
		{
			case 2: 
				return 15; 
			
			case 'J': 
				return 11; 
				
			case 'Q': 
				return 12; 
				
			case 'K':
				return 13; 
				
			case 'A': 
				return 14; 
		}
	}	
}

//Find card greater than last card played in the next player's hand 
function nextPlayer(index)
{ 
	index = index % 4; 
	
	if (lastHandPlayed.playerNum != index) 
	{
		
				for (var i = 0; i < players[index].length; i++) 
				{
					if (convert(players[index][i].number) > convert(lastHandPlayed.number))
						break;
						
					else if (convert(players[index][i].number) === convert(lastHandPlayed.number) && suitObject[players[index][i].suit] > suitObject[lastHandPlayed.suit])
						break; 
				}
				
				
	}
	
	//if everyone passed 
	else 
	{
		for (var i = 0; i < players[index].length; i++) 
		{
			if (players[index][i].number != 0) 
				break; 
		}
	}	
	
	//if (play == false) 
		playOneCard(players[index], i, index, '1');
		
		//Have different options here? playOneCard? playDouble? playFiveCardHand? and choose one randomly?
}

//Sort each hand
function legitSort(index)
{	
	for (var i = 1; i < players[index].length; i++) 
	{
		for (var a = i; a > 0 && (convert(players[index][a].number) < convert(players[index][a-1].number) || ((convert(players[index][a].number) === convert(players[index][a-1].number)) && (suitObject[players[index][a].suit] < suitObject[players[index][a-1].suit]))) ; a--)
		{
			var num = players[index][a].number; 
			var suit = players[index][a].suit; 
			players[index][a].number = players[index][a-1].number; 
			players[index][a].suit = players[index][a-1].suit; 

			players[index][a-1].number = num; 
			players[index][a-1].suit = suit; 
		}
	}
}


$('div').append("<span>" + suitObject['D'] + " </span>"); 


/*Test code to remove part of a 5 card hand
players[0].splice(fiveCardHands[0]['straight'][0][4].position,1);
*/
	//fiveCardHands[0]['flush'][0].splice(4, 1); 	

//Test Code
for (var j = 0; j < 4; j++) 
{
	$('div').append("<p>");
	for (var i = 0; i < players[j].length; i++) 
	{
		$('div').append("<span>" + players[j][i].number + players[j][i].suit + " </span>"); 
	}
	$('div').append("</p>");
}



$('div').append("<p> Number of straights: " + fiveCardHands[0]['straight'].length); 

if (fiveCardHands[0]['straight'].length > 0)
$('div').append(" First card of straight: " + fiveCardHands[0]['straight'][0][0].number + fiveCardHands[0]['straight'][0][0].suit + "</p>");

$('div').append("<p> Number of flushes: " + fiveCardHands[0]['flush'].length); 

if (fiveCardHands[0]['flush'].length > 0)
$('div').append(" First card of flush: " + fiveCardHands[0]['flush'][0][0].number + fiveCardHands[0]['flush'][0][0].suit + "</p>");

var prob = probGen(0, 0);
$('div').append("<p> Play: " + prob + "</p>"); 

if (playerDubs[0].length > 0)
$('div').append("<p>How many doubles: " + playerDubs[0].length + playerDubs[0][0][0].number+  "</p>");

