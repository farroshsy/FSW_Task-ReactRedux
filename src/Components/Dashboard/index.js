/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import '../../index.css';
import Navbar from '../Layouts/standart';
import {ListCar} from '..';

let loopRender = 0;

function Dashboard() {

    return (
        <div>
            <Navbar></Navbar>
            <div>
                <h1>Ini halaman dashboard</h1>

                <ListCar></ListCar>
            </div>
        </div>
    );
}

export default Dashboard