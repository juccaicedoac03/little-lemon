const Button = ({ value, label, isSelected, onClick, isDeletable }) => {

  let cardLabel = label.split('-');

  return (
    <div>
      {!isDeletable && <button style={isSelected ? { background: '#495E57', color: 'white' } : {}} onClick={() => onClick(value,isSelected)}>
        {label.replace(/-/g, ".  ")}
      </button>}
      {isDeletable &&
      <div className='cardTables'>
        <div>
          <h5 id='cardTablesTittle'>{cardLabel[2]}</h5>
          <h5 id='cardTablesContent'>{cardLabel[1]}</h5>
          <h5 id='cardTablesContent'>{cardLabel[0]}</h5>
        </div>
        <button style={isSelected ? { background: '#495E57', color: 'white' } : {}} onClick={() => onClick(value,isSelected)}>
          X
        </button>
      </div>}
    </div>
  );
}
  export default Button;