const Filter = ({ search, setSearch }) => {
  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  }

  return (
    <div>
        filter shown with <input type="text" value={search} onChange={handleSearchChange} />
    </div>
  )
}
export default Filter