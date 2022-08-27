import PropTypes from 'prop-types'

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

Images.propTypes = {
    flag: PropTypes.string.isRequired,
    images: PropTypes.array
}

export default Images
