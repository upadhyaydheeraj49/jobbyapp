import './index.css'

const FiltersGroup = props => {
  const {
    employmentTypesList,
    salaryRangesList,
    updateSalaryRange,
    updateEmploymentType,
  } = props
  return (
    <div className="sidebar-filters-container">
      <hr className="sidebar-line" />
      <h5 className="filter-category-heading">Type of Employment</h5>
      <ul className="filters-container">
        {employmentTypesList.map(item => (
          <li className="filter" key={item.employmentTypeId}>
            <input
              type="checkbox"
              id={item.employmentTypeId}
              onChange={updateEmploymentType}
              name="employmentType"
            />
            <label htmlFor={item.employmentTypeId} className="filter-label">
              {item.label}
            </label>
          </li>
        ))}
      </ul>
      <hr className="sidebar-line" />
      <h5 className="filter-category-heading">Salary Range</h5>
      <ul className="filters-container">
        {salaryRangesList.map(item => (
          <li className="filter" key={item.salaryRangeId}>
            <input
              type="radio"
              id={item.salaryRangeId}
              name="filter"
              onChange={updateSalaryRange}
            />
            <label htmlFor={item.salaryRangeId} className="filter-label">
              {item.label}
            </label>
          </li>
        ))}
      </ul>
    </div>
  )
}
export default FiltersGroup
