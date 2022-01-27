const FilterOption = (props) => {
  const selectOption = (e) => {
    const filterOptions = document.querySelectorAll(".filter-option");
    filterOptions.forEach((option) => {
      if (option.previousElementSibling.id === e.target.id) {
        option.classList = "filter-option active-option";
      } else {
        option.classList = "filter-option";
      }
    });
  };

  return (
    <div className="filter-option-container">
      <input
        type="radio"
        name="filter-options"
        id={props.filterID}
        className="radio-button"
        defaultChecked={props.isChecked}
        onChange={selectOption}
        onClick={() => props.filterFunction(props.filterLabel)}
      />
      <label
        className={
          props.isChecked ? "filter-option active-option" : "filter-option"
        }
        htmlFor={props.filterID}
      >
        {props.filterLabel}
      </label>
    </div>
  );
};

export default FilterOption;
