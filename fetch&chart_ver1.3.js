<!doctype html>
<html lang="en">
  <head>
    <!-- Required meta tags -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- Bootstrap CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">

    <title>Multiple refresshing from api</title>
  </head>
  <style>
      body{
          background-color: rgb(49, 0, 196);
          margin: 20px;
      }
      .card2{
          border: none;
      }
      .grid{
          display: grid;
          grid-template-columns: 60% 40%;
      }
      .bigchar{
          align-items: flex-start;
          

      }
      

  </style>
  <body>
<div>
    <form method="post">
        <label for="chose a town">Choose a town:</label>
        <select name="Towns" id="townList"></select>
    </form>
</div>   
    <div class="grid">
        <div class="bigchar">
            <div class="card">
                <div class="card-body">
                    <canvas id="myChart" width="100" height="40"></canvas>                
                </div>
            </div>
        </div>
        
            <div class="card2">
                <div class="card-body">
                    <canvas id="debPie" width="100" height="40" ></canvas>
                </div>
                <div class="card-body">
                    <canvas id="debPie2" width="100" height="40" ></canvas>
                </div>
        </div> 
    </div>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
  <script>
      console.log('kettes loop')



      function generateDropDown() {
            fetch('/getdata/')
            .then(res => res.json())
            .then(res => {
            console.log(res['allTowns'])
            allTowns = res['allTowns']
            const createDropDown = document.getElementById('townList')

            for (let x =0; x < allTowns.length; x++){
                
                const town = document.createElement('option')
                town.setAttribute('value',`${allTowns[x]}`)
                town.innerHTML = `<p>${allTowns[x]}<p\>`
                createDropDown.appendChild(town)

                
            }})

            }
            
            
          

      

    generateDropDown()
    chartExists = false
    function fetchit() {
            fetch('/getdata/')
                .then(res => res.json())
                .then(res => {
                    console.log(res)
                towns = []
                heights= []
                relnum = []
                rels= []
                relnum2 = []
                rels2=[]
                allTowns = res['allTowns']
                 // talan szebb lenne ha a fetch kulon allo funkcio lenne es ay adatot returnolja
                    ///eyt feltudja használni a chartMain. Ez a fetch hiba kezelése miatt is fontos


                if (chartExists != false) {chartExists = true}
                else {chartExists == false}
                
                Object.keys(res['combine']).forEach(val  => towns.push(val) )
                Object.values(res['combine']).forEach(val  => heights.push(val) )
                Object.keys(res['comrel']).forEach(val  => rels.push(val) )
                Object.values(res['comrel']).forEach(val  => relnum.push(val) )
                Object.keys(res['comrel2']).forEach(val  => rels2.push(val) )
                Object.values(res['comrel2']).forEach(val  => relnum2.push(val) )
                console.log(allTowns)

                function chartMain() {
                    function updateChart(chart, axisX, axisY) {
                                        chart.data.labels = axisX
                                        chart.data.datasets[0].data = axisY
                                        chart.update()
                                        console.log('chart is updated')
                                        
                                    }


                  var ctx = document.getElementById('myChart').getContext('2d');
                  if (chartExists == false) {
                  console.log('chart created')
                  chartExists = true
                      chartOne = new Chart(ctx, {
                          type: 'bar',
                          data: {
                              labels: towns,

                              datasets: [{
                                  label: 'heights in these towns',
                                  data: heights,

                                  backgroundColor: [
                                    'rgba(128, 128, 0, 0.8)',
                                    'rgba(0, 0, 128, 0.8)',
                                      


                                  ],
                                  borderColor: [
                                    'rgba(128, 128, 0, 0.8)',
                                    'rgba(0, 0, 128, 0.8)',
                                      
                                      

                                  ],
                                  borderWidth: 1
                              }]
                          },
                          options: { 
                            chartArea: {
                                    backgroundColor: 'rgb(132, 119, 170)'
                                }
                          }


                         }



                        ) }

                        else {
                            updateChart(chartOne,towns, heights)
                           
                                       }
                  var ctx2 = document.getElementById('debPie').getContext('2d');
                //   if (chartExists == false) {
                  console.log('chart aacreated')
                  chartExists = true
                      chartTwo = new Chart(ctx2, {
                          type: 'pie',
                          data: {
                              labels: rels,

                              datasets: [{
                                  label: 'distribution amoung religions',
                                  data: relnum,

                                  backgroundColor: [
                                      'rgba(0, 255, 0, 0.8)',
                                      'rgba(128, 128, 0, 0.8)',
                                      'rgba(128, 99, 132, 0.8)',
                                      'rgba(0, 255, 0, 0.8)',
                                      'rgba(0, 128, 0, 0.8)',
                                      'rgba(0, 0, 128, 0.8)',
                                      'rgba(192, 192, 192, 0.8)',
                                      'rgba(255, 0, 0, 0.8)',


                                  ],
                                  borderColor: [
                                      'rgba(255, 99, 132, 1)',
                                      'rgba(54, 162, 235, 1)',
                                      'rgba(255, 99, 132, 1)',
                                      'rgba(54, 162, 235, 1)',
                                      'rgba(255, 99, 132, 1)',
                                      'rgba(54, 162, 235, 1)',
                                      'rgba(255, 99, 132, 1)',
                                      'rgba(54, 162, 235, 1)',

                                  ],
                                  borderWidth: 1
                              }]
                          },
                          options : {
                            legend: {
                                        labels: {
                                            fontColor: "white",
                                            fontSize: 16
                                        }
                                    },                         
                                    aspectRatio:2,
                                    gridLines:false,
                                    scales:{
                                        y:{
                                            beginAtZero:false,
                                            //grid:{display:false},
                                            display:false
                                        },
                                        x: {
                                            beginAtZero:true,
                                            //grid:{display:false},
                                            display:false
                                    }
                                }
                            }



                      }) 
                    // }

                    //     else {
                    //         updateChart(chartTwo, rels, relnum)
                           
                    //                    }


                    var ctx3 = document.getElementById('debPie2').getContext('2d');
                //   if (chartExists == false) {
                  console.log('chart aacreated')
                  chartExists = true
                      chartThree = new Chart(ctx3, {
                          type: 'pie',
                          data: {
                              labels: rels2,

                              datasets: [{
                                  label: 'distribution amoung religions',
                                  data: relnum2,

                                  backgroundColor: [
                                  'rgba(0, 255, 0, 0.8)',
                                      'rgba(128, 128, 0, 0.8)',
                                      'rgba(128, 99, 132, 0.8)',
                                      'rgba(0, 255, 0, 0.8)',
                                      'rgba(0, 128, 0, 0.8)',
                                      'rgba(0, 0, 128, 0.8)',
                                      'rgba(192, 192, 192, 0.8)',
                                      'rgba(255, 0, 0, 0.8)',


                                  ],
                                  borderColor: [
                                      'rgba(255, 99, 132, 1)',
                                      'rgba(54, 162, 235, 1)',
                                      'rgba(255, 99, 132, 1)',
                                      'rgba(54, 162, 235, 1)',
                                      'rgba(255, 99, 132, 1)',
                                      'rgba(54, 162, 235, 1)',
                                      'rgba(255, 99, 132, 1)',
                                      'rgba(54, 162, 235, 1)',

                                  ],
                                  borderWidth: 1
                              }]
                          },
                          options : {                                
                                    aspectRatio:2,
                                    gridLines:false,
                                    scales:{
                                        y:{
                                            beginAtZero:false,
                                            //grid:{display:false},
                                            display:false
                                        },
                                        x: {
                                            beginAtZero:true,
                                            //grid:{display:false},
                                            display:false
                                    }
                                }
                            }



                      }) 




                           }  // enf of the chatMain
                        chartMain()

                      
                    // }

                    //     else {
                    //         updateChart(chartTwo, rels, relnum)
                           
                    //                    }
                           
              
                    })} // ez a harom a vege

        fetchit()
        setInterval(fetchit, 10000)
    </script>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous"></script>


  </body>
</html>


