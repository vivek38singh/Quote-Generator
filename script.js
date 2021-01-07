const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const favBtn = document.getElementById('favorite');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const YourOutput = document.getElementById('yourOutput');
const loader = document.getElementById('loader');

function loading(){
    loader.hidden = false;
    quoteContainer.hidden = true; 
    
}

function complete(){
    if(!loader.hidden) { 
        quoteContainer.hidden = false;
        loader.hidden = true;
    }
}

async function getQuote(){
    loading();

    const proxyURL = 'https://cors-anywhere.herokuapp.com/';
    const apiUrl = 'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';
    
    try{
        const response = await fetch(proxyURL + apiUrl); 
        const data = await response.json();

        if(data.quoteAuthor === ''){
            authorText.innerText = 'Unknown';
        }else{
            authorText.innerText = data.quoteAuthor;
        }

        if(data.quoteText.length > 120){
            quoteText.classList.add('long-quote');
        }else{
            quoteText.classList.remove('long-quote');
        }
        quoteText.innerText = data.quoteText; 

        complete();
    }catch(e){
        getQuote();
    }
}

function tweetQuote(){
    const quote = quoteText.innerText;
    const author = authorText.innerText;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
    window.open(twitterUrl, '_blank');
}

function addfav(){
    const key = quoteText.innerText;
    const value = authorText.innerText;
    
    if(key && value){
        localStorage.setItem(key,value);
        location.reload();
    }
}

for(let i = 0; i < localStorage.length; i++){
    
    const key = localStorage.key(i);
    const value = localStorage.getItem(key);

    YourOutput.innerHTML += `* ${key} : ${value}<br /> <br />`;    
}


newQuoteBtn.addEventListener('click',getQuote);
twitterBtn.addEventListener('click',tweetQuote);
favBtn.addEventListener('click',addfav);


getQuote();
