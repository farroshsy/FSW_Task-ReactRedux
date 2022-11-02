//import ReactLogo from '../../logo.svg'
import '../../App.css'

function About() {
    return (
        <div className='App'>
            <header className='App-header'>
                <img src={ require('../../logo.svg').default } className='App-logo' alt='Logo' />
                <p>
                    Halaman About
                </p>
            </header>
        </div>
    )
}

export default About