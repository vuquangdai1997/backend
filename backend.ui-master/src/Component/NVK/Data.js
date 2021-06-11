import React, { useState, useContext,useEffect } from 'react';
import Context from '../../Context'
import {useHistory,useParams} from 'react-router-dom';
import axios from 'axios';
import HH from './HH';
import NH from './NH';
import XH from './XH';
import TK from './TK';
export default function Data() {
    const [State, SetState] = useContext(Context);

  switch(State.NVKSTT){
     case 1: return <NH/>
     case 2: return <XH/>
     case 3: return <TK/>
     case 4: return <TK/>
      default: return <HH/>
  }
}