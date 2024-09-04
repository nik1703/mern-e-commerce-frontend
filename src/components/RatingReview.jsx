function RatingReview({ rating, setRating }) {
  return (
    <div>
      {[1, 2, 3, 4, 5].map((star) => {
        return (
          <span
            className="start cursor-pointer text-3xl"
            style={{
              color: rating >= star ? 'gold' : 'gray',
            }}
            onClick={() => {
              setRating(star)
            }}
          >
            {' '}
            ★{' '}
          </span>
        )
      })}
    </div>
  )
}

export default RatingReview
