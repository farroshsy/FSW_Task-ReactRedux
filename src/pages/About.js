import 'bootstrap/dist/css/bootstrap.min.css'
import '../App.css';
import logo from '../logo.svg'
import { useState, useRef } from 'react';
import Navigation from '../Components/Navigation';

function About() {
    const [imageFile, setImageFile] = useState(logo)
    const fileRef = useRef()

    function handleChange() {
        const image = fileRef.current.files[0]
        const reader = new FileReader()

        reader.addEventListener('load', () => {
            setImageFile(reader.result)
        })

        reader.readAsDataURL(image)
    }
    return (
        <div className="about-page">
            <Navigation />
            <header className="App-header">
                <img src={imageFile} className="App-logo" alt="logo" />
                <input ref={fileRef} type="file" placeholder="Gambar" onChange={handleChange} />
            </header>
        </div>
    );
}

export default About;
