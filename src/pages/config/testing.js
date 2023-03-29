import React,{useState} from 'react'
import DatePicker from "react-datepicker";
import moment from 'moment'
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';



export default class TestDate extends React.Component {
    constructor(props) {
        super(props);
    
        this.state = {
          date: new Date(),
          startDate:'10/03/2022'
          
        }
      }
      // handleDateChange = (e) => {
      //   console.log({e})
      // }

      testDate = (d) => {
        console.log({d})
         this.setState({date:d})
         let today = d;
         let dateDMY = `${today.getDate()}/${today.getMonth() + 1}/${today.getFullYear()}`;
         console.log({dateDMY})
      }


      render(){
          const d = new Date()
    return (
        <div>
            {/* <DatePicker  selected={d} onChange={(date) => this.setState({date:date})} /> */}

            <DatePicker selected={this.state.date} onChange={this.testDate} />
            {/* <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
            margin="normal"
            id="date-picker-dialog"
            label="Date"
            format="dd/MM/yyyy"
            // value={date}
            onChange={this.handleDateChange}
            KeyboardButtonProps={{
                'aria-label': 'change date',
                }}
                />
                </MuiPickersUtilsProvider> */}
            {/* <DatePicker  selected={this.state.date} onChange={this.handleChange(e)} /> */}
        </div>
    )
      }
}
