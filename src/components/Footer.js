import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';
import InstagramIcon from '@material-ui/icons/Instagram';
import WhatsAppIcon from '@material-ui/icons/WhatsApp';
import '../styles/styles.css';


function Footer () {
    return (    
        <div className='footer'>
            <div className='footer-contact'>
                <p>Email:&nbsp;&nbsp;&nbsp;&nbsp;<a href="mailto:manosabiertas@lasalleandalucia.net" style={{ color: 'black', display: 'inline' }}>manosabiertas@lasalleandalucia.net</a></p>
                <p>Teléfonos:&nbsp;&nbsp;&nbsp;&nbsp;650485214&nbsp;&nbsp;ó&nbsp;&nbsp;640168593</p>
                <p>Fax:&nbsp;&nbsp;&nbsp;&nbsp;158 425 252</p>
            </div>

            <div className='footer-address'> 
                <p>Polígono norte Sevilla (41009):</p>
                <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- Plaza Río de Janeiro, 10 </p>
                <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- Calle Meléndez Valdés, 28</p>
            </div>
        
            <div className='footer-social-media'>
            <a href="https://www.facebook.com/ajmmaa/" target="_blank" rel="noopener noreferrer">
            <FacebookIcon style={{ color: '#3b5998', fontSize: '40px' }} />
            </a>
            <a href="https://twitter.com/ajmmaa" target="_blank" rel="noopener noreferrer">
            <TwitterIcon style={{ color: '#1DA1F2', fontSize: '40px' }} />
            </a>
            <a href="https://www.instagram.com/ajmanosabiertas/" target="_blank" rel="noopener noreferrer">
            <InstagramIcon style={{ color: '#C13584', fontSize: '40px' }} />
            </a> 
            <a href="https://api.whatsapp.com/send/?phone=650485214&text&type=phone_number&app_absent=0" target="_blank" rel="noopener noreferrer">
            <WhatsAppIcon style={{ color: '#25D366', fontSize: '40px' }} />
            </a>  
            </div>
        
        </div>

    )
}
export default Footer;
