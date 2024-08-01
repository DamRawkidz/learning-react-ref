import { useRef } from "react"
import { useState } from "react"
import ResultModal from "./ResultModal.jsx"

export default function TimerChallenge({ title, targetTime }) {
    const timer = useRef()
    const dialog = useRef()
    const [timerStarted, setTimerStarted] = useState(false)
    const [timerExpired, setTimeExpired] = useState(false)
    const [timeRemaining, setTimeRemaining] = useState(targetTime)

    const timerIsActive = timeRemaining > 0 && timeRemaining < targetTime * 1000

    if (timeRemaining <= 0) {
        clearInterval(timer.current)

        dialog.current.open()
    }

    function handleReset() {
        setTimeRemaining(targetTime * 1000)
    }

    function handleStart() {
        timer.current = setTimeout(() => {
            setTimeExpired(true)
            setTimeRemaining(prev => prev - 10)
        }, 10)

        setTimerStarted(true)
    }

    function handleStop() {
        dialog.current.open()
        clearTimeout(timer.current)
    }

    return (
        <>
            <ResultModal ref={dialog} result="lost" targetTime={targetTime} remainingTime={timeRemaining} onReset={handleReset} />
            <section className="challenge">
                <h2>{title}</h2>
                {timerExpired && <p> You lost! </p>}
                <p className="challenge-time">
                    {targetTime} second{targetTime > 1 ? 's' : ''}
                </p>
                <p>
                    <button onClick={timerIsActive ? handleStop : handleStart}>
                        {timerIsActive ? 'Stop' : 'Start'} Challenge
                    </button>
                </p>
                <p className={timerIsActive ? 'active' : undefined}>
                    {timerIsActive ? 'Time is running ...' : 'Timer inactive'}
                </p>
            </section>
        </>
    )


}