function CategoryFilter({
  categories,
  selected,
  setSelected
}) {
  return (
    <div className="sidebar">
      {categories.map(category => (
        <button
          key={category}
          onClick={() => setSelected(category)}
          className={
            selected === category
              ? "active"
              : ""
          }
        >
          {category}
        </button>
      ))}
    </div>
  );
}

export default CategoryFilter;