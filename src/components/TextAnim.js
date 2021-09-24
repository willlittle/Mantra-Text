import './animDriver.css'
import {useState, useEffect} from 'react'
const TextAnim = ({messageArrayProp}) => {
    //List of messages, sort stupid
    const messages = ['Not your keys not your cypto', 'Just remember, never sell', 'Make a donation to a whale today, try leveraged trading']
    //These next two states controll the className attribute of each H1 tag
    const [confirmingLifeCycle, setConfirmingLifeCycle] = useState('text-load')
    const [messageLifeCycle, setMessageLifeCycle] = useState('text-load')
    //This state is the time
    const [itCount, setItCount] = useState(0)
    const [message, setMessage] = useState(-1)

    // This useEffect listens for the page load, then starts an interval. Interval is cleared on unmount
    useEffect(() => {
        //MS counter of interval can be shorteneded for preview
        let lifeCycleTimer = setInterval(() => setItCount(prevCount => prevCount+=1), 1000);
        return () => {
            //Clean-up
            clearInterval(lifeCycleTimer)
        }
    }, [])

    //This use effect listens each time the seconds is iterated, and each state change will change H1 className. 
    //There are two useEffects, as this only listens out for when the state is changed, so the comparisin logic only calcs 1 per sec
    useEffect(() => {
        if (itCount === 0){
            setConfirmingLifeCycle('fade-in')
        }
        // This method of changing the message is not great
        if (itCount === 2) {
            if (message > messageArrayProp.length -2){
                setMessage(-1)
            }
            setMessage(prevMess => prevMess +=1)
        }
        if (itCount === 5){
            setConfirmingLifeCycle('flick-down')
            setMessageLifeCycle('fade-in')
        }
        if (itCount == 11){
            setConfirmingLifeCycle('fade-in')
            setMessageLifeCycle('flick-down')
            setItCount(0)
        }
    }, [itCount])

    return (
        <div className='cont'>
            <h1 className={messageLifeCycle}>
                {messageArrayProp[message]}
            </h1>
            <h1 className={confirmingLifeCycle}>
                confirming
            </h1>
      </div>
    )
}

export default TextAnim
