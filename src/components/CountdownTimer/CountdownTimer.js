import React from 'react';
import './CountdownTimer.css';

class CountdownTimer extends React.Component {

    constructor(props) {
        super(props);
          
        this.state = {
            interval: null,
            countdownStarted: false,
            minutesRemaining: 0,
           secondsRemaining: 0
        }
     }
     
     
     render() {
        const counter = {
            startTime: null,
            endTime: null,
        }
    
        const updateTime = () => {
            let now = new Date().getTime();
            let distance = counter.endTime.getTime() - now;
            // let days = Math.floor(distance / (1000 * 60 * 60 * 24));
            // let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            let seconds = Math.floor((distance % (1000 * 60)) / 1000)-1;
            return({distance: distance, minutes: minutes, seconds: seconds});
        }

        const startCount = () => {
            var dateVal = new Date();
            counter.startTime = dateVal;
            
            // Clone the start date object
            counter.endTime = new Date(dateVal.getTime());
            // Set the end time to be + the number of minutes to countdown by
            counter.endTime.setMinutes(counter.endTime.getMinutes()+10);
                var interval = setInterval(() => {
                console.log(`Starting interval id:`,interval);
                let displayDelay = 1;
                let remainingTime = updateTime();
                this.setState({interval: interval, countdownStarted: true, minutesRemaining: remainingTime.minutes, secondsRemaining: remainingTime.seconds+displayDelay});
                // console.log(`minutes`,`${minutes}`)
                // console.log(`seconds`,`${seconds}`)
                
                if (remainingTime.distance < 0) {
                    let newInterval = clearInterval(interval);
                    console.log(`Stopping interval id:`,this.state.interval);
                    this.setState({interval:newInterval,countdownStarted: false, minutesRemaining: 0, secondsRemaining: 0});
                }

            }, 100); // how fast it should update the interval
        }

        const stopCount = () => {
            let newInterval = clearInterval(this.state.interval);
            console.log(`Stopping interval id:`,this.state.interval);
            this.setState({interval:newInterval,countdownStarted: false, minutesRemaining: 0, secondsRemaining: 0});
        }

        return (
            <div>
            <div id="countdownText">
            
            {this.state.countdownStarted ? (
                <div>{this.state.minutesRemaining.toString().padStart(2, '0')}:{this.state.secondsRemaining.toString().padStart(2, '0')}</div>
            ) : (
                <div>{`10:00`}</div>
            )}

            
                
            </div>
        
            <br></br>
        
            <button id="countdownButton" onClick={!this.state.countdownStarted ? startCount : stopCount}>
            {!this.state.countdownStarted ? `Countdown` : `Reset`}
            </button>
            </div>
            ); // return
        
        }// render
};


export default CountdownTimer;