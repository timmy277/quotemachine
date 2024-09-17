import { useState } from 'react';


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
            <div className={`flex flex-col items-center justify-center min-h-screen  p-4 ${color}`}>
                <div className="max-w-md w-full bg-white p-6 rounded-lg shadow-md ">
                    {error && <p className="text-center text-red-500">{error}</p>}
                    <p className="text-4xl italic" > {`"${quote.content}"`}</p>
                    <p className="mt-2 text-right ">{`— ${quote.author}`}</p>
                    <button
                        onClick={fetchQuote}
                        className={` ${color} mt-6 px-4 py-2 text-gray-400 font-semibold rounded `} >
                        New Quote
                    </button>
                </div>
            </div>
        </>
    );
};

export default XMLQuoteMachine;
