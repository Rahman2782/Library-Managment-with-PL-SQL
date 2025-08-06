import { useState } from "react";
import axios from 'axios';

export default function AddBook() {
    const [form, setForm] = useState({
        title: "",
        author: "",
        genre: "",
        isbn: "",
        pub_year: "",
    });

    const handleSubmit = async (e) => {
        e.preventDefault(); /*prevents default action of event */
        try {
            await axios.post('http://localhost:3001/books/add', form);
            alert('Book added!');
        } catch (err) {
            console.error('Error handling book: ', err);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input placeholder="Title" onChange={e => setForm({ ...form, title: e.target.value })} />
            <input placeholder="Author" onChange={e => setForm({ ...form, author: e.target.value })} />
            <input placeholder="Genre" onChange={e => setForm({ ...form, genre: e.target.value })} />
            <input placeholder="ISBN" onChange={e => setForm({ ...form, isbn: e.target.value })} />
            <input placeholder="Pub Year" onChange={e => setForm({ ...form, pub_year: e.target.value })} />
            <button type="submit">Add Book</button> 
        </form>
    );
}