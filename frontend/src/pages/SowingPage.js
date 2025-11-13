import React, {useEffect, useState} from 'react';
import { getSowings } from '../api';

export default function SowingPage(){
  const [items, setItems] = useState([]);
  useEffect(()=> {
    getSowings().then(d => setItems(Array.isArray(d)?d:[])).catch(()=>setItems([]));
  },[]);
  return (
    <div>
      <h1>Sowing</h1>
      <ul className="list">
        {items.map(it=> <li key={it.id||it._id||Math.random()}>{it.name || it.title || JSON.stringify(it)}</li>)}
      </ul>
    </div>
  );
}
