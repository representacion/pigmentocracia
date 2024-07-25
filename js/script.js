let ganadores = new Map();
let avance = new Map();

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

let listado = "";

let pintar = Promise.all([datap,datae,distdata]).then(function(data) {

    let distritos = data[0];
    let estados = data[1];
    let datos = data[2];



    console.log(datos, distritos);

    datos.forEach(element => {
        datamap.set(element["CVEDIS"],element);
    });


    
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
            .attr("data-tippy-content",(dato)=>{ 
              var estaData = datos.filter(d=> d.CVEDIS == dato.properties.distrito )[0];
              // console.log("tippy",dato.properties.distrito,estaData);
              var html = "";
              if(estaData) {
                if (estaData.PHOTO_URL) {
                  html += `<img width="250" src="photos/${estaData.PHOTO_URL}"><br>`
                }
                else {
                  html += `[Sin foto]<br>`

                }
                html += `${dato.properties["estado"]} -
                <b>Distrito ${dato.properties["distrito"].substr(2,2)}</b><br>
               ${estaData.NOMBRE_DISTRITO_FEDERAL}<br>
               [${estaData.PARTIDO_2024}]
               ${estaData.NOMBRE_DIPUTADO_ELECTO_2024}
               <a href="https://www.gobernantes.info/mx/person/${estaData.ID_PERSON_GOBERNANTES}">Ver en gobernantes</a>
               ` 
              } else {
                html += `${dato.properties["estado"]} -
                <b>Distrito ${dato.properties["distrito"].substr(2,2)}</b><br>Aún no se ha reportado este distrito.`
              }
              return html;
            })

            



    svg.selectAll(".estados")
        .data(estados.features)
        .enter()
        .append("path")
        .attr("class","estados")
        .attr("d",path)
        .style("fill", "none")

        tippy('.distrito', {
          allowHTML: true,
          theme: 'light-border',
          hideOnClick: true,
          appendTo: () => document.body,
          interactive: true,
          trigger: "click"
        });

    for (let d in datos) {
        if (datos[d].PHOTO_URL) {
          listado += `<div style="display: inline-block; width: 300px; float: left;"><img width="250" src="photos/${datos[d].PHOTO_URL}">
          <div style='display: inline-block; background-color: ${datos[d].SKIN_TONE}; width: 100px; height: 100px;'>perla</div><div style='display: inline-block; background-color: ${datos[d].DOMINANT}; width: 100px; height: 100px;'>dominante</div>
          Distrito ${datos[d].CVEDIS} -
          <b>Estado ${datos[d].NOMBRE_ENTIDAD}</b><br>
         ${datos[d].NOMBRE_DISTRITO_FEDERAL}<br>
         [${datos[d].PARTIDO_2024}]
         ${datos[d].NOMBRE_DIPUTADO_ELECTO_2024}
         <a href="https://www.gobernantes.info/mx/person/${datos[d].ID_PERSON_GOBERNANTES}">Ver en gobernantes</a>
         </div>
         `           
        }
      
      
    }        
    

    return disthex;

  });

  Promise.all([pintar]).then(function(data) {

    let disthex = data[0];
    console.log("datamap",datamap);

    disthex.select("path").style("fill", d => {
      // console.log("d",d);
      let cve = d["properties"]["distrito"];

      let dato = datamap.get(d["properties"]["distrito"].toString());
      // console.log(d["properties"]["distrito"],dato.SKIN_TONE)
      return dato ? dato["SKIN_TONE"] : "white" || "white";
  
    })

    d3.select("#listado").html(listado);

    // document.body.innerHTML+=listado

   //console.log("esto", disthex.select("path"))



  });

  function click(e,d) {

    d3.select("#barra").selectAll("*").remove();

    d3.selectAll(".distrito").style("fill","white");
    d3.select(this).style("fill","#7800E0");

    let dato = datamap.get(d["properties"]["distrito"]);
    console.log(dato);

    d3.select("#barra").append("h2").html(dato["NOMBRE_ENTIDAD"] + ", Distrito " + dato["DISTRITO_FEDERAL"]);
    d3.select("#barra").append("h3").html(dato["NOMBRE_DISTRITO_FEDERAL"]);

    d3.select("#barra").append("p").html("Lista nominal: " + d3.format(",.0f")(dato["LN"]))
    d3.select("#barra").append("p").html("Hombres: " + d3.format(",.0f")(dato["LN_HOMBRES"]))
    d3.select("#barra").append("p").html("Hombres: " + d3.format(",.0f")(dato["LN_MUJERES"]))
}

