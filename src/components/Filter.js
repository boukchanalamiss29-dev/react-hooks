import ReactStars from "react-stars";

function Filter({ titleFilter, setTitleFilter, ratingFilter, setRatingFilter }) {
  return (
    <div className="filter-bar mb-4 p-3 d-flex flex-wrap align-items-center gap-4">
      {/* Filtre titre */}
      <div>
        <label className="filter-label"> Search </label>
        <input
          type="text"
          className="form-control dark-input"
          placeholder="e.g. Inception..."
          value={titleFilter}
          onChange={(e) => setTitleFilter(e.target.value)}
        />
      </div>

      {/* Filtre note */}
      <div>
        <label className="filter-label"> Rating</label>
        <ReactStars
          count={5}
          value={ratingFilter}
          onChange={(val) => setRatingFilter(val)}
          size={28}
          color2="#e94560"
        />
      </div>

      {/* Bouton reset */}
      {(titleFilter || ratingFilter > 0) && (
        <button
          className="btn btn-outline-danger btn-sm mt-3"
          onClick={() => { setTitleFilter(""); setRatingFilter(0); }}
        >
          ✕ Reset
        </button>
      )}
    </div>
  );
}

export default Filter;