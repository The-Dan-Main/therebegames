import { Link } from 'react-router-dom';
import "./Footer.css"

export default function Footer() {
    return (
        <div className="Footer-container">
            <Link to="/">
                <img src={require('./logo-short.png')} alt="" className='footer-logo' title=''/>
            </Link>
            <div className="links-container">
                <a href="https://github.com/The-Dan-Main/therebegames" target="blank">
                    <img src={require('./github-logo.png')} alt="this GitHub repository" className='footer-links-img' title='GitHub repository' />
                </a>
                <a href="https://www.linkedin.com/in/dan-weber-zurich/" target="blank">
                    <img src={require('./LI-In-Bug.png')} alt="my Linked-In profile" className='footer-links-img' title='Linked-In profile' id='linked-in' />
                </a>
            </div>
                <div className="API-provider">
                    <p className="API-title">This Website is using <br /> the awesome API of</p>
                <a href="https://rawg.io/apidocs" target="blank">
                    <img src={require('./Logo-RAWG.png')} alt="This Website is using the awesome API of RAWG" className='footer-API-img' title='API of RAWG' />
                </a>

                </div>
        </div>
    )
}