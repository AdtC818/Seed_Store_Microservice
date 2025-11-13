import React, {useEffect, useState} from 'react';
import { getContacts } from '../api';

export default function ContactsPage(){
  const [items, setItems] = useState([]);
  useEffect(()=> {
    getContacts().then(d => setItems(Array.isArray(d)?d:[])).catch(()=>setItems([]));
  },[]);
  return (
    <div>
      <h1>Contacts</h1>
      <table className="table">
        <thead><tr><th>ID</th><th>Name</th><th>Email/Phone</th></tr></thead>
        <tbody>
          {items.map((it)=>(
            <tr key={it.id || it._id || Math.random()}>
              <td>{it.id || it._id}</td>
              <td>{it.name || it.fullName || '-'}</td>
              <td>{it.email || it.phone || '-'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
