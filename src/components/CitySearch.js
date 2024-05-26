import { useState, useEffect, useRef } from 'react';

const CitySearch = ({ allLocations, setCurrentCity, setInfoAlert }) => {
  // default value is false, no suggestion list when input is not in focus
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const inputRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      // Close suggestions if clicked outside the input element
      if (inputRef.current && !inputRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };
    // listen to any clicks that happens on the webpage
    document.body.addEventListener('click', handleClickOutside);

    // Cleaning up after we are done
    return () => {
      document.body.removeEventListener('click', handleClickOutside);
    };
  }, []);

  /* use the stringified value of the allLocation prop as a dependency
  to compare the stings not their address in memory(different address although same value*/
  useEffect(() => {
    setSuggestions(allLocations);
  }, [`${allLocations}`]);

  /*the function will be used as the callback function of onChange,
 which is why it has the event parameter in it.
 The function will 1) obtain the current value of the input field.
 Based on this value, the function will 2) filter the allLocations array,
 then 3) set the Query local state to whatever the input value is, and finally
 4) set the suggestions local state to the filtered locations array.*/
  const handleInputChanged = (event) => {
    const value = event.target.value;
    const filteredLocations = allLocations
      ? allLocations.filter((location) => {
          return location.toUpperCase().indexOf(value.toUpperCase()) > -1;
        })
      : [];

    setQuery(value);
    setSuggestions(filteredLocations);
    setCurrentCity(value);

    // If the filteredLocations returns no cities then return infoText
    let infoText;
    if (filteredLocations.length === 0) {
      infoText =
        'We can not find the city you are looking for. Please try another city';
    } else {
      infoText = '';
    }
    setInfoAlert(infoText);
  };

  const handleItemClicked = (event) => {
    const value = event.target.textContent;
    setQuery(value);
    setShowSuggestions(false);
    setCurrentCity(value);
    setInfoAlert('');
  };

  /** If showSuggestions is true,
   *  render a ul element with a suggestions list. Otherwise,
   *  render a null (show nothing/no suggestions)
   * Then, call setShowSuggestions(true) in the callback function of the
   *  onFocus event handler of the <input /> element */
  return (
    <div id='city-search'>
      <input
        type='text'
        className='city'
        placeholder='Search for a city'
        value={query}
        onFocus={() => setShowSuggestions(true)}
        onChange={handleInputChanged}
        ref={inputRef}
      />
      {showSuggestions ? (
        <ul className='suggestions'>
          {suggestions.map((suggestion) => {
            return (
              <li onClick={handleItemClicked} key={suggestion}>
                {suggestion}
              </li>
            );
          })}
          <li key='See all cities' onClick={handleItemClicked}>
            <b>See all cities</b>
          </li>
        </ul>
      ) : null}{' '}
    </div>
  );
};

export default CitySearch;
