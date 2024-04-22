import '../../styles/styles.css';

import ShowChildren from '../../components/ShowChildren';
import  { useFetchMyKids } from '../../components/useFetchData'; 
const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT;

function FamilyChildren() {
  const userId = parseInt(localStorage.getItem('userId'), 10);
  const children = useFetchMyKids(API_ENDPOINT, userId);

  children.forEach(element => {
    console.log(element)
  });
  
  return (
    <ShowChildren 
      data={children}
      type="Auths" 
    />
  );
}

export default FamilyChildren;
