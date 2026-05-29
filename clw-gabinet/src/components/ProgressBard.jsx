function ProgressBar({ step, totalSteps = 6 }) {
    return (
       <div className="progress-bar-wrapper">
            {Array.from({ length: totalSteps }, (_, i) => i + 1).map((s) => (
                <div key={s} className="progress-step">
                    <div className={`progress-circle ${step >= s ? 'active' : ''}`}>
                        {step > s ? '✓' : s}
                    </div>
                    {s < totalSteps && <div className={`progress-line ${step > s ? 'active' : ''}`}/>}
                </div>
            ))}
        </div> 
    )
}

export default ProgressBar





