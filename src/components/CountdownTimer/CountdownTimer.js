import React from 'react';
import './CountdownTimer.css';

class CountdownTimer extends React.Component {

    constructor(props) {
        super(props);
          
        this.state = {
            eventName: null,
            interval: null,
            countdownStarted: false,
            daysRemaining: 0,
            hoursRemaining: 0,
            minutesRemaining: 0,
            secondsRemaining: 0,
            daysInput: 0,
            hoursInput: 0,
            minutesInput: 0,
            secondsInput: 0
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
            let days = Math.floor(distance / (1000 * 60 * 60 * 24));
            let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            let seconds = Math.floor((distance % (1000 * 60)) / 1000);
            return({distance: distance, days: days, hours: hours, minutes: minutes, seconds: seconds});
        }

        const startCount = () => {
            var dateVal = new Date();
            counter.startTime = dateVal;
            
            // Clone the start date object
            counter.endTime = new Date(dateVal.getTime());
            // Set the end time to be + the number of minutes to countdown by
            let daysAdded = this.state.daysInput*24*60*60*1000;
            let hoursAdded = this.state.hoursInput*60*60*1000;
            let minutesAdded = this.state.minutesInput*60*1000;
            let secondsAdded = this.state.secondsInput*1000;
            let totalAdded = daysAdded + hoursAdded + minutesAdded + secondsAdded;
            counter.endTime.setTime(counter.endTime.getTime() + (totalAdded));

                var interval = setInterval(() => {
                console.log(`Starting interval id:`,interval);
                let displayDelay = 1;
                let remainingTime = updateTime();
                this.setState({interval: interval, countdownStarted: true, daysRemaining: remainingTime.days, hoursRemaining: remainingTime.hours, minutesRemaining: remainingTime.minutes, secondsRemaining: remainingTime.seconds+displayDelay});
                // console.log(`minutes`,`${minutes}`)
                // console.log(`seconds`,`${seconds}`)
                
                if (remainingTime.distance < 0) {
                    let newInterval = clearInterval(interval);
                    console.log(`Stopping interval id:`,this.state.interval);
                    this.setState({interval:newInterval,countdownStarted: false, daysRemaining: 0, hoursRemaining: 0, minutesRemaining: 0, secondsRemaining: 0});
                }

            }, 100); // how fast it should update the interval
        }

        const stopCount = () => {
            let newInterval = clearInterval(this.state.interval);
            console.log(`Stopping interval id:`,this.state.interval);
            this.setState({interval:newInterval,countdownStarted: false, daysRemaining: 0, hoursRemaining: 0, minutesRemaining: 0, secondsRemaining: 0});
        }

        return (
            <div>
            <div id="countdownText">
            
            
                <div>
                    <table className="countdownTable" 
                    /*
                    style={{backgroundColor:`rgb(${255-this.state.secondsRemaining*4},${128-this.state.secondsRemaining*2},${this.state.secondsRemaining*4})`}}
                    */
                   >
                        <tbody>
                            {this.state.countdownStarted ? (
                            <tr className="countdownValues">
                                <td>{this.state.daysRemaining.toString().padStart(2, '0')}</td>
                                <td>:</td>
                                <td>{this.state.hoursRemaining.toString().padStart(2, '0')}</td>
                                <td>:</td>
                                <td>{this.state.minutesRemaining.toString().padStart(2, '0')}</td>
                                <td>:</td>
                                <td>{this.state.secondsRemaining.toString().padStart(2, '0')}</td>
                            </tr>
                            ) : (
                                <tr className="countdownInputs">
                                    <td><input type="text" value={this.state.daysInput} onChange={(e) => {this.setState({daysInput: e.target.value})}} /></td>
                                    <td>:</td>
                                    <td><input type="text" value={this.state.hoursInput} onChange={(e) => {this.setState({hoursInput: e.target.value})}} /></td>
                                    <td>:</td>
                                    <td><input type="text" value={this.state.minutesInput} onChange={(e) => {this.setState({minutesInput: e.target.value})}} /></td>
                                    <td>:</td>
                                    <td><input type="text" value={this.state.secondsInput} onChange={(e) => {this.setState({secondsInput: e.target.value})}} /></td>
                                </tr>
                            )}
                            <tr className="countdownLabels">
                                <td>Days</td>
                                <td></td>
                                <td>Hours</td>
                                <td></td>
                                <td>Minutes</td>
                                <td></td>
                                <td>Seconds</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            

            
                
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