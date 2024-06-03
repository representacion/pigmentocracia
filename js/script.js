

const apiUrl = 'https://prep2024.ine.mx/publicacion/nacional/assets/diputaciones/mapas/nacional/nacional.json';
const url = 'https://corsproxy.io/?' + encodeURIComponent(apiUrl);

let ganadores = new Map();

let datos = fetch(url).then(response => {
  if (!response.ok) {
    if (response.status === 404) {
      throw new Error('No se encontro la data');
    } else if (response.status === 500) {
      throw new Error('Error de servidor');
    } else {
      throw new Error('No hubo una respuesta correcta');
    }
  }
  return response.json();
})
.then(data => {
  console.log(data);
  data.ganador.data.forEach(ele => {
    let piezas = ele["ENTIDAD_DISTRITO"].split("_");
    let cve = piezas[0].padStart(2,"0") + piezas[1].padStart(2,"0");
    ganadores.set(cve,{"color":ele["color"],
  })
  });
})
.catch(error => {
  console.error('Error: ', error);
});

const div = d3.select("#mapa");
const width = parseInt(d3.select("#mapa").style("width"));
const height = width * 0.75;
let datamap = new Map();

let svg = div.append("svg")
    .attr("width", width)
    .attr("height", height)
    .attr("viewBox", [-3, -3, width+3, height+13])
    .attr("style", "max-width: 100%; height: auto;");

const datap = d3.json("./resources/datos/mexico300-2024.geojson");
const datae = d3.json("./resources/datos/mexico300bordes-2024.geojson");
const distdata = d3.csv("./resources/datos/distdata.csv");

let pintar = Promise.all([datap,datae,distdata]).then(function(data) {

    let distritos = data[0];
    let estados = data[1];
    let datos = data[2];

    console.log(datos);

    datos.forEach(element => {
        datamap.set(element["CVEDIS"],element);
    });


    console.log("features",distritos.features)
    
    var projection = d3.geoIdentity().reflectY(true).fitSize([width,height],distritos);
    var path = d3.geoPath(projection);
  
    let disthex = svg.selectAll(".distrito")
        .data(distritos.features)
        .join("g")
        .attr("class","distrito_group");


        
    disthex
        .append("path")
            .attr("d",path)
            .attr("class","distrito")
            .attr("title",(dato)=>{ return dato.properties["estado"] + ", Distrito " + dato.properties["distrito"].substr(2,2) })
    // .on("click", click);


    svg.selectAll(".distrito_group")
        .append("text")
        .text((dato)=>{  return dato.properties["distrito"].substr(2,2) } )
        .attr("d",path)
        // .attr("x",(dato)=> {console.log("x",dato.geometry.coordinates);return dato.geometry.coordinates[0][0][0]})
        // .attr("y",(dato)=> {console.log("y",dato.geometry.coordinates[0][2][0]);return dato.geometry.coordinates[0][2][0]})
        // .x(100).y(100)
        // .transform(d3.select(dato).attr("transform")).translate


    svg.selectAll(".estados")
        .data(estados.features)
        .enter()
        .append("path")
        .attr("class","estados")
        .attr("d",path)
        .style("fill", "none")
        // .style("stroke", "black")
        // .style("stroke-width","3px");

    return disthex;

  });

  Promise.all([pintar,datos]).then(function(data) {
    console.log(ganadores);

    let disthex = data[0];

    disthex.style("fill", d => {
      let cve = d["properties"]["distrito"];
      let gandat = ganadores.get(cve);
      if (gandat) {
        let color = gandat["color"];
        return color
      }
      return "lightgray"
    })

  });

  function click(e,d) {

    d3.select("#barra").selectAll("*").remove();

    d3.selectAll(".distrito").style("fill","lightgray");
    d3.select(this).style("fill","#7800E0");

    let dato = datamap.get(d["properties"]["distrito"]);
    console.log(dato);

    d3.select("#barra").append("h2").html(dato["NOMBRE_ENTIDAD"] + ", Distrito " + dato["DISTRITO_FEDERAL"]);
    d3.select("#barra").append("h3").html(dato["NOMBRE_DISTRITO_FEDERAL"]);

    d3.select("#barra").append("p").html("Lista nominal: " + d3.format(",.0f")(dato["LN"]))
    d3.select("#barra").append("p").html("Hombres: " + d3.format(",.0f")(dato["LN_HOMBRES"]))
    d3.select("#barra").append("p").html("Hombres: " + d3.format(",.0f")(dato["LN_MUJERES"]))
}

