const pictures = [
    'https://static.vecteezy.com/system/resources/thumbnails/016/716/602/small/shoot-gun-3d-rendeirng-png.png',
    'https://freepngimg.com/thumb/football/36635-3-football-soccer-ball-thumb.png',
    'https://static.vecteezy.com/system/resources/thumbnails/010/521/120/small/basketball-sport-balloon-free-vector.jpg',
    'https://static.vecteezy.com/system/resources/thumbnails/026/971/084/small/biryani-or-biryani-is-a-popular-indian-dish-made-of-basmati-rice-cooked-with-spices-and-vegetables-free-photo.jpg',
    'https://static1.personality-database.com/profile_images/fb6997d4b3c74ac6bca1550d0f067d3e.png',
    'https://imgs2.dab3games.com/among-us-2-online355.png'
]


const main_div = document.getElementById('memory-game');
let cards = document.getElementsByClassName('card-item');

let n = 0;
let repeat = [];
let flipped_cards = [];

const initial_cards = [...cards].map(card => card.cloneNode(true));

main_div.addEventListener('click' , (e)=>{

    const clicked_card = e.target.classList ;
    // const clicked_card_parent = e.target.parentNode ;

    if(clicked_card.contains('card-front')){
        
        const number = e.target.textContent ; 

        if(clicked_card.contains('reverse-flip')){
            clicked_card.remove('reverse-flip');              //wasn't flipping earlier
        }

        clicked_card.add('flip' ,  `card-back${number}`);

        flipped_cards.push(clicked_card.value);

        }
        
        n = n + 1;
        if(n%2 === 0){     // 2 cards are flipped 
            console.log("2 flipped");

            check();//function_call 
        }

    }
)


const check = ()=>{
    
    //console.log(flipped_cards);
    
    var match1 = parseInt(flipped_cards[0].match(/\d+$/));
    var match2 = parseInt(flipped_cards[1].match(/\d+$/));

    console.log(match1,match2);
    if(match1 === (match2 - 6)  ||  (match1-6) === match2){          //matching 
        console.log('Matching !!');

        setTimeout(function (){

            for(i in cards){
                if(cards[i].classList){
                    if(cards[i].classList.contains(`card-back${match1}`)){
                        cards[i].classList.remove('flip' , `card-back${match1}`);
                        // cards[i].classList.add('reverse-flip' , 'disappear');
                        // cards[i].parentNode.classList.add('disappear');
                        cards[i].parentNode.remove();
                    }
                    if(cards[i] && cards[i].classList.contains(`card-back${match2}`)){
                        cards[i].classList.remove('flip' , `card-back${match2}`);
                        // cards[i].classList.add('reverse-flip'  , 'disappear');
                        // cards[i].parentNode.classList.add('disappear');
                        cards[i].parentNode.remove();
                    }
                    //special-case for last one
                    if(cards.length == 1){
                        console.log("niggaaa");
                        cards[0].parentNode.remove();
                        break;
                    }
                }
            }

        } , 1200);

        console.log("cards ki length is ..",cards.length);                      //interesting !!
        
        //if all the cards are over
        if(cards.length === 2){                                                 //2 cuz above is a setTimeout func which will occur later 
            setTimeout(function (){ window.alert("You Win");  } , 1400);
        }


        flipped_cards= [];
    }
    else{                                                             //not matching
        setTimeout(function (){

            for(i in cards){
                if(cards[i].classList){
                    if(cards[i].classList.contains(`card-back${match1}`)){
                        cards[i].classList.add('reverse-flip');
                        cards[i].classList.remove( `card-back${match1}` ,'flip');
                    }
                    if(cards[i].classList.contains(`card-back${match2}`)){
                        cards[i].classList.add('reverse-flip' );
                        cards[i].classList.remove(`card-back${match2}` ,'flip');
                    }
                }
            }

            flipped_cards= [];

        } , 1500);
        
    }
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

    // Store the updated 'something' in localStorage
    localStorage.setItem('something', something.toString());

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