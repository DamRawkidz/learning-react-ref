import { useImperativeHandle } from "react";
import { useRef } from "react"
import { forwardRef } from "react"

const ResultModal = forwardRef(function ResultModal({ result, targetTime, remainingTime, onReset }, ref) {
    const userlost = remainingTime <= 0
    const formatterRemainingTime = (remainingTime / 1000).toFixed(2)

    const dialog = useRef();
    useImperativeHandle(ref, () => {
        return {
            open() {
                dialog.current.showModal()
            }
        }
    })
    return <dialog ref={dialog} className="result-modal" open>
        {userlost && <h2>You {result} </h2>}
        <p>The target time was <strong>{targetTime}</strong></p>
        <p>you stopped the timer with <strong>{formatterRemainingTime} second left</strong></p>
        <form method="dialog" onSubmit={onReset}>
            <button>Close</button>
        </form>
    </dialog>
})

export default ResultModal