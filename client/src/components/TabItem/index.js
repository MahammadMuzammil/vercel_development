import './index.css'
const TabItem=(props)=>{
let {Tabdetails,changeCategoryId,isActive} = props
let { categoryId,
    categoryDisplayText} = Tabdetails
const handleonClick=()=>{
    changeCategoryId(categoryId)
}
return(
    <li className="tab-item">

        <button onClick={handleonClick} className={`tabBtn  ${isActive ?'active': ''} `}>
        {categoryDisplayText}

        </button>
        
    </li>
)

}
export default TabItem