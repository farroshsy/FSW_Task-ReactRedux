import React, { useState, useEffect, useRef } from 'react';
import '../../index.css';
import Navbar from '../Layouts/standart';

function Blog() {

    const [imgFile, setImg] = useState(process.env.PUBLIC_URL + '/logo192.png');
    const fileRef = useRef();
    
    const handleChange = () => {
        const img = fileRef.current.files[0];
        const reader = new FileReader();

        reader.addEventListener('load', ()=>{
            setImg(reader.result);
        });

        reader.readAsDataURL(img);
    }

    const handleDelPrev = () => {
        setImg(process.env.PUBLIC_URL + '/logo192.png');
    }

    useEffect(() => {
        document.getElementById('exInFile').addEventListener('change', ()=>{
            handleChange();
        })
        document.getElementById('delete').addEventListener('click', () => {
            handleDelPrev();
        })
    })

    return (
        <div>
            <Navbar></Navbar>
            <div>
                <h1>Ini halaman Blog</h1>
                <h3 className='mt-5'>Inputkan gambar</h3>
                <img alt = " " src={imgFile}></img>
                <div className='container'>
                    <div className="mb-3">
                        <label htmlFor="exInFile" className="form-label">Gambar</label>
                        <input ref={fileRef} type="file" className="form-control" id="exInFile" aria-describedby="emailHelp" />
                    </div>
                    <button className='btn btn-danger' id='delete'>Hapus Gambar</button>
                </div>

            </div>
        </div>
    );
}

export default Blog