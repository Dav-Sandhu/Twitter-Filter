import PropTypes from 'prop-types'

const TweetProfile = ({pic, username}) => {
    return (
      <h3 className="profile">
        <img className="profile_picture" src={pic} alt="" />&nbsp;
        <div className="username">{username}</div>
      </h3>
    )
}

TweetProfile.propTypes = {
    pic: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired
}

export default TweetProfile