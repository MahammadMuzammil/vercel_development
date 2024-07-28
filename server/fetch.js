

let postmovieUrl = 'http://localhost:3000/movie'
let getMoviesUrl = 'http://localhost:3000/movies?category=ACTION&language=ENGLISH&search_input='
const movieData = {
    movie_name: 'Pushpa: The Rise',
    movie_imgurl: 'https://play-lh.googleusercontent.com/proxy/XGBQMnhwwEmXLzC_5jde63XVuX3F2lsCNyTTYG4bNbOevSphnOG8efhliQL6siyTRDec844HanioYqVTvp0O2NJRL5cooi8VNoX2lO0z9eCHaxrRFJMR4ru4NQ7suI5Tw8Ml55_GfZtZ85RaDapdg8Gc05BeejFQoJhJDw',
    link: 'https://youtu.be/Q1NKMPhP8PY?si=A4b5TENVYFEI2cBV',
    reviews: 4.9,
    category: 'THRILLER/ACTION',
    language: 'TELUGU'
  };
  
let options={
    method:'POST',
    body:JSON.stringify(movieData),
    headers:{   
        Accept:'application/json',
        'Content-Type':'application/json'

    }
}

fetch(postmovieUrl,options)
.then(response=>{
return response.json()
})
.then(data=>{
    console.log(data)
})  

