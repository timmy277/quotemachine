import { useState } from 'react';
import { Link } from 'react-router-dom';


const colors = [
    'red-500', 'green-500', 'blue-500', 'yellow-500',
    'purple-500', 'pink-500', 'teal-500', 'indigo-500'
];


const getRandomColor = () => {
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
};

const XMLQuoteMachine = () => {
    const [quote, setQuote] = useState({ content: '', author: '' });
    const [error, setError] = useState('');
    const [color, setColor] = useState('bg-white text-black');
    console.log(color)
    const fetchQuote = () => {
        setError('');

        const xhr = new XMLHttpRequest();
        xhr.open('GET', 'https://quotes15.p.rapidapi.com/quotes/random/', true);
        xhr.setRequestHeader('X-RapidAPI-Host', 'quotes15.p.rapidapi.com');
        xhr.setRequestHeader('X-RapidAPI-Key', 'b352ff6f67msh6fcf5f9b2b091f6p1ce806jsncae272c7c284');

        xhr.onload = function () {
            if (xhr.status >= 200 && xhr.status < 300) {
                const data = JSON.parse(xhr.responseText);
                const randomColor = getRandomColor();
                setQuote({ content: data.content, author: data.originator.name });
                setColor(`bg-${randomColor} text-${randomColor}`);
            } else {
                console.error('Error:', xhr.statusText);
                setError('Failed to fetch quote');
            }
        };

        xhr.onerror = function () {
            console.error('Request error...');
            setError('Failed to fetch quote');
        };

        xhr.send();
    };
    return (
        <>
            <div className={`flex flex-col items-center justify-center min-h-screen  p-4 ${color.split(' ')[0]}`}>
                <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md ">
                    {error && <p className="text-center text-red-500">{error}</p>}
                    <p className={`text-4xl italic ${color.split(' ')[1]} `} > {`"${quote.content}"`}</p>
                    <p className={`mt-2 text-right text-current ${color.split(' ')[1]} `}> {`— ${quote.author}`}</p>
                    <button
                        onClick={fetchQuote}
                        className={` ${color.split(' ')[0]} mt-6 px-4 py-2 text-gray-400 font-semibold rounded `} >
                        New Quote
                    </button>
                    <Link to="/" className="mt-4 text-center text-blue-500" >Fetch Quote Machine</Link>
                </div>
            </div>
        </>
    );
};

export default XMLQuoteMachine;
