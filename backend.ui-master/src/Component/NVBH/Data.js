import React, { useState, useContext,useEffect } from 'react';
import Context from '../../Context'
import {useHistory,useParams} from 'react-router-dom';
import axios from 'axios';
import HD from './HD';
import PTH from './PTH';
import SK from './SK';
import KH from './KH';
export default function Data() {
    const [State, SetState] = useContext(Context);

  switch(State.NVBHSTT){
     case 1: return <KH/>
     case 2: return <HD/>
     case 3: return <PTH/>
      default: return <SK/>
  }
}