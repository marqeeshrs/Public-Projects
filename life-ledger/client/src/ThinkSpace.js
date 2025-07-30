/**
 * This will act as the journal and the hub of the app.
 * The purpose is to act as an interactive journaling center
 * The capabilities of the app will shoq
*/

import { useState, useEffect } from "react";

function ThinkSpace() {
    const [entry, setEntry] = useState("");
    const [lastSaved, SetLastSaved] = useState(null);

    //Load saved entry from local storage
    useEffect(() => {
        const saved = localStorage.getItem("think_space_entry");
        if (saved) {
            setEntry(saved);
        }
    }, []);

    //Autosave feature after entry changes
    useEffect(() => {
        const timeout = setTimeout(() => {
            localStorage.setItem("think_space_entry", entry);
            SetLastSaved(new Date().toLocaleTimeString());
        }, 1000); //one second inactivity triger for autosave
        
        return() => clearTimeout(timeout); //debounce
    }, [entry]);

    return (
        <div className="
            flex 
            flex-col 
            items-center 
            justify-center 
            min-h-screen 
            bg-gray-p50 
            text-white p-6
            "
        >
            <h1 className="
                text-3xl 
                font-bold 
                mb-4"
            >Think Space</h1>
            <textarea
                value={entry}
                onChange={(e) => setEntry(e.target.value)}
                placeholder="Type your thoughts here... This is your space to organize your thoughts."
                className="
                    w-full 
                    max-w-3x1 
                    h-[400px] 
                    p-4 
                    rounded-x1 
                    bg-gray-900 
                    text-white 
                    border 
                    border-gray-700 
                    focus:outline-none 
                    focus:ring-2 
                    focus:ring-pink-500 
                    resize-none 
                    shadow-lg
                    "
            />
            <p className="text-sm text-gray-400 mt-2">
                {lastSaved ? `Last saved at ${lastSaved}` : "Save ready."}
            </p>
        </div>
    );
}

export default ThinkSpace;