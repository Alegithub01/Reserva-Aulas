import PropTypes from 'prop-types';
import { ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const MenuItem = ({ icon, label, route, isExpanded }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(route);
  };

  return (
    <ListItem button onClick={handleClick} sx={{ height: '35px', backgroundColor: 'rgba(255, 255, 255, 0.0)' }}>
      {icon && (
        <ListItemIcon sx={{ color: 'white', minWidth: '40px', fontSize: '24px' }}>
          {icon}
        </ListItemIcon>
      )}
      {isExpanded && (
        <ListItemText
          primary={label}
          sx={{
            ml: icon ? 0 : 8,
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        />
      )}
    </ListItem>
  );
};

MenuItem.propTypes = {
  icon: PropTypes.element,
  label: PropTypes.string.isRequired,
  route: PropTypes.string.isRequired,
  isExpanded: PropTypes.bool.isRequired,
};

export default MenuItem;
