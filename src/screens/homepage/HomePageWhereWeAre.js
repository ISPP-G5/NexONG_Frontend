import '../../styles/styles.css';
import { useEffect } from 'react';
import LayoutHomepage from '../../components/LayoutHomepage';


function HomePageWhereWeAre() {
    useEffect(() => {
        window.scrollTo(0, 0);
      }, []);

    return (
        <LayoutHomepage 
            title={'Dónde estamos'} 
            image={'ong'}
        >
            <div className='homepage-container'>
                <div className='flex-container'>
                    <h4>Local calle Meléndez Valdés, 28. 41010. Sevilla</h4>
                    <a href="https://www.google.com/maps/search/?api=1&query=Local+calle+Meléndez+Valdés" target="_blank" rel="noopener noreferrer">
                        <img className="maps-image" src={"https://www.google.com/maps/vt/data=K_jSGYoU1OY1H-NZmOG5ttEJnCL75QmjeBdsD70fjjwxn80zE6TEDch7kmiow0RRlTiKYWfqu40iBM7VaiayO8z5MK7mcM0wS1dPIu0cGtPkPndf1e3w45u52IiOwBFTPOHUntnwOM9vstTWBbdP0IuHpkobIeIzj4HiP3-QAFBqwBtNHeOgSUDe46KYdBb5Qn3kFbOld6opz1D51I3Cpj-llP1K2I0QNQc"} alt={"Local calle Meléndez Valdés"} />
                    </a>
                </div>
                <div className='flex-container'>
                    <h4>Local Plaza Río de Janeiro, 10. 41010. Sevilla</h4>
                    <a href="https://www.google.com/maps/search/?api=1&query=Plaza+Río+de+Janeiro,+10.+41010.+Sevilla" target="_blank" rel="noopener noreferrer">
                        <img className="maps-image" src={"https://www.google.com/maps/vt/data=LthIk07Q-LGT61zjTqu7LNF982EUbKNK_jHEgpBdPa2ketXEq8BuvyNKzMqsOEAITgamdsp8EBbnelsNJJnmdUe-DIPpm3MhU7V6tD4tzOT9ovMoGHxqzS2moj4UIyXlFvIVxSj6uhH78jVmvW92QpqcsfpgaSdC3yY2Ye75f8sqSlu4uio1LtB9SSq_n0DaQE-ulkA2jvkz-2w0dXUYomg4iAF-acefuGc"} alt={"Local Plaza Río de Janeiro, 10. 41010. Sevilla"} />
                    </a>
                </div>
            </div>
        </LayoutHomepage>
    );
}
export default HomePageWhereWeAre;    
