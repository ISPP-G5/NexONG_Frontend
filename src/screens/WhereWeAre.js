import '../styles/styles.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';




function WhereWeAre() {
    return (
        <main className="App">
            <Header />
            <div className='div-container'>
                <h1>Donde estamos</h1>
                <Link to={'/'} style={{ color: 'black' }}> Home </Link>
            </div>
            <div className='homepage-container'>
                <div className='flex-container' style={{marginLeft:'25%'}}>
                    <h4>Local calle Meléndez Valdés, 28. 41010. Sevilla</h4>
                </div>
                <div className='flex-container' style={{marginRight:'25%'}}>
                    <h4>Local Plaza Río de Janeiro, 10. 41010. Sevilla</h4>
                </div>
            </div>
            <div className='homepage-container'>
                <div className='flex-container' style={{marginLeft:'25%'}}>
                    <img src={"https://www.google.com/maps/vt/data=K_jSGYoU1OY1H-NZmOG5ttEJnCL75QmjeBdsD70fjjwxn80zE6TEDch7kmiow0RRlTiKYWfqu40iBM7VaiayO8z5MK7mcM0wS1dPIu0cGtPkPndf1e3w45u52IiOwBFTPOHUntnwOM9vstTWBbdP0IuHpkobIeIzj4HiP3-QAFBqwBtNHeOgSUDe46KYdBb5Qn3kFbOld6opz1D51I3Cpj-llP1K2I0QNQc"} alt={"Local calle Meléndez Valdés"} style={{ maxWidth: '600px', maxHeight: '600px', objectFit: 'cover' }} />
                </div>
                <div className='flex-container' style={{marginRight:'25%'}}>
                    <img src={"https://www.google.com/maps/vt/data=LthIk07Q-LGT61zjTqu7LNF982EUbKNK_jHEgpBdPa2ketXEq8BuvyNKzMqsOEAITgamdsp8EBbnelsNJJnmdUe-DIPpm3MhU7V6tD4tzOT9ovMoGHxqzS2moj4UIyXlFvIVxSj6uhH78jVmvW92QpqcsfpgaSdC3yY2Ye75f8sqSlu4uio1LtB9SSq_n0DaQE-ulkA2jvkz-2w0dXUYomg4iAF-acefuGc"} alt={"Local Plaza Río de Janeiro, 10. 41010. Sevilla"} style={{ maxWidth: '600px', maxHeight: '600px', objectFit: 'cover' }} />
                </div>
            </div>
            <Footer />
        </main>
    );
}
export default WhereWeAre;    
