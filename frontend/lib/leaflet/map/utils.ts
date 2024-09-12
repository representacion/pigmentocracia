import L from "leaflet";

const unMountMap = (map: L.Map) => {
    map.off();
    map.remove();
};

const unMountLayer = (map: L.Map, layer: L.Layer) => {
    map.removeLayer(layer);
    layer.off();
};

export { unMountMap, unMountLayer };