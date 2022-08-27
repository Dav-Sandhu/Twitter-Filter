const Images = ({flag, images}) => {

    if (flag !== "true"){
        return <></>
    }

    return (
        <>
        {images.map(i => { 
            return <img className="images" src={i} key={i} alt=""/>
        })}
        </>
    )
    
}

export default Images