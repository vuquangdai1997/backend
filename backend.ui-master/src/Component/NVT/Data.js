import React, { useState, useContext,useEffect } from 'react';
import Context from '../../Context'
import {useHistory,useParams} from 'react-router-dom';
import axios from 'axios';
import HD from './HD'
import CN from './CN'
import SP from './SP'
import NCC from './NCC'
import QLNV from './QLNV'
import PTH from './PTH'
import Kho from './Kho'
import DT from './DT'
export default function Data() {
    const [State, SetState] = useContext(Context);

  switch(State.NVTSTT){
     case 1: return <CN/>
     case 2: return <QLNV/>
     case 3: return <Kho/>
     case 4: return <NCC/>
     case 5: return <SP/>
     case 6: return <HD/>
     case 7: return <PTH/>
      default: return <DT/>
  }
}