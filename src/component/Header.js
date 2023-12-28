import PropTypes from 'prop-types';
import Button from './Button';
import {useLocation} from "react-router-dom"

const Header = ({title, onAdd, showAdd}) => {
  const location = useLocation()
    // const onClick = () =>{
    //     console.log('onclick');
    // }
  return (
    <header className='header'>
        <h1>{title}</h1>
        {location.pathname === '/' && (
          <Button 
          color={showAdd ? 'red' : 'green'} 
          text={showAdd ? 'Close' : 'Add'} 
          onClick={onAdd}></Button>
        )}
    </header>
  )
}
Header.defaultProps = {
    title: 'tasks',
}

Header.propTypes = {
    title: PropTypes.string.isRequired,
}
export default Header