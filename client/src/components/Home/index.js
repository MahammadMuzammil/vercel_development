import Header  from "../Header"
import { Component } from "react"
import { BallTriangle } from 'react-loader-spinner';
import { Circles ,TailSpin} from 'react-loader-spinner';
import MovieItem  from "../MovieItem";
import { IoIosSearch } from "react-icons/io";
// import Loader from 'react-loader-spinner';
// import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import TabItem from '../TabItem';
import { TiStarFullOutline } from "react-icons/ti";
import './index.css'
const apiStatusConstants={
    initial:'INITIAL',
    inProgress:'IN_PROGRESS',
    success:'SUCCESS',
    failure:'FAILURE'
}

const CategoryOptions=[{
    categoryId:'ACTION',
    categoryDisplayText:'Action'
},{
     categoryId:'COMEDY',
    categoryDisplayText:'Comedy'
},{ categoryId:'SCI-FI',
    categoryDisplayText:'Sci-Fi'}]


class Home extends Component{
state={
    apiStatus:apiStatusConstants.initial,
    moviesList:[],
    activeCategoryId:CategoryOptions[0].categoryId,
    activeLanguage:'ENGLISH',
    searchInput:''
}

getMovies= async()=>{
    this.setState({apiStatus:apiStatusConstants.inProgress})
    console.log(this.state.activeCategoryId)
    let {activeCategoryId,activeLanguage,searchInput} = this.state
    let url=`http://localhost:3000/movies?category=${activeCategoryId}&language=${activeLanguage}&search_input=${searchInput}`
    let response = await fetch(url)
    let respnseData = await response.json()
    console.log(respnseData.movies_data)
    if(respnseData.movies_data.length===0){
        this.setState({apiStatus:apiStatusConstants.failure})
    }else{

        setTimeout(()=>{this.setState({apiStatus:apiStatusConstants.success,moviesList:respnseData.movies_data,searchInput:''})},1000)
    }
    
}

changeCategoryId=(newId)=>{
    this.setState({activeCategoryId:newId},this.getMovies)

}
changeActiveLanguage=(e)=>{
    this.setState({activeLanguage:e.target.value},this.getMovies)
}

componentDidMount(){
    this.getMovies()
}

renderLoader=()=>{
    return(
    
        <div className='loader'>

<TailSpin />
        </div>
        
    
    )
}

renderSelectedMovie=()=>{
    let {moviesList} = this.state
    let index = Math.floor( Math.random()* moviesList.length)
    let movie = moviesList[index]
    let {movie_imgurl,
        movie_name,category,reviews}= movie
    return(
        <div className="selected-movie-container">
            <img src={movie_imgurl} className="selected-movie"/>
            <div className="text-container">
        {/* <h1 className="category">Title :{movie_name}</h1> */}
        <div className="align-category">
            <h1 className="category" >Title: </h1>
            <h1  >{movie_name}</h1>
        </div>
        <div className="align-category">
            <h1 >Category: </h1>
            <h1 className="category">{category}</h1>
        </div>
       <div className="review-container">
<p>{reviews}</p>
<TiStarFullOutline />
       </div>

            </div>
        </div>
    )
    console.log(movie)

}
changeSearchInput=(e)=>{

    if(e.key==='Enter'){
    console.log(e.target.value)
    this.setState({searchInput:e.target.value},this.getMovies)
}

}
renderSearchInput=()=>{
    return(
        <div className="search-input-container">
        <input className="inputElement" onKeyDown={this.changeSearchInput}/>

        <IoIosSearch className="searchIcon" />
        </div>
    )
}
resetState=()=>{
    this.setState({ activeCategoryId:CategoryOptions[0].categoryId,
        activeLanguage:'ENGLISH',
        searchInput:''},this.getMovies)
}
renderClearAllFiltersBtn=()=>{
    return(
        <div className="btn-container">
            <button className="clearBtn" onClick={this.resetState}>Clear All Filters</button>
        </div>

    )
}
renderTabsList=()=>{
    let {activeCategoryId,activeLanguage} = this.state
    return(
        <div className="filter">
            {this.renderSearchInput()}
            {this.renderClearAllFiltersBtn()}
        <ul className="tabs-container">
            {CategoryOptions.map(eachCategory=> <TabItem Tabdetails={eachCategory} key={eachCategory.categoryId} changeCategoryId={this.changeCategoryId} isActive={eachCategory.categoryId===activeCategoryId}/>)}
       
        </ul> 
        <select value={activeLanguage} className="drop-downlist" onChange={this.changeActiveLanguage}>

            <option value="ENGLISH">Hollywood</option>
            <option value="TELUGU">Tollywood</option>
            <option value="HINDI">Bollywood</option>
        </select>
    
        </div>

    )
}

renderMoviesList=()=>{
    let {moviesList} = this.state
    return(
        <>
        {this.renderSelectedMovie()}
        {this.renderTabsList()}
        <ul className="movies-container">
{moviesList.map(eachMovie=><MovieItem movie={eachMovie} key ={eachMovie.id}/>)}

        </ul>
        </>
    )
}
renderFailureView=()=>{
    return(
        <div className="failure-view">
<img src="https://img.freepik.com/free-vector/no-data-concept-illustration_114360-626.jpg" className="failure-img"/>
<h1>No data TO display!</h1>
<p>Please Reload Site!!!!</p>
        </div>
    )
}
renderAllResults=()=>{
    let {apiStatus} = this.state
    

        switch(apiStatus){
            case apiStatusConstants.inProgress:
                return this.renderLoader()
            case apiStatusConstants.success:
                return this.renderMoviesList()
            case apiStatusConstants.failure:
                return this.renderFailureView()
            default:
                 return null
}


}
    render(){
        return(
            <div className="home-background">
                <Header/>
                <hr className="seperator"/>
                {this.renderAllResults()}
            </div>
        )
    }

       
}
export default Home