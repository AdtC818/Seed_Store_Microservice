import React, {useEffect, useState} from 'react';
import { getSeeds } from '../api';

export default function SeedsPage(){
  const [items, setItems] = useState([]);
  useEffect(()=> {
    getSeeds().then(d => setItems(Array.isArray(d)?d:[])).catch(()=>setItems([]));
  },[]);
  return (
    <div>
      <h1>Seeds</h1>
      <ul className="list">
        {items.map(it=> <li key={it.id||it._id||Math.random()}>{it.name || it.title || JSON.stringify(it)}</li>)}
      </ul>
    </div>
  );
}
