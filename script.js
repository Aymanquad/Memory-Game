const main_div = document.getElementById('memory-game');
let cards = document.getElementsByClassName('card-item');

let n = 0;
let clickable = true;
let guesses = 0;
let flipped_cards = [];
let flipped_cards_data = [];


//const initial_cards = [...cards].map(card => card.cloneNode(true));


main_div.addEventListener('click' , (e)=>{
    if (!clickable) {
        return; // Ignore clicks when not clickable
    }

    const clicked_card = e.target.classList ;
    // const clicked_card_parent = e.target.parentNode ;

    if(clicked_card.contains('card-front')){
        const number = e.target.textContent ; 
        
        new_game_check(clicked_card , number);      //func()

        flipped_cards.push(clicked_card.value);

        flipped_cards_data.push(number);
        e.target.textContent = '';

        n = n + 1;
        if(n%2 === 0){     // 2 cards are flipped 
            console.log("2 flipped");
            clickable = false;
            check();//function_call 
        }
    }
    }
)

const enableClick = () => {
    clickable = true; // Enable clickability
};


const new_game_check = (card , num)=>{

    let something_value = localStorage.getItem('something');

    let something_number = parseInt(something_value) || 0;

    if(something_value !== null && something_value > 1){
        console.log("sheessh");
        something_number = parseInt(something_value) || 0;

        num = parseInt(num) + something_number;
        console.log("number earlier is ...",num);

        if(num>12){
            num = num%12;
        }
    }


        if(card.contains('reverse-flip')){
            card.remove('reverse-flip');              //wasn't flipping earlier
        }
        console.log("number is ...",num);
        card.add('flip' ,  `card-back${num}`);
        num = num - 2;

}






const check = ()=>{
    
    //console.log(flipped_cards);
    
    var match1 = parseInt(flipped_cards[0].match(/\d+$/));
    var match2 = parseInt(flipped_cards[1].match(/\d+$/));

    console.log(match1,match2);
    // 1,11  5,12   2,8   3,7   4,10   6,9
    // match1 === (match2 - 6)  ||  (match1-6) === match2  (original cond.)
    if(match1===1 && match2 === 11  ||  match1===5 && match2 === 12 || match1===2 && match2===8 || match1===3 && match2===7 || match1===4 && match2===10 || match1===6 && match2 ===9   ||   match1===11 && match2 === 1  ||  match1===12 && match2 ===5 || match1===8 && match2===2 || match1===7 && match2===3 || match1===10 && match2===4 || match1===9 && match2 ===6){         //matching 
        console.log('Matching !!');
        guesses = guesses + 1;

        setTimeout(function (){

            for(i in cards){
                if(cards[i].classList){
                    if(cards[i].classList.contains(`card-back${match1}`)){
                        cards[i].classList.remove('flip' , `card-back${match1}`);
                        // cards[i].classList.add('reverse-flip' , 'disappear');
                        // cards[i].parentNode.classList.add('disappear');
                        cards[i].parentNode.remove();
                    }
                    if(cards[i].classList.contains(`card-back${match2}`)){
                        cards[i].classList.remove('flip' , `card-back${match2}`);
                        // cards[i].classList.add('reverse-flip'  , 'disappear');
                        // cards[i].parentNode.classList.add('disappear');
                        cards[i].parentNode.remove();
                    }
                    //special-case for last one
                    if(cards.length == 1){
                        console.log("game Over");
                        cards[0].parentNode.remove();
                        break;
                    }
                }
            }

        } , 1200);

        console.log("cards ki length is ..",cards.length);                      //interesting !!
        
        //if all the cards are over
        if(cards.length === 2){                                                 //2 cuz above is a setTimeout func which will occur later 
            setTimeout(function (){ window.alert(`You Win , with ${guesses} Guesses !!`);  } , 1400);
        }


        flipped_cards= [];
        flipped_cards_data=[];

    }
    else{                                                             //not matching
        guesses += 1;

        setTimeout(function (){

            for(i in cards){
                if(cards[i].classList){
                    if(cards[i].classList.contains(`card-back${match1}`)){
                        cards[i].innerHTML = flipped_cards_data[0];
                        cards[i].classList.add('reverse-flip');
                        cards[i].classList.remove( `card-back${match1}` ,'flip');
                    }
                    if(cards[i].classList.contains(`card-back${match2}`)){
                        cards[i].innerHTML = flipped_cards_data[1];
                        cards[i].classList.add('reverse-flip' );
                        cards[i].classList.remove(`card-back${match2}` ,'flip');
                    }
                }
            }

            flipped_cards= [];
            flipped_cards_data=[];

        } , 1300);
        
    }
    setTimeout(enableClick, 1500);

}


//buttons
const resetButton = document.getElementById('reset-button');
const newGameButton =  document.getElementById('new-game-button');


resetButton.addEventListener('click', (e) => {
    console.log("reset btn was clicked");

    location.reload();

});


newGameButton.addEventListener('click', (e) => {
    console.log("reset btn was clicked");
    // Reload the page
    let something = 1;

    // Check if 'something' is already stored in localStorage
    const storedValue = localStorage.getItem('something');

    // If storedValue is not null, use it; otherwise, use the initial value
    something = storedValue !== null ? parseInt(storedValue) : something;

    console.log(something);

    something++;

    if(something >= 10){
        localStorage.setItem('something',1)
    }
    else{
        localStorage.setItem('something', something.toString());
    }
    
    location.reload();

});







// let random_no = Math.floor(Math.random() * 12) + 1 ;

//         while(1){                                          //So that we do not repeat that same no. again
//             if(!repeat.includes(random_no)){

//                 console.log("clicked" , random_no);
            
//                 clicked_card.add('flip' , 'card-back' ,`card-back${random_no}`);

//                 flipped_cards.push(clicked_card.value);
//                 break;
//             }
//             random_no = Math.floor(Math.random() * 12) + 1 ;
//         }