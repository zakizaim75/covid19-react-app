import React, { Component } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/corona.css';
import CountUp from 'react-countup';
import CountryPicker from './CountryPicker'

export default class CoronaTracker extends Component {
    constructor(props){
        super(props);
        this.state={
            confirm:null,
            deaths:null,
            recovered:null,
            country:null,
            confirmG:null,
            deathsG:null,
            recoveredG:null,
        }
    }
    handleCountryChange=(country)=>{
        axios.get("https://covid19.mathdro.id/api/countries/" + country)
        .then(response=>{
            this.setState({
                confirm:response.data.confirmed.value,
                deaths:response.data.deaths.value,
                recovered:response.data.recovered.value,
            })
        })
    }
    componentDidMount(){
        this.getData();
    }
    getData=()=>{
        axios.get('https://covid19.mathdro.id/api')
       .then(response=>{
           this.setState({
               confirmG:response.data.confirmed.value,
               deathsG:response.data.deaths.value,
               recoveredG:response.data.recovered.value,
           })
       })
      .catch(error=>{
          console.log(error.response);
          
      })
    }

    render() {
        return (
          <React.Fragment> 
              <div className="corona-body">
                  <div className="container">
                      <div>
                          <center className="judul">COVID-19 DATA </center>
                          <br/>
                          <div className="name">       
                              <center>GLOBAL</center>
                              </div>
                      </div>
                      <center>
                      <div className="card-deck card-decks"> 
                      <div className="card confirm box">
                       <div className="card-title c-title">
                           <center>Kasus Aktif</center>
                
                           </div>
                           <div className="card-body c-body text-center">
                           <div className="number"> 
                               {this.state.confirmG}
                               </div>
                               </div>
                   </div>
                   <br/>
                   <div className="card recovered box">
                       <div className="card-title c-title">
                           <center>Sembuh</center>
                
                           </div>
                           <div className="card-body c-body text-center">
                           <div className="number"> 
                               {this.state.recoveredG}
                               </div>
                               </div>
                   </div>
                   <br/>
                   <div className="card deaths box">
                       <div className="card-title c-title">
                           <center>Meninggal</center>
                
                           </div>
                           <div className="card-body c-body text-center">
                            <div className="number"> 
                            {this.state.deathsG}
                           </div>
                               </div>
                        </div>
                        </div>
                        <br/>
                          </center>
                  </div><br/><br/>
                    <div className="name">
                    <center>NEGARA</center>
                    </div>
                  <div className="container">                  
                  <div className="card-deck card-decks">
                   <div className="card confirm box">
                       <div className="card-title c-title">
                           <center>Kasus Aktif</center>
                           </div>
                           <div className="card-body c-body text-center">
                               <CountUp
                               start={0}
                               end={this.state.confirm}
                               duration={1}
                               separator=","
                               className="number"/>
                               </div>
                   </div>
                   <div className="card recovered box">
                       <div className="card-title c-title">
                           <center>Sembuh</center>
                
                           </div>
                           <div className="card-body c-body text-center">
                               <CountUp
                               start={0}
                               end={this.state.recovered}
                               duration={1}
                               separator=","
                               className="number"/>
                               </div>
                   </div>
                   <div className="card deaths box">
                       <div className="card-title c-title">
                           <center>Meninggal</center>
                           </div>
                           <div className="card-body c-body text-center">
                               <CountUp
                               start={0}
                               end={this.state.deaths}
                               duration={1}
                               separator=","
                               className="number"/>
                               </div>
                        </div>
                        </div><br/>
                        <CountryPicker handleCountryChange={this.handleCountryChange}/>
                   </div>
                  </div>
              </React.Fragment>
        )
    }
}
