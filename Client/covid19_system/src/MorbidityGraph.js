import React , { useState, useEffect } from "react";
import {  Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import AddMorbidity from "./AddMorbidity";
import AddVaccine from "./AddVaccine";


export default function Patients({chosed,id}) {
    const [ graph,  setgraph]= useState([]);
    // Define Layout
var layout = {
    xaxis: {range: [0, 31], title: "days"},
    yaxis: {range: [0, 10000], title: "morbidity"},  
    title: "days vs. morbidity"
  };
    const navigate = useNavigate();
    useEffect(() => {
        console.log("graph")
        fetch(`http://localhost:3003/api/patient/possitive/07`, { method: "GET" })
            .then(response =>   response.json())
            .then(data => {
                console.log("graph", data)
                setgraph(data)
            //     console.log(data)
            //     var d=data.array.forEach(element => {
            //        return element.m_dateOfPositiveTest
            //     });
            //     var c=data.array.forEach(element => {
            //         return element.cnt
            //      });
                 
            //     setgraph([{x:d,y:c,mode:"lines"}]);
             })
            .catch((err) => {
                alert('failed to connect to the server '+err)
            })
        
    }, [])
    

    var myDataSource = {
        chart: {
          caption: "Top 10 iOS Apps - July 2017",
          subCaption: "Downloads (In Millions)",
          "canvasBgAlpha": "0",
          "bgColor": "#ffffff",
          "bgAlpha": "70",
          "baseFont": "Roboto",
          "baseFontSize": "14",
          "showAlternateVGridColor": "1",
          "alternateVGridAlpha": "5",
          "labelFontSize": "15",
          "captionFontSize": "20",
          "subCaptionFontSize": "16",
          "toolTipColor": "#000000",
          "toolTipBgColor": "#ffffff",
          "toolTipAlpha": "90",
          "captionFontBold": "0",
          "subCaptionFontBold": "0",
          "paletteColors": "#8E24AA",
          "valueFontSize": "13",
          "valueFontBold": "0",
          "animation": "0",
          "divLineAlpha": "15",
          "divLineDashed": "0",
          "plotFillAlpha": "90",
          theme: "ocean"
        },
        "data": JSON.parse(graph)
      };
    
      var barChartConfigs = {
        id: "bar-chart",
        renderAt: "chart-container",
        type: "bar2d",
        width: "100%",
        height: 400,
        dataFormat: "json",
        dataSource: myDataSource
      };
      
    return <div>
    {/* {Plotly.newPlot("myPlot", graph, layout)} */}
    <div id="chart-container"></div>
        <button onClick={() =>{navigate('/patients')}}>Back</button>
    </div>
}