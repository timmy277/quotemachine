import { useState } from 'react';
import { Link } from 'react-router-dom';


const getRandomColor = () => {
    const randomValue = () => Math.floor(Math.random() * 256);
    const red = randomValue();
    const green = randomValue();
    const blue = randomValue();
    return `rgb(${red}, ${green}, ${blue})`;
};

const QuoteMachine = () => {
    const [quote, setQuote] = useState({ content: '', author: '' });
    const [error, setError] = useState('');
    const [color, setColor] = useState('rgb(0, 0, 0)');
    console.log(color)
    const fetchQuote = () => {
        setError('');

        fetch('https://quotes15.p.rapidapi.com/quotes/random/', {
            method: 'GET',
            headers: {
                'X-RapidAPI-Host': 'quotes15.p.rapidapi.com',
                'X-RapidAPI-Key': 'b352ff6f67msh6fcf5f9b2b091f6p1ce806jsncae272c7c284'
            }
        })
            .then(response => response.json())
            .then(data => {
                const randomColor = getRandomColor();
                setQuote({ content: data.content, author: data.originator.name });
                setColor(randomColor);
            })
            .catch(error => {
                console.error('Error:', error);
                setError('Failed to fetch quote');
            });
    };

    return (
        <>
            <div className="flex flex-col items-center justify-center min-h-screen p-4" style={{ backgroundColor: color }}>
                <div className={` max-w-md w-full bg-white p-6 rounded-lg shadow-md `}>
                    {error && <p className="text-center text-red-500">{error}</p>}
                    <p className="text-4xl italic" style={{ color }} > {`"${quote.content}"`}</p>
                    <p className="mt-2 text-right" style={{ color }}> {`— ${quote.author}`}</p>
                    <div className='flex items-center justify-between'>
                        <button
                            onClick={fetchQuote}
                            className="px-4 py-2 mt-6 font-semibold text-black rounded " style={{ backgroundColor: color }} >
                            New Quote
                        </button>
                        <Link to="/xml-quote-machine" className="mt-4 text-center text-blue-500 " >XML Quote Machine</Link>
                    </div>
                </div>
            </div>
        </>
    );
};

export default QuoteMachine;
