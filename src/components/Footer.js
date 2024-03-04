import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';
import InstagramIcon from '@material-ui/icons/Instagram';
import WhatsAppIcon from '@material-ui/icons/WhatsApp';
import '../styles/styles.css';


function Footer () {
    return (    
        <div className='footer'>
            <div className='footer-contact'>
                <div className='text'>
                Email: <a href="mailto:manosabiertas@lasalleandalucia.net" style={{ color: 'black' }}>manosabiertas@lasalleandalucia.net</a>
                <p>Teléfonos: 650485214 || 640168593</p>
                <p>Fax:158 425 252</p>
                </div>
            </div>

            <div className='footer-address'> 
                <div className='text'>Polígono norte Sevilla (41009):
                <p>Plaza Río de Janeiro, 10 </p>
                <p>Calle Meléndez Valdés, 28</p>
                </div>
            </div>
        
            <div className='footer-social-media'>
                <a href="https://www.facebook.com/ajmmaa/" target="_blank" rel="noopener noreferrer">
                <FacebookIcon style={{ color: '#3b5998' }} />
                </a>
                <a href="https://twitter.com/ajmmaa" target="_blank" rel="noopener noreferrer">
                    <TwitterIcon style={{ color: '#1DA1F2' }} />
                </a>
                <a href="https://www.instagram.com/ajmanosabiertas/" target="_blank" rel="noopener noreferrer">
                    <InstagramIcon style={{ color: '#C13584' }} />
                </a> 
                <a href="https://api.whatsapp.com/send/?phone=650485214&text&type=phone_number&app_absent=0" target="_blank" rel="noopener noreferrer">
                    <WhatsAppIcon style={{ color: '#25D366' }} />
                </a>  
            </div>
        
        </div>

    )
}
export default Footer;
