import '../styles/styles.css';
import Header from '../components/Header';
import Intro from '../components/Intro';
import Footer from '../components/Footer';


function WhereWeAre() {
    return (
        <main className="App">
            <Header />
            <Intro 
                title="Donde estamos"
                image={'ong'}
            />
            <div className='homepage-container'>
                <div className='flex-container'>
                    <h4>Local calle Meléndez Valdés, 28. 41010. Sevilla</h4>
                    <img className="maps-image" src={"https://www.google.com/maps/vt/data=K_jSGYoU1OY1H-NZmOG5ttEJnCL75QmjeBdsD70fjjwxn80zE6TEDch7kmiow0RRlTiKYWfqu40iBM7VaiayO8z5MK7mcM0wS1dPIu0cGtPkPndf1e3w45u52IiOwBFTPOHUntnwOM9vstTWBbdP0IuHpkobIeIzj4HiP3-QAFBqwBtNHeOgSUDe46KYdBb5Qn3kFbOld6opz1D51I3Cpj-llP1K2I0QNQc"} alt={"Local calle Meléndez Valdés"} />
                </div>
                <div className='flex-container'>
                    <h4>Local Plaza Río de Janeiro, 10. 41010. Sevilla</h4>
                    <img className="maps-image" src={"https://www.google.com/maps/vt/data=LthIk07Q-LGT61zjTqu7LNF982EUbKNK_jHEgpBdPa2ketXEq8BuvyNKzMqsOEAITgamdsp8EBbnelsNJJnmdUe-DIPpm3MhU7V6tD4tzOT9ovMoGHxqzS2moj4UIyXlFvIVxSj6uhH78jVmvW92QpqcsfpgaSdC3yY2Ye75f8sqSlu4uio1LtB9SSq_n0DaQE-ulkA2jvkz-2w0dXUYomg4iAF-acefuGc"} alt={"Local Plaza Río de Janeiro, 10. 41010. Sevilla"} />
                </div>
            </div>
            <Footer />
        </main>
    );
}
export default WhereWeAre;    
