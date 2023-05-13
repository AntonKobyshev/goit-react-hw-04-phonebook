import PropTypes from 'prop-types';
import { Wrapper, Label, Input } from './Filter.styled';
import { BiSearchAlt2 } from 'react-icons/bi';

export const Filter = ({ value, onFilterChange }) => {
  return (
    <Wrapper>
      <Label htmlFor="filter">
        <BiSearchAlt2 size="24" />
        Find contacts by name
      </Label>
      <Input
        name="filter"
        type="text"
        id="filter"
        value={value}
        onChange={onFilterChange}
      />
    </Wrapper>
  );
};

Filter.propTypes = {
  value: PropTypes.string.isRequired,
  onFilterChange: PropTypes.func.isRequired,
};
