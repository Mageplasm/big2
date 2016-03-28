//Variable to resume and pause the game
var time; 

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

for (var i = 0; i < 4; i++)
	players.push([]); 

 
var max = 51;
var index; 

//Create player arrays
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

//Object to store the last hand played 
var lastHandPlayed = 
{
	number: 0, 
	suit: 0,
	playerNum: null,
	code: null
};

//Object to designate a card's suit
var suitObject = 
{
	D: 0, 
	C: 1, 
	H: 2, 
	S: 3
};

//Create hand for each player 
for (var i = 0; i < 4; i++) 
	setHand(players[i]); 

var x, j;

//Variable to keep track of current player 
var currentPlayer; 

//Sort each hand 
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
		
		if (play == true) 
		{
			for (var i = 0; i < fiveCardHands[index]['house'].length; i++) 
			{
				for (var j = 0; j < fiveCardHands[index]['house'][i].length; j++)
				{		
					if (cardPosition == fiveCardHands[index]['house'][i][j].position)
						found = true; 
				
					if ((cardPosition == fiveCardHands[index]['house'][i][j].position) && (randomNum > 0 && randomNum < 10)) 
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
	}		
	
	return play; 
	
}				
	
//Set 13 cards for each player	
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

//Clip suit image to display the appropriate suit for each card 
var suitXClip = 0; 
var suitYClip = 0; 

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


var destinationX = 0;
var cards = []; 
var suits = []; 
var number = []; 
var play; 
var pass; 
var selected; 

//Set canvas to display images
var cardsPlayed = Raphael(10, 20, 1000, 1000);
var paper = Raphael(10, 20, 1000, 1000);
var imgSrcs = ["Images/blankCard.png", "Images/cardSuits2.png", "Images/blankCard2.png"];
var buttons = ["Images/play_clicked.png", "Images/pass_clicked.png", "Images/play.png", "Images/pass.png"];
var arrows = ["Images/arrowUp.png", "Images/arrowRight.png", "Images/arrowDown.png", "Images/arrowLeft.png"]; 

var playerImgs = []; 

//Display computer players
playerImgs[0] = paper.image(imgSrcs[0], 600, 200, 61, 100);
playerImgs[1] = paper.image(imgSrcs[0], 0, 200, 61, 100);
playerImgs[2] = paper.image(imgSrcs[0], 300, 400, 61, 100);



var num = 0; 
var error; 
var userTurn;
var CPUs = []; 

//Render hand for the user
renderHand(); 

//Display play button 
play = paper.image(buttons[0], 800, 10, 100, 32);

//Display pass button  
pass = paper.image(buttons[1], 800, 60, 100, 32);

//Resume game loop
function resume()
{
	userTurn.remove(); 
	play.unclick(); 
	pass.unclick(); 
	time = setInterval(function (){	nextPlayer(++index);}, 2000);	
}

//Create drop shadow on card(s) user selects
function selectCard()
{
	if (this.node.getAttribute('class') === "selected")
	{
		this.selected.remove();
		this.node.setAttribute('class', 'unselected'); 
		return; 
	}
		
	this.node.setAttribute('class', 'selected'); 
	this.selected = this.glow().attr('stroke', 'black'); 
}

//Display user's hand
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

//Fuctionality during user's turn
function yourTurn() 
{
	//Buttons clickable only during user's turn 
	play.click(playCard);
	pass.click(resume); 
	
	CPUs[3].remove(); 
	userTurn = paper.image(arrows[0], 315, 125, 26, 26); 
	clearInterval(time);
}

var three; 

//Check what five card hand the user has selected
function checkFiveCardHands(cardNums)
{
	//Check if it's a straight 
	for (var i = 0; i < cardNums.length - 1; i++) 
	{
		num = convert(players[0][cardNums[i]].number); 
					
		if (convert(players[0][cardNums[i+1]].number) != num + 1) 
		{
			error = true; 
			code = 0;
			break; 
		}
					
		else 
		{
			error = false;
			code = 'S'; 
		}
	}
				
	if (error) 
	{
		//Check if it's a flush 
		for (var i = 0; i < cardNums.length - 1; i++) 
		{
			suit = players[0][cardNums[i]].suit;

			if (players[0][cardNums[i+1]].suit != suit)
			{
				error = true; 
				code = 0;
				break; 
			}
						
			else 
			{
				error = false;
				code = 'F';
			}
		}
					
		if (error) 
		{
			//Full House
			if (players[0][cardNums[0]].number == players[0][cardNums[1]].number)
			{
				if (players[0][cardNums[1]].number == players[0][cardNums[2]].number)
				{
					if (players[0][cardNums[3]].number == players[0][cardNums[4]].number)
					{
						error = false;
						code = 'H';
					}
								
					else
					{
						error = true; 
						code = 0;
					}
				}

				else if (players[0][cardNums[2]].number == players[0][cardNums[3]].number) 
				{
					if (players[0][cardNums[3]].number == players[0][cardNums[4]].number)
					{
						error = false; 
						code = 'H'; 
					}
								
					else
					{
						error = true; 
						code = 0;
					}
				}
							
				else 
					error = true; 
			}
			
			else 
				error = true; 
		}
	}	
}

//Functionality for the first player if it's the user
function playFirstCard()
{
	var count = 0; 
	var cardNum;
	var cardNums = []; 

	for (var i = 0; i < players[0].length; i++) 
	{
		if (cards[i].node.getAttribute('class') === "selected") 
		{
			cardNum = i;
			cardNums.push(i); 

			count++; 
		}	
	}
	
	if (cardNums[0] != three) 
		return; 
		
	else 
	{
		switch (count) 
		{
			//If the user selects one card
			case 1: 

				playOneCard(players[0], three, 0);
				play.unclick(); 
				cards[three].selected.remove();
				cards[three].node.setAttribute('class', 'unselected');
				players[0].splice(three, 1); 
				
				for (var i = 0; i < cards.length; i++) 
				{
					cards[i].remove(); 
					number[i].remove(); 
					suits[i].remove(); 
				}

				renderHand();


				time = setInterval(function (){	nextPlayer(++index);}, 2000);	
				
				break; 
				
			//If the user selects two cards	
			case 2: 

				if (players[0][cardNums[0]].number == players[0][cardNums[1]].number)
				{					
					displayUserDouble(cardNums, 0); 
					
					play.unclick(); 

				
					for (var i = 0; i < cardNums.length; i++) 
					{
						cards[cardNums[i]].selected.remove();
						cards[cardNums[i]].node.setAttribute('class', 'unselected'); 
					}
					
					players[0].splice(cardNums[0], 1); 
					players[0].splice(cardNums[1] - 1, 1); 
					
					for (var i = 0; i < cards.length; i++) 
					{
						cards[i].remove(); 
						number[i].remove(); 
						suits[i].remove(); 
					}

				
					renderHand();
					
					time = setInterval(function (){	nextPlayer(++index);}, 2000);	
					
				}
				
				
				else 
					return;  
					
				break;
					
			//If the user selects five cards		
			case 5: 

				checkFiveCardHands(cardNums); 
				
				if (error)
					return; 
					
				else
				{
					error = false; 
					displayUserFiveCards(cardNums, 0, code); 
					
					play.unclick(); 

					for (var i = 0; i < cardNums.length; i++) 
					{
						cards[cardNums[i]].selected.remove();
						cards[cardNums[i]].node.setAttribute('class', 'unselected'); 
						
						players[0].splice(cardNums[i] - i, 1); 
					} 
					
					for (var i = 0; i < cards.length; i++) 
					{
						cards[i].remove(); 
						number[i].remove(); 
						suits[i].remove(); 
					}

					renderHand();
					
					time = setInterval(function (){	nextPlayer(++index);}, 2000);
				}

				break; 		
		}	
	}
}

//Functionality for user to play card(s)		
function playCard()
{
	var count = 0; 
	var cardNum; 
	var cardNums = []; 
	
	for (var i = 0; i < players[0].length; i++) 
	{
		if (cards[i].node.getAttribute('class') === "selected") 
		{
			cardNum = i;
			cardNums.push(i); 
			count++; 
		}	
	}
	
	//Everyone passed
	if (lastHandPlayed.playerNum == 0)
	{
		if (count != 1 && count != 5 && count != 2)
			error = true; 

		else
		{
			switch (count) 
			{
				case 1: 

					playOneCard(players[0], cardNum, 0, '1'); 
					error = false; 
					
					//Make the card we play unselected
					cards[cardNum].selected.remove();
					cards[cardNum].node.setAttribute('class', 'unselected'); 
			
					//Remove the card we play from our hand
					players[0].splice(cardNum, 1); 
					break; 
				
				case 2: 

					if (players[0][cardNums[0]].number == players[0][cardNums[1]].number)
					{
						error = false; 
						
						displayUserDouble(cardNums, 0); 

					
						for (var i = 0; i < cardNums.length; i++) 
						{
							cards[cardNums[i]].selected.remove();
							cards[cardNums[i]].node.setAttribute('class', 'unselected'); 
						}
						
						players[0].splice(cardNums[0], 1); 
						players[0].splice(cardNums[1] - 1, 1); 
					}
						

					else 
						error = true; 
						
					break; 
				
				case 5: 
				
					checkFiveCardHands(cardNums); 
					
					if (error)
						return; 
						
					else
					{
						error = false; 
						displayUserFiveCards(cardNums, 0, code); 
						
						for (var i = 0; i < cardNums.length; i++) 
						{
							cards[cardNums[i]].selected.remove();
							cards[cardNums[i]].node.setAttribute('class', 'unselected'); 
							
							players[0].splice(cardNums[i] - i, 1); 
						} 
					}

					break; 	
			}
		}
	}
	
	else
	{
		switch (lastHandPlayed.code)
		{
			case '1': 
				userPlayOneCard(cardNum, count); 
				break; 
				
			case 'D': 
				userPlayDouble(count, cardNums); 
				break; 
				
			case 'S': 
				userBeatStraight(count, cardNums); 
				break;
				
			case 'F': 
				userBeatFlush(count, cardNums); 
				break; 
				
			case 'H': 
				userBeatHouse(count, cardNums); 
				break; 	
		}
	}
	
	if (error)
		return; 
		
	play.unclick(); 
	pass.unclick(); 	
	userTurn.remove(); 
	
	//Re render our hand
	for (var i = 0; i < cards.length; i++) 
	{
		cards[i].remove(); 
		number[i].remove(); 
		suits[i].remove(); 
	}

	renderHand();
	
	var gameOver = retrieveCount(); 
	
	if(gameOver)
		return; 
	
	//Resume game after we play our card
	time = setInterval(function (){	nextPlayer(++index);}, 2000);	
}

function userBeatHouse(count, cardNums)
{
	var num; 
	var code; 
	var suit; 
	
	if (players[0][cardNums[0]].number == players[0][cardNums[1]].number)
	{
		if (players[0][cardNums[1]].number == players[0][cardNums[2]].number)
		{
			if (players[0][cardNums[3]].number == players[0][cardNums[4]].number)
			{
				error = false;
				code = 'H';
			}
					
			else
			{
				error = true; 
				code = 0;
			}
		}

		else if (players[0][cardNums[2]].number == players[0][cardNums[3]].number) 
		{
			if (players[0][cardNums[3]].number == players[0][cardNums[4]].number)
			{
				error = false; 
				code = 'H'; 
			}
					
			else
			{
				error = true; 
				code = 0;
			}
		}
				
		else 
			error = true; 
	}
			
	else 
		error = true; 

	if (error) 
		return; 
			
	else 
	{
		if (convert(players[0][cardNums[2]].number) > convert(lastHandPlayed.number))
		{
			error = false; 
			displayUserFiveCards(cardNums, 0, code); 
					
			for (var i = 0; i < cardNums.length; i++) 
			{
				cards[cardNums[i]].selected.remove();
				cards[cardNums[i]].node.setAttribute('class', 'unselected'); 
						
				players[0].splice(cardNums[i] - i, 1); 
			}
		}

		else 
			error = true; 
	}		
			
}				

function userBeatFlush(count, cardNums)
{
	var num; 
	var code; 
	var suit; 
	
	if (count == 5) 
	{
		for (var i = 0; i < cardNums.length - 1; i++) 
		{
			suit = players[0][cardNums[i]].suit;

			if (players[0][cardNums[i+1]].suit != suit)
			{
				error = true; 
				code = 0;
				break; 
			}
				
			else 
			{
				error = false;
				code = 'F';
			}
		}
		
		if (error) 
		{
			//Full House
			if (players[0][cardNums[0]].number == players[0][cardNums[1]].number)
			{
				if (players[0][cardNums[1]].number == players[0][cardNums[2]].number)
				{
					if (players[0][cardNums[3]].number == players[0][cardNums[4]].number)
					{
						error = false;
						code = 'H';
					}
					
					else
					{
						error = true; 
						code = 0;
					}
				}

				else if (players[0][cardNums[2]].number == players[0][cardNums[3]].number) 
				{
					if (players[0][cardNums[3]].number == players[0][cardNums[4]].number)
					{
						error = false; 
						code = 'H'; 
					}
					
					else
					{
						error = true; 
						code = 0;
					}
				}
				
				else 
					error = true; 
			}
			
			else 
				error = true; 
		}
					
		if (error)
			return; 
			
		else if (code == 'F')
		{
			if (suitObject[players[0][cardNums[4]].suit] > suitObject[lastHandPlayed.suit])
			{
			
				error = false; 
				displayUserFiveCards(cardNums, 0, code); 
				
				for (var i = 0; i < cardNums.length; i++) 
				{
					cards[cardNums[i]].selected.remove();
					cards[cardNums[i]].node.setAttribute('class', 'unselected'); 
					
					players[0].splice(cardNums[i] - i, 1); 
				}
				
				
			}
			
			else if ((suitObject[players[0][cardNums[4]].suit] == suitObject[lastHandPlayed.suit]) && (convert(players[0][cardNums[4]].number) > convert(lastHandPlayed.number)))
			{
				error = false; 
				displayUserFiveCards(cardNums, 0, code); 
				
				for (var i = 0; i < cardNums.length; i++) 
				{
					cards[cardNums[i]].selected.remove();
					cards[cardNums[i]].node.setAttribute('class', 'unselected'); 
					
					players[0].splice(cardNums[i] - i, 1); 
				}
			}
			
			else
				error = true; 
		}		
		
		else
		{
			error = false; 

			displayUserFiveCards(cardNums, 0, code);
			
			for (var i = 0; i < cardNums.length; i++) 
			{
				cards[cardNums[i]].selected.remove();
				cards[cardNums[i]].node.setAttribute('class', 'unselected'); 
					
				players[0].splice(cardNums[i] - i, 1); 
			}
		}	
	}	
	
	else 
		error = true; 
}

function userBeatStraight(count, cardNums) 
{
	var num; 
	var code; 
	var suit; 
	
	if (count == 5) 
	{
		//Check if it's a straight 
		for (var i = 0; i < cardNums.length - 1; i++) 
		{
			num = convert(players[0][cardNums[i]].number); 
			
			if (convert(players[0][cardNums[i+1]].number) != num + 1) 
			{
				error = true; 
				code = 0;
				break; 
			}
			
			else 
			{
				error = false;
				code = 'S'; 
			}
		}
		
		//Check if it's a flush 
		if (error) 
		{
			for (var i = 0; i < cardNums.length - 1; i++) 
			{
				suit = players[0][cardNums[i]].suit;

				if (players[0][cardNums[i+1]].suit != suit)
				{
					error = true; 
					code = 0;
					break; 
				}
				
				else 
				{
					error = false;
					code = 'F';
				}
			}
			
			if (error) 
			{
			//Full House
				if (players[0][cardNums[0]].number == players[0][cardNums[1]].number)
				{
					if (players[0][cardNums[1]].number == players[0][cardNums[2]].number)
					{
						if (players[0][cardNums[3]].number == players[0][cardNums[4]].number)
						{
							error = false;
							code = 'H';
						}
						
						else
						{
							error = true; 
							code = 0;
						}
					}

					else if (players[0][cardNums[2]].number == players[0][cardNums[3]].number) 
					{
						if (players[0][cardNums[3]].number == players[0][cardNums[4]].number)
						{
							error = false; 
							code = 'H'; 
						}
						
						else
						{
							error = true; 
							code = 0;
						}
					}
					
					else 
						error = true; 
				}
				
				else 
					error = true; 
			}
			
			
		}
		
		if (error)
			return; 

		else if (code == 'S')  
		{
			if (convert(players[0][cardNums[4]].number) > convert(lastHandPlayed.number))
			{
				error = false; 
				displayUserFiveCards(cardNums, 0, code); 
				
				for (var i = 0; i < cardNums.length; i++) 
				{
					cards[cardNums[i]].selected.remove();
					cards[cardNums[i]].node.setAttribute('class', 'unselected'); 
					
					players[0].splice(cardNums[i] - i, 1); 
				}
				
				
			}
			
			else if (convert(players[0][cardNums[4]].number) === convert(lastHandPlayed.number) && suitObject[players[0][cardNums[4]].suit] > suitObject[lastHandPlayed.suit])
			{
				error = false; 
				displayUserFiveCards(cardNums, 0, code); 
				
				for (var i = 0; i < cardNums.length; i++) 
				{
					cards[cardNums[i]].selected.remove();
					cards[cardNums[i]].node.setAttribute('class', 'unselected'); 
					
					players[0].splice(cardNums[i] - i, 1); 
				}
				
			}
			
			else 
				error = true; 
			
		}
		
		else if (code == 'F')
		{
			error = false; 

			displayUserFiveCards(cardNums, 0, code);
			
			for (var i = 0; i < cardNums.length; i++) 
			{
				cards[cardNums[i]].selected.remove();
				cards[cardNums[i]].node.setAttribute('class', 'unselected'); 
					
				players[0].splice(cardNums[i] - i, 1); 
			}
		}
		
		else
		{
			error = false; 

			displayUserFiveCards(cardNums, 0, code);
			
			for (var i = 0; i < cardNums.length; i++) 
			{
				cards[cardNums[i]].selected.remove();
				cards[cardNums[i]].node.setAttribute('class', 'unselected'); 
					
				players[0].splice(cardNums[i] - i, 1); 
			}
		}		
	}
	
	else
		error = true; 
}

//Display the five card hand the user played
function displayUserFiveCards(cardNums, index, code)
{
	cardsPlayed.clear(); 

	var cards = [];
	var number = []; 
	var suits = []; 
	
	for (var i = 0; i < cardNums.length; i++) 
	{
		setSuitClip(players[index][cardNums[i]].suit); 
			
		destinationX = (i * 51) + 240; 
			
		cards[i] = cardsPlayed.image(imgSrcs[0], destinationX, 200, 61, 100); 
		number[i] = cardsPlayed.text(destinationX + 11, 210, players[index][cardNums[i]].number); 
		suits[i] = cardsPlayed.image(imgSrcs[1], destinationX + 10 - suitXClip, 220 - suitYClip , 30, 30);
		suits[i].attr({"clip-rect": [destinationX + 10, 220, 15, 15]}); 
	}
		
	if (code != 'H') 
		setLastHand(players[index],cardNums[4], index, code); 

	else 
		setLastHand(players[index],cardNums[2], index, code);

	for (var i = 0; i < cardNums.length; i++) 
		players[index][cardNums[i]].number = 0; 
	
	count[index] = count[index] - 5; 
}
	
//User plays a double
function userPlayDouble(count, cardNums)
{
	if (count == 2) 
	{
		if (players[0][cardNums[0]].number == players[0][cardNums[1]].number)
		{
			if (convert(players[0][cardNums[1]].number) > convert(lastHandPlayed.number))
			{
				error = false; 
				displayUserDouble(cardNums, 0); 

				
				for (var i = 0; i < cardNums.length; i++) 
				{
					cards[cardNums[i]].selected.remove();
					cards[cardNums[i]].node.setAttribute('class', 'unselected'); 
				}
				
				players[0].splice(cardNums[0], 1); 
				players[0].splice(cardNums[1] - 1, 1); 
			}
			
			else if (convert(players[0][cardNums[1]].number) === convert(lastHandPlayed.number) && suitObject[players[0][cardNums[1]].suit] > suitObject[lastHandPlayed.suit])
			{
				displayUserDouble(cardNums, 0); 

				for (var i = 0; i < cardNums.length; i++) 
				{
					cards[cardNums[i]].selected.remove();
					cards[cardNums[i]].node.setAttribute('class', 'unselected'); 
				}
				
				players[0].splice(cardNums[0], 1); 
				players[0].splice(cardNums[1] - 1, 1); 
			
				error = false; 
			}
				
			else 
				error = true; 
		}
		
		else 
			error = true; 
	}
	
	else 
		error = true; 

}

//Display the double the user played
function displayUserDouble(cardNums, index)
{
	cardsPlayed.clear(); 

	var code = 'D'; 
	
	var cards = [];
	var number = []; 
	var suits = []; 

	for (var i = 0; i < cardNums.length; i++) 
	{
		setSuitClip(players[index][cardNums[i]].suit); 
			
		destinationX = (i * 51) + 280; 
			
		cards[i] = cardsPlayed.image(imgSrcs[0], destinationX, 200, 61, 100); 
		number[i] = cardsPlayed.text(destinationX + 11, 210, players[index][cardNums[i]].number); 
		suits[i] = cardsPlayed.image(imgSrcs[1], destinationX + 10 - suitXClip, 220 - suitYClip , 30, 30);
		suits[i].attr({"clip-rect": [destinationX + 10, 220, 15, 15]}); 
	}
	
	setLastHand(players[index],cardNums[1], index, code); 
	
	for (var i = 0; i < cardNums.length; i++) 
		players[index][cardNums[i]].number = 0; 
			
	count[index] = count[index] - 2; 
}

//User plays one card and it's displayed
function userPlayOneCard(cardNum, count)
{
	if (count == 1) 
	{
		if (convert(players[0][cardNum].number) > convert(lastHandPlayed.number))
		{
			error = false; 
			
			//Display the card we play 
			playOneCard(players[0], cardNum, 0, '1'); 
			
			//Make the card we play unselected
			cards[cardNum].selected.remove();
			cards[cardNum].node.setAttribute('class', 'unselected'); 
	
			//Remove the card we play from our hand
			players[0].splice(cardNum, 1); 
		}		
						
		else if (convert(players[0][cardNum].number) === convert(lastHandPlayed.number) && suitObject[players[0][cardNum].suit] > suitObject[lastHandPlayed.suit])
		{
			
			error = false; 
			playOneCard(players[0], cardNum, 0, '1'); 
			
			cards[cardNum].selected.remove();
			cards[cardNum].node.setAttribute('class', 'unselected'); 
			
			players[0].splice(cardNum, 1); 

		}
		
		else 
			error = true; 
	}
	
	else 
		error = true; 
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

var doubles = []; 
var playerOne = []; 
var playerTwo = []; 
var playerThree = []; 
var playerFour = [];
var playerDubs = []; 

//5 card hand Object
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
	
	fiveCardHands[index]['flush'] = flushes; 
}

//Find full house
function findHouse(index) 
{
	var houses = []; 
	var house = [];
	var val; 
	
	if (playerDubs[index].length > 1) 
	{
		for (var i = 0; i < players[index].length - 2; i++) 
		{	
			val = i; 
			
			house.push(
			{	
				number: players[index][i].number, 
				suit: players[index][i].suit,
				position: i
			});
			
			for (var j = (val + 1); j < (val + 3); j++) 
			{
				if (players[index][j].number == players[index][i].number)
				{
					i = j; 
					
					house.push(
					{	
						number: players[index][j].number, 
						suit: players[index][j].suit,
						position: j
					});
				}

				else 
				{
					i = j - 1; 
					house = [];
					break; 
				}
			}
			
			if (house.length == 3)
			{
				for (var b = 0; b < playerDubs[index].length; b++) 
				{
					if (playerDubs[index][b][0].number == house[0].number) 
						continue; 
						
					else
					{
						for (var a = 0; a < 2; a++) 
						{
							house.unshift(
							{	
								number: playerDubs[index][b][a].number, 
								suit: playerDubs[index][b][a].suit,
								position: playerDubs[index][b][a].position
							});
						}
						
						break;
					}	
				}
				
				houses.push(house); 
				house = []; 
			}	
		}
	}	
		
	fiveCardHands[index]['house'] = houses; 
}

//Find doubles, straights, and flushes for each player
for (var i = 0; i < players.length; i++) 
{
	findStraight(i); 
	findFlush(i);
	findDubs(i);
	findHouse(i); 
}

var count = [13, 13, 13, 13]; 
var displayC = []; 

//Display the number of cards each computer player has left
displayCount(); 

//Start the game loop
gameStart(); 

function gameStart() 
{
	var index = firstPlayer(); 	
	
	for (var j = 0; j < 13; j++) 
	{
		if (players[index][j].number === 3 && players[index][j].suit === 'D')
			break; 
	}
		
	//First player must play a 3 of diamonds	
	play3D(index, j); 
		
	if (index != 0) 
		time = setInterval(function (){	nextPlayer(++index);}, 2000);	
}

function start()
{
	nextPlayer(++index);
}

var displayCard; 
var displayNumber; 
var displaySuit; 
var start; 

//Current computer player plays one card and it's displayed
function playOneCard(currentPlayer, card, index)
{
	cardsPlayed.clear(); 

	var code = '1'; 
	setSuitClip(currentPlayer[card].suit); 
	
	//Blank Card
	displayCard = cardsPlayed.image(imgSrcs[0], 300, 200, 61, 100); 
	
	//Card number
	displayNumber = cardsPlayed.text(311, 210, currentPlayer[card].number); 
	
	//Card Suit
	displaySuit = cardsPlayed.image(imgSrcs[1], 310 - suitXClip, 220 - suitYClip , 30, 30);

	displaySuit.attr({"clip-rect": [310, 220, 15, 15]}); 

	setLastHand(currentPlayer, card, index, code); 
	 
	//Set the card played to 0  
	currentPlayer[card].number = 0;  
	
	//Decrease card count for player 
	count[index] = count[index] - 1; 	
}

//Current computer player plays a double and it's displayed
function playDouble(card, index)
{
	cardsPlayed.clear(); 

	var code = 'D'; 
	
	var cards = [];
	var number = []; 
	var suits = []; 

	for (var i = 0; i < playerDubs[index][card].length; i++) 
	{
		setSuitClip(playerDubs[index][card][i].suit); 
			
		destinationX = (i * 51) + 280; 
			
		cards[i] = cardsPlayed.image(imgSrcs[0], destinationX, 200, 61, 100); 
		number[i] = cardsPlayed.text(destinationX + 11, 210, playerDubs[index][card][i].number); 
		suits[i] = cardsPlayed.image(imgSrcs[1], destinationX + 10 - suitXClip, 220 - suitYClip , 30, 30);
		suits[i].attr({"clip-rect": [destinationX + 10, 220, 15, 15]}); 
	}
	
	setLastHand(players[index],playerDubs[index][card][i-1].position, index, code); 
	
	for (var i = 0; i < playerDubs[index][card].length; i++) 
		players[index][playerDubs[index][card][i].position].number = 0; 
		
	playerDubs[index].splice(card, 1); 
	
	count[index] = count[index] - 2; 
}

//Current computer player plays a five card hand and it's displayed
function playFiveCardHand(card, index, type, code)
{ 
	//Clear the previous card(s) played from the screen
	cardsPlayed.clear(); 

	var cards = [];
	var number = []; 
	var suits = []; 
	
	for (var i = 0; i < fiveCardHands[index][type][card].length; i++) 
	{
		setSuitClip(fiveCardHands[index][type][card][i].suit); 
			
		destinationX = (i * 51) + 240; 
			
		cards[i] = cardsPlayed.image(imgSrcs[0], destinationX, 200, 61, 100); 
		number[i] = cardsPlayed.text(destinationX + 11, 210, fiveCardHands[index][type][card][i].number); 
		suits[i] = cardsPlayed.image(imgSrcs[1], destinationX + 10 - suitXClip, 220 - suitYClip , 30, 30);
		suits[i].attr({"clip-rect": [destinationX + 10, 220, 15, 15]}); 
		
	}
	
	setLastHand(players[index], fiveCardHands[index][type][card][i - 1].position, index, code); 
	
	//Set the card played to zero 
	for (var i = 0; i < fiveCardHands[index][type][card].length; i++) 
		players[index][fiveCardHands[index][type][card][i].position].number = 0; 
	
	
	//Delete the five card hand once played
	fiveCardHands[index][type].splice(card, 1); 
	
	count[index] = count[index] - 5; 
}


function displayCount()
{
	var x = 0; 
	
	displayC[1] = paper.text(630, 245, count[1]); 
	displayC[2] = paper.text(330, 445, count[2]); 
	displayC[3] = paper.text(30, 245, count[3]); 			
}

function updateCount()
{
	for (var i = 1; i < 4; i++)
	{
		displayC[i].attr('text', count[i]);
	}
}

function retrieveCount()
{
	var countZero = false;

	for (var i = 0; i < 4; i++)
	{
		if (count[i] == 0) 
		{
			countZero = true; 
			
			if (i == 0) 
				alert("You win! Refresh browser to start a new game"); 
				
			else 
				alert("You lose. Refresh browser to start a new game");
		}
	}
	
	return countZero; 
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

//Function that goes through possibilities for current player to beat straight 
function beatStraight(index) 
{	
	for (var i = 0; i < fiveCardHands[index]['straight'].length; i++) 
	{
		if (convert(fiveCardHands[index]['straight'][i][4].number) > convert(lastHandPlayed.number))
		{
			playFiveCardHand(i, index, 'straight', 'S'); 
			return; 
		}
		
		else if ((convert(fiveCardHands[index]['straight'][i][4].number) == convert(lastHandPlayed.number)) 
			&& (suitObject[fiveCardHands[index]['straight'][i][4].suit] > suitObject[lastHandPlayed.suit]))
		{
			playFiveCardHand(i, index, 'straight', 'S'); 
			return; 
		}
	}		
	
	//Flush automatically beats a straight
	for (var i = 0; i < fiveCardHands[index]['flush'].length; i++)
	{
		playFiveCardHand(i, index, 'flush', 'F');
		return; 
	}
	
	//House automatically beats a straight
	for (var i = 0; i < fiveCardHands[index]['house'].length; i++)
	{
		playFiveCardHand(i, index, 'house', 'H');
		return; 
	}	
}	

//Function that goes through possibilities for current player to beat flush 
function beatFlush(index)
{
	for (var i = 0; i < fiveCardHands[index]['flush'].length; i++)
	{
		if (suitObject[fiveCardHands[index]['flush'][i][4].suit] > suitObject[lastHandPlayed.suit])
		{
			playFiveCardHand(i, index, 'flush', 'F');
			return;
		}
		
		else if ((suitObject[fiveCardHands[index]['flush'][i][4].suit] == suitObject[lastHandPlayed.suit])
				&& (convert(fiveCardHands[index]['flush'][i][4].number) > convert(lastHandPlayed.number)))
		{
			playFiveCardHand(i, index, 'flush', 'F');
			return;
		}		
	}
	
	//House automatically beats a flush 
	for (var i = 0; i < fiveCardHands[index]['house'].length; i++)
	{
		playFiveCardHand(i, index, 'house', 'H');
		return; 
	}
}

//Function that goes through possibilities for current player to beat a house 
function beatHouse(index)
{
	for (var i = 0; i < fiveCardHands[index]['house'].length; i++)
	{
		if (convert(fiveCardHands[index]['house'][i][4].number) > convert(lastHandPlayed.number)) 
		{
			playFiveCardHand(i, index, 'house', 'H');
			return;
		}	
	
	}
}

//Function that goes through possibilities for current player to beat a double 
function beatDouble(index)
{
	for (var i = 0; i < playerDubs[index].length; i++)
	{
		if (convert(playerDubs[index][i][0].number) > convert(lastHandPlayed.number))
		{
			playDouble(i, index);
			return;
		}
		
		else if ((convert(playerDubs[index][i][0].number) == convert(lastHandPlayed.number))
				&& (suitObject[playerDubs[index][i][1].suit] > suitObject[lastHandPlayed.suit]))
		{
			playDouble(i, index);
			return;
		}		
	}
}
	
function play3D (index, card)
{
	three = card;
	if (index != 0) 
	{
		switch (index)
		{
			case 1: 
				CPUs[index] = paper.image(arrows[index], 460, 230, 26, 26); 
				break; 
				
			case 2:
				CPUs[index] = paper.image(arrows[index], 315, 350, 26, 26); 
				break; 
				
			case 3: 
				CPUs[index] = paper.image(arrows[index], 160, 230, 26, 26); 
				break;  
		}
		
		playOneCard(players[index], card, index); 
		
		removeInvalidCards(index); 
	}
		
	else 
	{
		play.click(playFirstCard); 
	}
	
	updateCount(); 
}
		
//Find card greater than the last card played in the next player's hand 
function nextPlayer(index)
{ 
	index = index % 4; 
	
	var gameOver = false; 
	
	if (index == 0) 
	{
		yourTurn();
		return; 
	}
	
	if (index != 0) 
	{
		//Display the arrow for the current player
		switch (index)
		{
			case 1: 
				CPUs[index] = paper.image(arrows[index], 510, 230, 26, 26); 
				break; 
				
			case 2: 
				CPUs[index-1].remove(); //This is a problem 
				CPUs[index] = paper.image(arrows[index], 315, 350, 26, 26); 
				break; 
				
			case 3: 
				CPUs[index-1].remove(); 
				CPUs[index] = paper.image(arrows[index], 120, 230, 26, 26); 
				break;  
		}
	}
	
	var code, type, play; 
	
	if (lastHandPlayed.playerNum != index) 
	{
		switch (lastHandPlayed.code) 
		{
			//Last hand played was a single
			case '1':
				for (var i = 0; i < players[index].length; i++) 
				{
					if (convert(players[index][i].number) > convert(lastHandPlayed.number))
					{
						play = probGen(i, index)
						
						if (play == false) 
							continue; 

						else
							break;
					}		
						
					else if (convert(players[index][i].number) === convert(lastHandPlayed.number) && suitObject[players[index][i].suit] > suitObject[lastHandPlayed.suit])
					{
						play = probGen(i, index)
						
						if (play == false) 
							continue; 

						else
							break;
					}		
				}
				
				if (i != players[index].length)				
					playOneCard(players[index], i, index, '1');
				
				removeInvalidCards(index)
				break; 
				
			//Last hand played was a straight	
			case 'S': 
				beatStraight(index);
				removeInvalidCards(index); 
				break; 
				
			//Last hand played was a flush	
			case 'F':
				beatFlush(index); 
				removeInvalidCards(index); 
				break; 
				
				
			case 'H':
				beatHouse(index); 
				removeInvalidCards(index);
				break; 
								
			//Last hand played was a double	
			case 'D': 
				beatDouble(index); 
				removeInvalidCards(index); 
				break; 
		}
	}
	
	//if everyone passed 
	else 
	{
		var randomNum = Math.floor(Math.random() * (9 - 1 + 1)) + 1;
		
		//Play a double if the player has any
		if ((playerDubs[index].length != 0 && ((randomNum >= 1) && (randomNum <= 2))) || (playerDubs[index].length != 0 && count[index] == 2)) 
		{
			playDouble(0, index);
			removeInvalidCards(index); 
		}
		
		else if(((fiveCardHands[index]['flush'].length != 0 || fiveCardHands[index]['straight'].length != 0 || fiveCardHands[index]['house'].length != 0) && ((randomNum >= 3) && (randomNum <= 6)))
				|| ((fiveCardHands[index]['flush'].length != 0 || fiveCardHands[index]['straight'].length != 0 ||fiveCardHands[index]['house'].length != 0) && count[index] == 5)) 
		{
			if (fiveCardHands[index]['straight'].length != 0)
				playFiveCardHand(0, index, 'straight', 'S');
				
			else if (fiveCardHands[index]['flush'].length != 0)
				playFiveCardHand(0, index, 'flush', 'F');
				
			else	
				playFiveCardHand(0, index, 'house', 'H');
				
			removeInvalidCards(index); 
		}
			
		else
		{
			for (var i = 0; i < players[index].length; i++) 
			{
				if (players[index][i].number != 0) 
					break; 
			}
			
			playOneCard(players[index], i, index, '1');
			
			removeInvalidCards(index); 
		}

	}	
	
	updateCount(); 
	
	gameOver = retrieveCount(); 
	
	if (gameOver)
	{
		clearInterval(time);
		return; 
	}
}

function removeInvalidCards(index)
{
	//Remove invalid doubles 
	removeDubs(index); 
		
	//Remove invalid five card hands
	removeFiveCards(index, 'flush'); 
	removeFiveCards(index, 'straight');
	removeFiveCards(index, 'house'); 
}

//Remove from array of doubles
function removeDubs(index)
{
	for (var i = 0; i < playerDubs[index].length; i++)
	{
		if (players[index][playerDubs[index][i][0].position].number == 0 ||  players[index][playerDubs[index][i][1].position].number == 0) 
		{
			playerDubs[index].splice(i, 1);
			i = i - 1; 
		}
	}
}

//Remove from array of five card hands
function removeFiveCards(index, type)
{
	for (var i = 0; i < fiveCardHands[index][type].length; i++)
	{
		for (var j = 0; j < fiveCardHands[index][type][i].length; j++) 
		{
			if (players[index][fiveCardHands[index][type][i][j].position].number == 0) 
			{
				fiveCardHands[index][type].splice(i, 1);
				i = i - 1; 
				break;
			}
		}
	}
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

